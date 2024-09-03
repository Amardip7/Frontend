// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../CSS/OrderVerification.css';

// const OrderVerification = () => {
//   const location = useLocation();
//   const { squareOffData } = location.state || {};

//   return (
//     <div className="order-verification-container">
//       <h2 className="order-title">Order Verification</h2>
//       <div className="order-details">
//         {squareOffData && squareOffData.contracts.length > 0 ? (
//           squareOffData.contracts.map((contractData, index) => (
//             <div key={index} className="order-section">
//               <div className="order-column">
//                 <div className="order-field">
//                   <span>Action : </span>
//                   <strong>{contractData.action}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Product : </span>
//                   <strong>{contractData.productType}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Square Off Quantity : </span>
//                   <strong>{squareOffData.totalQty}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Contract Expiry Date : </span>
//                   <strong>{contractData.expiryDate}</strong>
//                 </div>
//               </div>
//               <div className="order-column">
//                 <div className="order-field">
//                   <span>Exchange : </span>
//                   <strong>{contractData.exchangeCode}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Contract : </span>
//                   <strong>{contractData.contract}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Order Type : </span>
//                   <strong>{contractData.orderType || 'Market'}</strong>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No data available for verification</p>
//         )}
//       </div>

//       <div className="order-buttons">
//         <button className="back-btn">Back</button>
//         <button className="proceed-btn">Proceed</button>
//       </div>
//     </div>
//   );
// };

// export default OrderVerification;
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../CSS/OrderVerification.css';
// import { postFNOData } from '../services/F&OService';

// const OrderVerification = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { squareOffData } = location.state || {};

//   // Log the entire squareOffData object to verify its structure
//   console.log('squareOffData received:', squareOffData);

//   // Retrieve uccId from sessionStorage or from the first contract in squareOffData
//   const uccId = sessionStorage.getItem('uccId') || (squareOffData && squareOffData.contracts[0]?.FCP_CLM_MTCH_ACCNT);
//   console.log('UCC ID for square-off:', uccId);

//   const handleProceed = async () => {
//     if (squareOffData && squareOffData.contracts.length > 0) {
//       const firstContract = squareOffData.contracts[0];

//       // Correctly reference `productType` instead of `FCP_PRDCT_TYP`
//       const prodTyp = firstContract?.productType;
//       console.log('Product Type:', prodTyp);

//       if (!uccId || !prodTyp) {
//         console.error('Required data is missing for proceeding');
//         return;
//       }

//       try {
//         const data = {
//           contracts: squareOffData.contracts,
//         };

//         // Post the data with the necessary parameters
//         await postFNOData(data, uccId, prodTyp);
//         navigate('/nextPage'); // Redirect to the next page on success
//       } catch (error) {
//         console.error('Error during the proceed action:', error);
//       }
//     } else {
//       console.error('No data available for proceeding');
//     }
//   };

//   return (
//     <div className="order-verification-container">
//       <h2 className="order-title">Order Verification</h2>
//       <div className="order-details">
//         {squareOffData && squareOffData.contracts.length > 0 ? (
//           squareOffData.contracts.map((contractData, index) => (
//             <div key={index} className="order-section">
//               <div className="order-column">
//                 <div className="order-field">
//                   <span>Action: </span>
//                   <strong>{contractData.action}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Product: </span>
//                   <strong>{contractData.productType}</strong> {/* Updated field reference */}
//                 </div>
//                 <div className="order-field">
//                   <span>Square Off Quantity: </span>
//                   <strong>{squareOffData.totalQty}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Contract Expiry Date: </span>
//                   <strong>{contractData.expiryDate}</strong>
//                 </div>
//               </div>
//               <div className="order-column">
//                 <div className="order-field">
//                   <span>Exchange: </span>
//                   <strong>{contractData.exchangeCode}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Contract: </span>
//                   <strong>{contractData.contract}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Order Type: </span>
//                   <strong>{contractData.orderType || 'Market'}</strong>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No data available for verification</p>
//         )}
//       </div>

//       <div className="order-buttons">
//         <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
//         <button className="proceed-btn" onClick={handleProceed}>Proceed</button>
//       </div>
//     </div>
//   );
// };

// export default OrderVerification;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/OrderVerification.css';
import { postFNOData } from '../services/F&OService';

const OrderVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { squareOffData } = location.state || {};

  // Log the entire squareOffData object to verify its structure
  console.log('squareOffData received:', squareOffData);

  // Retrieve uccId from sessionStorage or from the first contract in squareOffData
  const uccId = sessionStorage.getItem('uccId') || (squareOffData && squareOffData.contracts[0]?.FCP_CLM_MTCH_ACCNT);
  console.log('UCC ID for square-off:', uccId);

  const handleProceed = async () => {
    if (squareOffData && squareOffData.contracts.length > 0) {
      const firstContract = squareOffData.contracts[0];

      // Correctly reference `productType` instead of `FCP_PRDCT_TYP`
      const prodTyp = firstContract?.productType;
      console.log('Product Type:', prodTyp);
      console.log('ID : ', uccId);

      if (!uccId || !prodTyp) {
        console.error('Required data is missing for proceeding');
        return;
      }

      try {
        // Use the full contract details to create the payload for posting
        const data = {
          contracts: squareOffData.contracts.map(contract => contract.fullContractDetails),
        };
          console.log(data);
        // Post the data with the necessary parameters
        await postFNOData(data, uccId, prodTyp);
        navigate('/acknowledgement'); // Redirect to the next page on success
      } catch (error) {
        console.error('Error during the proceed action:', error);
      }
    } else {
      console.error('No data available for proceeding');
    }
  };

  return (
    <div className="order-verification-container">
      <h2 className="order-title">Order Verification</h2>
      <div className="order-details">
        {squareOffData && squareOffData.contracts.length > 0 ? (
          squareOffData.contracts.map((contractData, index) => (
            <div key={index} className="order-section">
              <div className="order-column">
                <div className="order-field">
                  <span>Action: </span>
                  <strong>{contractData.action}</strong>
                </div>
                <div className="order-field">
                  <span>Product: </span>
                  <strong>{contractData.productType}</strong>
                </div>
                <div className="order-field">
                  <span>Square Off Quantity: </span>
                  <strong>{squareOffData.totalQty}</strong>
                </div>
                <div className="order-field">
                  <span>Contract Expiry Date: </span>
                  <strong>{contractData.expiryDate}</strong>
                </div>
              </div>
              <div className="order-column">
                <div className="order-field">
                  <span>Exchange: </span>
                  <strong>{contractData.exchangeCode}</strong>
                </div>
                <div className="order-field">
                  <span>Contract: </span>
                  <strong>{contractData.contract}</strong>
                </div>
                <div className="order-field">
                  <span>Order Type: </span>
                  <strong>{contractData.orderType || 'Market'}</strong>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available for verification</p>
        )}
      </div>

      <div className="order-buttons">
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        <button className="proceed-btn" onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default OrderVerification;
