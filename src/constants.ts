export enum States {
  BEGINING,
  NEGATION,
  NUMBER,
  OPEN_BRACKET,
  POINT,
  OPERATION,
  FLOAT_NUMBER,
  CLOSE_BRACKET,
}

export const SUCCESSFULL_STATES: States[] = [
  States.CLOSE_BRACKET,
  States.NUMBER,
  States.FLOAT_NUMBER,
];
export const NEGATION_SIGN = '-';

export enum Brackets {
  OPEN = '(',
  CLOSE = ')',
}

export const POINT = '.';
export enum Operations {
  add = '+',
  sub = '-',
  mul = '*',
  div = '/',
}

export enum ExtraOperations {
  ne = '!',
}

export const ALL_OPERATIONS = Operations && ExtraOperations;

export const SPACE = ' ';

export const WELCOME_TEXT =
  'Hello, Byndyusoft! This is Calculator.\nPlease enter mathematical expression.\nType exit to exit.';
export const ERROR_MESSAGE = 'Invalid input. Use 0-9, * / + -, ()';
