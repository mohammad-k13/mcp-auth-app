import { NextResponse } from "next/server";

import { requireSession } from "@/lib/auth/require-session";
import { deleteTask, toggleTask } from "@/lib/store/tasks";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(_request: Request, context: RouteContext) {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const task = await toggleTask(auth.session.sub, id);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const deleted = await deleteTask(auth.session.sub, id);

  if (!deleted) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted" });
}
