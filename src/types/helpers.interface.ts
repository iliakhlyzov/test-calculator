/*eslint no-undef: 0*/

import { ExtraOperations, Operations } from '../constants';

export type operand = number;
export type keyofOperations =
  | keyof typeof Operations
  | keyof typeof ExtraOperations;
export interface IExpressionParser {
  getNumbers: () => unknown[];
  getOperationsAndBrackets: () => unknown[];
  isValid: (str: string) => Promise<unknown>;
}

export interface ICalculatorCore {
  calculate: (expression: string) => number;
  execute: (
    operation: keyofOperations,
    left: operand,
    right: operand
  ) => number;
}
