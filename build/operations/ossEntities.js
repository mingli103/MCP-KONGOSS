/**
 * Get information about the current Kong OSS node
 */
export async function getNode(api) {
    try {
        const result = await api.getNodeInfo();
        return {
            node: result
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * List all services in Kong OSS
 */
export async function listServices(api, pageSize = 100, offset, filterName) {
    try {
        const params = { size: pageSize };
        if (offset)
            params.offset = offset;
        if (filterName)
            params.name = filterName;
        const query = "?" +
            Object.entries(params)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join("&");
        const result = await api.kongRequest(`/services${query}`);
        return {
            metadata: {
                pageSize,
                offset: offset || null,
                next: result.next || null,
                total: result.total || null,
                filterName: filterName || null
            },
            services: result.data.map((svc) => ({
                id: svc.id,
                name: svc.name,
                host: svc.host,
                port: svc.port,
                protocol: svc.protocol,
                path: svc.path,
                retries: svc.retries,
                connectTimeout: svc.connect_timeout,
                writeTimeout: svc.write_timeout,
                readTimeout: svc.read_timeout,
                tags: svc.tags,
                createdAt: svc.created_at,
                updatedAt: svc.updated_at
            })),
            usage: {
                instructions: "Use the service id from these results with getService to fetch more details.",
                pagination: "Use the 'next' offset for more results."
            }
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get detailed information about a specific service by ID
 */
export async function getService(api, serviceId) {
    try {
        const result = await api.kongRequest(`/services/${serviceId}`);
        return {
            service: result
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * List all routes in Kong OSS
 */
export async function listRoutes(api, pageSize = 100, offset, filterName) {
    try {
        const params = { size: pageSize };
        if (offset)
            params.offset = offset;
        if (filterName)
            params.name = filterName;
        const query = "?" +
            Object.entries(params)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join("&");
        const result = await api.kongRequest(`/routes${query}`);
        return {
            metadata: {
                pageSize,
                offset: offset || null,
                next: result.next || null,
                total: result.total || null,
                filterName: filterName || null
            },
            routes: result.data.map((route) => ({
                id: route.id,
                name: route.name,
                protocols: route.protocols,
                methods: route.methods,
                hosts: route.hosts,
                paths: route.paths,
                service: route.service,
                tags: route.tags,
                createdAt: route.created_at,
                updatedAt: route.updated_at
            })),
            usage: {
                instructions: "Use the route id from these results with getRoute to fetch more details.",
                pagination: "Use the 'next' offset for more results."
            }
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get detailed information about a specific route by ID
 */
export async function getRoute(api, routeId) {
    try {
        const result = await api.kongRequest(`/routes/${routeId}`);
        return {
            route: result
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * List all consumers in Kong OSS
 */
export async function listConsumers(api, pageSize = 100, offset, filterUsername) {
    try {
        const params = { size: pageSize };
        if (offset)
            params.offset = offset;
        if (filterUsername)
            params.username = filterUsername;
        const query = "?" +
            Object.entries(params)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join("&");
        const result = await api.kongRequest(`/consumers${query}`);
        return {
            metadata: {
                pageSize,
                offset: offset || null,
                next: result.next || null,
                total: result.total || null,
                filterUsername: filterUsername || null
            },
            consumers: result.data.map((c) => ({
                id: c.id,
                username: c.username,
                customId: c.custom_id,
                tags: c.tags,
                createdAt: c.created_at,
                updatedAt: c.updated_at
            })),
            usage: {
                instructions: "Use the consumer id from these results with getConsumer to fetch more details.",
                pagination: "Use the 'next' offset for more results."
            }
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get detailed information about a specific consumer by ID
 */
export async function getConsumer(api, consumerId) {
    try {
        const result = await api.kongRequest(`/consumers/${consumerId}`);
        return {
            consumer: result
        };
    }
    catch (error) {
        throw error;
    }
}
