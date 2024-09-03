import React, { useState } from 'react';
import '../CSS/PositionsTable.css';

const Equity = () => {
  const [expandedGroups, setExpandedGroups] = useState({
    BSESEN: true,
    CNXBAN: true,
    NIFTY: true,
  });

  const [checkedContracts, setCheckedContracts] = useState({
    "FUT-BSESEN-26-JUL-2024": true,
    "FUT-BSESEN-30-AUG-2024": true,
    "BSESEN-26-JUL-2024-78000-PE": true,
    "FUT-CNXBAN-31-JUL-2024": true,
    "FUT-NIFTY-25-JUL-2024": true,
    "FUT-NIFTY-29-AUG-2024": true,
  });

  const data = [
    {
      group: "BSESEN",
      groupTotalPL: 3022008.0,
      contracts: [
        {
          contract: "FUT-BSESEN-26-JUL-2024",
          position: "Buy",
          qty: 10,
          avgCostPrice: 1112.0,
          spotPrice: 80250.0,
          LTP: 80250.0,
          triggerPrice: "NA",
          pl: 791380.0,
        },
        {
          contract: "FUT-BSESEN-30-AUG-2024",
          position: "Buy",
          qty: 30,
          avgCostPrice: 5513.33,
          spotPrice: 80200.0,
          LTP: 80200.0,
          triggerPrice: "NA",
          pl: 2240600.0,
        },
        {
          contract: "BSESEN-26-JUL-2024-78000-PE",
          position: "Buy",
          qty: 10,
          avgCostPrice: 1234.0,
          spotPrice: 81343.46,
          LTP: 236.8,
          triggerPrice: "NA",
          pl: -9972.0,
        },
      ],
    },
    {
      group: "CNXBAN",
      groupTotalPL: 745305.0,
      contracts: [
        {
          contract: "FUT-CNXBAN-31-JUL-2024",
          position: "Buy",
          qty: 15,
          avgCostPrice: 1231.0,
          spotPrice: 50896.3,
          LTP: 50918.0,
          triggerPrice: "1048.70",
          pl: 745305.0,
        },
      ],
    },
    {
      group: "NIFTY",
      groupTotalPL: 1159930.0,
      contracts: [
        {
          contract: "FUT-NIFTY-25-JUL-2024",
          position: "Buy",
          qty: 25,
          avgCostPrice: 1234.0,
          spotPrice: 24413.95,
          LTP: 24408.0,
          triggerPrice: "NA",
          pl: 579350.0,
        },
        {
          contract: "FUT-NIFTY-29-AUG-2024",
          position: "Buy",
          qty: 25,
          avgCostPrice: 1234.0,
          spotPrice: 24413.95,
          LTP: 24457.2,
          triggerPrice: "NA",
          pl: 580580.0,
        },
      ],
    },
  ];

  // Function to calculate the total quantity for a group
  const calculateTotalQty = (contracts) => {
    return contracts.reduce((total, contract) => total + contract.qty, 0);
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

  return (
    <div className="positions-table">
      {data.map((group, groupIndex) => (
        <div key={groupIndex} className="group-section">
          <div className="group-header" onClick={() => toggleGroupExpansion(group.group)}>
            <button className="circular-btn">
              {expandedGroups[group.group] ? '-' : '+'}
            </button>
            <span style={{ marginLeft: '10px' }}>{group.group}</span>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Expiry Date</th>
                <th>Open Qty</th>
                {/* <th>Avg. Cost Price</th>
                <th>Spot Price</th>
                <th>LTP</th>
                <th>Trigger Price</th>
                <th>P&L</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expandedGroups[group.group] &&
                group.contracts.map((contract, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedContracts[contract.contract]}
                        onChange={() => handleCheckboxChange(contract.contract)}
                      />
                      <span style={{ marginLeft: '5px' }}>{contract.contract}</span>
                    </td>
                    <td>{contract.position}</td>
                    <td>{contract.qty}</td>
                    {/* <td>{contract.avgCostPrice.toFixed(2)}</td>
                    <td>{contract.spotPrice.toFixed(2)}</td>
                    <td>{contract.LTP.toFixed(2)}</td>
                    <td>{contract.triggerPrice}</td>
                    <td className={contract.pl >= 0 ? "text-success" : "text-danger"}>
                      {contract.pl.toFixed(2)}
                    </td> */}
                    <td>
                      <button className="btn btn-outline-primary btn-sm mr-1">Square Off</button>
                      {/* <button className="btn btn-outline-secondary btn-sm">Square Off at Market</button> */}
                    </td>
                  </tr>
                ))}
              <tr className="font-weight-bold">
                <td>Group Total</td>
                <td></td>
                <td>{calculateTotalQty(group.contracts)}</td>
                {/* <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className={group.groupTotalPL >= 0 ? "text-success" : "text-danger"}>
                  {group.groupTotalPL.toFixed(2)}
                </td> */}
                 <td>
  <button className="btn btn-outline-danger btn-sm mr-1 custom-btn-color">
    Square Off All
  </button>
</td>

              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Equity;
