import { MathOperation } from '../models/math-model';
import MathGameScreen from '../components/MathGameScreen';

export default function MultiplicationPage() {
  return (
    <MathGameScreen
      minValue={2}
      maxValue={9}
      operation={MathOperation.Multiplication}
      operationNode={<span>×</span>}
    />
  );
}
