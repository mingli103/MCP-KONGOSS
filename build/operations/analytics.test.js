import { describe, it, expect, vi } from 'vitest';
import { KongOssApi } from '../api.js';
import { getKongStatus } from './analytics.js';
describe('getKongStatus', () => {
    it('should return status with expected properties', async () => {
        const api = new KongOssApi();
        vi.spyOn(api, 'kongRequest').mockResolvedValue({
            database: {},
            server: {},
            memory: {},
            configuration: {}
        });
        const result = await getKongStatus(api);
        expect(result).toHaveProperty('metadata');
        expect(result).toHaveProperty('status');
        expect(result.status).toHaveProperty('database');
        expect(result.status).toHaveProperty('server');
        expect(result.status).toHaveProperty('memory');
    });
});
