import { MathOperation } from '../models/math-model';
import CubeIcon from '@mui/icons-material/Timer3Rounded';
import MathGameScreen1 from '../components/MathGameScreen1';

export default function CubicValuePage() {
  return (
    <MathGameScreen1
      minValue={2}
      maxValue={5}
      operation={MathOperation.CubicValue}
      icon={CubeIcon}
    />
  );
}
