import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClsService } from "nestjs-cls";

import { Context } from "../context";
import { LoggerModule } from "../logger";
import { TortueLogger } from "../logger/logger";
import { AddTracingIdentifiersToContextInterceptor } from "./add-tracing-identifiers-to-context.interceptor";
import { LogIncomingRequestInterceptor } from "./log-incoming-request.interceptor";

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      inject: [ClsService],
      useFactory: (clsService: ClsService<Context>) =>
        new AddTracingIdentifiersToContextInterceptor(clsService),
    },
    {
      provide: APP_INTERCEPTOR,
      inject: ["TortueLogger"],
      useFactory: (logger: TortueLogger) =>
        new LogIncomingRequestInterceptor(logger),
    },
  ],
})
export class InterceptorsModule {}
