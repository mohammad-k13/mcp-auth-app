import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import { JWT_EXPIRES_IN, JWT_SECRET } from "@/lib/auth/config";

export type AuthTokenPayload = JWTPayload & {
  sub: string;
  email: string;
  name: string;
};

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function signAuthToken(payload: {
  id: string;
  email: string;
  name: string;
}): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecretKey());
}

export async function verifyAuthToken(
  token: string,
): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }

    return payload as AuthTokenPayload;
  } catch {
    return null;
  }
}
