import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CarboneModule } from './carbone/carbone.module';
import { create } from 'express-handlebars';
import { example } from './carbone/reads/handlebars-helpers';
import * as process from 'process';

const port = process.env.port || 3000;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CarboneModule);

  app.useStaticAssets(path.join(__dirname, 'shared/public'));
  app.setBaseViewsDir([
    path.join(__dirname, 'shared/views'),
    // FIXME: not a fan of module views being declared in a global module
    path.join(__dirname, 'carbone/reads/views'),
  ]);

  const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout_main',
    layoutsDir: path.join(__dirname, 'shared/views', 'layouts'),
    partialsDir: path.join(__dirname, 'shared/views', 'partials'),
    helpers: { example },
  });

  app.engine('hbs', hbs.engine);

  app.setViewEngine('hbs');

  await app.listen(port);
}
bootstrap();
