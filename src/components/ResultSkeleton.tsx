function SkeletonItem({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`}
    />
  );
}

export function ResultSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <SkeletonItem className="h-8 w-2/3" />
        <SkeletonItem className="mt-4 h-5 w-1/3" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <SkeletonItem
                key={index}
                className="h-24"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}