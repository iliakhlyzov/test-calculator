import { Brackets } from '../constants';
import { IExpressionParser } from '../types/helpers.interface';

export class Parser implements IExpressionParser {
  private validate = (str: string): string => str;

  private expressionRegExp = /^[0-9+-/*().]*$/;

  hasWrongSymbols(str: string): boolean {
    return !this.expressionRegExp.exec(str);
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

  // hasCorrectOrderOfOperationsAndBrackets(str: string): boolean {
  //   for (let i = 0; i <= str.length; i++) {

  //   }
  //   return true;
  // }

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
    return !!this.validate(str);
  };
}
