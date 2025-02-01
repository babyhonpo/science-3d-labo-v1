import React, { useState } from "react";
import ElementBox from "./ElementBox";
import { periodicTableData } from "./periodic_table/data/elementData";
import "./periodic_table/styles/preriodic_table.css"; // CSS適用
import { ObjectType } from "../types/types";
import { Snackbar } from "@mui/material";
import { useObjInfo } from "../hooks/useObjInfo";

interface PeriodicTableProps {
  onAddItem: (obj: ObjectType) => void; // onAddItem 関数を props として受け取る
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onAddItem }) => {
  const [selectedValue, setSelectedValue] = useState<ObjectType | null>(null);
  const [open, setOpen] = React.useState(false);
  const { setObjInfo } = useObjInfo();
  const handleClick = (obj: ObjectType) => {
    setSelectedValue(obj); // 選択された要素を状態にセット
    onAddItem(obj); // 選択された要素を onAddItem に渡す
    setObjInfo(undefined);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <div className='periodic-table-container'>
      {/* 上部の元素グリッド */}
      <div className='grid'>
        {mainElements.map((element, index) => (
          <div key={index} onClick={() => handleClick(element)}>
            <ElementBox {...element} />
          </div>
        ))}
      </div>

      {/* ランタノイドとアクチノイド（2行配置） */}
      <div className='lanthanide-actinide-container'>
        <div className='row lanthanides'>
          {lanthanides.map((element, index) => (
            <div key={index} onClick={() => handleClick(element)}>
              <ElementBox {...element} />
            </div>
          ))}
        </div>
        <div className='row actinides'>
          {actinides.map((element, index) => (
            <div key={index} onClick={() => handleClick(element)}>
              <ElementBox {...element} />
            </div>
          ))}
        </div>
      </div>

      {selectedValue?.name && open && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleClose}
          message={`${selectedValue.name}を追加しました！`}
          sx={{
            fontSize: "1.2rem",
          }}
        />
      )}
    </div>
  );
};

export default PeriodicTable;
