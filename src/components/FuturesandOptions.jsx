import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFOData } from '../services/F&OService';
import '../CSS/PositionsTable.css';

const FuturesandOptions = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { uccId } = location.state || {}; // Get the UCC ID from navigation state

  useEffect(() => {
    const fetchData = async () => {
      if (uccId) {
        try {
          const response = await fetchFOData(uccId);
          setData(response);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [uccId]);

  const handleSquareOff = (contract) => {
    // Logic to handle square off
    console.log('Square off for contract:', contract);
  };

  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (!data || !data.ffo_contract) return <p>No data found</p>;

    return (
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Position</th>
            <th>Quantity</th>
            <th>Average Price</th>
            <th>Action</th> {/* New column for action */}
          </tr>
        </thead>
        <tbody>
          {data.ffo_contract.map((contract, index) => (
            <tr key={index}>
              <td>{contract}</td>
              <td>{data.ffo_pstn[index]}</td>
              <td>{data.ffo_qty[index]}</td>
              <td>{data.ffo_avg_prc[index]}</td>
              <td>
                <button onClick={() => handleSquareOff(contract)}>Square Off</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTable()}
    </div>
  );
};

export default FuturesandOptions;