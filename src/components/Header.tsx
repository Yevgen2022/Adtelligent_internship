import { NavLink } from "react-router-dom";

function linkClasses({ isActive }: { isActive: boolean }) {
  return [
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors",
    "hover:bg-slate-800/50 hover:text-white",
    isActive ? "bg-slate-800 text-white" : "text-slate-300",
  ].join(" ");
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <NavLink to="/" className="text-white font-semibold tracking-tight">
          NewsSite
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/articles" className={linkClasses}>
            Articles
          </NavLink>
          <NavLink to="/sport" className={linkClasses}>
            Sport
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
