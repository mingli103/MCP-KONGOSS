import { z } from "zod";

export type Tool = {
    method: string;
    name: string;
    description: string;
    parameters: z.ZodObject<any, any, any, any>;
    category: string;
};

export const tools = (): Tool[] => [
    // =========================
    // Kong OSS Analytics Tools
    // =========================
    {
        method: "get_kong_status",
        name: "Get Kong Status",
        description: "Get Kong OSS node status, database connectivity, and basic system information including memory usage and configuration hash.",
        parameters: z.object({}),
        category: "analytics"
    },
    {
        method: "get_kong_metrics",
        name: "Get Kong Metrics",
        description: "Retrieve Kong OSS metrics in Prometheus format including HTTP requests, latency, database operations, and upstream health.",
        parameters: z.object({}),
        category: "analytics"
    },
    {
        method: "get_plugin_stats",
        name: "Get Plugin Statistics",
        description: "Get statistics and configuration details for all plugins configured in Kong OSS including enabled status and performance impact.",
        parameters: z.object({}),
        category: "analytics"
    },
    {
        method: "list_services",
        name: "List Services",
        description: "List all services in Kong OSS, with optional pagination and filtering.",
        parameters: z.object({
            pageSize: z.number().optional(),
            offset: z.string().optional(),
            filterName: z.string().optional()
        }),
        category: "entities"
    },
    {
        method: "get_service",
        name: "Get Service",
        description: "Get detailed information about a specific service by ID.",
        parameters: z.object({
            serviceId: z.string()
        }),
        category: "entities"
    },
    {
        method: "list_routes",
        name: "List Routes",
        description: "List all routes in Kong OSS, with optional pagination and filtering.",
        parameters: z.object({
            pageSize: z.number().optional(),
            offset: z.string().optional(),
            filterName: z.string().optional()
        }),
        category: "entities"
    },
    {
        method: "get_route",
        name: "Get Route",
        description: "Get detailed information about a specific route by ID.",
        parameters: z.object({
            routeId: z.string()
        }),
        category: "entities"
    },
    {
        method: "list_consumers",
        name: "List Consumers",
        description: "List all consumers in Kong OSS, with optional pagination and filtering.",
        parameters: z.object({
            pageSize: z.number().optional(),
            offset: z.string().optional(),
            filterUsername: z.string().optional()
        }),
        category: "entities"
    },
    {
        method: "get_consumer",
        name: "Get Consumer",
        description: "Get detailed information about a specific consumer by ID.",
        parameters: z.object({
            consumerId: z.string()
        }),
        category: "entities"
    }
]; 
