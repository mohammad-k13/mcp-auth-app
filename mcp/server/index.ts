import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { registerTools } from "../tools";
import { registerResources } from "../resources";

export function createServer(): McpServer {
  console.error("Creating MCP server");
  const server = new McpServer(
    {
      name: "mcp_auth_server",
      title: "Auth MCP",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: { listChanged: true },
        resources: { listChanged: true },
      },
    },
  );

  registerTools(server);
  registerResources(server);

  return server;
}
