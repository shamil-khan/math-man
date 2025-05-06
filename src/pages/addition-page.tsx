import { MathOperation } from '../models/math-model';
import AdditionIcon from '@mui/icons-material/Add';
import MathGameScreen from '../components/MathGameScreen';

export default function AdditionPage() {
  return (
    <MathGameScreen
      minValue={11}
      maxValue={20}
      operation={MathOperation.Addition}
      icon={AdditionIcon}
    />
  );
}
