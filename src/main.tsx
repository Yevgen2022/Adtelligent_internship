// // import { StrictMode } from 'react'
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.tsx";
//
//
// import { seedUsersOnce } from "./lib/seed";
// import { useAuth } from "./store/auth.store";
//
// seedUsersOnce();
// useAuth.getState().hydrateFromStorage();
//
//
// const rootEl = document.getElementById("root");
// if (!rootEl) throw new Error('Root element "#root" not found');
//
// createRoot(rootEl).render(
//   <BrowserRouter basename={import.meta.env.BASE_URL}>
//     <App />
//   </BrowserRouter>,
// );

// main.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { seedUsersOnce } from "./lib/seed";
import { useAuth } from "./store/auth.store";

function Bootstrap() {
  const hydrate = useAuth((s) => s.hydrateFromStorage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await seedUsersOnce(); // 1) чекаємо сид
      hydrate(); // 2) тоді гідратація Zustand
      setReady(true); // 3) показуємо роутер
    })();
  }, [hydrate]);

  if (!ready) return null; // або ваш лоадер
  return <App />; // ваш useRoutes(routes)
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found');

createRoot(rootEl).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Bootstrap />
  </BrowserRouter>,
);
