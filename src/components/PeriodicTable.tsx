import React, { useState } from "react";
import ElementBox from "./ElementBox";
import { periodicTableData } from "./periodic_table/data/elementData";
import "./periodic_table/styles/preriodic_table.css"; // CSS適用
import { ObjectType } from "../types/types";

interface PeriodicTableProps {
  onAddItem: (obj: ObjectType) => void; // onAddItem 関数を props として受け取る
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onAddItem }) => {
  const [, setSelectedValue] = useState<ObjectType | null>(null);

  const handleClick = (obj: ObjectType) => {
    setSelectedValue(obj); // 選択された要素を状態にセット
    onAddItem(obj); // 選択された要素を onAddItem に渡す
  };

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
          <div key={index} onClick={() => handleClick(element)}>
            <ElementBox {...element} />
          </div>
        ))}
      </div>

      {/* ランタノイドとアクチノイド（2行配置） */}
      <div className="lanthanide-actinide-container">
        <div className="row lanthanides">
          {lanthanides.map((element, index) => (
            <div key={index} onClick={() => handleClick(element)}>
              <ElementBox {...element} />
            </div>
          ))}
        </div>
        <div className="row actinides">
          {actinides.map((element, index) => (
            <div key={index} onClick={() => handleClick(element)}>
              <ElementBox {...element} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
