import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getMe, getStoredUser, type User } from "../api/auth";
import Navbar from "../components/ui/Navbar";
import LeadsSection from "../components/leads/LeadsSection";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [authChecked, setAuthChecked] = useState(false);

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
      })
      .finally(() => setAuthChecked(true));
  }, [navigate]);

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-[var(--text)]">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="app-shell flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <LeadsSection />
      </main>
    </div>
  );
}
