/**
 * @jest-environment jsdom
 */

const { escapeHtml, safeParseJSON, schemas, getLocalData } = require('./utils.js');

describe('utils.js core functions', () => {

  describe('escapeHtml', () => {
    it('debería sanitizar códigos HTML maliciosos para prevenir XSS', () => {
      const input = '<script>alert("XSS")</script>';
      const sanitized = escapeHtml(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
    });

    it('debería manejar null o undefined sin lanzar errores', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });
  });

  describe('safeParseJSON', () => {
    it('debería parsear JSON válido', () => {
      expect(safeParseJSON('{"peso":80}', {})).toEqual({ peso: 80 });
    });

    it('debería regresar el valor por defecto en caso de un JSON corrupto', () => {
      expect(safeParseJSON('{peso: 80', { fallback: true })).toEqual({ fallback: true });
    });

    it('debería manejar valores nulos explícitos', () => {
      expect(safeParseJSON('null', { val: 1 })).toEqual({ val: 1 });
    });
  });

  describe('schemas validation', () => {
    it('debería validar esquemas de userData correctamente', () => {
      const valid = { currentWeight: 80, goalWeight: 70 };
      const invalid = { currentWeight: -5 }; // Negativo no permitido

      expect(schemas.userData.validate(valid).valid).toBe(true);
      expect(schemas.userData.validate(invalid).valid).toBe(false);
    });
  });

});
