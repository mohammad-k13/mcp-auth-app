import { z } from "zod";

import {
  createId,
  getUserData,
  updateUserData,
  type Note,
} from "@/lib/store/db";

export const createNoteSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(80),
  body: z.string().trim().min(1, "Note body is required").max(500),
});

export async function listNotes(userId: string): Promise<Note[]> {
  const data = await getUserData(userId);
  return data.notes;
}

export async function createNote(
  userId: string,
  input: z.infer<typeof createNoteSchema>,
): Promise<Note> {
  const note: Note = {
    id: createId("note"),
    title: input.title,
    body: input.body,
    createdAt: new Date().toISOString(),
  };

  await updateUserData(userId, (current) => ({
    ...current,
    notes: [note, ...current.notes],
  }));

  return note;
}

export async function deleteNote(
  userId: string,
  noteId: string,
): Promise<boolean> {
  let deleted = false;

  await updateUserData(userId, (current) => {
    const nextNotes = current.notes.filter((note) => note.id !== noteId);
    deleted = nextNotes.length !== current.notes.length;
    return { ...current, notes: nextNotes };
  });

  return deleted;
}
