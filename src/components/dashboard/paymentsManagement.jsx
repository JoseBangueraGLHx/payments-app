import React, { useState } from "react";
import { Layout, Card, Form, Empty, Button, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import DynamicBreadcrumb from "../menu/navigationBreadCrumd";
import LoadingOverlay from "../shared/loadingModal";
import ErrorBanner from "../shared/errorBanner";
import OrderFilterCard from "../filters/orderFilterCard";
import BatchFilterCard from "../filters/batchFilterCard";
import OrdersTable from "../tables/ordersTable";
import BatchesTable from "../tables/batchesTable";
import PaymentDetailDrawer from "../drawers/paymentDetailDrawer";
import BatchDetailScreen from "../batches/batchDetailScreen";
import {
  fetchMockOrders,
  fetchMockBatches,
  fetchMockBatchTransactions,
  fetchMockPaymentDetail,
} from "../../services/mockPaymentsService";

const { Text } = Typography;

const STYLES = {
  layout: { minHeight: "100vh", backgroundColor: "#f0f2f5" },
  content: { padding: 24 },
};

const SEARCH_ERROR = {
  title: "Searching Account Failed.",
  message: "It looks like the search didn't go through. Please Try again.",
};

const PaymentsManagementApp = () => {
  const [ordersForm] = Form.useForm();
  const [batchesForm] = Form.useForm();

  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "batches"
  const [view, setView] = useState("list"); // "list" | "batchDetail"

  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);

  const [ordersData, setOrdersData] = useState([]);
  const [ordersError, setOrdersError] = useState(null);
  const [batchesData, setBatchesData] = useState([]);
  const [batchesError, setBatchesError] = useState(null);

  const [drawerItem, setDrawerItem] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchTransactions, setBatchTransactions] = useState([]);

  const handleApplyOrders = async () => {
    setOrdersError(null);
    try {
      const values = await ordersForm.validateFields();
      setLoadingOverlayVisible(true);
      const results = await fetchMockOrders(values);
      setLoadingOverlayVisible(false);

      if (!results || results.length === 0) {
        setOrdersData([]);
        setOrdersError(SEARCH_ERROR);
      } else {
        setOrdersData(results);
      }
    } catch (err) {
      setLoadingOverlayVisible(false);
      // errores de validación ya los maneja antd en el formulario
    }
  };

  const handleApplyBatches = async () => {
    setBatchesError(null);
    try {
      const values = await batchesForm.validateFields();
      setLoadingOverlayVisible(true);
      const results = await fetchMockBatches({
        status: values.status,
        batchId: values.batchId,
        dateRange: values.dateRange,
        searchByValue: values.searchByValue,
      });
      setLoadingOverlayVisible(false);

      if (!results || results.length === 0) {
        setBatchesData([]);
        setBatchesError(SEARCH_ERROR);
      } else {
        setBatchesData(results);
      }
    } catch (err) {
      setLoadingOverlayVisible(false);
    }
  };

  const handleResetOrders = () => {
    ordersForm.resetFields();
    setOrdersData([]);
    setOrdersError(null);
  };

  const handleResetBatches = () => {
    batchesForm.resetFields();
    setBatchesData([]);
    setBatchesError(null);
  };

  const handleViewPayment = async (record) => {
    const details = await fetchMockPaymentDetail(record);
    setDrawerItem(details);
    setDrawerVisible(true);
  };

  const handleViewBatch = async (batch) => {
    setLoadingOverlayVisible(true);
    const { transactions } = await fetchMockBatchTransactions(batch);
    setLoadingOverlayVisible(false);
    setSelectedBatch(batch);
    setBatchTransactions(transactions);
    setView("batchDetail");
  };

  const handleBackToPayments = () => {
    setView("list");
  };

  if (view === "batchDetail" && selectedBatch) {
    return (
      <Layout style={STYLES.layout}>
        <Content style={STYLES.content}>
          <BatchDetailScreen
            batch={selectedBatch}
            transactions={batchTransactions}
            onBack={handleBackToPayments}
            onViewTransaction={handleViewPayment}
          />
          <PaymentDetailDrawer visible={drawerVisible} item={drawerItem} onClose={() => setDrawerVisible(false)} />
        </Content>
        <LoadingOverlay visible={loadingOverlayVisible} />
      </Layout>
    );
  }

  const isOrders = activeTab === "orders";
  const error = isOrders ? ordersError : batchesError;
  const data = isOrders ? ordersData : batchesData;

  return (
    <Layout style={STYLES.layout}>
      <Content style={STYLES.content}>
        <DynamicBreadcrumb pageName="Payments Management" />

        <Card
          title="Search or Filter"
          extra={
            <Space size="middle">
              <Text type="secondary">Search Payments by</Text>
              <Button
                type={isOrders ? "default" : "default"}
                style={{
                  borderColor: isOrders ? "#1677ff" : "#d9d9d9",
                  color: isOrders ? "#1677ff" : "rgba(0,0,0,0.88)",
                }}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </Button>
              <Button
                style={{
                  borderColor: !isOrders ? "#1677ff" : "#d9d9d9",
                  color: !isOrders ? "#1677ff" : "rgba(0,0,0,0.88)",
                }}
                onClick={() => setActiveTab("batches")}
              >
                Batches
              </Button>
            </Space>
          }
          style={{ marginBottom: 0 }}
        >
          {isOrders ? (
            <OrderFilterCard form={ordersForm} onApply={handleApplyOrders} onReset={handleResetOrders} loading={loadingOverlayVisible} />
          ) : (
            <BatchFilterCard form={batchesForm} onApply={handleApplyBatches} onReset={handleResetBatches} loading={loadingOverlayVisible} />
          )}
        </Card>

        <div style={{ marginTop: 12 }}>
          {error ? <ErrorBanner title={error.title} message={error.message} onClose={() => (isOrders ? setOrdersError(null) : setBatchesError(null))} /> : null}

          <div style={{ background: "#fff", padding: 12, borderRadius: 4 }}>
            {data.length === 0 ? (
              <Empty description="Enter search criteria and click Apply to view Forms" />
            ) : isOrders ? (
              <OrdersTable data={data} onView={handleViewPayment} />
            ) : (
              <BatchesTable data={data} onView={handleViewBatch} />
            )}
          </div>
        </div>

        <PaymentDetailDrawer visible={drawerVisible} item={drawerItem} onClose={() => setDrawerVisible(false)} />
      </Content>
      <LoadingOverlay visible={loadingOverlayVisible} />
    </Layout>
  );
};

export default PaymentsManagementApp;
