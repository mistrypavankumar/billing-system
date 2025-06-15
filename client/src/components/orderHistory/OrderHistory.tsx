import { useEffect, useState } from "react";

import "./OrderHistory.css";
import { latestOrders } from "../../services/OrderService";
import Loader from "../loader/Loader";

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await latestOrders();

        if (res.status === 200) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatItems = (items: OrderItem[]) => {
    return items.map((item) => `${item.name} x ${item.quantity}`).join(", ");
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return <div className="text-center py-4">No orders found</div>;
  }

  return (
    <div className="orders-history-container">
      <h2 className="text-light">Recent Orders</h2>
      <div className="table-responsive">
        <div>
          <table className="table table-hover table-borderless mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="fw-medium">{order.orderId}</td>
                  <td>
                    {order.customerName}
                    <br />
                    <small className="text-muted">{order.phoneNumber}</small>
                  </td>
                  <td>{formatItems(order.items)}</td>
                  <td>${order.grandTotal.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentDetails?.status === "COMPLETED"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.paymentDetails?.status || "PENDING"}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
