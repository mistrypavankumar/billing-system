import React from "react";

import { AppConstants } from "../../utils/constant";
import type { OrderDetails, OrderItem } from "../../types/Order";

import "./ReceiptPopUp.css";
import "./Print.css";

interface ReceiptPopUpProps {
  orderDetails: OrderDetails; // Replace 'any' with the actual type of orderDetails
  onClose: () => void;
  onPrint: () => void;
}

const ReceiptPopUp: React.FC<ReceiptPopUpProps> = ({
  orderDetails,
  onClose,
  onPrint,
}) => {
  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success fs-1"></i>
        </div>
        <h3 className="text-center mb-4">Order Receipt</h3>
        <p>
          <strong>Order ID: </strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Customer Name: </strong> {orderDetails.customerName}
        </p>
        <p>
          <strong>Phone Number: </strong> {orderDetails.phoneNumber}
        </p>
        <hr className="my-3" />
        <h5 className="mb-3">Items Ordered</h5>
        <div className="cart-items-scrollable">
          {orderDetails.items.map((item: OrderItem) => {
            return (
              <div
                className="d-flex justify-content-between mb-2"
                key={item.itemId}
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>SubTotal: </strong>
          </span>
          <span>${orderDetails.subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Tax ({AppConstants.TAX}%): </strong>
          </span>
          <span>${orderDetails.tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span>
            <strong>Grand Total: </strong>
          </span>
          <span>${orderDetails.grandTotal.toFixed(2)}</span>
        </div>
        <p>
          <strong>Payment Method: </strong> {orderDetails.paymentMethod}
        </p>

        {orderDetails.paymentMethod === "UPI" && (
          <>
            <p>
              <strong>Razorpay Order ID: </strong>{" "}
              {orderDetails.paymentDetails?.razorpayOrderId}
            </p>
            <p>
              <strong>Razorpay payment ID: </strong>{" "}
              {orderDetails.paymentDetails?.razorpayPaymentId}
            </p>
          </>
        )}

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className="btn btn-warning" onClick={onPrint}>
            Print Receipt
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopUp;
