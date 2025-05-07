import { MathOperation } from '../models/math-model';
import MathGameScreen from '../components/MathGameScreen';

export default function AdditionPage() {
  return (
    <MathGameScreen
      minValue={11}
      maxValue={20}
      operation={MathOperation.Addition}
      operationNode={<span>+</span>}
    />
  );
}
