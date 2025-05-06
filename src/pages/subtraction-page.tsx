import { MathOperation } from '../models/math-model';
import SubtractionIcon from '@mui/icons-material/DoNotDisturbOn';
import MathGameScreen from '../components/MathGameScreen';

export default function SubtractionPage() {
  return (
    <MathGameScreen
      minValue={11}
      maxValue={20}
      operation={MathOperation.Subtraction}
      icon={SubtractionIcon}
    />
  );
}
