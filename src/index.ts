import { ERROR_MESSAGE, WELCOME_TEXT } from './constants';
import { Core } from './helpers/Core';
import { Parser } from './helpers/Parser';
import { ICalculatorCore, IExpressionParser } from './types/helpers.interface';

const startCalculator = (
  parser: IExpressionParser,
  core: ICalculatorCore
): void => {
  console.log(WELCOME_TEXT);
  process.stdin.on('data', async (data: Buffer) => {
    const str = data.toString().trim();
    if (str === 'exit') {
      process.exit();
    }
    const isValid = await parser.isValid(str);
    console.log('Expression is Valid: ' + isValid);
    console.log(parser.getNumbers());
    console.log(parser.getOperationsAndBrackets());
  });
};

const bootstrap = async (): Promise<void> => {
  const parser = new Parser();
  const core = new Core();
  return startCalculator(parser, core);
};

bootstrap();
