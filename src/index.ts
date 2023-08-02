import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";

import { CarboneModule } from "./carbone";
import { InterceptorsModule } from "./shared/interceptors";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    InterceptorsModule,
    CarboneModule,
  ],
})
export class TortueModule {}
