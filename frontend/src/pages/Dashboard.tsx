import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getMe, getStoredUser, type User } from "../api/auth";
import LeadsSection from "../components/leads/LeadsSection";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getStoredUser());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    getMe()
      .then(({ user }) => setUser(user))
      .catch(() => {
        clearAuth();
        navigate("/login");
      });
  }, [navigate]);

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <div className="flex flex-1 flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 text-left">
        <div>
          <h1 className="!mt-0 !mb-1 text-3xl">Smart Leads Dashboard</h1>
          {user && (
            <p className="text-sm text-[var(--text)]">
              Welcome, <span className="text-[var(--text-h)]">{user.name}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-h)] hover:bg-[var(--accent-bg)]"
        >
          Log out
        </button>
      </header>

      <LeadsSection />
    </div>
  );
}
