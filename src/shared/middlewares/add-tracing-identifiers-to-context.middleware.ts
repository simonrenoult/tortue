import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ClsService } from "nestjs-cls";
import { ulid } from "ulid";

import { Context } from "./index";

@Injectable()
export class AddTracingIdentifiersToContextMiddleware
  implements NestMiddleware
{
  constructor(private readonly context: ClsService<Context>) {}

  use(req: Request, res: Response, next: NextFunction) {
    type HeaderType = string | undefined;
    const incomingCorrelationId = req.headers["X-Correlation-Id"] as HeaderType;
    const incomingRequestId = req.headers["X-Request-Id"] as HeaderType;

    this.context.set("correlationId", incomingCorrelationId ?? ulid());
    this.context.set("requestId", incomingRequestId ?? ulid());

    return next();
  }
}
