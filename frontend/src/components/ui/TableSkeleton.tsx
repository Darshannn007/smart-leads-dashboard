export default function TableSkeleton() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="skeleton h-10 flex-1" />
          <div className="skeleton h-10 w-24" />
          <div className="skeleton h-10 w-20" />
        </div>
      ))}
    </div>
  );
}
