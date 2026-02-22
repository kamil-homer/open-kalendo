import { authMiddleware, createRouteMatcher } from "@repo/auth/proxy";
import { internationalizationMiddleware } from "@repo/internationalization/proxy";
import {
  noseconeOptions,
  noseconeOptionsWithToolbar,
  securityMiddleware,
} from "@repo/security/proxy";
import { createNEMO } from "@rescale/nemo";
import { type NextProxy, type NextRequest } from "next/server";
import { env } from "./env";

const securityHeaders = env.FLAGS_SECRET
  ? securityMiddleware(noseconeOptionsWithToolbar)
  : securityMiddleware(noseconeOptions);

const isPublicRoute = createRouteMatcher([
  "/",
  "/docs(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/:locale",
  "/:locale/docs(.*)",
  "/:locale/sign-in(.*)",
  "/:locale/sign-up(.*)",
]);

const composedMiddleware = createNEMO(
  {},
  {
    before: [internationalizationMiddleware],
  }
);

// Clerk middleware wraps other middleware in its callback
// For apps using Clerk, compose middleware inside authMiddleware callback
export default authMiddleware(async (auth, request, event) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const headersResponse = securityHeaders();
  const middlewareResponse = await composedMiddleware(
    request as unknown as NextRequest,
    event
  );

  return middlewareResponse || headersResponse;
}) as unknown as NextProxy;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
