import { createTask, createTaskSchema } from "@/lib/store/tasks";
import {
  CallToolResult,
  McpServer,
  ServerContext,
} from "@modelcontextprotocol/server";

const name = "createTask";
const config = {
  description: "Create a new task for the user",
  inputSchema: createTaskSchema,
};
export function registerCreateTaskTool(server: McpServer) {
  server.registerTool(
    name,
    config,
    async (inputs, extra: ServerContext): Promise<CallToolResult> => {
      const { title } = createTaskSchema.parse(inputs);
      try {
        const task = await createTask("1", { title });
        return {
          content: [{ type: "text", text: `Task created: ${task.id}` }],
        };
      } catch (error: any) {
        return {
          content: [
            { type: "text", text: `Error creating task: ${error.message}` },
          ],
        };
      }
    },
  );
}
