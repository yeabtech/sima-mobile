import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { ADMIN_ROLE } from "@/lib/constants";

export type UserPublicMetadata = {
  role?: string;
};

export async function getIsAdmin(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;
  const metadata = user.publicMetadata as UserPublicMetadata;
  return metadata.role === ADMIN_ROLE;
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) {
    return { authorized: false as const, reason: "unauthenticated" as const };
  }
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return { authorized: false as const, reason: "forbidden" as const };
  }
  return { authorized: true as const, userId };
}
