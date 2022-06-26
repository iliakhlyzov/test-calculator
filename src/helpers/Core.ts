/*eslint no-undef: 0*/
import { ExtraOperations, Operations } from '../constants';
import {
  ICalculatorCore,
  keyofOperations,
  operand,
} from '../types/helpers.interface';

export class Core implements ICalculatorCore {
  execute(
    operation: keyofOperations,
    left: operand,
    right: operand = 0
  ): number {
    const op = operation === 'ne' ? ExtraOperations.ne : Operations[operation];
    switch (op) {
      case Operations.add:
        return left + right;
      case Operations.div: {
        if (right !== 0) {
          return left / right;
        }
        throw new Error('DIVISION BY 0');
      }
      case Operations.mul:
        return left * right;
      case Operations.sub:
        return left - right;
      case ExtraOperations.ne:
        return left * -1;
      default:
        return 0;
    }
  }

  calculate(expression: string): number {
    return Math.random();
  }
  test(numbers: number[], operations: string[]): number {
    let result = 0;
    const temp = (counter: number, index: number): void => {
      const operation = operations[index] as keyofOperations;
      if ([Operations.add, Operations.sub].includes(operation as any)) {
        operations.pop();
        result = this.execute(operation, <number>numbers.pop(), numbers.pop());
      }
    };

    for (let i = 0; ; i++) {
      const operation = operations[i + 1] as keyofOperations;
      if ([Operations.add, Operations.sub].includes(operation as any)) {
        operations.pop();
        result = this.execute(operation, <number>numbers.pop(), numbers.pop());
      }
    }
  }
}
