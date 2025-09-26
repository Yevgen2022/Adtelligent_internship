import { createRoot } from "react-dom/client";
import "./index.css";
import ads from "virtual:ads";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

void ads.init();

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found');

createRoot(rootEl).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);
