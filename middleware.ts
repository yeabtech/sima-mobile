import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploadthing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }

  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth.protect();
    const claims = sessionClaims as {
      metadata?: { role?: string };
      publicMetadata?: { role?: string };
    };
    const role = claims?.metadata?.role ?? claims?.publicMetadata?.role;

    if (role !== "admin") {
      const url = new URL("/", req.url);
      url.searchParams.set("error", "admin_required");
      return NextResponse.redirect(url);
    }

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
