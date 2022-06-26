import {
  Brackets,
  Operations,
  POINT,
  REG_EXPS,
  STRONG_SYMBOLS,
} from '../constants';
import { IExpressionParser } from '../types/helpers.interface';

export class Parser implements IExpressionParser {
  private validate = (str: string): string => str;

  hasWrongSymbols(str: string): boolean {
    return !REG_EXPS.EXPRESSION.exec(str);
  }

  hasIncorrectCountOfBrackets(str: string): boolean {
    const bracketStack = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === Brackets.OPEN) {
        bracketStack.push(Brackets.OPEN);
      }
      if (str[i] === Brackets.CLOSE) {
        if (bracketStack.pop() !== Brackets.OPEN) {
          return true;
        }
      }
    }
    if (bracketStack.length === 0) {
      return false;
    }
    return true;
  }

  hasWrongPoints(str: string): boolean {
    return !!REG_EXPS.WRONG_POINT.exec(str);
  }

  hasWrongOperationSignPlaces(str: string): boolean {
    return !!/asdf/.exec(str);
  }

  hasWrongBeginingOrEnd(str: string): boolean {
    return (
      STRONG_SYMBOLS.filter((x) => x === str[0] || x === str[str.length - 1])
        .length !== 0
    );
  }

  hasWrongUseOfMinusSign(str: string): boolean {
    // TODO
    return true;
  }

  hasWrongUseOfStrongOperations(str: string): boolean {
    return !REG_EXPS.WRONG_STRONG_OPERATIONS.exec(str);
  }

  hasWrongUseOfBrackets(str: string): boolean {
    // TODO
    return true;
  }

  isValid = (str: string): boolean => {
    if (str.length === 0) {
      return true;
    }
    if (this.hasWrongSymbols(str)) {
      return false;
    }
    if (this.hasIncorrectCountOfBrackets(str)) {
      return false;
    }
    if (this.hasWrongPoints(str)) {
      return false;
    }
    if (this.hasWrongBeginingOrEnd(str)) {
      return false;
    }

    return !!this.validate(str);
  };
}
