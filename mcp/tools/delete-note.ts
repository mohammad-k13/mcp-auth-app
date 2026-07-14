import { deleteNote } from "@/lib/store/notes";
import {
  CallToolResult,
  inputResponse,
  McpServer,
  ServerContext,
} from "@modelcontextprotocol/server";
import z from "zod";

const name = "deleteNote";
const config = {
  description: "Delete a note for the user",
  inputSchema: z.object({
    noteId: z.string().describe("The id of the note to delete"),
  }),
};

export function registerDeleteNoteTool(server: McpServer) {
  server.registerTool(
    name,
    config,
    async (inputs, extra: ServerContext): Promise<CallToolResult> => {
      const { noteId } = z.object({ noteId: z.string() }).parse(inputs);

      try {
        const deleted = await deleteNote("1", noteId);
        return {
          content: [{ type: "text", text: `Note deleted: ${deleted}` }],
        };
      } catch (error: any) {
        return {
          content: [
            { type: "text", text: `Error deleting note: ${error.message}` },
          ],
        };
      }
    },
  );
}
