export interface IExpressionParser {
  isValid: (str: string) => boolean;
}

export interface ICalculatorCore {
  calculate: (expression: string) => number;
}
