/* eslint-disable */

import { Core } from '../src/helpers/Core';
import { Parser } from '../src/helpers/Parser';

describe('Helpers Tests', () => {
  describe('Parser Tests', () => {
    const parser = new Parser();

    it('* should be valid - one number', async () => {
      const str = '141';
      expect(await parser.isValid(str)).toBeTruthy();
    });
    it('* should be valid - operations', async () => {
      const str = '1+2-3*4/5';
      expect(await parser.isValid(str)).toBeTruthy();
    });
    it('* should be valid - brackets and spaces', async () => {
      const str = '(1+3) * 18 /((294) * 255)';
      expect(await parser.isValid(str)).toBeTruthy();
    });
    it('* should be valid - float numbers', async () => {
      const str = '(1+3.13) * 18.12 /((294.141) * 255)';
      expect(await parser.isValid(str)).toBeTruthy();
    });
    it('* should be valid - negative float numbers', async () => {
      const str = '(1+-3.13) * -18.12 /((294.141) * -255)';
      expect(await parser.isValid(str)).toBeTruthy();
    });

    it('should be invalid - empty string', async () => {
      const str = '';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - wrong symbols', async () => {
      const str = '2+a';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - wrong symbols 2', async () => {
      const str = 'hello*moto';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - double negation', async () => {
      const str = '--1';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - extra close bracket', async () => {
      const str = '18+((123+1)*2))';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - extra open bracket', async () => {
      const str = '(18+1)*(1';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('* should be invalid - dobule point', async () => {
      const str = '1..0 + 2';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - wrong end', async () => {
      const str = '1.0*';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - incorrect use of brackets', async () => {
      const str = '16.8 + ()';
      expect(await parser.isValid(str)).toBeFalsy();
    });
    it('should be invalid - incorrect use of brackets 2', async () => {
      const str = ')16.8+7(';
      expect(await parser.isValid(str)).toBeFalsy();
    });
  });
  describe('Core Tests', () => {
    const core = new Core();
    it('should be 4 +', () => {
      expect(core.calculate('2+2')).toBe(4);
    });
    it('should be 4 *', () => {
      expect(core.calculate('2*2')).toBe(4);
    });
    it('should be 1 /', () => {
      expect(core.calculate('2/2')).toBe(4);
    });
    it('should be 0 /', () => {
      expect(core.calculate('2/2')).toBe(4);
    });
    it('should be error - division by 0', () => {
      expect(core.calculate('2/(2-2)')).toBe(4);
    });
    it('should be 0.01 - correct work with float numbers', () => {
      expect(core.calculate('0.1*0.1')).toBe(4);
    });
    it('should be 4 - correct order operations: division', () => {
      expect(core.calculate('2 / 1 + 2')).toBe(4);
    });
    it('should be 4 - correct order operations: mul', () => {
      expect(core.calculate('2 * 1 + 2')).toBe(4);
    });
    it('should be 0 - negative numbers', () => {
      expect(core.calculate('18+-18')).toBe(4);
    });

    it('should be 0 - hard works with brackets and negative numbers', () => {
      expect(core.calculate('(18/2)*(16+32/(2*-1))')).toBe(4);
    });

    it('assotiative: should be equal: add, mul', () => {
      expect(core.calculate('1+4')).toBe(core.calculate('4+1'));
      expect(core.calculate('1*4')).toBe(core.calculate('4*1'));
    });
    it('non assotiative: should be not equal, div, ', () => {
      expect(core.calculate('6/3')).not.toBe(core.calculate('3/6'));
      expect(core.calculate('8-2')).toBe(core.calculate('2-8'));
    });
  });
});
