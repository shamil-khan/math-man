import { MathOperation } from '../models/math-model';
import MathGameScreen1 from '../components/MathGameScreen1';
import SquareRootIcon from '../IconComponents/SquareRootIcon';

export default function SquareRootPage() {
  return (
    <MathGameScreen1
      minValue={2}
      maxValue={9}
      operation={MathOperation.SquareValue}
      prefix={<SquareRootIcon />}
    />
  );
}
