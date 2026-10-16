import React from "react";
import { Drawer, Spin, Typography, Tag, Collapse, Table, Row, Col, Button, Divider, Tabs, Badge } from "antd";
import { ArrowLeftOutlined, CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const EMPTY = "-";

const styles = {
  subText: { color: "#737373", fontSize: 14, marginBottom: 4 },
  mainValue: { fontSize: 15, fontWeight: 400, color: "#1f2937" },
  secondaryValue: { fontSize: 11, color: "#4b5563", marginTop: 2, fontWeight: "bold" },
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, marginTop: 16 },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  lastRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0 0" },
};

const statusColors = {
  Completed: "green",
  Paid: "gold",
  Pending: "orange",
  Processing: "blue",
  Failed: "red",
  Replaced: "geekblue",
  Verified: "green",
};

const renderStatusTag = (value) => <Tag color={statusColors[value] || "default"}>{value || EMPTY}</Tag>;

const itemStyle = {
  backgroundColor: "#fff",
  borderRadius: 8,
  marginBottom: 12,
  border: "none",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
};

const SectionTitle = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <strong style={{ fontWeight: 600 }}>{children}</strong>
    <InfoCircleOutlined style={{ color: "#bfbfbf", fontSize: 13 }} />
  </div>
);

// Fila de header: Transaction ID / Account ID / Creation Date / Current Status
const SummaryField = ({ label, value, secondary }) => (
  <>
    <div style={styles.subText}>{label}</div>
    <div style={styles.mainValue}>{value ?? EMPTY}</div>
    {secondary !== undefined && <div style={styles.secondaryValue}>{secondary ?? EMPTY}</div>}
  </>
);

// --- Tab 1: Payment Details ---

const MainOrderInfoRow = ({ label, value, secondary, copy }) => (
  <div style={styles.row}>
    <span style={{ color: "#4b5563" }}>{label}</span>
    <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 6 }}>
      <div>
        <div style={{ fontWeight: 500 }}>{value ?? EMPTY}</div>
        <div style={{ color: "#6b7280", fontSize: 12 }}>{secondary}</div>
      </div>
      {copy && <CopyOutlined style={{ color: "#8c8c8c" }} />}
    </div>
  </div>
);

const FinancialBreakdownList = ({ items }) => (
  <div>
    {items.map((row, index) => (
      <div key={`${row.label}-${index}`} style={index === items.length - 1 ? styles.lastRow : styles.row}>
        <span style={{ color: "#4b5563" }}>{row.label}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 600 }}>{row.value ?? EMPTY}</div>
          <div style={{ color: "#6b7280", fontSize: 12 }}>{row.currency}</div>
        </div>
      </div>
    ))}
  </div>
);

const PaymentDetailsTab = ({ data }) => {
  const info = data.mainOrderInfo || {};
  const financialBreakdown = data.financialBreakdown || [];
  const channel = data.channelProcessing || {};

  const mainOrderRows = [
    { label: "External Reference", value: info.externalReference, secondary: info.externalReferenceNumber },
    { label: "CUIT", value: info.cuit, secondary: info.cuitNumber, copy: true },
    { label: "Account", value: info.account, secondary: info.accountCurrency, copy: true },
    { label: "Subject Type", value: info.subjectType, secondary: info.subjectTypeNumber },
    { label: "Agreement ID", value: info.agreementId, secondary: info.agreementCurrency },
    { label: "Payment Date", value: info.paymentDate, secondary: info.paymentTime },
  ];

  const financialItems = [
    {
      key: "financial",
      label: <strong style={{ fontWeight: 600 }}>Financial Breakdown</strong>,
      style: itemStyle,
      children: <FinancialBreakdownList items={financialBreakdown} />,
    },
  ];

  const advancedItems = [
    {
      key: "channel",
      label: <SectionTitle>Channel Processing</SectionTitle>,
      style: itemStyle,
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 12 }}>
            <Col span={6}>
              <div style={{ color: "#6b7280", fontSize: 12 }}>Confection ID</div>
              <div style={{ fontWeight: 500 }}>{channel.confectionId ?? EMPTY}</div>
            </Col>
            <Col span={6}>
              <div style={{ color: "#6b7280", fontSize: 12 }}>Order ID</div>
              <div style={{ fontWeight: 500 }}>{channel.orderId ?? EMPTY}</div>
            </Col>
            <Col span={6}>
              <div style={{ color: "#6b7280", fontSize: 12 }}>Process ID</div>
              <div style={{ fontWeight: 500 }}>{channel.processId ?? EMPTY}</div>
            </Col>
            <Col span={6}>
              <div style={{ color: "#6b7280", fontSize: 12 }}>Channel State</div>
              {renderStatusTag(channel.channelState)}
            </Col>
          </Row>
          <div style={{ ...styles.row, borderBottom: "none" }}>
            <span style={{ color: "#4b5563" }}>Debit Bank &amp; CBU</span>
            <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 6 }}>
              <div>
                <div style={{ fontWeight: 500 }}>{channel.debitBankName ?? EMPTY}</div>
                <div style={{ color: "#6b7280", fontSize: 12 }}>{channel.cbuNumber}</div>
              </div>
              <CopyOutlined style={{ color: "#8c8c8c" }} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ ...styles.card, marginTop: 0 }}>
        <Title level={5} style={{ margin: "0 0 4px" }}>
          Main Order Info
        </Title>
        {mainOrderRows.map((row) => (
          <MainOrderInfoRow key={row.label} {...row} />
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <Collapse
          defaultActiveKey={["financial"]}
          ghost
          expandIconPosition="end"
          items={financialItems}
          style={{ background: "transparent" }}
        />

        <div style={{ fontWeight: 700, fontSize: 14, color: "#1f2937", margin: "16px 0 8px 4px" }}>Advanced Data</div>

        <Collapse
          defaultActiveKey={["channel"]}
          ghost
          expandIconPosition="end"
          items={advancedItems}
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  );
};

// --- Tab 2: Settlements Associate List ---

const TAX_COLUMNS = [
  { title: "Tax Component", dataIndex: "taxComponent", key: "taxComponent" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount, record) => `${amount} ${record.currency ?? ""}`.trim(),
  },
];

