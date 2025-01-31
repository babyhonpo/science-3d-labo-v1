import React, { useState } from "react";
import { ObjectType } from "../types/types";

interface SelectFormProps {
    onAddItem: (type: ObjectType) => void;
}

const SelectForm: React.FC<SelectFormProps> = ({ onAddItem }) => {
    const [selectedValue, setSelectedValue] = useState<ObjectType | "default">("default");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // 選択フォームの値が変更されたときの処理
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value as ObjectType | "default");
        setErrorMessage(""); // エラーメッセージをクリア
    };

    const handleSubmit = () => {
        if (selectedValue === "default") {
            setErrorMessage("値を選択してください。");
            return;
        }

        // 選択された値を onAddItem に渡す
        onAddItem(selectedValue);
        // console.log(`選択されたオブジェクト: ${selectedValue}`);

        // 初期化
        setSelectedValue("default");
    };

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "80%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ marginBottom: "10px" }}>選択フォーム</h2>
                <select
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                    }}
                    value={selectedValue}
                    onChange={handleSelectChange}
                >
                    <option value="default">選択してください</option>
                    <option value="box">立方体</option>
                    <option value="sphere">球体</option>
                    <option value="cylinder">円柱</option>
                    {/* <option value="4">水素</option> */}
                </select>
                <button
                    onClick={handleSubmit}
                    style={{
                        display: "block",
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    決定
                </button>
                {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                )}
            </div>
        </>
    );
};

export default SelectForm;
