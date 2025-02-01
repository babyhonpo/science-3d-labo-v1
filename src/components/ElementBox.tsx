import React from "react";
import "./periodic_table/styles/element_box.css";

interface ElementProps {
  atomicNumber: number;
  symbol: string;
  name: string;
  category: string;
}

const ElementBox: React.FC<ElementProps> = ({
  atomicNumber,
  symbol,
  name,
  category,
}) => {
  return (
    <div className={`element ${category}`}>
      <span className="atomic-number">{atomicNumber}</span>
      <span className="symbol">{symbol}</span>
      <span className="name">{name}</span>
    </div>
  );
};

export default ElementBox;
