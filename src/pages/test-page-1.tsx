import React, { useState, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Countdown, { CountdownApi } from 'react-countdown';
import {
  MathProblem,
  MathOperation,
  MathProblemFactory,
} from '../models/math-model';
import logger from '../services/LoggingService';
import _ from 'lodash';

import '../components/odometer-theme-car.css';

const useEffectOnNextRender = (callback: React.EffectCallback) => {
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    if (!scheduled) {
      return;
    }

    setScheduled(false);
    callback();
  }, [callback, scheduled]);

  return () => setScheduled(true);
};

const useInterval = (
  callback: React.EffectCallback,
  delay: number,
  enabled: boolean,
) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (enabled && delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, enabled]);
  return savedCallback;
};

export default function TestPage1() {
  const TimeLimitSeconds = 9;
  const getMathProblem = () =>
    MathProblemFactory.getMathProblem(2, 9, MathOperation.Multiplication);

  const getTimerSeconds = () => Date.now() + TimeLimitSeconds * 1000;

  const answerTextRef = useRef(null);
  let countdownApi: CountdownApi | null = null;

  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [counterSeconds, setCounterSeconds] = useState(0);
  const [mathProblem, setMathProblem] = useState<MathProblem>(
    MathProblemFactory.Default,
  );
  const [problemCount, setProblemCount] = useState(1);
  const [score, setScore] = useState(0);
  const [countdownState, setCountdownState] = useState(getTimerSeconds());

  const [secondsPassed, setSecondsPassed] = useState(0);

  const timeoutRef = useInterval(
    () => {
      if (secondsPassed === TimeLimitSeconds) {
        clearInterval(timeoutRef.current);
        return;
      }
      setSecondsPassed((secondsPassed) => secondsPassed + 1);
      logger.info(
        'secondsPassed TimeLimitSeconds',
        secondsPassed,
        TimeLimitSeconds,
      );
    },
    1000,
    started,
  );

  useEffect(() => {
    setAnswerFocus();
  }, [started]);

  const setNextProblem = () => {
    logger.debug('math-problem', mathProblem);
    setScore(
      problemCount === 0
        ? 0
        : mathProblem?.operationStatus
          ? score + 10
          : score - 5,
    );
    setProblemCount(problemCount + 1);
    const newMathProblem = getMathProblem();
    setMathProblem(newMathProblem);
    if (stopped) {
      setCountdownState(0);
    } else {
      setCountdownState(getTimerSeconds());
      countdownApi?.start();
    }
    setAnswerFocus();
  };

  const startGame = () => {
    logger.info('started');
    setStarted(true);
    resetGame();
  };

  const resetGame = () => {
    setStopped(false);
    setScore(0);
    setSecondsPassed(0);
    setProblemCount(0);
    scheduleDisplay();
  };

  const scheduleDisplay = useEffectOnNextRender(() => {
    setNextProblem();
  });

  const handleAnswerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    const status =
      mathProblem?.answer === mathProblem?.operationValue.toString();
    const timeTaken = stopped ? -1 : TimeLimitSeconds - counterSeconds;
    setMathProblem({
      ...mathProblem,
      operationStatus: status,
      timeTaken: timeTaken,
    });
    scheduleDisplay();
  };

  const setAnswerFocus = () => {
    if (answerTextRef === null || answerTextRef.current === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (answerTextRef.current as any).focus();
  };

  const setCountdownRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const handleAnswerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMathProblem({ ...mathProblem, answer: event.target.value });
  };

  // const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countDownRenderer = (value: any) => {
    return (
      <Typography gutterBottom variant="h3" component="div" color="error">
        {value.seconds}
      </Typography>
    );
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
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h3" component="div">
            Multiplication Game
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color="text.secondary"
          >
            Problem: {problemCount}
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color="secondary"
          >
            Score: {score}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This game generate two random numbers, you have to give the answer.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography gutterBottom variant="h4">
            {mathProblem?.number1}
          </Typography>
          <span>×</span>
          <Typography gutterBottom variant="h4">
            {mathProblem?.number2}
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
            onChange={handleAnswerChanged}
            onKeyDown={handleAnswerKeyDown}
          />
          <Button variant="outlined" onClick={resetGame}>
            Reset
          </Button>
          <Button variant="outlined" onClick={() => setStopped(true)}>
            Stop
          </Button>
          <Button variant="outlined" onClick={() => setStarted(false)}>
            End
          </Button>
          <Odometer value={TimeLimitSeconds - secondsPassed} format="dd" />;
          <Countdown
            autoStart={false}
            key={countdownState}
            ref={setCountdownRef}
            date={countdownState}
            onTick={(value) => setCounterSeconds(value?.seconds)}
            onComplete={setNextProblem}
            renderer={countDownRenderer}
          />
        </Stack>
      </Box>
    </Card>
  );
}
