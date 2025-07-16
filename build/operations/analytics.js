/**
 * Get Kong OSS node status and basic metrics
 */
export async function getKongStatus(api) {
    try {
        const status = await api.getStatus();
        const nodeInfo = await api.getNodeInfo();
        return {
            metadata: {
                timestamp: new Date().toISOString(),
                kongVersion: nodeInfo.version,
                nodeId: nodeInfo.node_id
            },
            status: {
                database: status.database,
                server: status.server,
                memory: status.memory,
                configuration: status.configuration
            },
            recommendations: [
                "Check database connectivity if status shows issues",
                "Monitor memory usage for potential resource constraints",
                "Verify configuration hash matches expected values"
            ]
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get Kong OSS metrics and performance data
 */
export async function getKongMetrics(api) {
    try {
        const metrics = await api.getMetrics();
        return {
            metadata: {
                timestamp: new Date().toISOString(),
                metricsType: "Prometheus format"
            },
            metrics: {
                kong: metrics.kong || {},
                database: metrics.database || {},
                http: metrics.http || {},
                latency: metrics.latency || {}
            },
            recommendations: [
                "Monitor kong_http_requests_total for traffic patterns",
                "Check kong_latency_bucket for performance issues",
                "Watch kong_upstream_target_health for backend health"
            ]
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get Kong OSS health status
 */
export async function getKongHealth(api) {
    try {
        const health = await api.getHealth();
        return {
            metadata: {
                timestamp: new Date().toISOString(),
                healthCheck: "Kong OSS Health Status"
            },
            health: {
                status: health.status || "unknown",
                details: health.details || {},
                timestamp: health.timestamp
            },
            recommendations: [
                "Ensure Kong is responding to health checks",
                "Monitor database connectivity",
                "Check for any configuration errors"
            ]
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get plugin statistics and analytics
 */
export async function getPluginStats(api) {
    try {
        const plugins = await api.getPluginStats();
        return {
            metadata: {
                timestamp: new Date().toISOString(),
                totalPlugins: plugins.data?.length || 0
            },
            plugins: plugins.data?.map((plugin) => ({
                id: plugin.id,
                name: plugin.name,
                enabled: plugin.enabled,
                serviceId: plugin.service?.id,
                routeId: plugin.route?.id,
                consumerId: plugin.consumer?.id,
                config: plugin.config,
                createdAt: plugin.created_at,
                updatedAt: plugin.updated_at
            })) || [],
            recommendations: [
                "Review enabled plugins for performance impact",
                "Check plugin configurations for security settings",
                "Monitor plugin-specific metrics for anomalies"
            ]
        };
    }
    catch (error) {
        throw error;
    }
}
