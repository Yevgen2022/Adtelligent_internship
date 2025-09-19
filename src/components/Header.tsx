import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";

function linkClasses({ isActive }: { isActive: boolean }) {
  return [
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors",
    "hover:bg-slate-800/50 hover:text-white",
    isActive ? "bg-slate-800 text-white" : "text-slate-300",
  ].join(" ");
}

export default function Header() {
  const user = useAuth(s => s.currentUser);
  const logout = useAuth(s => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="text-white font-semibold tracking-tight">
            NewsSite
          </Link>

          <nav className="flex items-center gap-1" aria-label="Primary">
            <NavLink to="/" end className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/articles" className={linkClasses}>
              Articles
            </NavLink>
            <NavLink to="/sport" className={linkClasses}>
              Sport
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>
            {user && (
                <NavLink to="/bookmarks" className={linkClasses}>
                  Bookmarks
                </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {!user ? (
                <>
                  <NavLink
                      to="/login"
                      className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    Login
                  </NavLink>
                  <NavLink
                      to="/signup"
                      className="inline-flex items-center rounded-xl bg-sky-500 px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-sky-400"
                  >
                    Sign Up
                  </NavLink>
                </>
            ) : (
                <>
              <span className="hidden text-sm text-slate-300 sm:inline">
                Hello, {user.name}
              </span>
                  <button
                      onClick={handleLogout}
                      className="inline-flex items-center rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    Log Out
                  </button>
                </>
            )}
          </div>
        </div>
      </header>
  );
}
