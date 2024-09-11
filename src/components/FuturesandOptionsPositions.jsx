import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFOData } from "../services/F&OService";
import "../CSS/PositionsTable.css";

const FuturesandOptions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [checkedContracts, setCheckedContracts] = useState({});

  const uccId = sessionStorage.getItem('uccId');
  console.log('UCC ID from session:', uccId);

  useEffect(() => {
    const fetchData = async () => {
      if (uccId) {
        try {
          const response = await fetchFOData(uccId);
          console.log("Fetched Data:", response); // Log data to verify structure
          setData(response);
          initializeExpandedGroups(response);
        } catch (error) {
          console.error(error);
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
    if (data.positions && data.positions.FcpDetails) {
      data.positions.FcpDetails.forEach((contract) => {
        const groupName = contract.FFO_CONTRACT.split("-")[1];
        if (!initialExpandedGroups[groupName]) {
          initialExpandedGroups[groupName] = true; // Expand by default
        }
        initialCheckedContracts[contract.FFO_CONTRACT] = true; // Checkboxes selected by default
      });
    }
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

  const handleSquareOff = (contractDetails) => {
    const squareOffData = {
      contracts: [{
        contractDetails
      }],
    };
    navigate('/squareoff', { state: { squareOffData } });
  };

  // const handleSquareOffAll = (groupName, groupedData) => {
  //   const contractsToSquareOff = Object.keys(checkedContracts).filter(
  //     (contract) => checkedContracts[contract] && contract.includes(groupName)
  //   );
  //   const contractsDetails = contractsToSquareOff.map((contract) => {
  //     const contractDetails = groupedData[groupName].contracts.find(c => c.contract === contract);
  //     return {
  //       contract,
  //       qty: contractDetails.qty,
  //       productType: contractDetails.productType,
  //       expiryDate: contractDetails.expiryDate,
  //       exchangeCode: contractDetails.exchangeCode,
  //       orderType: "Market",
  //       fullContractDetails: contractDetails.fullContractDetails
  //     };
  //   });
  //   navigate('/squareoff', { state: { squareOffData: { contracts: contractsDetails } } });
  // };
  const handleSquareOffAll = (groupName, groupedData) => {
    const contractsToSquareOff = Object.keys(checkedContracts).filter(
      (contract) => checkedContracts[contract] && contract.includes(groupName)
    );
    
    const contractsDetails = contractsToSquareOff.map((contract) => {
      return groupedData[groupName].contracts.find(c => c.FFO_CONTRACT === contract); // Use the whole contract object
    });
  
    navigate('/squareoff', { state: { squareOffData: { contracts: contractsDetails } } });
  };
  
  // const groupDataByGroupName = () => {
  //   const groupedData = {};
  //   if (data && data.positions && data.positions.FcpDetails) {
  //     data.positions.FcpDetails.forEach((contract) => {
  //       const groupName = contract.FFO_CONTRACT.split("-")[1];
  //       if (!groupedData[groupName]) {
  //         groupedData[groupName] = {
  //           contracts: [],
  //           totalQty: 0,
  //         };
  //       }
  //       groupedData[groupName].contracts.push({
  //         contract: contract.FFO_CONTRACT,
  //         position: contract.FFO_PSTN,
  //         qty: contract.FFO_QTY,
  //         avgCostPrice: 0, // Assuming average cost price is not available in the API response
  //         productType: contract.FCP_PRDCT_TYP,
  //         expiryDate: contract.FCP_EXPRY_DT,
  //         exchangeCode: contract.FCP_XCHNG_CD,
  //         fullContractDetails: contract // Store the full contract details
  //       });
  //       groupedData[groupName].totalQty += contract.FFO_QTY;
  //     });
  //   }
  //   return groupedData;
  // };
  const groupDataByGroupName = () => {
    const groupedData = {};
    if (data && data.positions && data.positions.FcpDetails) {
      console.log('Data for grouping:', data.positions.FcpDetails);
      data.positions.FcpDetails.forEach((contract) => {
        const groupName = contract.FFO_CONTRACT.split("-")[1];
        if (!groupedData[groupName]) {
          groupedData[groupName] = {
            contracts: [],
            totalQty: 0,
          };
        }
        // Push the whole contract object
        groupedData[groupName].contracts.push(contract);
        groupedData[groupName].totalQty += contract.FCP_OPNPSTN_QTY; // Assuming FFO_QTY exists on the contract object
      });
    }
    return groupedData;
  };
  

  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (!data || !data.positions || !data.positions.FcpDetails) return <p>No data found</p>;

    const groupedData = groupDataByGroupName();
    console.log('Grouped Data is:', groupedData);

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
                      <th>Quantity</th>
                      <th>Average Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[groupName].contracts.map((contractData, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={checkedContracts[contractData.FFO_CONTRACT] || false}
                            onChange={() => handleCheckboxChange(contractData.FFO_CONTRACT)}
                          />
                          <span style={{ marginLeft: "5px" }}>{contractData.FFO_CONTRACT}</span>
                        </td>
                        <td>{contractData.FFO_PSTN || "0"}</td>
                        <td>{contractData.FCP_OPNPSTN_QTY || "0"}</td>
                        <td>{!isNaN(contractData.avgCostPrice) ? contractData.avgCostPrice.toFixed(2) : "0"}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm mr-1"
                            onClick={() =>
                              handleSquareOff(
                                contractData
                              )
                            }
                          >
                            Square Off
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <table className="table table-striped" style={{ marginBottom: "0" }}>
                <tbody>
                  <tr className="font-weight-bold">
                    <td>Group Total</td>
                    <td></td>
                    <td>{groupedData[groupName].totalQty || "0"}</td>
                    <td></td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm mr-1"
                        onClick={() => handleSquareOffAll(groupName, groupedData)}
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

export default FuturesandOptions;