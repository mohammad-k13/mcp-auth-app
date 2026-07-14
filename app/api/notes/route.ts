import { NextResponse } from "next/server";

import { requireSession } from "@/lib/auth/require-session";
import { createNote, createNoteSchema, listNotes } from "@/lib/store/notes";

export async function GET() {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  const notes = await listNotes(auth.session.sub);
  return NextResponse.json({ notes });
}

export async function POST(request: Request) {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const parsed = createNoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid note payload",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const note = await createNote(auth.session.sub, parsed.data);
    return NextResponse.json({ note }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create note" },
      { status: 500 },
    );
  }
}
