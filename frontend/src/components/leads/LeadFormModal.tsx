import { type FormEvent } from "react";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadFormData,
} from "../../types/lead";

interface LeadFormModalProps {
  open: boolean;
  title: string;
  form: LeadFormData;
  saving: boolean;
  onClose: () => void;
  onChange: (form: LeadFormData) => void;
  onSubmit: (e: FormEvent) => void;
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)]";

export function leadToForm(lead: Lead): LeadFormData {
  return {
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? "",
    company: lead.company ?? "",
    status: lead.status,
    source: lead.source ?? "",
    value: lead.value != null ? String(lead.value) : "",
    notes: lead.notes ?? "",
  };
}

export function formToPayload(form: LeadFormData) {
  return {
    name: form.name,
    email: form.email,
    phone: form.phone || undefined,
    company: form.company || undefined,
    status: form.status,
    source: form.source || undefined,
    value: form.value ? Number(form.value) : undefined,
    notes: form.notes || undefined,
  };
}

export default function LeadFormModal({
  open,
  title,
  form,
  saving,
  onClose,
  onChange,
  onSubmit,
}: LeadFormModalProps) {
  if (!open) return null;

  function update(field: keyof LeadFormData, value: string) {
    onChange({ ...form, [field]: value });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 text-left shadow-lg">
        <h2 className="!mt-0 mb-4 text-xl">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--text)]">Name *</span>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-[var(--text)]">Email *</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text)]">Phone</span>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text)]">Company</span>
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text)]">Status</span>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className={inputClass}
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--text)]">Value</span>
              <input
                type="number"
                min="0"
                value={form.value}
                onChange={(e) => update("value", e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs text-[var(--text)]">Source</span>
            <input
              value={form.source}
              onChange={(e) => update("source", e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-[var(--text)]">Notes</span>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className={inputClass}
            />
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--accent-bg)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
