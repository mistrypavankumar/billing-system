import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import ReceiptPopUp from "../receiptPopUp/ReceiptPopUp";

interface CartSummaryProps {
  customerData: CustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  customerData,
  setCustomerData,
}) => {
  const { cartItems } = useAppContext();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.18; // Assuming 18% tax
  const grandTotal = totalAmount + tax;

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
          <button className="btn btn-success flex-grow-1" onClick={() => {}}>
            Cash
          </button>
          <button className="btn btn-primary flex-grow-1" onClick={() => {}}>
            UPI
          </button>
        </div>

        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-warning flex-grow-1">Place Order</button>
        </div>

        {/* <ReceiptPopUp /> */}
      </div>
    </div>
  );
};

export default CartSummary;
