import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap";
import SquareOff from "./SquareOff";
import OrderVerification from "./OrderVerification";
import '../CSS/FOOrders.css'; // Make sure this points to the correct CSS file

const FOOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [currentStep, setCurrentStep] = useState("commodity");

  useEffect(() => {
    axios.get('http://localhost:8080/getOrderDetails/8181818104')
      .then(response => {
        const orderDetails = response.data?.orderDetails?.OrdDetails;
        if (Array.isArray(orderDetails)) {
          setOrderData(orderDetails);
        } else {
          setOrderData([]);
        }
      })
      .catch(error => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const handleSquareOffClick = (stock) => {
    setSelectedStock(stock);
    setCurrentStep("squareOff");
  };

  const handleBackToCommodity = () => {
    setCurrentStep("commodity");
    setSelectedStock(null);
  };

  const handleProceedToOrderVerification = () => {
    setCurrentStep("orderVerification");
  };

  const handleOrderBack = () => {
    setCurrentStep("squareOff");
  };

  return (
    <div className="positions-table"> {/* Outer container styled like F&O positions */}
      {currentStep === "commodity" && (
        <div className="inner-box"> {/* Inner box styled like F&O positions */}
          <h2>Orders</h2>
          <Table className="table">
            <thead>
              <tr>
                <th>Contract Descriptor</th>
                <th>Date/VTC Date</th>
                <th>Buy/Sell</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orderData) && orderData.length > 0 ? (
                orderData.map((order, index) => (
                  <tr key={index} onClick={() => handleSquareOffClick(order)}>
                    <td>{order.ContractDescriptor}</td>
                    <td>{new Date(order.VTCDate).toLocaleDateString()}</td>
                    <td>{order.BuySell === 'B' ? 'Buy' : 'Sell'}</td>
                    <td>{order.Quantity}</td>
                    <td>{order.Status === 'Q' ? 'Queued' : order.Status}</td>

                    <td>{order.Open}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No orders available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {currentStep === "squareOff" && selectedStock && (
        <SquareOff
          show={true}
          handleClose={handleBackToCommodity}
          stock={selectedStock}
          handleProceed={handleProceedToOrderVerification}
        />
      )}

      {currentStep === "orderVerification" && selectedStock && (
        <OrderVerification
          stock={selectedStock}
          handleBack={handleOrderBack}
          handleProceed={handleBackToCommodity}
        />
      )}
    </div>
  );
};

export default FOOrders;
