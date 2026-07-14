import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./server";

async function main() {
    console.error("Starting transport initializing");
    const transport = new StdioServerTransport();

    const server = createServer();
    server.connect(transport);
}

main().catch((err) => {
    console.error("server Error", err);
    process.exit(1);
});