import { useEffect, useState } from "react";
import "./Dashboard.css";
import toast from "react-hot-toast";
import { fetchDashboardData } from "../../services/DashboardService";
import Loader from "../../components/loader/Loader";

const Dashboard = () => {
  const [data, setData] = useState<SalesDashboardData | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const res = await fetchDashboardData();

      if (res.status === 200) {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1000);
      } else {
        toast.error("Failed to load dashboard data.");
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div className="dashboard-container">
        No data available for the dashboard.
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>{data.todaySales.toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount}</p>
            </div>
          </div>
        </div>
        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <i className="bi bi-clock-history"></i>
            Recent Orders
          </h3>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => {
                  return (
                    <tr key={order.orderId}>
                      <td>{order.orderId.substring(0, 8)}...</td>
                      <td>{order.customerName}</td>
                      <td>${order.grandTotal.toFixed(2)}</td>
                      <td>
                        <span
                          className={`payment-method ${order.paymentMethod.toLocaleLowerCase()}`}
                        >
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${order.paymentDetails?.status.toLocaleLowerCase()}`}
                        >
                          {order.paymentDetails?.status}
                        </span>
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString([], {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
