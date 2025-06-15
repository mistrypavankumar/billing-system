import axios from "axios";

export const createRazorpayOrder = async (data: {
  amount: number;
  currency: string;
}) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/payments/create-order",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    throw err;
  }
};

export const verifyRazorpayPayment = async (paymentData: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  orderId: string;
}) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1.0/payments/verify",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Error verifying Razorpay payment:", err);
    throw err;
  }
};
