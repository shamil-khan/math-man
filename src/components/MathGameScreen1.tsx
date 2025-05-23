import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
  MathProblem,
  MathOperation,
  MathProblemFactory,
} from '../models/math-model';
import CountTimer from './CountTimer';
import logger from '../services/LoggingService';
import _ from 'lodash';

interface MathGameScreenProps {
  minValue: number;
  maxValue: number;
  operation: MathOperation;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

interface GameScreen {
  score: number;
  problemCount: number;
}

interface MathGameScreenState {
  started: boolean;
  gameScreen: GameScreen;
  mathProblem: MathProblem;
  problems: MathProblem[];
}

class MathGameScreen1 extends React.Component<
  MathGameScreenProps,
  MathGameScreenState
> {
  private countTimerRef: React.RefObject<CountTimer | null>;
  private answerTextRef: React.RefObject<HTMLInputElement | null>;

  constructor(props: MathGameScreenProps) {
    logger.info('math game screen init');
    super(props);

    this.state = {
      started: false,
      gameScreen: {
        score: 0,
        problemCount: 0,
      },
      mathProblem: MathProblemFactory.Default,
      problems: [],
    };
    this.countTimerRef = React.createRef<CountTimer | null>();
    this.answerTextRef = React.createRef<HTMLInputElement | null>();
  }

  private getMathProblem = () =>
    MathProblemFactory.getMathProblem(
      this.props.minValue,
      this.props.maxValue,
      this.props.operation,
    );

  private setNextProblem = () => {
    const { gameScreen, mathProblem, problems } = this.state;
    mathProblem.operationStatus =
      mathProblem.answer === mathProblem.operationValue.toString();
    mathProblem.timeTaken = this.countTimerRef.current
      ? this.countTimerRef.current?.getCountPassed()
      : -1;
    problems.push(mathProblem);

    logger.debug('math-problem', mathProblem, problems);

    const score =
      gameScreen.problemCount === 0
        ? 0
        : mathProblem?.operationStatus
          ? gameScreen.score + 10
          : gameScreen.score - 5;

    gameScreen.score = score;
    gameScreen.problemCount = gameScreen.problemCount + 1;
    const newMathProblem = this.getMathProblem();
    this.setState({
      gameScreen: gameScreen,
      mathProblem: newMathProblem,
      problems: problems,
    });
    this.startCountTimer();
    this.answerTextRef.current?.focus();
  };

  private startGame = () => {
    logger.info('addition game started', this.countTimerRef.current);
    this.setState({ started: true });
    this.setNextProblem();
  };

  private startCountTimer = () => {
    this.countTimerRef.current?.stop();
    setTimeout(() => this.countTimerRef.current?.reset(), 10);
    setTimeout(() => this.countTimerRef.current?.start(), 100);
  };

  private onCountTimerCompleted = () => {
    this.setNextProblem();
    return <></>;
  };

  private handleAnswerChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { mathProblem } = this.state;
    mathProblem.answer = event.target.value;
    this.setState({ mathProblem: mathProblem });
  };

  private handleAnswerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    this.setNextProblem();
  };

  private gameEnd = () => {
    this.setState({
      started: false,
      gameScreen: {
        score: 0,
        problemCount: 0,
      },
      mathProblem: MathProblemFactory.Default,
      problems: [],
    });
  };

  render(): React.ReactNode {
    const { started, gameScreen, mathProblem } = this.state;
    const { prefix, suffix } = this.props;
    return !started ? (
      <Card variant="outlined">
        <Button variant="outlined" onClick={this.startGame}>
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
            <span>
              {prefix ? (
                <Typography variant="h4">{prefix}</Typography>
              ) : undefined}
              <Typography variant="h4">
                {mathProblem.number1}
                {suffix ? suffix : undefined}
              </Typography>
            </span>
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
              inputRef={this.answerTextRef}
              onKeyDown={this.handleAnswerKeyDown}
              onChange={this.handleAnswerChanged}
            />
            <Button variant="outlined" onClick={this.gameEnd}>
              End
            </Button>
            <CountTimer
              ref={this.countTimerRef}
              on={false}
              start={20}
              onCompleted={this.onCountTimerCompleted}
            />
          </Stack>
        </Box>
      </Card>
    );
  }
}

export default MathGameScreen1;
