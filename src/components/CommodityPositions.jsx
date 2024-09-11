import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCommodityData } from "../services/CommodityService";
import "../CSS/PositionsTable.css";

const CommodityPositions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [checkedContracts, setCheckedContracts] = useState({});
  const [error, setError] = useState(null);

  const uccId = sessionStorage.getItem("uccId");
  console.log("UCC ID from session:", uccId);

  useEffect(() => {
    const fetchData = async () => {
      if (uccId) {
        try {
          const response = await fetchCommodityData(uccId);
          console.log("Fetched Data:", response); // Log data to verify structure
          setData(response.commodity_positions || []); // Update the data state with the correct data
          initializeExpandedGroups(response.commodity_positions || []);
        } catch (err) {
          setError("Failed to fetch commodity data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [uccId]);

  const initializeExpandedGroups = (data) => {
    const initialExpandedGroups = {};
    const initialCheckedContracts = {};
    data.forEach((position) => {
      const groupName = position.ccp_undrlyng;
      if (!initialExpandedGroups[groupName]) {
        initialExpandedGroups[groupName] = true; // Expand by default
      }
      initialCheckedContracts[position.ccp_contract] = true; // Checkboxes selected by default
    });
    setExpandedGroups(initialExpandedGroups);
    setCheckedContracts(initialCheckedContracts);
  };

  const toggleGroupExpansion = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const handleCheckboxChange = (contract) => {
    setCheckedContracts((prev) => ({
      ...prev,
      [contract]: !prev[contract],
    }));
  };

  const handleSquareOff = (position) => {
    const squareOffData = {
      contracts: [position], // Pass the entire position object directly
    };
    navigate("/squareoff", { state: { squareOffData } });
  };

  const handleSquareOffAll = (groupName, groupedData) => {
    const contractsToSquareOff = Object.keys(checkedContracts).filter(
      (contract) => checkedContracts[contract] && contract.includes(groupName)
    );

    const contractsDetails = contractsToSquareOff.map((contract) => {
      const contractDetails = groupedData[groupName].contracts.find(
        (c) => c.ccp_contract === contract
      );
      return contractDetails; // Pass the entire contractDetails object
    });

    const squareOffData = {
      contracts: contractsDetails,
    };

    navigate("/squareoff", { state: { squareOffData } });
  };

  const groupDataByGroupName = () => {
    const groupedData = {};
    data.forEach((position) => {
      const groupName = position.ccp_undrlyng;
      if (!groupedData[groupName]) {
        groupedData[groupName] = {
          contracts: [],
          totalQty: 0,
        };
      }
      groupedData[groupName].contracts.push(position);
      groupedData[groupName].totalQty += position.ccp_opnpstn_qty;
    });
    return groupedData;
  };

  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!data.length) return <p>No data found</p>;

    const groupedData = groupDataByGroupName();

    return (
      <div className="positions-table">
        <div className="inner-box">
          {Object.keys(groupedData).map((groupName, groupIndex) => (
            <div key={groupIndex} className="group-section">
              <div
                className="group-header"
                onClick={() => toggleGroupExpansion(groupName)}
              >
                <button className="circular-btn">
                  {expandedGroups[groupName] ? "-" : "+"}
                </button>
                <span style={{ marginLeft: "10px" }}>{groupName}</span>
              </div>
              {expandedGroups[groupName] && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Contract</th>
                      <th>Position</th>
                      <th>Lots / Quantity Unit</th>
                      <th>Average Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[groupName].contracts.map(
                      (position, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                checkedContracts[position.ccp_contract] ||
                                false
                              }
                              onChange={() =>
                                handleCheckboxChange(position.ccp_contract)
                              }
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {position.ccp_undrlyng}
                            </span>
                          </td>
                          <td>{position.ccp_opnpstn_flw}</td>
                          <td>{position.ccp_opnpstn_qty}</td>
                          <td>
                            {position.ccp_avg_prc
                              ? position.ccp_avg_prc.toFixed(2)
                              : "0"}
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm mr-1"
                              onClick={() => handleSquareOff(position)}
                            >
                              Square Off
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
              <table
                className="table table-striped"
                style={{ marginBottom: "0" }}
              >
                <tbody>
                  <tr className="font-weight-bold">
                    <td>Group Total</td>
                    <td></td>
                    <td>{groupedData[groupName].totalQty || "0"}</td>
                    <td></td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm mr-1"
                        onClick={() =>
                          handleSquareOffAll(groupName, groupedData)
                        }
                      >
                        Square Off All
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div>{renderTable()}</div>;
};

export default CommodityPositions;
