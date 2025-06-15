package com.pavan.billingsoftware.services;

import com.pavan.billingsoftware.io.order.OrderRequest;
import com.pavan.billingsoftware.io.order.OrderResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrder();
}
