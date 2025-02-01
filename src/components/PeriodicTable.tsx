import React from "react";
import ElementBox from "./ElementBox";
import { periodicTableData } from "./periodic_table/data/elementData";
import "./periodic_table/styles/preriodic_table.css"; // CSS適用

const PeriodicTable: React.FC = () => {
  const lanthanides = periodicTableData.filter(
    (el) => el.atomicNumber >= 57 && el.atomicNumber <= 71
  );
  const actinides = periodicTableData.filter(
    (el) => el.atomicNumber >= 89 && el.atomicNumber <= 103
  );
  const mainElements = periodicTableData.filter(
    (el) =>
      el.atomicNumber < 57 ||
      (el.atomicNumber > 71 && el.atomicNumber < 89) ||
      el.atomicNumber > 103
  );

  return (
    <div className="periodic-table-container">
      {/* 上部の元素グリッド */}
      <div className="grid">
        {mainElements.map((element, index) => (
          <ElementBox key={index} {...element} />
        ))}
      </div>

      {/* ランタノイドとアクチノイド（2行配置） */}
      <div className="lanthanide-actinide-container">
        <div className="row lanthanides">
          {lanthanides.map((element, index) => (
            <ElementBox key={index} {...element} />
          ))}
        </div>
        <div className="row actinides">
          {actinides.map((element, index) => (
            <ElementBox key={index} {...element} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
