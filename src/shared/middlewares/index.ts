import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClsStore } from "nestjs-cls";

import { AddTracingIdentifiersToContextMiddleware } from "./add-tracing-identifiers-to-context.middleware";
import { LogIncomingRequestMiddleware } from "./log-incoming-request.middleware";

export interface Context extends ClsStore {
  correlationId: string;
  requestId: string;
}

@Module({})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AddTracingIdentifiersToContextMiddleware,
        LogIncomingRequestMiddleware,
      )
      .forRoutes("*");
  }
}
