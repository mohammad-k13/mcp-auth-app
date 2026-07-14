import { redirect } from "next/navigation";

import { DashboardView } from "@/components/auth/dashboard-view";
import { getSession } from "@/lib/auth";
import { listNotes } from "@/lib/store/notes";
import { listTasks } from "@/lib/store/tasks";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const [notes, tasks] = await Promise.all([
    listNotes(session.sub),
    listTasks(session.sub),
  ]);

  return (
    <DashboardView
      user={{
        id: session.sub,
        name: session.name,
        email: session.email,
      }}
      notes={notes}
      tasks={tasks}
    />
  );
}
