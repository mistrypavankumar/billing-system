package com.pavan.billingsoftware.services;

import com.pavan.billingsoftware.io.order.OrderRequest;
import com.pavan.billingsoftware.io.order.OrderResponse;
import com.pavan.billingsoftware.io.payment.PaymentVerificationRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface OrderService {

    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrder();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
