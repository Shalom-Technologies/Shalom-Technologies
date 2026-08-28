import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import "./styles.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/Shalom-Technologies">
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
