import React from "react";
import { Breadcrumb, Button, Card, Space, Typography } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import BatchTransactionsTable from "../tables/batchTransactionsTable";
import StatusTag from "../tables/statusTag";

const { Text, Title } = Typography;

const formatDate = (iso) => dayjs(iso).format("DD.MM.YYYY HH:mm:ss");
const formatAmount = (amount, currency) =>
  `${currency} ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

// Pantalla de detalle de un batch (no es un drawer), ver
// diseñoPayments/pantalladetailbatches.png
const BatchDetailScreen = ({ batch, transactions, onBack, onViewTransaction }) => {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16, fontSize: 14 }}
        items={[
          { title: <HomeOutlined style={{ color: "#8c8c8c" }} /> },
          {
            title: (
              <span style={{ cursor: "pointer", color: "#595959" }} onClick={onBack}>
                Payments Management
              </span>
            ),
          },
          { title: <span style={{ color: "#1f1f1f" }}>Batch Details</span> },
        ]}
      />

      <Card
        title={
          <Title level={5} style={{ margin: 0 }}>
            New General Adjustment {"{Debit}"}
          </Title>
        }
        extra={
          <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
            Back to Payments
          </Button>
        }
        style={{ marginBottom: 16 }}
      >
        <Space size={64} wrap align="start">
          <div>
            <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
              Batch ID
            </Text>
            <Text strong>{batch.batchId}</Text>
            <div style={{ marginTop: 10 }}>
              <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                Origin Bank
              </Text>
              <Text strong>{batch.originBank}</Text>
            </div>
            <div style={{ marginTop: 10 }}>
              <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                CBU
              </Text>
              <Text strong>{batch.sub}</Text>
            </div>
          </div>

          <div>
            <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
              Date
            </Text>
            <Text strong>{formatDate(batch.date)}</Text>
            <div style={{ marginTop: 10 }}>
              <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                Status
              </Text>
              <StatusTag status={batch.status} />
            </div>
          </div>

          <div>
            <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
              Total Debit Amount
            </Text>
            <Text strong style={{ color: "#CF1322" }}>
              {formatAmount(batch.debitAmount, batch.currency)}
            </Text>
            <div style={{ marginTop: 10 }}>
              <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                Total Credit Amount
              </Text>
              <Text strong style={{ color: "#389E0D" }}>
                {formatAmount(batch.creditAmount, batch.currency)}
              </Text>
            </div>
          </div>
        </Space>
      </Card>

      <div
        style={{
          background: "#E6F4FF",
          border: "1px solid #91CAFF",
          borderRadius: 4,
          padding: "10px 16px",
          marginBottom: 16,
          color: "#1677ff",
        }}
      >
        Below are the transaction volume items associated with the batch.
      </div>

      <Card>
        <BatchTransactionsTable data={transactions} onView={onViewTransaction} />
      </Card>
    </div>
  );
};

export default BatchDetailScreen;
