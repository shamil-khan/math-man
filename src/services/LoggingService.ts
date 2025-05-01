/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/loggingService.ts
import { Logger, ILogObj } from "tslog";

class LoggingService {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      name: "math-man",
      type: "pretty",
      hideLogPositionForProduction: true,
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: any[]): void {
    this.logger.error(message, ...args);
  }
}

const logger = new LoggingService();
export default logger;
