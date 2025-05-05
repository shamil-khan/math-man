import React, { useRef } from 'react';
import CountTimer from '../components/CountTimer';
import Button from '@mui/material/Button';
import logger from '../services/LoggingService';

export default function SubtractionPage() {
  const timerRef = useRef<CountTimer | null>(null);

  const onCompleted = (): React.ReactNode => {
    logger.info('timer completed');
    return <></>;
  };

  const onTick = (time: number): void => {
    logger.info('on timer tick', time);
  };

  const start = () => {
    logger.info('start count timer');
    timerRef?.current?.start();
  };

  const stop = () => {
    logger.info('stop count timer');
    timerRef?.current?.stop();
  };

  const reset = () => {
    logger.info('rest count timer');
    timerRef?.current?.reset();
  };

  return (
    <div>
      <CountTimer
        ref={timerRef}
        on={false}
        start={50}
        onCompleted={onCompleted}
        onTick={onTick}
      />
      <Button variant="outlined" onClick={start}>
        Start
      </Button>
      <Button variant="outlined" onClick={stop}>
        Stop
      </Button>
      <Button variant="outlined" onClick={reset}>
        Reset
      </Button>
    </div>
  );
}
