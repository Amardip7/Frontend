import React from 'react';
import '../CSS/Acknowledgement.css';

const Acknowledgment = () => {
    return (
        <div className="order-ack-wrapper">
            
            <div className="content">
                <div className="ack-box">
                    <h3 className="ack-title">Order Acknowledgement</h3>
                    <p className="ack-message">You have successfully placed a square off order for the specified quantity.</p>
                </div>
            </div>
        </div>
    );
}

export default Acknowledgment;
