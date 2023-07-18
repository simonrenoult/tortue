import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CarboneModule } from './carbone/carbone.module';
import { create } from 'express-handlebars';
import { formatCarboneCatalogueItem } from './carbone/reads/handlebars-helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CarboneModule);

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout_main',
    layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
    partialsDir: path.join(__dirname, '..', 'views', 'partials'),
    helpers: { formatCarboneCatalogueItem },
  });

  app.engine('hbs', hbs.engine);

  // FIXME: not a fan of views being declared here, in a global module
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
