import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/:path*", "/api/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
