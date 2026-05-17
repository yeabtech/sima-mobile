import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await requireAdmin();
  if (!result.authorized) {
    redirect(result.reason === "unauthenticated" ? "/sign-in" : "/");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 bg-zinc-100 p-4 text-zinc-950 sm:p-6 lg:p-8 dark:bg-zinc-950 dark:text-zinc-50">
        {children}
      </div>
    </div>
  );
}
