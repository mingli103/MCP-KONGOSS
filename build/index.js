import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools.js";
import { KongOssApi } from "./api.js";
import * as analytics from "./operations/analytics.js";
import * as ossEntities from "./operations/ossEntities.js";
/**
 * Main MCP server class for Kong OSS analytics integration
 */
class KongOssMcpServer extends McpServer {
    api;
    constructor(options = {}) {
        super({
            name: "kong-oss-mcp",
            version: "1.0.0",
            description: "Analytics tools for Kong OSS API Gateway monitoring and health checks"
        });
        // Initialize the API client
        this.api = new KongOssApi({
            adminUrl: options.adminUrl,
            adminToken: options.adminToken
        });
        // Register all tools
        this.registerTools();
    }
    registerTools() {
        const allTools = tools();
        allTools.forEach(tool => {
            this.tool(tool.method, tool.description, tool.parameters.shape, async (args, _extra) => {
                try {
                    let result;
                    console.error(`[MCP] Tool called: ${tool.method} with args:`, args);
                    // Route to appropriate handler based on method
                    switch (tool.method) {
                        case "get_kong_status":
                            result = await analytics.getKongStatus(this.api);
                            break;
                        case "get_kong_metrics":
                            result = await analytics.getKongMetrics(this.api);
                            break;
                        case "get_plugin_stats":
                            result = await analytics.getPluginStats(this.api);
                            break;
                        case "list_services":
                            result = await ossEntities.listServices(this.api, args.pageSize, args.offset, args.filterName);
                            break;
                        case "get_service":
                            result = await ossEntities.getService(this.api, args.serviceId);
                            break;
                        case "list_routes":
                            result = await ossEntities.listRoutes(this.api, args.pageSize, args.offset, args.filterName);
                            break;
                        case "get_route":
                            result = await ossEntities.getRoute(this.api, args.routeId);
                            break;
                        case "list_consumers":
                            result = await ossEntities.listConsumers(this.api, args.pageSize, args.offset, args.filterUsername);
                            break;
                        case "get_consumer":
                            result = await ossEntities.getConsumer(this.api, args.consumerId);
                            break;
                        default:
                            throw new Error(`Unknown tool method: ${tool.method}`);
                    }
                    console.error(`[MCP] Tool result for ${tool.method}:`, result);
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify(result, null, 2)
                            }
                        ]
                    };
                }
                catch (error) {
                    console.error(`[MCP] Tool error for ${tool.method}:`, error);
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error: ${error.message}\n\nTroubleshooting tips:\n1. Verify your Kong Admin API is accessible\n2. Check that the parameters provided are valid\n3. Ensure your network connection to the Kong Admin API is working properly`
                            }
                        ],
                        isError: true
                    };
                }
            });
        });
    }
}
/**
 * Main function to run the server
 */
async function main() {
    // Get admin URL and token from environment if not provided
    const adminUrl = process.env.KONG_ADMIN_URL;
    const adminToken = process.env.KONG_ADMIN_TOKEN;
    // Create server instance
    const server = new KongOssMcpServer({
        adminUrl,
        adminToken
    });
    // Create transport and connect
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Kong OSS MCP Server is running...");
}
// Run the server
main().catch((error) => {
    console.error("Initialization error:", error);
    process.exit(1);
});
