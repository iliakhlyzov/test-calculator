export enum States {
  BEGINING,
}

export enum Brackets {
  OPEN = '(',
  CLOSE = ')',
}

export const POINT = '.';
export enum Operations {
  ADD = '+',
  SUB = '-',
  MUL = '*',
  DIV = '/',
}

export const STRONG_OPERATIONS = [
  Operations.ADD,
  Operations.DIV,
  Operations.MUL,
];
export const STRONG_SYMBOLS = [...STRONG_OPERATIONS, POINT];

export const WELCOME_TEXT =
  'Hello, Byndyusoft! This is Calculator.\nPlease enter mathematical expression.\nType exit to exit.';
export const ERROR_MESSAGE = 'Invalid input. Use 0-9, * / + -, ()';

export const REG_EXPS = {
  EXPRESSION: /^[0-9+-/*().]*$/,
  WRONG_POINT: /((([^0-9])+)\.)|\.(([^0-9])+)/,
  WRONG_STRONG_OPERATIONS: /([^0-9)])[+/*]([^0-9)]*)/,
};
