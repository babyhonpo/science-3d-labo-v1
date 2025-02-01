// Element.tsx
import React, { useState } from "react";
import "./periodic_table/styles/element.css";

interface ElementProps {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
}

const Element = ({ symbol, name, atomicNumber, category }: ElementProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`element ${category}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {category !== "placeholder" && (
        <>
          <span className="atomic-number">{atomicNumber}</span>
          <span className="symbol">{symbol}</span>
          {isHovered && <span className="element-name">{name}</span>}
        </>
      )}
    </div>
  );
};

export default Element;
