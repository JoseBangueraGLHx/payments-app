import React, { useMemo, useState } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import PaymentsTableHeader from "./paymentsTableHeader";
import StatusTag from "./statusTag";

const formatDate = (iso) => dayjs(iso).format("DD.MM.YYYY HH:mm:ss");
const formatAmount = (amount, currency) => `${currency} ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

// Tabla de resultados de Orders, ver diseñoPayments/tableorders.png
const OrdersTable = ({ data, onView }) => {
  const [currency, setCurrency] = useState("All");
  const [statusFilter, setStatusFilter] = useState([]);

  const filteredData = useMemo(() => {
    let rows = data;
    if (currency !== "All") rows = rows.filter((r) => r.currency === currency);
    if (statusFilter.length > 0) rows = rows.filter((r) => statusFilter.includes(r.status));
    return rows;
  }, [data, currency, statusFilter]);

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      sorter: (a, b) => a.paymentId.localeCompare(b.paymentId),
    },
    {
      title: "Biller Account",
      dataIndex: "billerAccount",
      key: "billerAccount",
      sorter: (a, b) => a.billerAccount.localeCompare(b.billerAccount),
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>{record.sub}</div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => formatDate(date),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount, record) => formatAmount(amount, record.currency),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => <a onClick={() => onView(record)}>View</a>,
    },
  ];

  return (
    <div>
      <PaymentsTableHeader
        currency={currency}
        onCurrencyChange={setCurrency}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="paymentId"
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 8, showSizeChanger: false }}
      />
      <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 8 }}>
        * Fees and exchange rates may vary depending on the exact time of transaction.
      </div>
    </div>
  );
};

export default OrdersTable;
