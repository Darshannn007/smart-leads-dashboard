import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, saveAuth } from "../api/auth";
import { isAxiosError } from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      saveAuth(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      const message = isAxiosError(err)
        ? (err.response?.data as { message?: string })?.message ||
          "Login failed"
        : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-16">
      <h1 className="!mt-0">Welcome back</h1>
      <p className="mb-8 text-[var(--text)]">Sign in to your account</p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-sm space-y-4 text-left"
      >
        {error && (
          <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
            {error}
          </p>
        )}

        <label className="block">
          <span className="mb-1 block text-sm text-[var(--text-h)]">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text-h)] outline-none focus:border-[var(--accent-border)]"
            placeholder="you@email.com"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-[var(--text-h)]">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text-h)] outline-none focus:border-[var(--accent-border)]"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-[var(--text)]">
        No account?{" "}
        <Link
          to="/register"
          className="text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
