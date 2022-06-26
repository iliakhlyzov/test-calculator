export interface IExpressionParser {
  isValid: (str: string) => Promise<unknown>;
}

export interface ICalculatorCore {
  calculate: (expression: string) => number;
}
