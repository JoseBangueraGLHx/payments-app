import React, { useCallback } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { STYLES_LOGOUT } from "../constants/auth";

const LOGOUT_REDIRECT_PATH = "/login";

const LogoutButton = () => {
  const { oktaAuth } = useOktaAuth();

  const handleLogout = useCallback(async () => {
    try {
      await oktaAuth.signOut({
        postLogoutRedirectUri: `${window.location.origin}${LOGOUT_REDIRECT_PATH}`,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }, [oktaAuth]);

  return (
    <Button
      type="link"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      iconPlacement="right"
      style={STYLES_LOGOUT.button}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
