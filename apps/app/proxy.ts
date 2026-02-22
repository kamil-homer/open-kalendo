import { authMiddleware, createRouteMatcher } from "@repo/auth/proxy";
import {
  noseconeOptions,
  noseconeOptionsWithToolbar,
  securityMiddleware,
} from "@repo/security/proxy";
import type { NextProxy } from "next/server";
import { env } from "./env";

const securityHeaders = env.FLAGS_SECRET
  ? securityMiddleware(noseconeOptionsWithToolbar)
  : securityMiddleware(noseconeOptions);

const isPublicRoute = createRouteMatcher([
  "/",
  "/docs(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// Clerk middleware wraps other middleware in its callback
// For apps using Clerk, compose middleware inside authMiddleware callback
// For apps without Clerk, use createNEMO for composition (see apps/web)
export default authMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return securityHeaders();
}) as unknown as NextProxy;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
