import { MathOperation } from '../models/math-model';
import MathGameScreen1 from '../components/MathGameScreen1';

export default function SquareValuePage() {
  return (
    <MathGameScreen1
      minValue={2}
      maxValue={9}
      operation={MathOperation.SquareValue}
      suffix={
        <span style={{ verticalAlign: 'super', fontSize: '0.5em' }}>2</span>
      }
    />
  );
}
