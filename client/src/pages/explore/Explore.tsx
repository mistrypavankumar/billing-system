import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./Explore.css";
import DisplayCategory from "../../components/displayCategory/DisplayCategory";
import DisplayItems from "../../components/displayItems/DisplayItems";
import CustomerForm from "../../components/customerForm/CustomerForm";
import CartItems from "../../components/cartItems/CartItems";
import CartSummary from "../../components/cartSummary/CartSummary";



const Explore = () => {
  const appContext = useContext(AppContext);

  const [customerData, setCustomerData] = useState<CustomerData>({
    customerName: "",
    mobileNumber: "",
  });

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: "auto" }}>
          <DisplayCategory categories={appContext?.categories || []} />
        </div>
        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: "auto" }}>
          <DisplayItems />
        </div>
      </div>
      <div className="right-column d-flex flex-column">
        <div className="customer-form-container" style={{ height: "15%" }}>
          <CustomerForm
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        </div>
        <hr className="my-3 text-light" />
        <div
          className="cart-items-container"
          style={{ height: "55%", overflowY: "auto" }}
        >
          <CartItems />
        </div>
        <div className="cart-summary-container" style={{ height: "30%" }}>
          <CartSummary
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
