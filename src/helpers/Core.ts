import { ICalculatorCore } from '../types/helpers.interface';

export class Core implements ICalculatorCore {
  calculate = (expression: string) => Math.random();
}
