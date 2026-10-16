import React from "react";
import { Row, Col, Form, Input, Select, DatePicker, Radio, Space, Button, Typography, Tooltip } from "antd";
import { CheckCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { STATUS_FILTER_OPTIONS } from "../../paymentsMockData";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Regla de negocio: hasta 5 días consecutivos, ver filterbatches.png
const MAX_BATCH_DATE_RANGE_DAYS = 5;
const validateDateRange = (range) => {
  if (!range || range.length !== 2) return false;
  const [start, end] = range;
  if (!start || !end) return false;
  const diff = end.diff(start, "day");
  return diff >= 0 && diff <= MAX_BATCH_DATE_RANGE_DAYS;
};

// Filtros de búsqueda de Batches, ver diseñoPayments/filterbatches.png y
// diseñoPayments/statusbatches.png
const BatchFilterCard = ({ form, onApply, onReset, loading }) => {
  const searchByType = Form.useWatch("searchByType", form) || "originBankName";
  const searchByValue = Form.useWatch("searchByValue", form);
  const statusValue = Form.useWatch("status", form);
  const dateRangeValue = Form.useWatch("dateRange", form);

  const isApplyDisabled = !statusValue || !validateDateRange(dateRangeValue);

  const isValueValid = Boolean(searchByValue);

  return (
    <Form form={form} layout="vertical" initialValues={{ searchByType: "originBankName" }}>
      <Row gutter={[24, 20]}>
        <Col span={8}>
          <Form.Item label="Search By:" name="searchByType">
            <Radio.Group>
              <Radio value="originBankName">Origin Bank Name</Radio>
              <Radio value="cbu">CBU</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="searchByValue" extra="Must be exactly N characters">
            <Input
              placeholder={searchByType === "cbu" ? "Search by  CBU" : "Search by  Origin Bank Name"}
              suffix={isValueValid ? <CheckCircleFilled style={{ color: "#40B394" }} /> : <span />}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="batchId" label="Batch ID" extra="Must be exactly N characters">
            <Input placeholder="Search by  Batch ID" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[24, 20]}>
        <Col span={8}>
          <Form.Item name="status" label="Status" required rules={[{ required: true, message: "Status is required" }]}>
            <Select placeholder="All">
              {STATUS_FILTER_OPTIONS.map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="dateRange"
            required
            label={
              <span>
                Date{" "}
                <Tooltip title="Selecciona hasta 5 días consecutivos">
                  <QuestionCircleOutlined style={{ marginLeft: 4, color: "#999" }} />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: "Date is required" },
              {
                validator(_, value) {
                  if (validateDateRange(value)) return Promise.resolve();
                  return Promise.reject(new Error(`Date range must be maximum ${MAX_BATCH_DATE_RANGE_DAYS} days`));
                },
              },
            ]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Text type="secondary" style={{ fontSize: 11, marginTop: -12, display: "block" }}>
            You are allowed to select up to {MAX_BATCH_DATE_RANGE_DAYS} consecutive days due volume restrictions.
          </Text>
        </Col>

        <Col xs={24} sm={8} md={6} style={{ display: "flex", alignItems: "center", paddingTop: 10 }}>
          <Space size="middle" style={{ paddingBottom: "3%" }}>
            <Button
              type="primary"
              onClick={onApply}
              disabled={isApplyDisabled || loading}
              style={{
                backgroundColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
                borderColor: isApplyDisabled ? "#E5E5E5" : "#FFC72C",
                color: isApplyDisabled ? "#A0A0A0" : "#000000",
                fontWeight: 600,
                height: 40,
                padding: "0 24px",
                borderRadius: 6,
                boxShadow: "none",
              }}
            >
              Apply
            </Button>
            <Tooltip title="Reset all filters to default values to perform new searches.">
              <Button onClick={onReset} style={{ height: 40, padding: "0 24px", borderRadius: 6, borderColor: "#D9D9D9" }}>
                Reset
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default BatchFilterCard;
