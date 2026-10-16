import React, { useMemo, useState } from "react";
import { Table, Typography, Badge } from "antd";
import dayjs from "dayjs";
import StatusFilterDropdown from "./statusFilterDropdown";
import StatusTag from "./statusTag";

const { Text } = Typography;

const formatDate = (iso) => dayjs(iso).format("DD.MM.YYYY HH:mm:ss");
const formatAmount = (amount, currency) =>
  `${currency} ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

// Tabla de transacciones de un batch, ver diseñoPayments/pantalladetailbatches.png
// y el filtro por status de diseñoPayments/filterstablebatchedetail.png
const BatchTransactionsTable = ({ data, onView }) => {
  const [statusFilter, setStatusFilter] = useState([]);

  const filteredData = useMemo(() => {
    if (statusFilter.length === 0) return data;
    return data.filter((r) => statusFilter.includes(r.status));
  }, [data, statusFilter]);

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
      render: (amount, record) => {
        const color = record.status === "Completed" ? "#389E0D" : "#CF1322";
        return <span style={{ color }}>{formatAmount(amount, record.currency)}</span>;
      },
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Text strong style={{ fontSize: 16 }}>
            Transactions
          </Text>
          <Text type="secondary">Transactions Volume</Text>
          <Badge count={data.length} showZero color="#1677ff" overflowCount={999} />
        </div>
        <StatusFilterDropdown value={statusFilter} onChange={setStatusFilter} />
      </div>

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

export default BatchTransactionsTable;
