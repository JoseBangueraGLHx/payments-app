import React from "react";
import { Breadcrumb, Space } from "antd";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";

const DynamicBreadcrumb = ({ pageName = "Failed Master Data" }) => {
  return (
    <Breadcrumb
      style={{ marginBottom: "16px", fontSize: "14px" }}
      items={[
        {
          // Icono de la casa que lleva al inicio
          title: <HomeOutlined style={{ color: "#8c8c8c", cursor: "pointer" }} />,
          href: "/",
        },
        {
          // Sección dinámica con el icono de información
          title: (
            <Space>
              <InfoCircleOutlined style={{ fontSize: "14px", color: "#595959" }} />
              <span style={{ color: "#1F1F1F", fontWeight: 400 }}>{pageName}</span>
            </Space>
          ),
        },
      ]}
    />
  );
};

export default DynamicBreadcrumb;
