import { Logger } from "@nestjs/common";

import { ContextService } from "../context";

export interface TortueLogger {
  debug(message: string, args?: object): void;

  error(message: string, args?: object): void;

  info(message: string, args?: object): void;

  warn(message: string, args?: object): void;
}

export class ImplTortueLogger implements TortueLogger {
  private logger: Logger;

  constructor(private readonly context: ContextService) {
    this.logger = new Logger();
  }

  debug(message: string, args: object = {}): void {
    const correlationId = this.context.get("correlationId");
    const requestId = this.context.get("requestId");
    this.logger.debug(message, { correlationId, requestId, ...args });
  }

  error(message: string, args: object = {}): void {
    const correlationId = this.context.get("correlationId");
    const requestId = this.context.get("requestId");
    this.logger.error({ message, correlationId, requestId, ...args });
  }

  info(message: string, args: object = {}): void {
    const correlationId = this.context.get("correlationId");
    const requestId = this.context.get("requestId");
    this.logger.log(message, { correlationId, requestId, ...args });
  }

  warn(message: string, args: object = {}): void {
    const correlationId = this.context.get("correlationId");
    const requestId = this.context.get("requestId");
    this.logger.warn(message, { correlationId, requestId, ...args });
  }
}
