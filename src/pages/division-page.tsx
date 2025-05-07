import { MathOperation } from '../models/math-model';
import MathGameScreen from '../components/MathGameScreen';

export default function DivisionPage() {
  return (
    <MathGameScreen
      minValue={2}
      maxValue={9}
      operation={MathOperation.Division}
      operationNode={<span>÷</span>}
    />
  );
}
