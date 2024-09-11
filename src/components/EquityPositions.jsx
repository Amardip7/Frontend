import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEquityData } from "../services/EquityService";
import "../CSS/PositionsTable.css";

const EquityPositions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedContracts, setCheckedContracts] = useState({});

  const uccId = sessionStorage.getItem("uccId");
  console.log("UCC ID from session:", uccId);

  // Fetch Equity Data based on uccId from session
  useEffect(() => {
    const fetchData = async () => {
      if (uccId) {
        try {
          const response = await fetchEquityData(uccId);
          const equityData = response["Equity_MTF_positions "]; // Access with trailing space
          console.log("Fetched data:", equityData);
          setData(equityData);
          initializeCheckedContracts(equityData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [uccId]);

  // Initialize checked contracts
  const initializeCheckedContracts = (data) => {
    const initialCheckedContracts = {};
    if (data) {
      data.forEach((item) => {
        initialCheckedContracts[item.epb_stck_cd] = true; // Checkboxes selected by default
      });
    }
    setCheckedContracts(initialCheckedContracts);
  };

  // Handle checkbox change
  const handleCheckboxChange = (contract) => {
    setCheckedContracts((prev) => ({
      ...prev,
      [contract]: !prev[contract],
    }));
  };

  // Handle square off button click for a single contract
  const handleSquareOff = (contract) => {
    console.log("Square off contract:", contract);
    navigate("/squareoff", { state: { contract } });
  };

  // Handle square off for all checked contracts
  const handleSquareOffAll = () => {
    const contractsToSquareOff = Object.keys(checkedContracts).filter(
      (contract) => checkedContracts[contract]
    );
    const contractsDetails = contractsToSquareOff.map((contract) => {
      const contractDetails = data.find((c) => c.epb_stck_cd === contract);
      return {
        contract,
        qty: contractDetails.epb_orgnl_pstn_qty,
        productType: contractDetails.epb_prdct_typ,
        expiryDate: contractDetails.epb_expiry_dt,
        exchangeCode: contractDetails.epb_xchng_cd,
        orderType: "Market",
        fullContractDetails: contractDetails, // Full contract details
      };
    });
    navigate("/squareoff", { state: { squareOffData: { contracts: contractsDetails } } });
  };

// Format the expiry date to show only the date part (YYYY-MM-DD)
const formatExpiryDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Return only the 'YYYY-MM-DD' part
};

  // Render the table
  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (!data || data.length === 0) return <p>No data found</p>;

    return (
      <div className="positions-table">
        <div className="inner-box">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Expiry Date</th>
                <th>Open Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((contractData, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedContracts[contractData.epb_stck_cd] || false}
                      onChange={() => handleCheckboxChange(contractData.epb_stck_cd)}
                    />
                    <span style={{ marginLeft: "5px" }}>
                      {contractData.epb_stck_cd}
                    </span>
                  </td>
                  <td>{formatExpiryDate(contractData.epb_expiry_dt)}</td>
                  <td>{contractData.epb_orgnl_pstn_qty}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleSquareOff(contractData)}
                    >
                      Square Off
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table table-striped" style={{ marginBottom: "0" }}>
            <tbody>
              <tr className="font-weight-bold">
                <td>Group Total</td>
                <td></td>
                <td>
                  {data.reduce((total, item) => total + item.epb_orgnl_pstn_qty, 0)}
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleSquareOffAll}
                  >
                    Square Off All
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return renderTable();
};

export default EquityPositions;