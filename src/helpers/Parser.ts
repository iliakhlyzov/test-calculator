import { SPACE, States, SUCCESSFULL_STATES } from '../constants';
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
  private getNextState(
    state: States,
    character: string,
    hasOpenBracket: boolean
  ): States {
    switch (state) {
      case States.OPEN_BRACKET:
      case States.BEGINING: {
        if (isNegationSign(character)) {
          return States.NEGATION;
        }
        if (isNumber(character)) {
          return States.NUMBER;
        }
        if (isOpenBracket(character)) {
          return States.OPEN_BRACKET;
        }
        throw new Error();
      }
      case States.NEGATION: {
        if (isNumber(character)) {
          return States.NUMBER;
        }
        if (isOpenBracket(character)) {
          return States.OPEN_BRACKET;
        }
        throw new Error();
      }
      case States.NUMBER: {
        if (hasOpenBracket && isCloseBracket(character)) {
          return States.CLOSE_BRACKET;
        }
        if (isNumber(character)) {
          return States.NUMBER;
        }
        if (isPoint(character)) {
          return States.POINT;
        }
        if (isOperation(character)) {
          return States.OPERATION;
        }
        throw new Error();
      }
      case States.POINT: {
        if (isNumber(character)) {
          return States.FLOAT_NUMBER;
        }
        throw new Error();
      }
      case States.FLOAT_NUMBER: {
        if (hasOpenBracket && isCloseBracket(character)) {
          return States.CLOSE_BRACKET;
        }
        if (isNumber(character)) {
          return States.FLOAT_NUMBER;
        }
        if (isOperation(character)) {
          return States.OPERATION;
        }
        throw new Error();
      }
      case States.OPERATION: {
        if (isNegationSign(character)) {
          return States.NEGATION;
        }
        if (isNumber(character)) {
          return States.NUMBER;
        }
        if (isOpenBracket(character)) {
          return States.OPEN_BRACKET;
        }
        throw new Error();
      }
      case States.CLOSE_BRACKET: {
        if (hasOpenBracket && isCloseBracket(character)) {
          return States.CLOSE_BRACKET;
        }
        if (isOperation(character)) {
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
    let openBreacketCount = 0;
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === SPACE) {
        continue;
      }
      state = this.getNextState(state, str[i], openBreacketCount > 0);
      if (state === States.OPEN_BRACKET) {
        openBreacketCount += 1;
      } else if (state === States.CLOSE_BRACKET) {
        openBreacketCount -= 1;
      }
    }

    if (SUCCESSFULL_STATES.includes(state) && openBreacketCount === 0) {
      return str;
    }

    throw new Error();
  }

  isValid = async (str: string): Promise<boolean> =>
    this.validate(str)
      .then(() => true)
      .catch(() => false);
}
