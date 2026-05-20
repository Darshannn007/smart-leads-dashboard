import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-muted)] text-xl text-[var(--accent-hover)]">
        ∅
      </div>
      <p className="text-sm font-medium text-[var(--text-h)]">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-[var(--text)]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
