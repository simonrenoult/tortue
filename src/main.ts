import * as path from "node:path";
import * as process from "node:process";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as Sentry from "@sentry/node";
import { create } from "express-handlebars";

import { example } from "./carbone/reads/handlebars-helpers";
import { TortueModule } from "./index";

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TortueModule);

  Sentry.init({
    dsn: "https://8b407113ba2d475e8857a54d7f631c8d@o4505602028077056.ingest.sentry.io/4505602031419392",
    tracesSampleRate: 1.0,
  });

  app.useStaticAssets(path.join(__dirname, "shared/public"));
  app.setBaseViewsDir([
    path.join(__dirname, "shared/views"),
    // FIXME: not a fan of module views being declared in a global module
    path.join(__dirname, "carbone/reads/views"),
  ]);

  const hbs = create({
    extname: "hbs",
    defaultLayout: "layout_main",
    layoutsDir: path.join(__dirname, "shared/views", "layouts"),
    partialsDir: path.join(__dirname, "shared/views", "partials"),
    helpers: { example },
  });

  app.engine("hbs", hbs.engine);

  app.setViewEngine("hbs");

  await app.listen(port);

  const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
  });

  setTimeout(() => {
    try {
      throw new Error();
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);
}

bootstrap();
