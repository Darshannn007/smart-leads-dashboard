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
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] px-4 py-3 text-sm">
      <span className="text-[var(--text)]">
        Showing page <span className="font-medium text-[var(--text-h)]">{page}</span> of{" "}
        <span className="font-medium text-[var(--text-h)]">{totalPages}</span>
        <span className="mx-2 text-[var(--border)]">·</span>
        {total} lead{total !== 1 ? "s" : ""} total
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="ui-btn-secondary !py-1.5 !px-3"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="ui-btn-secondary !py-1.5 !px-3"
        >
          Next
        </button>
      </div>
    </div>
  );
}
