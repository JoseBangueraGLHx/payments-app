import { Layout, Menu } from "antd";
import { HomeOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { SIDEBAR_CONFIG, COLORS_SIDEBAR } from "../../constants/menu";

const { Sider } = Layout;

/* Constantes extraidas para configuración 

// Configuración del sidebar
const SIDEBAR_CONFIG = {
  width: 250,
  collapsedWidth: 70,
  headerHeight: 64,
  toggleButtonHeight: 40,
  menuScrollHeight: "calc(100vh - 120px)",
};

// Colores usados
const COLORS = {
  background: "#141414",
  toggleButton: "#262626",
  text: "#fff",
};*/

// Items del menú
// Elementos que aparecen en el menú lateral.
const MENU_ITEMS = [{ key: "1", icon: <HomeOutlined />, label: "Home", disabled: false }];

// Componente del botón para colapsar o expandir la barra lateral.
const ToggleButton = ({ collapsed, onClick }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10px",
    }}
  >
    <div
      onClick={onClick}
      style={{
        width: collapsed ? "64px" : "100%",
        height: SIDEBAR_CONFIG.toggleButtonHeight,
        background: COLORS_SIDEBAR.toggleButton,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: COLORS_SIDEBAR.text,
        transition: "all 0.3s ease",
      }}
    >
      {collapsed ? <RightOutlined /> : <LeftOutlined />}
    </div>
  </div>
);

// Componente de barra lateral que contiene el menú principal de navegación.
// Props:
// - collapsed: indica si el sidebar está colapsado.
// - setCollapsed: función para alternar el estado de colapso.
const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={SIDEBAR_CONFIG.width}
      collapsedWidth={SIDEBAR_CONFIG.collapsedWidth}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: SIDEBAR_CONFIG.headerHeight,
        bottom: 0,
        background: COLORS_SIDEBAR.background,
        zIndex: 1000,
      }}
    >
      {/* Área del menú */}
      <div style={{ height: SIDEBAR_CONFIG.menuScrollHeight, overflowY: "auto" }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "transparent", border: "none", marginTop: 10 }}
          items={MENU_ITEMS}
        />
      </div>

      {/* Botón toggle anclado al fondo */}
      <ToggleButton collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
    </Sider>
  );
};

export default Sidebar;
