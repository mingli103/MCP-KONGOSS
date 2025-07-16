import axios, { AxiosRequestConfig } from "axios";

export interface KongOssApiOptions {
    adminUrl?: string;
    adminToken?: string;
}

export class KongOssApi {
    private baseUrl: string;
    private adminToken?: string;

    constructor(options: KongOssApiOptions = {}) {
        this.baseUrl = options.adminUrl || process.env.KONG_ADMIN_URL || "http://localhost:8001";
        this.adminToken = options.adminToken || process.env.KONG_ADMIN_TOKEN;

        if (!this.baseUrl) {
            console.error("Warning: KONG_ADMIN_URL not set. Defaulting to http://localhost:8001");
        }
    }

    /**
     * Makes authenticated requests to Kong Admin API with consistent error handling
     */
    async kongRequest<T>(endpoint: string, method = "GET", data: any = null): Promise<T> {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            console.error(`Making request to: ${url}`);

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            };

            // Add admin token if provided
            if (this.adminToken) {
                headers["Authorization"] = `Bearer ${this.adminToken}`;
            }

            const config: AxiosRequestConfig = {
                method,
                url,
                headers,
                data: data ? data : undefined,
            };

            const response = await axios(config);
            console.error(`Received response with status: ${response.status}`);
            return response.data;
        } catch (error: any) {
            console.error("API request error:", error.message);

            if (error.response) {
                const errorData = error.response.data;
                let errorMessage = `Kong Admin API Error (Status ${error.response.status})`;

                if (typeof errorData === 'object') {
                    const errorDetails = errorData.message || JSON.stringify(errorData);
                    errorMessage += `: ${errorDetails}`;
                } else if (typeof errorData === 'string') {
                    errorMessage += `: ${errorData.substring(0, 200)}`;
                }

                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error("Network Error: No response received from Kong Admin API. Please check your network connection and Kong Admin API endpoint.");
            } else {
                throw new Error(`Request Error: ${error.message}. Please check your request parameters and try again.`);
            }
        }
    }

    // Analytics API methods for Kong OSS
    async getStatus(): Promise<any> {
        return this.kongRequest<any>("/status");
    }

    async getNodeInfo(): Promise<any> {
        return this.kongRequest<any>("/");
    }

    async getMetrics(): Promise<any> {
        return this.kongRequest<any>("/metrics");
    }

    async getHealth(): Promise<any> {
        return this.kongRequest<any>("/health");
    }

    // Get basic request statistics (if available via plugins)
    async getRequestStats(): Promise<any> {
        return this.kongRequest<any>("/status");
    }

    // Get plugin statistics
    async getPluginStats(): Promise<any> {
        // Kong paginates /plugins, so we need to follow 'next' links
        let allPlugins: any[] = [];
        let next: string | null = "/plugins";
        while (next) {
            const resp: any = await this.kongRequest<any>(next.startsWith("/plugins") ? next : `/plugins${next.replace(/^.*\/plugins/, "")}`);
            if (Array.isArray(resp.data)) {
                allPlugins = allPlugins.concat(resp.data);
            }
            next = resp.next || null;
        }
        return { data: allPlugins };
    }
} 
