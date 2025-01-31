import React, { useState } from "react";

interface SelectFormProps {
    onAddItem: (item: string) => void;
}

const SelectForm: React.FC<SelectFormProps> = ({ onAddItem }) => {
    const [selectedValue, setSelectedValue] = useState<string>("default");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        setErrorMessage(""); // エラーメッセージをクリア
    };

    const handleSubmit = () => {
        if (selectedValue === "default") {
            setErrorMessage("値を選択してください。");
            return;
        }

        // 選択された値を onAddItem に渡す
        onAddItem(selectedValue);
        console.log(`選択された値: ${selectedValue}`);
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
                    <option value="1">玉(デフォルト)</option>
                    <option value="2">火</option>
                    {/* <option value="3">酸素</option> */}
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
