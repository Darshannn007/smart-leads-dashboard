import type { User } from "../../api/auth";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="app-shell flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-semibold text-white">
            S
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-[var(--text-h)] leading-tight">
              Smart Leads
            </p>
            <p className="text-xs text-[var(--text)] hidden sm:block">
              Lead management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-muted)] text-xs font-medium text-[var(--accent-hover)]">
                {initial}
              </span>
              <span className="text-sm text-[var(--text-h)]">{user.name}</span>
            </div>
          )}
          <button type="button" onClick={onLogout} className="ui-btn-secondary">
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
