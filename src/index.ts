import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";

import { CarboneModule } from "./carbone";
import { MiddlewaresModule } from "./shared/middlewares";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    MiddlewaresModule,
    CarboneModule,
  ],
})
export class TortueModule {}
