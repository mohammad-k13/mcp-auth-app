"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut, ShieldCheck } from "lucide-react";

import { NotesPanel } from "@/components/dashboard/notes-panel";
import { TasksPanel } from "@/components/dashboard/tasks-panel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Note, Task } from "@/lib/store/db";

type DashboardViewProps = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  notes: Note[];
  tasks: Task[];
};

export function DashboardView({ user, notes, tasks }: DashboardViewProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="auth-shell min-h-dvh px-4 py-10 sm:px-6">
      <div className="auth-panel mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="font-heading text-3xl tracking-tight italic">Vault</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Authenticated workspace
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="h-10"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            Sign out
          </Button>
        </header>

        <Card className="border-0 bg-card/90 shadow-[0_24px_80px_-40px_oklch(0.3_0.05_155_/_0.55)] backdrop-blur-md ring-1 ring-border/70">
          <CardHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="font-heading text-3xl font-normal tracking-tight">
              Hello, {user.name}
            </CardTitle>
            <CardDescription>
              Your JWT session is active. Notes and tasks below call authenticated
              APIs and persist to disk.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-secondary/70 px-4 py-3">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Email
              </p>
              <p className="mt-1 text-sm font-medium">{user.email}</p>
            </div>
            <div className="rounded-xl bg-secondary/70 px-4 py-3">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                User ID
              </p>
              <p className="mt-1 text-sm font-medium">{user.id}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <NotesPanel initialNotes={notes} />
          <TasksPanel initialTasks={tasks} />
        </div>
      </div>
    </main>
  );
}
