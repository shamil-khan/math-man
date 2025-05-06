import MathUtil from '../utils/math-util';

export enum MathOperation {
  None = '',
  Addition = '+',
  Subtraction = '-',
  Multiplication = '*',
  Division = '/',
  Table = 'table',
  SquareValue = 'square-value',
  CubicValue = 'cubic-value',
  SquareRoot = 'square-root',
  CubicRoot = 'cubic-root',
}

export interface MathProblem {
  number1: number;
  number2: number | null;
  answer: string;
  operation: MathOperation;
  operationValue: number;
  operationStatus: boolean | null;
  timeTaken: number | null;
}

export class MathProblemFactory {
  public static Default: MathProblem = {
    number1: 0,
    number2: 0,
    operation: MathOperation.None,
    operationValue: 0,
    operationStatus: null,
    answer: '',
    timeTaken: 0,
  };

  public static getMathProblem(
    minValue: number,
    maxValue: number,
    operation: MathOperation,
  ): MathProblem {
    let number1 = MathUtil.getRandomValue(minValue, maxValue);
    let number2 = MathUtil.getRandomValue(minValue, maxValue);
    let operationValue: number | null = null;
    switch (operation) {
      case MathOperation.Addition:
        operationValue = number1 + number2;
        break;
      case MathOperation.Subtraction:
        if (number1 < number2) {
          const swap = number1;
          number1 = number2;
          number2 = swap;
        }
        operationValue = number1 - number2;
        break;
      case MathOperation.Multiplication:
        operationValue = number1 * number2;
        break;
      case MathOperation.Division:
        operationValue = number1 / number2;
        break;
      case MathOperation.Table:
        number2 = MathUtil.getRandomValue(2, 9);
        operationValue = number1 * number2;
        break;
      case MathOperation.SquareValue:
        operationValue = number1 * number1;
        break;
      case MathOperation.CubicValue:
        operationValue = number1 * number1 * number1;
        break;
      case MathOperation.SquareRoot:
        operationValue = Math.sqrt(number1);
        break;
      case MathOperation.CubicRoot:
        operationValue = Math.cbrt(number1);
        break;
      default:
        throw 'Unknown math operation';
    }

    return <MathProblem>{
      number1: number1,
      number2: number2,
      operation: operation,
      operationValue: operationValue,
      operationStatus: null,
      answer: '',
      timeTaken: null,
    };
  }
}
