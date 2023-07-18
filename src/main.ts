import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CarboneModule } from './carbone/carbone.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CarboneModule);

  // FIXME: not crazy about views being declared here, in a global module
  app.setBaseViewsDir(path.join(__dirname, 'carbone/reads/views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
