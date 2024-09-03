// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/Order.css';

// const Orders = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3003/api/stock-prices');
//         setData(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="order-table-container">
//       <h2>ORDERS :</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>CONTRACT DESCRIPTOR</th>
//             <th>
//               <div>DATE</div>
//               <div>VTC DATE</div>
//             </th>
//             <th>BUY/SELL</th>
//             <th>QTY</th>
//             <th>STATUS</th>
//             <th>LTP</th>
//             <th>ORDER PRICE</th>
//             <th>OPEN</th>
//             <th>ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((stock) => (
//             <tr key={stock.identifier}>
//               <td>{stock.meta.companyName}</td>
//               <td>
//                 <div>{stock.symbol}</div>
//                 <div>{stock.vtcDate}</div>
//               </td>
//               <td>{stock.lastPrice}</td>
//               <td>{stock.change}</td>
//               <td>{stock.dayHigh}</td> 
//               <td>{stock.dayLow}</td>
//               <td>{stock.yearHigh}</td>
//               <td>{stock.open}</td>
//               <td>{stock.action}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from "react-bootstrap";
import SquareOff from "./SquareOff";
import OrderVerification from "./OrderVerification";
import '../CSS/Order.css';

const Orders = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [currentStep, setCurrentStep] = useState("commodity");

  // Hardcoded stock data with realistic company names and details
  const hardcodedData = [
    {
      identifier: "AAPL",
      meta: { companyName: "Apple Inc." },
      symbol: "AAPL",
      lastPrice: 150.25,
      change: 2.15,
      dayHigh: 155.0,
      dayLow: 148.0,
      yearHigh: 200.0,
      yearLow: 100.0,
      lastUpdateTime: "2024-07-25T10:00:00",
      quantity: 100,
      avgCostPrice: 140.5,
      buyOrderQuantity: 60,
      sellOrderQuantity: 40,
      spotPrice: 149.0,
      triggerPrice: 152.0,
      pnl: 975.0
    },
    {
      identifier: "GOOGL",
      meta: { companyName: "Alphabet Inc." },
      symbol: "GOOGL",
      lastPrice: 250.75,
      change: -1.75,
      dayHigh: 260.0,
      dayLow: 245.0,
      yearHigh: 300.0,
      yearLow: 150.0,
      lastUpdateTime: "2024-07-25T10:05:00",
      quantity: 50,
      avgCostPrice: 245.0,
      buyOrderQuantity: 30,
      sellOrderQuantity: 20,
      spotPrice: 248.0,
      triggerPrice: 255.0,
      pnl: 287.5
    },
    {
      identifier: "MSFT",
      meta: { companyName: "Microsoft Corporation" },
      symbol: "MSFT",
      lastPrice: 320.45,
      change: 5.65,
      dayHigh: 325.0,
      dayLow: 310.0,
      yearHigh: 350.0,
      yearLow: 250.0,
      lastUpdateTime: "2024-07-25T10:10:00",
      quantity: 150,
      avgCostPrice: 300.0,
      buyOrderQuantity: 80,
      sellOrderQuantity: 70,
      spotPrice: 319.0,
      triggerPrice: 325.0,
      pnl: 3050.0
    },
    {
      identifier: "AMZN",
      meta: { companyName: "Amazon.com, Inc." },
      symbol: "AMZN",
      lastPrice: 135.35,
      change: 3.45,
      dayHigh: 140.0,
      dayLow: 130.0,
      yearHigh: 180.0,
      yearLow: 120.0,
      lastUpdateTime: "2024-07-25T10:15:00",
      quantity: 200,
      avgCostPrice: 128.0,
      buyOrderQuantity: 100,
      sellOrderQuantity: 100,
      spotPrice: 134.0,
      triggerPrice: 137.0,
      pnl: 1470.0
    },
    {
      identifier: "TSLA",
      meta: { companyName: "Tesla, Inc." },
      symbol: "TSLA",
      lastPrice: 900.55,
      change: -12.35,
      dayHigh: 915.0,
      dayLow: 880.0,
      yearHigh: 1200.0,
      yearLow: 650.0,
      lastUpdateTime: "2024-07-25T10:20:00",
      quantity: 75,
      avgCostPrice: 870.0,
      buyOrderQuantity: 50,
      sellOrderQuantity: 25,
      spotPrice: 898.0,
      triggerPrice: 905.0,
      pnl: 2253.75
    }
  ];

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
    <div>
      {currentStep === "commodity" && (
        <div>
          <h1>ORDERS :</h1>
          <Table striped bordered hover className='shady-table '>
            {/* <thead>
              <tr>
                <th>Contract</th>
                <th>Position</th>
                <th>Quantity</th>
                <th>Avg. Cost Price</th>
                <th>Buy Order Quantity</th>
                <th>Sell Order Quantity</th>
                <th>Spot Price</th>
                <th>LTP</th>
                <th>Trigger Price</th>
                <th>P&L</th>
                <th>Actions</th>
              </tr>
            </thead> */}
                    <thead>
                    <tr>
                    <th>CONTRACT DESCRIPTOR</th>
                    <th>
                    <div>DATE</div>
                    <div>VTC DATE</div>
                    </th>
                    <th>BUY/SELL</th>
                    <th>QTY</th>
                    <th>STATUS</th>
                    <th>LTP</th>
                    <th>ORDER PRICE</th>
                    <th>OPEN</th>
                    <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
              {hardcodedData.map((stock) => (
                <tr key={stock.identifier}>
                  <td>{stock.meta.companyName}</td>
                  <td>{stock.symbol}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.avgCostPrice.toFixed(2)}</td>
                  <td>{stock.buyOrderQuantity}</td>
                  <td>{stock.sellOrderQuantity}</td>
                  <td>{stock.spotPrice.toFixed(2)}</td>
                  <td>{stock.lastPrice.toFixed(2)}</td>
                  <td>{stock.triggerPrice.toFixed(2)}</td>
                  {/* <td>{stock.pnl.toFixed(2)}</td> */}
                  {/* <td>
                    <Button variant="danger" onClick={() => handleSquareOffClick(stock)}>
                      Square Off
                    </Button>
                  </td> */}
                </tr>
              ))}
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
          handleProceed={handleBackToCommodity} // Adjust this based on the final action
        />
      )}
    </div>
  );
};

export default Orders;