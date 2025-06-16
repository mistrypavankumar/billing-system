interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentDetails {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

interface PaymentDetails {
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  status: "PENDING" | "COMPLETED" | "FAILED";
}

interface OrderDetails {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  paymentMethod: "CASH" | "CARD" | "UPI" | "ONLINE";
  createdAt: string;
  paymentDetails?: PaymentDetails;
}


interface SalesDashboardData {
  todaySales: number;
  todayOrderCount: number;
  recentOrders: OrderDetails[];
}