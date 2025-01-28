import React from 'react';

const HtmlForm: React.FC = () => {
    return (
        // {/* HTMLフォーム */}
    <form
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
        <h2>フォーム入力</h2>
        <div style={{ marginBottom: "10px" }}>
        <label>
            名前:
            <input
            type="text"
            style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
            }}
            />
        </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
        <label>
            メール:
            <input
            type="email"
            style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
            }}
            />
        </label>
        </div>
        <button
        type="submit"
        style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        }}
        >
        送信
        </button>
    </form>
    );
};

export default HtmlForm;
