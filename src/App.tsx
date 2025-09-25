import { Suspense, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { seedUsersOnce } from "./lib/seed";
import routes from "./routes/routes";
import { useAuth } from "./store/auth.store";

export default function App() {
  const hydrate = useAuth((s) => s.hydrateFromStorage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await seedUsersOnce();
      hydrate();
      setReady(true);
    })();
  }, [hydrate]);

  const element = useRoutes(routes);

  if (!ready) return null;

  return (
    <Suspense fallback={<div className="p-6 text-slate-400">Loading…</div>}>
      {element}
    </Suspense>
  );
}
