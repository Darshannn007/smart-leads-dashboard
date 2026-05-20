import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="auth-page flex min-h-svh w-full items-center justify-center px-4 py-8">
      <div className="animate-in w-full max-w-[420px]">
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-h)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm text-white">
              S
            </span>
            Smart Leads
          </Link>
          <h1 className="text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-[var(--text)]">{subtitle}</p>
        </div>

        <div className="ui-card p-6 sm:p-8">{children}</div>

        <p className="mt-5 text-center text-sm text-[var(--text)]">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="font-medium text-[var(--accent-hover)] hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
