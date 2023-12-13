import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./routes";
import "../src/assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProtectedRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
