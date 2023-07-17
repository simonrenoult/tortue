import { Module } from '@nestjs/common';
import { CarboneController } from './clientside/carbone.controller';

@Module({
  imports: [],
  controllers: [CarboneController],
  providers: [],
})
export class CarboneModule {}
