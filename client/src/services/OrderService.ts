import axios from "axios";

export const latestOrders = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/v1.0/orders/latest",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Error fetching latest orders:", err);
    throw err;
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/orders",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

export const deleteOrderById = async (orderId: string) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1.0/orders/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Error deleting order:", err);
    throw err;
  }
};