const ConsolidationPanel = ({ consolidation }) => (
  <div>
    <Row gutter={[16, 12]} style={{ marginBottom: 16 }}>
      <Col span={12}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Invoice Number</div>
        <div style={{ fontWeight: 500 }}>{consolidation.invoiceNumber ?? EMPTY}</div>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Billing Type</div>
        <div style={{ fontWeight: 500 }}>{consolidation.billingType ?? EMPTY}</div>
      </Col>
      <Col span={12}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Item Type</div>
        <div style={{ fontWeight: 500 }}>{consolidation.itemType ?? EMPTY}</div>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Due Date</div>
        <div style={{ fontWeight: 500 }}>{consolidation.dueDate ?? EMPTY}</div>
        <div style={{ color: "#6b7280", fontSize: 12 }}>{consolidation.dueTime}</div>
      </Col>
    </Row>

    {consolidation.concentrationTaxes && (
      <>
        <Text strong style={{ display: "block", marginBottom: 8 }}>
          Concentration Taxes
        </Text>
        <Table
          size="small"
          bordered
          pagination={false}
          dataSource={consolidation.concentrationTaxes}
          columns={TAX_COLUMNS}
          rowKey={(record) => `${record.taxComponent}-${record.amount}`}
        />
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8, lineHeight: 1.5 }}>{consolidation.note}</div>
      </>
    )}
  </div>
);

const SettlementBlock = ({ settlement, index }) => {
  const consolidationItems = (settlement.consolidations || []).map((consolidation, cIndex) => ({
    key: `${index}-${cIndex}`,
    label: <strong style={{ fontWeight: 600 }}>Consolidation - {consolidation.location ?? EMPTY}</strong>,
    style: itemStyle,
    children: <ConsolidationPanel consolidation={consolidation} />,
  }));

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <SectionTitle>Settlement Info {settlement.settlementNumber}</SectionTitle>
        <Row gutter={24}>
          <Col style={{ textAlign: "right" }}>
            <div style={{ color: "#6b7280", fontSize: 12 }}>Creation Date</div>
            <div style={{ fontWeight: 500 }}>{settlement.creationDate}</div>
            <div style={{ color: "#6b7280", fontSize: 12 }}>{settlement.creationTime}</div>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <div style={{ color: "#6b7280", fontSize: 12 }}>Settlement Total</div>
            <div style={{ fontWeight: 500 }}>{settlement.settlementTotal}</div>
            <div style={{ color: "#6b7280", fontSize: 12 }}>{settlement.settlementCurrency}</div>
          </Col>
        </Row>
      </div>

      <Collapse
        defaultActiveKey={[`${index}-0`]}
        ghost
        expandIconPosition="end"
        items={consolidationItems}
        style={{ background: "transparent" }}
      />
    </div>
  );
};

