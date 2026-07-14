import { NextResponse } from "next/server";

import {
  findUserByEmail,
  loginSchema,
  setAuthCookie,
  signAuthToken,
  toPublicUser,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid credentials payload",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = await signAuthToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      user: toPublicUser(user),
      message: "Signed in successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in right now" },
      { status: 500 },
    );
  }
}
