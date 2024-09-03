import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/OrderVerification.css";

const OrderVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state || {};

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleProceed = () => {
    // Logic to proceed with the order
    console.log("Proceeding with order:", orderDetails);
  };

  return (
    <div className="order-verification-container">
      <h2>Order Verification</h2>
      <div className="order-details">
        <div className="order-row">
          <div className="order-column">
            <p><strong>Action</strong></p>
            <p className="text-bold">{orderDetails.action || "Sell"}</p>
          </div>
          <div className="order-column">
            <p><strong>Exchange</strong></p>
            <p>{orderDetails.exchange || "NSE"}</p>
          </div>
        </div>
        <div className="order-row">
          <div className="order-column">
            <p>Product</p>
            <p>{orderDetails.product || "Option"}</p>
          </div>
          <div className="order-column">
            <p>Contract</p>
            <p>{orderDetails.contract || "OPT-NIFTY-14-AUG-2024-2300-CE"}</p>
          </div>
        </div>
        <div className="order-row">
          <div className="order-column">
            <p>Square Off Quantity</p>
            <p>{orderDetails.quantity || 25}</p>
          </div>
          <div className="order-column">
            <p>Order Type</p>
            <p>{orderDetails.orderType || "Market"}</p>
          </div>
        </div>
        <div className="order-row">
          <div className="order-column">
            <p>Last Traded Price</p>
            <p>{orderDetails.lastTradedPrice || 138.95}</p>
          </div>
          <div className="order-column">
            <p>Estimated Order Value</p>
            <p>{orderDetails.estimatedOrderValue || 621250.00}</p>
          </div>
        </div>
        <div className="order-row">
          <div className="order-column">
            <p>Contract Expiry Date</p>
            <p>{orderDetails.contractExpiry || "29-Aug-2024"}</p>
          </div>
          <div className="order-column">
            <p>Order Validity</p>
            <p>{orderDetails.orderValidity || "23-Aug-2024"}</p>
          </div>
        </div>
      </div>
      <div className="order-actions">
        <button className="back-btn" onClick={handleBack}>Back</button>
        <button className="proceed-btn" onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default OrderVerification;
