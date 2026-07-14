import { z } from "zod";

import {
  createId,
  getUserData,
  updateUserData,
  type Task,
} from "@/lib/store/db";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required").max(120),
});

export async function listTasks(userId: string): Promise<Task[]> {
  const data = await getUserData(userId);
  return data.tasks;
}

export async function createTask(
  userId: string,
  input: z.infer<typeof createTaskSchema>,
): Promise<Task> {
  const task: Task = {
    id: createId("task"),
    title: input.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  await updateUserData(userId, (current) => ({
    ...current,
    tasks: [task, ...current.tasks],
  }));

  return task;
}

export async function toggleTask(
  userId: string,
  taskId: string,
): Promise<Task | null> {
  let updated: Task | null = null;

  await updateUserData(userId, (current) => ({
    ...current,
    tasks: current.tasks.map((task) => {
      if (task.id !== taskId) return task;
      updated = { ...task, completed: !task.completed };
      return updated;
    }),
  }));

  return updated;
}

export async function deleteTask(
  userId: string,
  taskId: string,
): Promise<boolean> {
  let deleted = false;

  await updateUserData(userId, (current) => {
    const nextTasks = current.tasks.filter((task) => task.id !== taskId);
    deleted = nextTasks.length !== current.tasks.length;
    return { ...current, tasks: nextTasks };
  });

  return deleted;
}
