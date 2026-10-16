import React from "react";
import { Tag } from "antd";

// Colores de status consistentes en todas las tablas y el drawer, ver
// tableorders.png, tablebatches.png y pantalladetailbatches.png
const STATUS_COLORS = {
  Completed: "green",
  Paid: "gold",
  Pending: "orange",
  Processing: "blue",
  Failed: "red",
  Replaced: "geekblue",
  Reversed: "purple",
  Rejected: "red",
};

const StatusTag = ({ status }) => <Tag color={STATUS_COLORS[status] || "default"}>{status}</Tag>;

export default StatusTag;
