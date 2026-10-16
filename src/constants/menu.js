// Configuración de diseño
export const LAYOUT_CONFIG = {
  sidebarWidth: {
    collapsed: 60,
    expanded: 250,
  },
  headerHeight: 64,
  contentPadding: 24,
  contentMarginTop: 32,
};

export // Configuración del tema
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
export const COLORS_MAINLAYOUT = {
  background: "#f5f5f5",
};

export const SIDEBAR_CONFIG = {
  width: 250,
  collapsedWidth: 70,
  headerHeight: 64,
  toggleButtonHeight: 40,
  menuScrollHeight: "calc(100vh - 120px)",
};

export const COLORS_SIDEBAR = {
  background: "#141414",
  toggleButton: "#262626",
  text: "#fff",
};

export const LOGO_PATH = "/assets/logoWU-blanco.png";
export const COLORS_TOPHEADER = {
  background: "#141414",
  text: "#fff",
  separator: "gray",
};
