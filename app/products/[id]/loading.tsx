export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-4">
          <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-24 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-48 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
