import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClsModule } from "nestjs-cls";

import configuration from "./configuration/configuration";
import { InterceptorsModule } from "./interceptors";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    InterceptorsModule,
  ],
})
export class SharedModule {}
