"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Circle, ListTodo, Loader2, Trash2 } from "lucide-react";

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
import type { Task } from "@/lib/store/db";

type TasksPanelProps = {
  initialTasks: Task[];
};

export function TasksPanel({ initialTasks }: TasksPanelProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = (await response.json()) as {
        task?: Task;
        error?: string;
      };

      if (!response.ok || !data.task) {
        setError(data.error ?? "Could not create task");
        return;
      }

      setTasks((current) => [data.task!, ...current]);
      setTitle("");
    } catch {
      setError("Could not create task");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggle(taskId: string) {
    setError(null);
    setPendingId(taskId);

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
      });

      const data = (await response.json()) as {
        task?: Task;
        error?: string;
      };

      if (!response.ok || !data.task) {
        setError(data.error ?? "Could not update task");
        return;
      }

      setTasks((current) =>
        current.map((task) => (task.id === taskId ? data.task! : task)),
      );
    } catch {
      setError("Could not update task");
    } finally {
      setPendingId(null);
    }
  }

  async function handleDelete(taskId: string) {
    setError(null);
    setPendingId(taskId);

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Could not delete task");
        return;
      }

      setTasks((current) => current.filter((task) => task.id !== taskId));
    } catch {
      setError("Could not delete task");
    } finally {
      setPendingId(null);
    }
  }

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <Card className="border-0 bg-card/90 shadow-[0_24px_80px_-40px_oklch(0.3_0.05_155_/_0.55)] backdrop-blur-md ring-1 ring-border/70">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ListTodo className="size-5" />
        </div>
        <CardTitle className="font-heading text-2xl font-normal tracking-tight">
          Tasks
        </CardTitle>
        <CardDescription>
          Add, toggle, and delete tasks. {remaining} open right now.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="task-title">New task</Label>
            <div className="flex gap-2">
              <Input
                id="task-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ship the dashboard polish"
                className="h-10"
                required
              />
              <Button type="submit" className="h-10 shrink-0" disabled={isSaving}>
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : "Add"}
              </Button>
            </div>
          </div>
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
          {tasks.length === 0 ? (
            <li className="rounded-xl bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
              No tasks yet. Add one to get started.
            </li>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-xl bg-secondary/70 px-3 py-2.5"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleToggle(task.id)}
                  disabled={pendingId === task.id}
                  aria-label={
                    task.completed
                      ? `Mark ${task.title} as open`
                      : `Complete ${task.title}`
                  }
                >
                  {pendingId === task.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : task.completed ? (
                    <CheckCircle2 className="size-4 text-primary" />
                  ) : (
                    <Circle className="size-4" />
                  )}
                </Button>

                <p
                  className={`min-w-0 flex-1 text-sm ${
                    task.completed
                      ? "text-muted-foreground line-through"
                      : "font-medium"
                  }`}
                >
                  {task.title}
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(task.id)}
                  disabled={pendingId === task.id}
                  aria-label={`Delete task ${task.title}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
