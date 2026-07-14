import { NextResponse } from "next/server";

import { requireSession } from "@/lib/auth/require-session";
import { createTask, createTaskSchema, listTasks } from "@/lib/store/tasks";

export async function GET() {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  const tasks = await listTasks(auth.session.sub);
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const auth = await requireSession();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid task payload",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const task = await createTask(auth.session.sub, parsed.data);
    return NextResponse.json({ task }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create task" },
      { status: 500 },
    );
  }
}
