package com.pavan.billingsoftware.controllers;


import com.pavan.billingsoftware.io.order.OrderResponse;
import com.pavan.billingsoftware.io.payment.PaymentRequest;
import com.pavan.billingsoftware.io.payment.PaymentVerificationRequest;
import com.pavan.billingsoftware.io.payment.razorpay.RazorpayOrderResponse;
import com.pavan.billingsoftware.services.OrderService;
import com.pavan.billingsoftware.services.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderResponse> createOrder(@RequestBody PaymentRequest request) {
        try {
            RazorpayOrderResponse response = razorpayService.createOrder(request.getAmount(), request.getCurrency());
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.OK)
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }

}
