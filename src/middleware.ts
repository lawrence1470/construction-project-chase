import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  ignoredRoutes: [],
  // Set the paths that don't require the user to be signed in
  // Sign in and sign up pages are already made public by Clerk
  publicRoutes: ["/", "/api/trpc/example.hello"],
  afterAuth: (auth, req, evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // rededirect them to organization selection page if they are not part of an org
    console.log(auth.orgId, auth.userId, "testing", auth.user);
    if (
      !auth.orgId &&
      auth.userId &&
      req.nextUrl.pathname !== "/organizations/select"
    ) {
      const orgSelectionUrl = new URL("/organizations/select", req.url);
      return NextResponse.redirect(orgSelectionUrl);
    }
  },
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/"],
};
