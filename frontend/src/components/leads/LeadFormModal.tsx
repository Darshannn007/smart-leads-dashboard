import { type FormEvent } from "react";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadFormData,
} from "../../types/lead";
import { Field, TextInput, SelectInput } from "../ui/Field";

interface LeadFormModalProps {
  open: boolean;
  title: string;
  form: LeadFormData;
  saving: boolean;
  onClose: () => void;
  onChange: (form: LeadFormData) => void;
  onSubmit: (e: FormEvent) => void;
}

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
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="ui-card animate-in max-h-[90vh] w-full max-w-md overflow-y-auto rounded-b-none p-6 sm:rounded-[var(--radius-lg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="ui-btn-secondary !px-2.5 !py-1.5 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name *">
            <TextInput
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>

          <Field label="Email *">
            <TextInput
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <TextInput
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
            <Field label="Company">
              <TextInput
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Status">
              <SelectInput
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Value ($)">
              <TextInput
                type="number"
                min="0"
                value={form.value}
                onChange={(e) => update("value", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Source">
            <TextInput
              value={form.source}
              onChange={(e) => update("source", e.target.value)}
            />
          </Field>

          <Field label="Notes">
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="ui-input resize-none"
            />
          </Field>

          <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
            <button type="button" onClick={onClose} className="ui-btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="ui-btn-primary">
              {saving ? "Saving…" : "Save lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
