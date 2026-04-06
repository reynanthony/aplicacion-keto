/**
 * @jest-environment jsdom
 */

const { CloudSyncAdapter } = require('./modules/cloudSync.js');

describe('CloudSyncAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debería exportar un payload correctamente estructurado', () => {
    localStorage.setItem('userData', JSON.stringify({ currentWeight: 80 }));
    
    const cloudSync = new CloudSyncAdapter();
    const payload = cloudSync.exportPayload();
    
    expect(payload).toHaveProperty('version');
    expect(payload).toHaveProperty('timestamp');
    expect(payload.data).toHaveProperty('userData');
    expect(JSON.parse(payload.data.userData).currentWeight).toBe(80);
  });

  it('debería importar un payload correctamente e hidratar localStorage', () => {
    const cloudSync = new CloudSyncAdapter();
    const mockPayload = {
      version: '2.0.0',
      data: {
        'keto_profile': '{"goalWeight":70}'
      }
    };
    
    const result = cloudSync.importPayload(mockPayload);
    expect(result).toBe(true);
    expect(localStorage.getItem('keto_profile')).toBe('{"goalWeight":70}');
    expect(localStorage.getItem('last_cloud_sync')).toBeTruthy();
  });

  it('debería rechazar un payload malformado', () => {
    const cloudSync = new CloudSyncAdapter();
    expect(() => cloudSync.importPayload({})).toThrow("Formato de backup inválido.");
  });
});
