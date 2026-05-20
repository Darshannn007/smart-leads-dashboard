interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  total,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-sm text-[var(--text)]">
      <span>
        {total} lead{total !== 1 ? "s" : ""} · Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 disabled:opacity-40 hover:bg-[var(--accent-bg)]"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 disabled:opacity-40 hover:bg-[var(--accent-bg)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
