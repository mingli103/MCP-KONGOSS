# Kong OSS MCP Server

A Model Context Protocol (MCP) server for Kong OSS API Gateway analytics and monitoring.

## Overview

This MCP server provides analytics tools for Kong OSS, allowing AI assistants to monitor Kong gateway health, metrics, and plugin statistics through natural language conversation.

## Features

- **Kong Status**: Get node status, database connectivity, and system information
- **Kong Metrics**: Retrieve Prometheus-formatted metrics for monitoring
- **Kong Health**: Check overall system health and configuration validity
- **Plugin Statistics**: Analyze plugin configurations and performance impact

## Installation

### Prerequisites

- Node.js 20 or higher
- Kong OSS running with Admin API accessible
- MCP-compatible client (Claude Desktop, Cursor, etc.)

### Setup

```bash
# Clone and navigate to the project
cd MCP-KONGOSS

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Set the following environment variables:

```bash
# Required: Kong Admin API URL (defaults to http://localhost:8001)
export KONG_ADMIN_URL=http://localhost:8001

# Optional: Kong Admin API token for authentication
export KONG_ADMIN_TOKEN=your_admin_token_here
```

## Usage

### Start the MCP Server

```bash
npm start
```

### Run Tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev/).

### Available Tools

#### Get Kong Status

Get Kong OSS node status and basic system information.

#### Get Kong Metrics

Retrieve Kong metrics in Prometheus format for monitoring.

#### Get Kong Health

Check Kong health status and configuration validity.

#### Get Plugin Statistics

Analyze plugin configurations and their impact.

## Development

```bash
# Development mode with auto-rebuild
npm run dev

# Run all tests
npm test
```

## CI/CD

This project uses GitHub Actions for CI/CD. All pushes and pull requests to `main` will automatically run build and test steps.

## Architecture

```
src/
├── index.ts        # Main MCP server entry point
├── api.ts          # Kong Admin API client
├── analytics.ts    # Analytics operations
└── tools.ts        # Tool definitions
```

## Kong OSS Integration

This MCP server connects to Kong OSS via the Admin API endpoints:

- `/status` - Node status and health
- `/metrics` - Prometheus metrics
- `/health` - Health check endpoint
- `/plugins` - Plugin configurations

## Troubleshooting

1. **Connection Issues**: Verify Kong Admin API is accessible at the configured URL
2. **Authentication**: Check if Kong requires admin token authentication
3. **CORS**: Ensure Kong Admin API allows requests from your environment
4. **Network**: Verify network connectivity between MCP server and Kong instance
