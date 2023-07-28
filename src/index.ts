import { Module } from "@nestjs/common";

import { CarboneModule } from "./carbone";
import { MiddlewaresModule } from "./shared/middlewares";

@Module({
  imports: [MiddlewaresModule, CarboneModule],
})
export class TortueModule {}
