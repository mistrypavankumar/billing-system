package com.pavan.billingsoftware.io.dashboard;


import com.pavan.billingsoftware.io.order.OrderResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardResponse {
    private Double todaySales;
    private Long todayOrderCount;
    private List<OrderResponse> recentOrders;
}
