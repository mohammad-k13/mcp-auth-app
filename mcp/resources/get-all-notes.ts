import { listNotes } from "@/lib/store/notes";
import { McpServer } from "@modelcontextprotocol/server";

export function registerGetAllNotesResource(server: McpServer) {
  server.registerResource(
    "getAllNotes",
    "vault://notes/all",
    {
      title: "Get All Notes",
      description: "Get all notes for the user from the app with all data",
      mimeType: "application/json",
    },
    async (uri) => {
      const notes = await listNotes("1");
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(notes, null, 2),
          },
        ],
      };
    },
  );
}
