import { ERROR_MESSAGE, WELCOME_TEXT } from './constants';
import { Core } from './helpers/Core';
import { Parser } from './helpers/Parser';
import { ICalculatorCore, IExpressionParser } from './types/helpers.interface';

const startCalculator = (
  parser: IExpressionParser,
  core: ICalculatorCore
): void => {
  console.log(WELCOME_TEXT);
  process.stdin.on('data', (data: Buffer) => {
    const str = data.toString().trim();
    if (str === 'exit') {
      process.exit();
    }
    const expression = parser.validate(str);
    const result = (expression && core.calculate(expression)) || ERROR_MESSAGE;
    console.log(result);
  });
};

const bootstrap = (): void => {
  const parser = new Parser();
  const core = new Core();
  return startCalculator(parser, core);
};

bootstrap();
