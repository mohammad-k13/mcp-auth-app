export { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS, JWT_SECRET } from "@/lib/auth/config";
export { signAuthToken, verifyAuthToken } from "@/lib/auth/jwt";
export type { AuthTokenPayload } from "@/lib/auth/jwt";
export { requireSession } from "@/lib/auth/require-session";
export {
  clearAuthCookie,
  getAuthToken,
  getSession,
  setAuthCookie,
} from "@/lib/auth/session";
export { loginSchema } from "@/lib/auth/schemas";
export type { LoginInput } from "@/lib/auth/schemas";
export { DEMO_USERS, findUserByEmail, toPublicUser } from "@/lib/auth/users";
export type { User } from "@/lib/auth/users";