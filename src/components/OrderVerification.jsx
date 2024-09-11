import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/OrderVerification.css';
import { postFNOData } from '../services/F&OService';

const OrderVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { squareOffData } = location.state || {};

  // Log the entire squareOffData object to verify its structure
  console.log('squareOffData received from square off button:', squareOffData);

  // Ensure squareOffData and FcpDetails are defined before accessing
  const uccId = sessionStorage.getItem('uccId') || (squareOffData?.FcpDetails?.[0]?.FCP_CLM_MTCH_ACCNT);
  console.log('UCC ID for square-off:', uccId);

  // const handleProceed = async () => {
  //   if (squareOffData && squareOffData.FcpDetails.length > 0) {
  //     const firstContract = squareOffData.FcpDetails[0];

  //     // Correctly reference `productType` or `FCP_PRDCT_TYP`
  //     const prodTyp = firstContract?.FCP_PRDCT_TYP;
  //     console.log('Product Type:', prodTyp);
  //     console.log('ID : ', uccId);

  //     if (!uccId || !prodTyp) {
  //       console.error('Required data is missing for proceeding');
  //       return;
  //     }

  //     try {
  //       // Directly use the `FcpDetails` array from `squareOffData`
  //       const dataToSend = {
  //         FcpDetails: squareOffData.FcpDetails
  //       };

  //       console.log('Data being sent to backend:', dataToSend);

  //       // Post the data with the necessary parameters
  //       await postFNOData(dataToSend, uccId, prodTyp);
  //       navigate('/acknowledgement'); // Redirect to the next page on success
  //     } catch (error) {
  //       console.error('Error during the proceed action:', error);
  //     }
  //   } else {
  //     console.error('No data available for proceeding');
  //   }
  // };

  const handleProceed = async () => {
    if (squareOffData && squareOffData.FcpDetails.length > 0) {
      const firstContract = squareOffData.FcpDetails[0];
  
      // Correctly reference `productType` or `FCP_PRDCT_TYP`
      const prodTyp = firstContract?.FCP_PRDCT_TYP;
      console.log('Product Type:', prodTyp);
      console.log('ID : ', uccId);
  
      if (!uccId || !prodTyp) {
        console.error('Required data is missing for proceeding');
        return;
      }
  
      try {
        // Map the `FcpDetails` array to match the required structure
        const formattedData = {
          FcpDetails: squareOffData.FcpDetails.map(contract => ({
            FCP_CLM_MTCH_ACCNT: contract.FCP_CLM_MTCH_ACCNT, // Default value or use the actual value
            FCP_XCHNG_CD: contract.FCP_XCHNG_CD, // Default value or use the actual value
            FCP_PRDCT_TYP: contract.FCP_PRDCT_TYP, // Default value or use the actual value
            FCP_INDSTK: contract.FCP_INDSTK, // Default value or use the actual value
            FCP_UNDRLYNG: contract.FCP_UNDRLYNG, // Default value or use the actual value
            FCP_EXPRY_DT: contract.FCP_EXPRY_DT, // Default value or use the actual value
            FCP_EXER_TYP: contract.FCP_EXER_TYP, // Default value or use the actual value
            FCP_STRK_PRC: contract.FCP_STRK_PRC, // Default value or use the actual value
            FCP_OPT_TYP: contract.FCP_OPT_TYP, // Default value or use the actual value
            FCP_IBUY_QTY: contract.FCP_IBUY_QTY, // Default value or use the actual value
            FCP_UCC_CD: uccId, // Use the uccId here
            FCP_OPNPSTN_FLW: contract.FCP_OPNPSTN_FLW, // Default value or use the actual value
            FCP_OPNPSTN_QTY: contract.FCP_OPNPSTN_QTY// Default value or use the actual value
          }))
        };
  
        console.log('Data being sent to backend:', formattedData);
  
        // Post the data with the necessary parameters
        await postFNOData(formattedData, uccId, prodTyp);
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
        {squareOffData && squareOffData.FcpDetails && squareOffData.FcpDetails.length > 0 ? (
          squareOffData.FcpDetails.map((contractData, index) => (
            <div key={index} className="order-section">
              <div className="order-column">
                <div className="order-field">
                  <span>Action: </span>
                  <strong>{contractData.FFO_PSTN}</strong>
                </div>
                <div className="order-field">
                  <span>Product: </span>
                  <strong>{contractData.FCP_PRDCT_TYP}</strong>
                </div>
                <div className="order-field">
                  <span>Square Off Quantity: </span>
                  <strong>{squareOffData.totalQty}</strong>
                </div>
                <div className="order-field">
                  <span>Contract Expiry Date: </span>
                  <strong>{contractData.FCP_EXPRY_DT}</strong>
                </div>
              </div>
              <div className="order-column">
                <div className="order-field">
                  <span>Exchange: </span>
                  <strong>{contractData.FCP_XCHNG_CD}</strong>
                </div>
                <div className="order-field">
                  <span>Contract: </span>
                  <strong>{contractData.FFO_CONTRACT}</strong>
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

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../CSS/OrderVerification.css';
// import { postFNOData } from '../services/F&OService';

// const OrderVerification = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { squareOffData } = location.state || {};

//   console.log('squareOffData received from square off button:', squareOffData);

//   const uccId = sessionStorage.getItem('uccId') || (squareOffData?.FcpDetails?.[0]?.FCP_CLM_MTCH_ACCNT);
//   console.log('UCC ID for square-off:', uccId);

//   const handleProceed = async () => {
//     if (squareOffData && squareOffData.FcpDetails.length > 0) {
//       const formattedFcpDetails = squareOffData.FcpDetails.map(contract => ({
//         FCP_CLM_MTCH_ACCNT: contract.FCP_CLM_MTCH_ACCNT,
//         FCP_XCHNG_CD: contract.FCP_XCHNG_CD,
//         FCP_PRDCT_TYP: contract.FCP_PRDCT_TYP,
//         FCP_INDSTK: contract.FCP_INDSTK,
//         FCP_UNDRLYNG: contract.FCP_UNDRLYNG,
//         FCP_EXPRY_DT: contract.FCP_EXPRY_DT,
//         FCP_EXER_TYP: contract.FCP_EXER_TYP,
//         FCP_STRK_PRC: contract.FCP_STRK_PRC,
//         FCP_OPT_TYP: contract.FCP_OPT_TYP,
//         FCP_IBUY_QTY: contract.FCP_IBUY_QTY, // Using FFO_QTY for the quantity
//         FCP_OPNPSTN_FLW: contract.FCP_OPNPSTN_FLW,
//         FCP_UCC_CD: contract.FCP_UCC_CD
//       }));

//       const prodTyp = squareOffData.FcpDetails[0]?.FCP_PRDCT_TYP;
//       console.log('Product Type:', prodTyp);
//       console.log('ID : ', uccId);

//       if (!uccId || !prodTyp) {
//         console.error('Required data is missing for proceeding');
//         return;
//       }

//       try {
//         const dataToSend = {
//           FcpDetails: formattedFcpDetails,
//         };

//         console.log('Data being sent to backend:', dataToSend);

//         await postFNOData(dataToSend, uccId, prodTyp);
//         navigate('/acknowledgement');
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
//         {squareOffData && squareOffData.FcpDetails && squareOffData.FcpDetails.length > 0 ? (
//           squareOffData.FcpDetails.map((contractData, index) => (
//             <div key={index} className="order-section">
//               <div className="order-column">
//                 <div className="order-field">
//                   <span>Action: </span>
//                   <strong>{contractData.FFO_PSTN}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Product: </span>
//                   <strong>{contractData.FCP_PRDCT_TYP}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Square Off Quantity: </span>
//                   <strong>{squareOffData.totalQty}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Contract Expiry Date: </span>
//                   <strong>{contractData.FCP_EXPRY_DT}</strong>
//                 </div>
//               </div>
//               <div className="order-column">
//                 <div className="order-field">
//                   <span>Exchange: </span>
//                   <strong>{contractData.FCP_XCHNG_CD}</strong>
//                 </div>
//                 <div className="order-field">
//                   <span>Contract: </span>
//                   <strong>{contractData.FFO_CONTRACT}</strong>
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
