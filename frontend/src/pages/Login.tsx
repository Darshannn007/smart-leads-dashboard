import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveAuth } from "../api/auth";
import { isAxiosError } from "axios";
import AuthLayout from "../components/ui/AuthLayout";
import { Field, TextInput } from "../components/ui/Field";

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
        ? (err.response?.data as { message?: string })?.message || "Login failed"
        : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your leads"
      footerText="No account?"
      footerLink="/register"
      footerLinkText="Create one"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && <p className="ui-alert-error">{error}</p>}

        <Field label="Email">
          <TextInput
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <TextInput
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </Field>

        <button type="submit" disabled={loading} className="ui-btn-primary w-full py-2.5">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
