import { NextResponse } from "next/server";

import { getSession, type AuthTokenPayload } from "@/lib/auth";

export async function requireSession(): Promise<
  | { session: AuthTokenPayload; error?: never }
  | { session?: never; error: NextResponse }
> {
  const session = await getSession();

  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session };
}
