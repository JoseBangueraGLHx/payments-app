import React, { useMemo, useState } from "react";
import { Table, Badge } from "antd";
import dayjs from "dayjs";
import PaymentsTableHeader from "./paymentsTableHeader";
import StatusTag from "./statusTag";

const formatDate = (iso) => dayjs(iso).format("DD.MM.YYYY HH:mm:ss");
const formatAmount = (amount, currency) =>
  `${currency} ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

// Tabla de resultados de Batches, ver diseñoPayments/tablebatches.png
const BatchesTable = ({ data, onView }) => {
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
      title: "Batch ID",
      dataIndex: "batchId",
      key: "batchId",
      sorter: (a, b) => a.batchId.localeCompare(b.batchId),
    },
    {
      title: "Origin Bank",
      dataIndex: "originBank",
      key: "originBank",
      sorter: (a, b) => a.originBank.localeCompare(b.originBank),
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
      title: "Debit Amount",
      dataIndex: "debitAmount",
      key: "debitAmount",
      sorter: (a, b) => a.debitAmount - b.debitAmount,
      render: (amount, record) => (
        <span style={{ color: "#CF1322" }}>{formatAmount(amount, record.currency)}</span>
      ),
    },
    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      key: "creditAmount",
      sorter: (a, b) => a.creditAmount - b.creditAmount,
      render: (amount, record) => (
        <span style={{ color: "#389E0D" }}>{formatAmount(amount, record.currency)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      sorter: (a, b) => a.volume - b.volume,
      render: (volume) => <Badge count={volume} showZero color="#1677ff" overflowCount={999} />,
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
        rowKey={(record, index) => `${record.batchId}-${index}`}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 8, showSizeChanger: false }}
      />
      <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 8 }}>
        * Fees and exchange rates may vary depending on the exact time of transaction.
      </div>
    </div>
  );
};

export default BatchesTable;
