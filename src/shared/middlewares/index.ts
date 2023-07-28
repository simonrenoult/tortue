import { AsyncLocalStorage } from "node:async_hooks";

import {
  Injectable,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ulid } from "ulid";

interface RequestContext {
  [key: string]: string;
}

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
})
export class MiddlewaresModule implements NestModule {
  constructor(private readonly als: AsyncLocalStorage<RequestContext>) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (req: Request, res: Response, next: NextFunction) =>
          this.als.run({}, () => next()),
        InitializeCorrelationIdMiddleware,
        InitializeRequestIdMiddleware,
        LogIncomingRequestMiddleware,
      )
      .forRoutes("*");
  }
}

const getStore = (als: AsyncLocalStorage<RequestContext>): RequestContext => {
  const store = als.getStore();
  if (!store) throw new Error("No store");
  return store;
};

@Injectable()
class InitializeCorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<RequestContext>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = (req.headers["X-Correlation-Id"] as string) ?? ulid();
    getStore(this.als).correlationId = correlationId;
    return next();
  }
}

@Injectable()
class InitializeRequestIdMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<RequestContext>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = (req.headers["X-Request-Id"] as string) ?? ulid();
    getStore(this.als).requestId = requestId;
    return next();
  }
}

@Injectable()
class LogIncomingRequestMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<RequestContext>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationdId = getStore(this.als).correlationId;
    console.log(correlationdId, res.statusCode, req.method, req.url);
    return next();
  }
}
