import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdditionIcon from '@mui/icons-material/Add';
import {
  MathProblem,
  MathOperation,
  MathProblemFactory,
} from '../models/math-model';
import CountTimer from '../components/CountTimer';
import logger from '../services/LoggingService';
import _ from 'lodash';

interface GameScreen {
  score: number;
  problemCount: number;
}

export default function AdditionPage() {
  const [started, setStarted] = useState(false);
  const countTimerRef = useRef<CountTimer | null>(null);
  const answerTextRef = useRef<HTMLInputElement | null>(null);
  const [mathProblem, setMathProblem] = useState<MathProblem>(
    MathProblemFactory.Default,
  );
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [gameScreen, setGameScreen] = useState<GameScreen>({
    score: 0,
    problemCount: 0,
  });
  logger.debug('addition page init', gameScreen);

  const getMathProblem = () =>
    MathProblemFactory.getMathProblem(1, 9, MathOperation.Addition);

  const setNextProblem = () => {
    mathProblem.operationStatus =
      mathProblem.answer === mathProblem.operationValue.toString();
    mathProblem.timeTaken = countTimerRef.current
      ? countTimerRef.current?.getCountPassed()
      : -1;
    setProblems([...problems, mathProblem]);

    logger.debug('math-problem', mathProblem, problems);

    const score =
      gameScreen.problemCount === 0
        ? 0
        : mathProblem?.operationStatus
          ? gameScreen.score + 10
          : gameScreen.score - 5;

    setGameScreen({
      ...gameScreen,
      score: score,
      problemCount: gameScreen.problemCount + 1,
    });
    const newMathProblem = getMathProblem();
    setMathProblem(newMathProblem);
    startCountTimer();
    answerTextRef.current?.focus();
  };

  const startGame = () => {
    logger.info('addition game started', countTimerRef.current);
    setStarted(true);
    setNextProblem();
  };

  const startCountTimer = () => {
    countTimerRef.current?.stop();
    setTimeout(() => countTimerRef.current?.reset(), 10);
    setTimeout(() => countTimerRef.current?.start(), 100);
  };

  const onCountTimerCompleted = () => {
    setNextProblem();
    return <></>;
  };

  const handleAnswerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMathProblem({ ...mathProblem, answer: event.target.value });
  };

  const handleAnswerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    setNextProblem();
  };

  return !started ? (
    <Card variant="outlined">
      <Button variant="outlined" onClick={startGame}>
        Start
      </Button>
    </Card>
  ) : (
    <Card variant="outlined">
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h3" component="div">
          Player 1
        </Typography>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color="text.secondary"
          >
            Problem: {gameScreen.problemCount}
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color="secondary"
          >
            Score: {gameScreen.score}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This game generate two random numbers, you have to add them and give
          the answer.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography gutterBottom variant="h4">
            {mathProblem.number1}
          </Typography>
          <AdditionIcon sx={{ alignItems: 'center' }} />
          <Typography gutterBottom variant="h4">
            {mathProblem.number2}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          spacing={5}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <TextField
            required
            id="outlined-required"
            label="Answer"
            value={mathProblem?.answer}
            inputRef={answerTextRef}
            onKeyDown={handleAnswerKeyDown}
            onChange={handleAnswerChanged}
          />
          <Button variant="outlined" onClick={() => setStarted(false)}>
            End
          </Button>
          <CountTimer
            ref={countTimerRef}
            on={false}
            start={20}
            onCompleted={onCountTimerCompleted}
          />
        </Stack>
      </Box>
    </Card>
  );
}
