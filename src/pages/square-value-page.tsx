import { MathOperation } from '../models/math-model';
import SquareIcon from '@mui/icons-material/SuperscriptRounded';
import MathGameScreen1 from '../components/MathGameScreen1';

export default function SquareValuePage() {
  return (
    <MathGameScreen1
      minValue={2}
      maxValue={9}
      operation={MathOperation.SquareValue}
      icon={SquareIcon}
    />
  );
}
