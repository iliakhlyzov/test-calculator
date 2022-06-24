import { IExpressionParser } from '../types/helpers.interface';

export class Parser implements IExpressionParser {
  validate = (str: string) => str;
}
