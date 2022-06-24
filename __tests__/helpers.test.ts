/* eslint-disable */

import { Core } from '../src/helpers/Core';
import { Parser } from '../src/helpers/Parser';

describe('Helpers Tests', () => {
  describe('Parser Tests', () => {
    const parser = new Parser();
    it('* should be valid from empty string', () => {
      const str = '';
      expect(parser.isValid(str)).toBeTruthy();
    });
    it('should be invalid from string with symbols', () => {
      const str = '1+a';
      expect(parser.isValid(str)).toBeFalsy();
    });
    it('should be valid from all available symbols', () => {
      const str = '0+1.2-3+4*5/6+7+(8+9)';
      expect(parser.isValid(str)).toBeTruthy();
    });
    it('* should be invalid with extra close bracket', () => {
      const str = '18+((123+1)*2))';
      expect(parser.isValid(str)).toBeFalsy();
    });
    it('should be valid from correct count of brackets', () => {
      const str = '18+((123+1)*2)';
      expect(parser.isValid(str)).toBeTruthy();
    });
    it('should be invalid with extra open bracket', () => {
      const str = '(18+1)*(1';
      expect(parser.isValid(str)).toBeFalsy();
    });
  });
  describe('Core Tests', () => {
    const core = new Core();
  });
});
