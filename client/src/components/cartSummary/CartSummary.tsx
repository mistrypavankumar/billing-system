import React, { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import ReceiptPopUp from "../receiptPopUp/ReceiptPopUp";
import toast from "react-hot-toast";
import { createOrder, deleteOrderById } from "../../services/OrderService";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../services/PaymentService";
import { AppConstants } from "../../utils/constant";
import type { OrderDetails } from "../../types/Order";

interface CartSummaryProps {
  customerData: CustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  customerData,
  setCustomerData,
}) => {
  const { cartItems, clearCart } = useAppContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.18; // Assuming 18% tax
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerData({
      customerName: "",
      mobileNumber: "",
    });

    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId: string) => {
    try {
      const res = await deleteOrderById(orderId);

      if (res.status === 204) {
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete order");
      }
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const completePayment = async (paymentMode: string) => {
    if (!customerData.customerName || !customerData.mobileNumber) {
      toast.error("Please fill in customer details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName: customerData.customerName,
      phoneNumber: customerData.mobileNumber,
      cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);

    try {
      const res = await createOrder(orderData);
      const savedData = res.data;

      if (res.status === 201 && paymentMode === "cash") {
        toast.success("Cash order placed successfully");
        setOrderDetails(savedData);
      } else if (res.status === 201 && paymentMode === "upi") {
        const razorpayScriptLoaded = await loadRazorpayScript();

        if (!razorpayScriptLoaded) {
          toast.error("Failed to load payment gateway. Please try again.");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        //create razorpay order
        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: AppConstants.COMPANY_NAME,
          description: "Order Payment",
          handler: async (response: any) => {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerData.customerName,
            contact: customerData.mobileNumber,
          },
          theme: {
            color: AppConstants.COMPANY_COLOR || "#F37254",
          },
          model: {
            // This is called when the used close the model without completing the payment
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment cancelled.");
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);

        razorpay.on("payment.failed", async (response: any) => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment failed. Please try again.");
          console.error("Payment failed:", response.error.description);
        });

        razorpay.open();
      }
    } catch (err) {
      toast.error("Payment processing failed. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response: any, savedData: any) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedData.orderId,
    };

    try {
      const res = await verifyRazorpayPayment(paymentData);

      if (res.status === 200) {
        toast.success("UPI payment successful");
        setOrderDetails({
          ...savedData,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error("UPI payment verification failed. Please try again.");
      }
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    }
  };

  console.log("Order Details:", orderDetails);

  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item: </span>
          <span className="text-light">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax: </span>
          <span className="text-light">${tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Total: </span>
          <span className="text-light">${grandTotal.toFixed(2)}</span>
        </div>

        <div className="d-flex gap-3">
          <button
            className="btn btn-success flex-grow-1"
            onClick={() => completePayment("cash")}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Cash"}
          </button>
          <button
            className="btn btn-primary flex-grow-1"
            onClick={() => completePayment("upi")}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "UPI"}
          </button>
        </div>

        <div className="d-flex gap-3 mt-3">
          <button
            className="btn btn-warning flex-grow-1"
            disabled={isProcessing || !orderDetails}
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>

        {showPopup && (
          <ReceiptPopUp
            orderDetails={orderDetails!}
            onClose={() => setShowPopup(false)}
            onPrint={handlePrintReceipt}
          />
        )}
      </div>
    </div>
  );
};

export default CartSummary;
