import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

export default function App() {
  const element = useRoutes(routes);
  return (
      <Suspense fallback={<div className="p-6 text-slate-400">Loading…</div>}>
        {element}
      </Suspense>
  );
}
