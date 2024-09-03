import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/SquareOff.css';

const SquareOff = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { squareOffData } = location.state || {};

    // Calculate total quantity from the passed data
    const totalQty = squareOffData ? squareOffData.contracts.reduce((acc, contract) => acc + Number(contract.qty), 0) : 0;

    const handleSquareOff = () => {
        // Redirect to OrderVerification page and pass data including the action from response directly
        navigate(`/squareoff/order/${sessionStorage.uccId}/${squareOffData.contracts[0].productType}`, {
            state: {
                squareOffData: {
                    contracts: squareOffData.contracts.map(contract => ({
                        ...contract,
                        action: contract.ffo_pstn,  // Directly use the action from FFO_PSTN
                    })),
                    totalQty: totalQty,
                }
            }
        });
    };

    return (
        <div className="square-off-container">
            <div className="square-off-header">
                <h3>SQUARE OFF</h3>
            </div>
            <div className="square-off-body">
                {squareOffData && squareOffData.contracts.length > 0 ? (
                    squareOffData.contracts.map((contractData, index) => (
                        <div key={index} className="square-off-row">
                            <div className="row-item">
                                <span className="label">Stock : </span>
                                <span className="value">{contractData.contract}</span>
                            </div>
                            <div className="row-item">
                                <span className="label">Position Quantity : </span>
                                <span className="value">{contractData.qty}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No contract data found</p>
                )}
                <div className="square-off-row">
                    <span className="label">Square Off Quantity : </span>
                    <input 
                        type="text" 
                        className="input-box" 
                        value={totalQty} 
                        readOnly  
                    />
                </div>
            </div>
            <div className="square-off-footer">
                <button className="square-off-button" onClick={handleSquareOff}>Square Off</button>
            </div>
        </div>
    );
};

export default SquareOff;