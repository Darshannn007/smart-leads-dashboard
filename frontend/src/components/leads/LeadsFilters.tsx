import { LEAD_STATUSES } from "../../types/lead";
import { Field, TextInput, SelectInput } from "../ui/Field";

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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Field label="Search" className="sm:col-span-2 xl:col-span-2">
        <TextInput
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Name, email, company…"
        />
      </Field>

      <Field label="Status">
        <SelectInput value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </SelectInput>
      </Field>

      <Field label="Source">
        <TextInput
          type="text"
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          placeholder="e.g. website"
        />
      </Field>

      <Field label="Sort by">
        <SelectInput value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
          <option value="createdAt">Date created</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="status">Status</option>
          <option value="value">Value</option>
          <option value="company">Company</option>
        </SelectInput>
      </Field>

      <Field label="Order">
        <SelectInput
          value={order}
          onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </SelectInput>
      </Field>
    </div>
  );
}
