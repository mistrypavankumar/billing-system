import React from "react";


interface CustomerFormProps {
  customerData: CustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customerData,
  setCustomerData,
}) => {
  return (
    <div className="p-3">
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="form-label col-4">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="customerName"
            placeholder="Enter customer name"
            value={customerData.customerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomerData({
                ...customerData,
                customerName: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="mobileNumber" className="form-label col-4">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="mobileNumber"
            placeholder="Enter customer mobile number"
            value={customerData.mobileNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomerData({
                ...customerData,
                mobileNumber: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
