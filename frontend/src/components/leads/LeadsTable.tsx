import type { Lead } from "../../types/lead";
import EmptyState from "../ui/EmptyState";
import TableSkeleton from "../ui/TableSkeleton";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onAddLead?: () => void;
}

const statusStyles: Record<string, string> = {
  new: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  contacted: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  qualified: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/30",
  won: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  lost: "bg-red-500/15 text-red-300 ring-red-500/30",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[status] ?? statusStyles.new}`}
    >
      {status}
    </span>
  );
}

function LeadActions({
  lead,
  onEdit,
  onDelete,
}: {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}) {
  return (
    <div className="flex gap-3">
      <button type="button" onClick={() => onEdit(lead)} className="ui-btn-ghost">
        Edit
      </button>
      <button type="button" onClick={() => onDelete(lead)} className="ui-btn-danger">
        Delete
      </button>
    </div>
  );
}

export default function LeadsTable({
  leads,
  loading,
  onEdit,
  onDelete,
  onAddLead,
}: LeadsTableProps) {
  if (loading) {
    return <TableSkeleton />;
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads yet"
        description="Adjust your filters or add a new lead to get started."
        action={
          onAddLead ? (
            <button type="button" onClick={onAddLead} className="ui-btn-primary">
              Add your first lead
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Name
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Email
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Company
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Source
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Value
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--accent-muted)]"
              >
                <td className="px-4 py-3.5 font-medium text-[var(--text-h)]">
                  {lead.name}
                </td>
                <td className="px-4 py-3.5 text-[var(--text)]">{lead.email}</td>
                <td className="px-4 py-3.5 text-[var(--text)]">
                  {lead.company || "—"}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3.5 text-[var(--text)]">
                  {lead.source || "—"}
                </td>
                <td className="px-4 py-3.5 font-medium text-[var(--text-h)]">
                  {lead.value != null ? `$${lead.value.toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3.5">
                  <LeadActions lead={lead} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-[var(--border)] md:hidden">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="p-4 transition-colors hover:bg-[var(--accent-muted)]"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-[var(--text-h)]">{lead.name}</p>
                <p className="text-sm text-[var(--text)]">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mb-3 grid grid-cols-2 gap-1 text-xs text-[var(--text)]">
              <span>Company: {lead.company || "—"}</span>
              <span>Source: {lead.source || "—"}</span>
              <span className="col-span-2">
                Value:{" "}
                {lead.value != null ? `$${lead.value.toLocaleString()}` : "—"}
              </span>
            </div>
            <LeadActions lead={lead} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </>
  );
}
