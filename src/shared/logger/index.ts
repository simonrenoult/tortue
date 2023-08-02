import { Module } from "@nestjs/common";
import { ClsService } from "nestjs-cls";

import { Context } from "../context";
import { ImplTortueLogger } from "./logger";

@Module({
  providers: [
    {
      provide: "TortueLogger",
      inject: [ClsService],
      useFactory: (clsService: ClsService<Context>) =>
        new ImplTortueLogger(clsService),
    },
  ],
  exports: ["TortueLogger"],
})
export class LoggerModule {}
