import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { OktaAuth } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import { oktaConfig } from "./okta/oktaConfig";

// Crear instancia de Okta
const oktaAuth = new OktaAuth(oktaConfig);

// Componente wrapper con `restoreOriginalUri`
function AppWithOkta() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    const cleanUri = originalUri || "/";
    navigate(cleanUri, { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/auth/callback" element={<LoginCallback />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Security>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppWithOkta />
    </React.StrictMode>
  </BrowserRouter>,
);
