import { LEAD_STATUSES } from "../../types/lead";

interface LeadsFiltersProps {
  search: string;
  status: string;
  source: string;
  sortBy: string;
  order: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onOrderChange: (value: "asc" | "desc") => void;
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] outline-none focus:border-[var(--accent-border)]";

export default function LeadsFilters({
  search,
  status,
  source,
  sortBy,
  order,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onSortByChange,
  onOrderChange,
}: LeadsFiltersProps) {
  return (
    <div className="grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-5">
      <label className="block sm:col-span-2 lg:col-span-2">
        <span className="mb-1 block text-xs text-[var(--text)]">Search</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Name, email, company…"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs text-[var(--text)]">Status</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={inputClass}
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-xs text-[var(--text)]">Source</span>
        <input
          type="text"
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          placeholder="e.g. website"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs text-[var(--text)]">Sort by</span>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className={inputClass}
        >
          <option value="createdAt">Date created</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="status">Status</option>
          <option value="value">Value</option>
          <option value="company">Company</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-xs text-[var(--text)]">Order</span>
        <select
          value={order}
          onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}
          className={inputClass}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </label>
    </div>
  );
}
