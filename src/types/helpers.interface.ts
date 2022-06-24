export interface IExpressionParser {
  validate: (str: string) => string;
}

export interface ICalculatorCore {
  calculate: (expression: string) => number;
}
