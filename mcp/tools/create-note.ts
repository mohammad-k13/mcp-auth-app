import { createNote, createNoteSchema } from "@/lib/store/notes";
import {
  CallToolResult,
  McpServer,
  ServerContext,
} from "@modelcontextprotocol/server";

const name = "createNote";
const config = {
  description: "Create a new note for the user",
  inputSchema: createNoteSchema,
};
export function registerCreateNoteTool(server: McpServer) {
  server.registerTool(
    name,
    config,
    async (inputs, extra: ServerContext): Promise<CallToolResult> => {
      const { title, body } = createNoteSchema.parse(inputs);

      try {
        const note = await createNote("1", { body, title });
        return {
          content: [{ type: "text", text: `Note create with id: ${note.id}` }],
        };
      } catch (error: any) {
        return {
          content: [
            { type: "text", text: `Error creating note: ${error.message}` },
          ],
        };
      }
    },
  );
}
