import { toggleTask } from "@/lib/store/tasks";
import {
  CallToolResult,
  McpServer,
  ServerContext,
} from "@modelcontextprotocol/server";
import z from "zod";

const name = "completeTask";
const config = {
  description: "Complete a task for the user",
  inputSchema: z.object({
    taskId: z.string().describe("The id of the task to complete"),
  }),
};
export function registerCompleteTaskTool(server: McpServer) {
  server.registerTool(
    name,
    config,
    async (inputs, extra: ServerContext): Promise<CallToolResult> => {
      const { taskId } = z.object({ taskId: z.string() }).parse(inputs);
      try {
        const task = await toggleTask("1", taskId);
        return {
          content: [{ type: "text", text: `Task completed: ${task?.id}` }],
        };
      } catch (error: any) {
        return {
          content: [
            { type: "text", text: `Error completing task: ${error.message}` },
          ],
        };
      }
    },
  );
}
