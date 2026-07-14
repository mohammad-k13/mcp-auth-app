import { deleteTask } from "@/lib/store/tasks";
import {
  CallToolResult,
  McpServer,
  ServerContext,
} from "@modelcontextprotocol/server";
import z from "zod";

const name = "deleteTask";
const config = {
  description: "Delete a task for the user",
  inputSchema: z.object({
    taskId: z.string().describe("The id of the task to delete"),
  }),
};
export function registerDeleteTaskTool(server: McpServer) {
  server.registerTool(
    name,
    config,
    async (inputs, extra: ServerContext): Promise<CallToolResult> => {
      const { taskId } = z.object({ taskId: z.string() }).parse(inputs);
      try {
        const deleted = await deleteTask("1", taskId);
        return {
          content: [{ type: "text", text: `Task deleted: ${deleted}` }],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error deleting task: ${error.message}` }],
        };
      };
    },
  );
}
