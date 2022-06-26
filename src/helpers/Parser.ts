import {
  Brackets,
  ExtraOperations,
  SPACE,
  States,
  SUCCESSFULL_STATES,
} from '../constants';
import { IExpressionParser } from '../types/helpers.interface';
import {
  isCloseBracket,
  isNegationSign,
  isNumber,
  isOpenBracket,
  isOperation,
  isPoint,
} from './parser-tools';

export class Parser implements IExpressionParser {
  private numbers: number[] = [];
  private operationsAndBrackets: string[] = [];
  private number: string[] = [];

  public getNumbers(): typeof this.numbers {
    return this.numbers;
  }
  public getOperationsAndBrackets(): typeof this.operationsAndBrackets {
    return this.operationsAndBrackets;
  }

  private addDigit = (str: string): void => {
    this.number = [...this.number, str];
  };

  private addNumber = (): void => {
    const number = Number(this.number.join(''));
    this.number = [];
    this.numbers.push(number);
  };

  private addOperation(str: string): void {
    this.operationsAndBrackets.push(str);
  }

  private getNextState(
    state: States,
    character: string,
    hasOpenBracket: boolean
  ): States {
    switch (state) {
      case States.OPEN_BRACKET:
      case States.BEGINING: {
        if (isNegationSign(character)) {
          this.addOperation(ExtraOperations.ne);
          return States.NEGATION;
        }
        if (isNumber(character)) {
          this.addDigit(character);
          return States.NUMBER;
        }
        if (isOpenBracket(character)) {
          this.addOperation(Brackets.OPEN);
          return States.OPEN_BRACKET;
        }
        throw new Error();
      }
      case States.NEGATION: {
        if (isNumber(character)) {
          this.addDigit(character);
          return States.NUMBER;
        }
        if (isOpenBracket(character)) {
          this.addOperation(character);
          return States.OPEN_BRACKET;
        }
        throw new Error();
      }
      case States.NUMBER: {
        if (hasOpenBracket && isCloseBracket(character)) {
          this.addNumber();
          this.addOperation(character);
          return States.CLOSE_BRACKET;
        }
        if (isNumber(character)) {
          this.addDigit(character);
          return States.NUMBER;
        }
        if (isPoint(character)) {
          this.addDigit(character);
          return States.POINT;
        }
        if (isOperation(character)) {
          this.addNumber();
          this.addOperation(character);
          return States.OPERATION;
        }
        throw new Error();
      }
      case States.POINT: {
        if (isNumber(character)) {
          this.addDigit(character);
          return States.FLOAT_NUMBER;
        }
        throw new Error();
      }
      case States.FLOAT_NUMBER: {
        if (hasOpenBracket && isCloseBracket(character)) {
          this.addNumber();
          this.addOperation(character);
          return States.CLOSE_BRACKET;
        }
        if (isNumber(character)) {
          this.addDigit(character);
          return States.FLOAT_NUMBER;
        }
        if (isOperation(character)) {
          this.addNumber();
          this.addOperation(character);
          return States.OPERATION;
        }
        throw new Error();
      }
      case States.OPERATION: {
        if (isNegationSign(character)) {
          this.addOperation(ExtraOperations.ne);
          return States.NEGATION;
        }
        if (isNumber(character)) {
          this.addDigit(character);
          return States.NUMBER;
        }
        if (isOpenBracket(character)) {
          this.addOperation(character);
          return States.OPEN_BRACKET;
        }
        throw new Error();
      }
      case States.CLOSE_BRACKET: {
        if (hasOpenBracket && isCloseBracket(character)) {
          this.addOperation(character);
          return States.CLOSE_BRACKET;
        }
        if (isOperation(character)) {
          this.addOperation(character);
          return States.OPERATION;
        }
        throw new Error();
      }

      default:
        throw new Error();
    }
  }

  private async validate(str: string): Promise<string> {
    let state: States = States.BEGINING;
    let openBrecketCount = 0;
    this.numbers = [];
    this.operationsAndBrackets = [];
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === SPACE) {
        continue;
      }
      state = this.getNextState(state, str[i], openBrecketCount > 0);
      if (state === States.OPEN_BRACKET) {
        openBrecketCount += 1;
      } else if (state === States.CLOSE_BRACKET) {
        openBrecketCount -= 1;
      }
    }
    if (this.number.length !== 0) {
      this.addNumber();
    }

    if (SUCCESSFULL_STATES.includes(state) && openBrecketCount === 0) {
      return str;
    }

    throw new Error();
  }

  isValid = async (str: string): Promise<boolean> =>
    this.validate(str)
      .then(() => true)
      .catch(() => false);
}