const SettlementsTab = ({ data }) => {
  const settlements = data.settlements || [];
  return (
    <div>
      {settlements.map((settlement, index) => (
        <SettlementBlock key={index} settlement={settlement} index={index} />
      ))}
    </div>
  );
};

// --- Tab 3: Withholdings ---

const WithholdingPanel = ({ withholding }) => (
  <div>
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Payment Item ID</div>
        <div style={{ fontWeight: 500 }}>{withholding.paymentItemId ?? EMPTY}</div>
        <div style={{ color: "#6b7280", fontSize: 12 }}>{withholding.paymentItemIdNumber}</div>
      </Col>
      <Col span={6}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Payment Date</div>
        <div style={{ fontWeight: 500 }}>{withholding.paymentDate ?? EMPTY}</div>
        <div style={{ color: "#6b7280", fontSize: 12 }}>{withholding.paymentTime}</div>
      </Col>
      <Col span={6}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Process ID</div>
        <div style={{ fontWeight: 500 }}>{withholding.processId ?? EMPTY}</div>
      </Col>
      <Col span={6}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Channel State</div>
        {renderStatusTag(withholding.channelState)}
      </Col>
    </Row>

    <Row gutter={[16, 16]}>
      <Col span={8}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Principal Amount</div>
        <div style={{ fontWeight: 500 }}>{withholding.principalAmount ?? EMPTY}</div>
        <div style={{ color: "#6b7280", fontSize: 12 }}>{withholding.principalCurrency}</div>
      </Col>
      <Col span={8}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Amount Type</div>
        <Tag color="blue">{withholding.amountType ?? EMPTY}</Tag>
      </Col>
      <Col span={8}>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Channel Out</div>
        <div style={{ fontWeight: 500 }}>{withholding.channelOut ?? EMPTY}</div>
      </Col>
    </Row>
  </div>
);

const WithholdingsTab = ({ data }) => {
  const withholdings = data.withholdings || [];
  const items = withholdings.map((withholding, index) => ({
    key: `wh-${index}`,
    label: <strong style={{ fontWeight: 600 }}>Withholdings / Retention {withholding.idName ?? EMPTY}</strong>,
    style: itemStyle,
    children: <WithholdingPanel withholding={withholding} />,
  }));

  return (
    <Collapse
      defaultActiveKey={["wh-0"]}
      ghost
      expandIconPosition="end"
      items={items}
      style={{ background: "transparent" }}
    />
  );
};

// --- Drawer principal ---

const PaymentDetailDrawer = ({ visible, item, onClose }) => {
  if (!visible && !item) return null;

  const data = item || {};
  const withholdingsCount = (data.withholdings || []).length;

  const tabItems = [
    {
      key: "details",
      label: "Payment Details",
      children: <PaymentDetailsTab data={data} />,
    },
    {
      key: "settlements",
      label: "Settlements Associate List",
      children: <SettlementsTab data={data} />,
    },
    {
      key: "withholdings",
      label: (
        <span>
          Withholdings{" "}
          {withholdingsCount > 0 && <Badge count={withholdingsCount} style={{ backgroundColor: "#f5222d" }} />}
        </span>
      ),
      children: <WithholdingsTab data={data} />,
    },
  ];

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
          Payment Overview
        </Title>
      }
      placement="right"
      width={680}
      open={visible}
      onClose={onClose}
      destroyOnClose
      closeIcon={<span style={{ fontSize: 18 }}>×</span>}
      style={{ backgroundColor: "#F5F5F5" }}
      footer={
        <div style={{ padding: "12px 16px", backgroundColor: "#fff" }}>
          <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
            Back
          </Button>
        </div>
      }
    >
      {item ? (
        <div style={{ padding: "0 16px" }}>
          <Row gutter={16} style={{ marginBottom: 4 }}>
            <Col span={6}>
              <SummaryField label="Transaction ID" value={data.transactionId} />
            </Col>
            <Col span={6}>
              <SummaryField label="Account ID" value={data.accountId} secondary={data.accountNumber} />
            </Col>
            <Col span={6}>
              <SummaryField label="Creation Date" value={data.creationDate} secondary={data.creationTime} />
            </Col>
            <Col span={6}>
              <div style={styles.subText}>Current Status</div>
              {renderStatusTag(data.currentStatus)}
            </Col>
          </Row>

          <Divider style={{ margin: "12px 0" }} />

          <Tabs items={tabItems} />
        </div>
      ) : (
        <Spin />
      )}
    </Drawer>
  );
};

export default PaymentDetailDrawer;
