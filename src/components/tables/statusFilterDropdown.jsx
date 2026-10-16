import React, { useState } from "react";
import { Button, Checkbox, Popover, Space } from "antd";
import { FilterOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { TABLE_STATUS_CHECKLIST } from "../../paymentsMockData";

// Dropdown con checkboxes de Status que filtra una tabla por columna, ver
// diseñoPayments/filterbatchestable.png, resultfiltertablebatche.png y
// diseñoPayments/filterstablebatchedetail.png
const StatusFilterDropdown = ({ value = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);

  const toggleValue = (status) => {
    setDraft((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]));
  };

  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) {
      onChange?.(draft);
    } else {
      setDraft(value);
    }
  };

  const hasFilters = value.length > 0;

  const panelContent = (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: 12,
        width: 220,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {TABLE_STATUS_CHECKLIST.map((status) => (
          <Checkbox key={status} checked={draft.includes(status)} onChange={() => toggleValue(status)}>
            {status}
          </Checkbox>
        ))}
      </Space>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setDraft(TABLE_STATUS_CHECKLIST);
            onChange?.(TABLE_STATUS_CHECKLIST);
            setOpen(false);
          }}
        >
          Select All
        </Button>
        <Button
          size="small"
          onClick={() => {
            setDraft([]);
            onChange?.([]);
            setOpen(false);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      content={panelContent}
      trigger="click"
      placement="bottomRight"
    >
      <Button type={hasFilters ? "primary" : "default"} icon={<FilterOutlined />} iconPosition="start">
        {hasFilters ? `Filters ${value.length}` : "Filter type"}
        {open ? <UpOutlined style={{ marginLeft: 6 }} /> : <DownOutlined style={{ marginLeft: 6 }} />}
      </Button>
    </Popover>
  );
};

export default StatusFilterDropdown;
