export const AUTH_COOKIE_NAME = "auth_token";

export const JWT_SECRET =
  process.env.JWT_SECRET ?? "dev-secret-change-me-in-production";

export const JWT_EXPIRES_IN = "7d";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
