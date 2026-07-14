import { McpServer } from "@modelcontextprotocol/server";
import { registerGetAllNotesResource } from "./get-all-notes";

export function registerResources(server: McpServer) {
    registerGetAllNotesResource(server);
}