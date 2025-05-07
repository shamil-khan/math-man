import { MathOperation } from '../models/math-model';
import MathGameScreen1 from '../components/MathGameScreen1';

export default function CubicValuePage() {
  return (
    <MathGameScreen1
      minValue={2}
      maxValue={5}
      operation={MathOperation.CubicValue}
      suffix={<span style={{ verticalAlign: 'super', fontSize: '0.5em' }}>3</span>}
    />
  );
}
