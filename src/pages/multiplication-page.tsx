import React, { useState, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MultiplicationIcon from '@mui/icons-material/Clear';
import Countdown, { CountdownApi } from 'react-countdown';
import getRandomValue from '../utils/math';

export default function MultiplicationPage() {
  const getNextNumber = () => {
    return getRandomValue(2, 9);
  };

  const getTimerSeconds = () => {
    return Date.now() + 5 * 1000;
  };

  const inputRef = useRef(null);
  let countdownApi: CountdownApi | null = null;
  const [problemCount, setProblemCount] = useState(1);
  const [value1, setValue1] = useState(getNextNumber());
  const [value2, setValue2] = useState(getNextNumber());
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [countdownState, setCountdownState] = useState(getTimerSeconds());

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const setNextProblem = (resetGame: boolean) => {
    const value: number = value1 * value2;
    setScore(
      resetGame ? 0 : value.toString() === answer ? score + 10 : score - 5,
    );
    setProblemCount(resetGame ? 1 : problemCount + 1);
    setValue1(getNextNumber());
    setValue2(getNextNumber());
    setAnswer('');
    setCountdownState(getTimerSeconds());
    countdownApi?.start();
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    console.log(`Enter key pressed: ${answer}`);
    setNextProblem(false);
  };

  const setCountdownRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <Typography gutterBottom variant="h3" component="div" color="error">
        {seconds}
      </Typography>
    );
  };
  return (
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
            {value1}
          </Typography>
          <MultiplicationIcon sx={{ alignItems: 'center' }} />
          <Typography gutterBottom variant="h4">
            {value2}
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
            value={answer}
            inputRef={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="outlined" onClick={() => setNextProblem(false)}>
            Reset
          </Button>
          <Countdown
            key={countdownState}
            ref={setCountdownRef}
            date={countdownState}
            onComplete={() => setNextProblem(false)}
            renderer={countDownRenderer}
          />
        </Stack>
      </Box>
    </Card>
  );
}
