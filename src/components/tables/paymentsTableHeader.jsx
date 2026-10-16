import React from "react";
import { Radio, Typography } from "antd";
import StatusFilterDropdown from "./statusFilterDropdown";

const { Text } = Typography;

const CURRENCY_OPTIONS = ["All", "ARS", "USD"];

// Encabezado reutilizable de las tablas de resultados (Orders / Batches / Batch
// Detail), ver tableorders.png, tablebatches.png y pantalladetailbatches.png
const PaymentsTableHeader = ({ currency, onCurrencyChange, statusFilter, onStatusFilterChange }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      <Text strong style={{ fontSize: 16 }}>
        Payments
      </Text>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Text type="secondary">Currency</Text>
        <Radio.Group
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        >
          {CURRENCY_OPTIONS.map((c) => (
            <Radio.Button key={c} value={c}>
              {c}
            </Radio.Button>
          ))}
        </Radio.Group>

        <StatusFilterDropdown value={statusFilter} onChange={onStatusFilterChange} />
      </div>
    </div>
  );
};

export default PaymentsTableHeader;
