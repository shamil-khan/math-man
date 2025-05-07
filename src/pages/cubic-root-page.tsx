import { MathOperation } from '../models/math-model';
import MathGameScreen1 from '../components/MathGameScreen1';
import SquareRootIcon from '../IconComponents/SquareRootIcon';

export default function CubicRootPage() {
  return (
    <MathGameScreen1
      minValue={2}
      maxValue={9}
      operation={MathOperation.CubicRoot}
      prefix={
        <span style={{ width: 60, height: 120 }}>
          <sup>3</sup>
          <SquareRootIcon />
        </span>
      }
    />
  );
}
