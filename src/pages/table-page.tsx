import { MathOperation } from '../models/math-model';
import MathGameScreen from '../components/MathGameScreen';

export default function TablePage() {
  return (
    <MathGameScreen
      minValue={2}
      maxValue={9}
      operation={MathOperation.Table}
      operationNode={<span>×</span>}
    />
  );
}
