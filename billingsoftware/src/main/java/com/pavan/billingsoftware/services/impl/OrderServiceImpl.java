package com.pavan.billingsoftware.services.impl;

import com.pavan.billingsoftware.io.order.OrderRequest;
import com.pavan.billingsoftware.io.order.OrderResponse;
import com.pavan.billingsoftware.io.payment.PaymentDetails;
import com.pavan.billingsoftware.io.payment.PaymentMethod;
import com.pavan.billingsoftware.io.payment.PaymentVerificationRequest;
import com.pavan.billingsoftware.models.Order;
import com.pavan.billingsoftware.models.OrderItem;
import com.pavan.billingsoftware.repositories.OrderRepository;
import com.pavan.billingsoftware.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Value("${RAZORPAY_KEY_SECRET}")
    private String razorpayKeySecret;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        Order newOrder = convertToOrder(request);

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ? PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItem> orderItem =  request.getCartItems()
                .stream()
                .map(this::convertToOrderItem)
                .collect(Collectors.toList());
        newOrder.setItems(orderItem);

        newOrder =  orderRepository.save(newOrder);

        return convertToResponse(newOrder);
    }

    private OrderResponse convertToResponse(Order newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subtotal(newOrder.getSubTotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .items(newOrder.getItems()
                        .stream()
                        .map(this::convertToItemResponse)
                        .collect(Collectors.toList())
                )
                .paymentDetails(newOrder.getPaymentDetails())
                .createdAt(newOrder.getCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItem orderItem) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItem.getItemId())
                .name(orderItem.getName())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }

    private OrderItem convertToOrderItem(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItem.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private Order convertToOrder(OrderRequest request) {
        return Order.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subTotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        Order existingOrder =  orderRepository.findByOrderId(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrder() {
       return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
         Order existingOrder =  orderRepository.findByOrderId(request.getOrderId()).orElseThrow(() -> new RuntimeException("Order not found"));

         if(!verifyRazorpaySignature(request.getRazorpayOrderId(), request.getRazorpayPaymentId(), request.getRazorpaySignature())){
             throw new RuntimeException("Payment verification failed");
         }

         PaymentDetails paymentDetails = existingOrder.getPaymentDetails();

         paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
         paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
         paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
         paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);

         existingOrder =  orderRepository.save(existingOrder);
         return convertToResponse(existingOrder);
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderRepository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders() {
        return orderRepository.findRecentOrders(PageRequest.of(0, 5))
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try{
            String payload = razorpayOrderId + "|" + razorpayPaymentId;
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256");
            sha256_HMAC.init(secretKey);

            byte[] hash = sha256_HMAC.doFinal(payload.getBytes());
            String generatedSignature = Hex.encodeHexString(hash);

            return generatedSignature.equals(razorpaySignature);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
