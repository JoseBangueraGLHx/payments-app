import React from "react";
import { Row, Col, Form, Input, Select, DatePicker, Space, Button, Typography, Tooltip } from "antd";
import { CheckCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { STATUS_FILTER_OPTIONS } from "../../paymentsMockData";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ACCOUNT_ID_LENGTH = 11;

// Regla de negocio: rango de fechas máximo de 30 días, ver filterorders1.png
const validateDateRange = (range) => {
  if (!range || range.length !== 2) return false;
  const [start, end] = range;
  if (!start || !end) return false;
  const diff = end.diff(start, "day");
  return diff >= 0 && diff <= 30;
};

/**
 * Input numérico que muestra un prefijo (ej. "CUIT - ") apenas el usuario empieza a tipear.
 * Al Form le llega solo el número, sin el prefijo.
 */
const PrefixedNumericInput = React.forwardRef(
  ({ value = "", onChange, prefixText, maxLength = ACCOUNT_ID_LENGTH, ...rest }, ref) => {
    const display = value ? `${prefixText}${value}` : "";
    const isValid = value.length === maxLength;

    const handleChange = (e) => {
      let text = e.target.value || "";
      if (text.startsWith(prefixText)) text = text.slice(prefixText.length);
      text = text.replace(/\D/g, "").slice(0, maxLength);
      onChange?.(text);
    };

    return (
      <Input
        {...rest}
        ref={ref}
        value={display}
        onChange={handleChange}
        inputMode="numeric"
        style={{ width: "100%" }}
        suffix={isValid ? <CheckCircleFilled style={{ color: "#40B394" }} /> : <span />}
      />
    );
  }
);

PrefixedNumericInput.displayName = "PrefixedNumericInput";

// Filtros de búsqueda de Orders, ver diseñoPayments/filterorders1.png y
// diseñoPayments/statusorder.png
const OrderFilterCard = ({ form, onApply, onReset, loading }) => {
  const accountIdValue = Form.useWatch("accountId", form);
  const statusValue = Form.useWatch("status", form);
  const dateRangeValue = Form.useWatch("dateRange", form);

  const isApplyDisabled =
    !accountIdValue || accountIdValue.length !== ACCOUNT_ID_LENGTH || !statusValue || !validateDateRange(dateRangeValue);

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[24, 20]}>
        <Col span={8}>
          <Form.Item
            name="accountId"
            label="Account ID"
            required
            rules={[{ len: ACCOUNT_ID_LENGTH, message: `Must be exactly ${ACCOUNT_ID_LENGTH} characters` }]}
            extra="Must be exactly N characters"
          >
            <PrefixedNumericInput prefixText="CUIT - " placeholder="Search by  CUIT" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="paymentId" label="Payment ID" extra="Must be exactly N characters">
            <Input placeholder="Search by  Payment ID" />
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
                <Tooltip title="Selecciona un rango de fechas de máximo 30 días">
                  <QuestionCircleOutlined style={{ marginLeft: 4, color: "#999" }} />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: "Date is required" },
              {
                validator(_, value) {
                  if (validateDateRange(value)) return Promise.resolve();
                  return Promise.reject(new Error("Date range must be maximum 30 days"));
                },
              },
            ]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Text type="secondary" style={{ fontSize: 11, marginTop: -12, display: "block" }}>
            Invoices displayed are limited to a maximum of 30 days old
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

export default OrderFilterCard;
