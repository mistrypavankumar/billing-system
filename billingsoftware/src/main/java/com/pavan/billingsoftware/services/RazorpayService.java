package com.pavan.billingsoftware.services;


import com.pavan.billingsoftware.io.payment.razorpay.RazorpayOrderResponse;
import com.razorpay.RazorpayException;
import org.springframework.stereotype.Service;

@Service
public interface RazorpayService {
    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
