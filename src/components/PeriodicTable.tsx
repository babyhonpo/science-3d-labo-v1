import React from "react";
import Element from "./Elements";
import { periodicTableData } from "./periodic_table/data/elementData";
import "./periodic_table/styles/preriodic_table.css"; // CSS適用

const PeriodicTable: React.FC = () => {
  return (
    <div className="periodic-table-container">
      <div className="grid">
        {periodicTableData.map((element, index) => (
          <Element key={index} {...element} />
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
