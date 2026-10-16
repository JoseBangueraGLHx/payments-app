import React from "react";
import { CloseCircleFilled, CloseOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;

const ErrorBanner = ({ title, message, onClose }) => {
  return (
    <div
      style={{
        backgroundColor: "#D9363E",
        color: "#FFFFFF",
        borderRadius: 4,
        padding: "16px 20px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <CloseCircleFilled style={{ fontSize: 24, color: "#FFFFFF", marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#FFFFFF", marginBottom: 4 }}>
            {title || "Searching transaction Failed."}
          </div>
          <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: 14 }}>
            {message || "It looks like the search didn't go through. Please Try again."}
          </Text>
        </div>
      </div>
      {onClose && (
        <CloseOutlined onClick={onClose} style={{ fontSize: 16, color: "#FFFFFF", cursor: "pointer", marginTop: 4 }} />
      )}
    </div>
  );
};

export default ErrorBanner;
