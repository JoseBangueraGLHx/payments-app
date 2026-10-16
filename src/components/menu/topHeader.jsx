import { Layout, Row, Col, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LogoutButton from "../../auth/logout";
// import LogoutButton from "../../auth/logout";

const { Header } = Layout;

// Constantes color e imagenes/logo
const LOGO_PATH = "/assets/logoWU-blanco.png";
const COLORS = {
  background: "#141414",
  text: "#fff",
  separator: "gray",
};

// Separador o pipe
const Separator = () => (
  <Col flex="none" style={{ color: COLORS.separator }}>
    |
  </Col>
);

// Logo WU
const Logo = () => (
  <Col
    flex="none"
    style={{
      display: "flex",
      alignItems: "center",
    }}
  >
    <img
      src={LOGO_PATH}
      alt="Western Union"
      style={{
        height: 24,
        paddingLeft: 18,
        display: "block",
      }}
    />
  </Col>
);

const AppHeader = () => {
  return (
    <Header
      style={{
        position: "fixed",
        //zIndex: 1001, probando drawer
        zIndex: 1,
        width: "100%",
        background: COLORS.background,
        alignItems: "center",
        padding: "0 26px",
      }}
    >
      <Row align="middle" justify="space-between" wrap={false}>
        {/* Sección izquierda (menu hamburguesa, logo, y titulo Back Office)*/}
        <Col flex="auto" style={{ minWidth: 0 }}>
          <Row align="middle" gutter={24} wrap={false}>
            <Col flex="none">
              <MenuOutlined style={{ color: COLORS.text, fontSize: 18 }} />
            </Col>
            <Logo />
            <Separator />
            <Col
              flex="none"
              style={{
                color: COLORS.text,
                fontSize: 21,
                fontWeight: "bold",
              }}
            >
              Back Office
            </Col>
          </Row>
        </Col>

        {/* Sección derecha */}
        <Col flex="none">
          <Space size="middle" style={{ paddingRight: 35 }}>
            <LogoutButton style={{ color: COLORS.text, fontSize: 18 }} />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
