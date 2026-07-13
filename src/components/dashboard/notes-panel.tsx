"use client";

import { FormEvent, useState } from "react";
import { Loader2, NotebookPen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Note } from "@/lib/store/db";

type NotesPanelProps = {
  initialNotes: Note[];
};

export function NotesPanel({ initialNotes }: NotesPanelProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const data = (await response.json()) as {
        note?: Note;
        error?: string;
      };

      if (!response.ok || !data.note) {
        setError(data.error ?? "Could not save note");
        return;
      }

      setNotes((current) => [data.note!, ...current]);
      setTitle("");
      setBody("");
    } catch {
      setError("Could not save note");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(noteId: string) {
    setError(null);
    setDeletingId(noteId);

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Could not delete note");
        return;
      }

      setNotes((current) => current.filter((note) => note.id !== noteId));
    } catch {
      setError("Could not delete note");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Card className="border-0 bg-card/90 shadow-[0_24px_80px_-40px_oklch(0.3_0.05_155_/_0.55)] backdrop-blur-md ring-1 ring-border/70">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <NotebookPen className="size-5" />
        </div>
        <CardTitle className="font-heading text-2xl font-normal tracking-tight">
          Quick notes
        </CardTitle>
        <CardDescription>
          Create and delete notes. Saved per user in local JSON storage.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="note-title">Title</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Meeting follow-ups"
              className="h-10"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note-body">Body</Label>
            <textarea
              id="note-body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Write a short note…"
              required
              rows={3}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
          <Button type="submit" className="h-10 w-full" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Add note"
            )}
          </Button>
        </form>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <ul className="space-y-3">
          {notes.length === 0 ? (
            <li className="rounded-xl bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
              No notes yet. Add your first one above.
            </li>
          ) : (
            notes.map((note) => (
              <li
                key={note.id}
                className="rounded-xl bg-secondary/70 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{note.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {note.body}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(note.id)}
                    disabled={deletingId === note.id}
                    aria-label={`Delete note ${note.title}`}
                  >
                    {deletingId === note.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
