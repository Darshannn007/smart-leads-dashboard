import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register, saveAuth } from "../api/auth";
import { isAxiosError } from "axios";
import AuthLayout from "../components/ui/AuthLayout";
import { Field, TextInput } from "../components/ui/Field";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register(name, email, password);
      saveAuth(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      const message = isAxiosError(err)
        ? (err.response?.data as { message?: string })?.message ||
          "Registration failed"
        : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start tracking leads in minutes"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && <p className="ui-alert-error">{error}</p>}

        <Field label="Full name">
          <TextInput
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </Field>

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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            autoComplete="new-password"
          />
        </Field>

        <button type="submit" disabled={loading} className="ui-btn-primary w-full py-2.5">
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
