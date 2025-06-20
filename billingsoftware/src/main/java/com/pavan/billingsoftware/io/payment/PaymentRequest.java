package com.pavan.billingsoftware.io.payment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    private Double amount;
    private String currency;
}
