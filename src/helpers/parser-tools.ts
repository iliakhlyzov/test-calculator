import { Brackets, NEGATION_SIGN, Operations, POINT } from '../constants';

const isNumber = (character: string): boolean =>
  !Number.isNaN(Number(character));

const isOpenBracket = (character: string): boolean =>
  character === Brackets.OPEN;
const isPoint = (character: string): boolean => character === POINT;
const isOperation = (character: string): boolean =>
  Object.values(Operations).includes(character as Operations);
const isNegationSign = (character: string): boolean =>
  character === NEGATION_SIGN;

const isCloseBracket = (character: string): boolean =>
  character === Brackets.CLOSE;

export {
  isCloseBracket,
  isNegationSign,
  isPoint,
  isOpenBracket,
  isOperation,
  isNumber,
};
