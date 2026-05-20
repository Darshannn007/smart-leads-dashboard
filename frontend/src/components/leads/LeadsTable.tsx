import type { Lead } from "../../types/lead";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  qualified: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  won: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  lost: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function LeadsTable({
  leads,
  loading,
  onEdit,
  onDelete,
}: LeadsTableProps) {
  if (loading) {
    return (
      <p className="py-12 text-center text-[var(--text)]">Loading leads…</p>
    );
  }

  if (leads.length === 0) {
    return (
      <p className="py-12 text-center text-[var(--text)]">
        No leads found. Try adjusting filters or add a new lead.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-[var(--border)] bg-[var(--code-bg)]">
          <tr>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Name</th>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Email</th>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Company</th>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Status</th>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Source</th>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Value</th>
            <th className="px-4 py-3 font-medium text-[var(--text-h)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent-bg)]"
            >
              <td className="px-4 py-3 text-[var(--text-h)]">{lead.name}</td>
              <td className="px-4 py-3">{lead.email}</td>
              <td className="px-4 py-3">{lead.company || "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs capitalize ${statusColors[lead.status] ?? ""}`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3">{lead.source || "—"}</td>
              <td className="px-4 py-3">
                {lead.value != null ? `$${lead.value.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(lead)}
                    className="text-[var(--accent)] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(lead)}
                    className="text-red-600 hover:underline dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
