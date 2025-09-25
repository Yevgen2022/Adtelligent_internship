import { createRoot } from "react-dom/client";
import "./index.css";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { seedUsersOnce } from "./lib/seed";
import { useAuth } from "./store/auth.store";



import ads from "virtual:ads";
void ads.init();

function Bootstrap() {
  const hydrate = useAuth((s) => s.hydrateFromStorage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await seedUsersOnce();
      hydrate();
      setReady(true);
    })();
  }, [hydrate]);

  if (!ready) return null;
  return <App />;
}

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found');

createRoot(rootEl).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Bootstrap />
  </BrowserRouter>,
);
