import { Module } from "@nestjs/common";
import { ClsService } from "nestjs-cls";

import { ContextModule, ContextService } from "../context";
import { ImplTortueLogger } from "./logger";

@Module({
  imports: [ContextModule],
  providers: [
    {
      provide: "TortueLogger",
      inject: [ClsService],
      useFactory: (contextService: ContextService) =>
        new ImplTortueLogger(contextService),
    },
  ],
  exports: ["TortueLogger"],
})
export class LoggerModule {}
