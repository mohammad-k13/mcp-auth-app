import { NextResponse } from "next/server";

import { requireSession } from "@/lib/auth/require-session";
import { deleteNote } from "@/lib/store/notes";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const deleted = await deleteNote(auth.session.sub, id);

  if (!deleted) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Note deleted" });
}
