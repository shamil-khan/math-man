import * as React from 'react';
import './CountTimer.scss';
import logger from '../services/LoggingService';

interface CountTimerProps {
  on: boolean;
  start: number;
  onTick?: (time: number) => void | undefined;
  onCompleted: () => React.ReactNode;
}
interface CountTimerState {
  on: boolean;
  start: number;
  time: number;
}

class CountTimer extends React.Component<CountTimerProps, CountTimerState> {
  private timerId = -1;
  private ref: React.RefObject<HTMLDivElement | null>;

  constructor(props: CountTimerProps) {
    logger.info('init count timer');
    super(props);

    this.state = {
      on: this.props.on,
      start: this.props.start,
      time: this.props.start,
    };
    this.ref = React.createRef<HTMLDivElement | null>();

    setTimeout(() => {
      this.ref.current?.style.setProperty(
        '--startTime',
        this.state.start.toString(),
      );
      this.setState({
        on: true,
        time: this.state.time,
      });
    }, 100);
  }

  public start = () => {
    this.timerId = setInterval(() => {
      const newTime = this.state.time - 1;
      if (newTime > 0) {
        this.setState({
          time: newTime,
        });
      } else {
        clearInterval(this.timerId);
        this.setState({
          on: false,
          time: this.state.start,
        });
        this.props.onCompleted();
      }
    }, 1000);
    logger.debug('start timer-id', this.timerId);
  };

  public stop = () => {
    clearInterval(this.timerId);
    this.setState({ on: false });
    logger.debug('stop', this.timerId);
  };

  public reset = () => {
    if (this.state.on === true) {
      return;
    }
    logger.debug('reset', this.timerId);

    this.setState({
      time: this.state.start,
    });
    this.setCSSTime(this.state.start);
  };

  public getCountPassed = (): number => {
    return this.state.start - this.state.time + 1;
  };

  private setCSSTime = (time: number) => {
    this.ref.current?.style.setProperty('--seconds', time.toString());
  };

  render(): React.ReactNode {
    const { onTick } = this.props;
    const { time } = this.state;
    logger.debug('timer-id tick', this.timerId, time);
    this.setCSSTime(time);

    if (this.state.on && onTick) {
      onTick(time);
    }

    return (
      <div className="count-timer" ref={this.ref}>
        <svg viewBox="-50 -50 100 100" strokeWidth="10">
          <circle r="45"></circle>
          <circle r="45" pathLength="1"></circle>
        </svg>
      </div>
    );
  }
}

export default CountTimer;
