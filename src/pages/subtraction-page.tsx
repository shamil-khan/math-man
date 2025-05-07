import { MathOperation } from '../models/math-model';
import MathGameScreen from '../components/MathGameScreen';

export default function SubtractionPage() {
  return (
    <MathGameScreen
      minValue={11}
      maxValue={20}
      operation={MathOperation.Subtraction}
      operationNode={<span>-</span>}
    />
  );
}
