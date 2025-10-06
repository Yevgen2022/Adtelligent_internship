import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useEffect, useMemo, useRef, useState } from "react";
import { API_BASE } from "../config";

const FORM_PATH = `${API_BASE}/api/adserver/lineitem/form`;
const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN as
  | string
  | undefined;
const FORM_URL = BACKEND_ORIGIN ? `${BACKEND_ORIGIN}${FORM_PATH}` : FORM_PATH;

export default function Creative() {
  const [html, setHtml] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const rootRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  // Sanitize and parse HTML into React nodes (without dangerouslySetInnerHTML)
  const safeContent = useMemo(
    () => parse(DOMPurify.sanitize(html ?? "")),
    [html],
  );

  // Loading HTML forms from the backend
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setStatus("loading");
        const res = await fetch(FORM_URL, {
          credentials: BACKEND_ORIGIN ? "include" : "same-origin",
          headers: { Accept: "text/html" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const text = await res.text();
        if (!cancelled) {
          setHtml(text);
          setStatus("ready");
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Failed to load form";
          setError(msg);
          setStatus("error");
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Connect the submit event on the form
  useEffect(() => {
    if (status !== "ready" || !rootRef.current) return;

    const form = rootRef.current.querySelector(
      "form",
    ) as HTMLFormElement | null;
    if (!form) return;

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const fd = new FormData(form);

      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: fd,
          credentials: BACKEND_ORIGIN ? "include" : "same-origin",
        });

        if (!res.ok) {
          const text = await res.text();
          alert(`Помилка (${res.status}): ${text}`);
          return;
        }

        // success
        form.reset();
        setSuccessMessage("Line item created successfully!");

        // scrolling to the message
        setTimeout(() => {
          successRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : "Network error. Please try again.";
        console.error("Submit error:", err);
        alert(msg);
      }
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [status]);

  // Automatic message disappearance after 5 seconds
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Line Item
        </h1>
        <p className="text-sm text-neutral-600">
          This page embeds the server-rendered form from the backend. Submitting
          the form will upload the creative file and create a Line Item in the
          backend.
        </p>
      </header>

      {successMessage && (
        <div
          ref={successRef}
          className="mb-4 rounded-xl border-2 border-emerald-400 bg-emerald-50 p-4 text-emerald-800 animate-pulse"
        >
          <p className="font-semibold text-lg">{successMessage}</p>
        </div>
      )}

      {status === "loading" && (
        <div className="flex items-center gap-3 rounded-xl border p-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
          <div>Loading form…</div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">Could not load the form</p>
          <p className="text-sm opacity-90">{error}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
            >
              Open form in new tab
            </a>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-xl bg-neutral-200 px-4 py-2 hover:bg-neutral-300"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {status === "ready" && html && (
        <div
          ref={rootRef}
          className="rounded-2xl border px-6 py-8 shadow-sm overflow-hidden bg-gray-100"
        >
          {safeContent}
        </div>
      )}

      <div className="mt-6 text-sm text-neutral-600">
        Having trouble? You can also{" "}
        <a
          className="underline"
          href={FORM_URL}
          target="_blank"
          rel="noreferrer"
        >
          open the backend form
        </a>{" "}
        directly.
      </div>
    </div>
  );
}
