import { useState } from "react";
import { ConfigProvider, Layout } from "antd";
import TopHeader from "./topHeader";
import Sidebar from "./sidebar";
import { LAYOUT_CONFIG, THEME_CONFIG, COLORS_MAINLAYOUT } from "../../constants/menu";

const { Content } = Layout;

/* Constantes de configuración de diseño */
/*
// Configuración de diseño
const LAYOUT_CONFIG = {
  sidebarWidth: {
    collapsed: 60,
    expanded: 250,
  },
  headerHeight: 64,
  contentPadding: 24,
  contentMarginTop: 32,
};

// Configuración del tema
const THEME_CONFIG = {
  components: {
    Menu: {
      darkItemSelectedBg: "#FFDD00",
      darkItemSelectedColor: "#000000",
      darkItemColor: "rgba(255, 255, 255, 0.65)",
      darkItemHoverColor: "#ffda00",
    },
  },
};

// Colores usados
const COLORS = {
  background: "#f5f5f5",
};
*/
// Layout principal de la aplicación que incluye header, sidebar y contenido.
// Props:
// - children: contenido que se muestra dentro del área principal.
const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const marginLeft = collapsed ? LAYOUT_CONFIG.sidebarWidth.collapsed : LAYOUT_CONFIG.sidebarWidth.expanded;

  return (
    <ConfigProvider theme={THEME_CONFIG}>
      <Layout style={{ minHeight: "100vh" }}>
        <TopHeader />
        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout
            style={{
              marginLeft,
              transition: "all 0.2s",
              background: COLORS_MAINLAYOUT.background,
              minHeight: "100vh",
            }}
          >
            <Content
              style={{
                padding: LAYOUT_CONFIG.contentPadding,
                marginTop: LAYOUT_CONFIG.contentMarginTop,
                overflow: "initial",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
