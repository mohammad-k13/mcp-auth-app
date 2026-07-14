import { McpServer } from "@modelcontextprotocol/server";
import { registerCreateNoteTool } from "./create-note";
import { registerDeleteNoteTool } from "./delete-note";
import { registerCompleteTaskTool } from "./complete-task";
import { registerDeleteTaskTool } from "./delete-task";
import { registerCreateTaskTool } from "./create-task";

export const registerTools = (server: McpServer) => {
    registerCreateNoteTool(server);
    registerDeleteNoteTool(server);
    registerCompleteTaskTool(server);
    registerDeleteTaskTool(server);
    registerCreateTaskTool(server);
}