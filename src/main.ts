import * as path from "node:path";

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { create } from "express-handlebars";

import { example } from "./carbone/reads/handlebars-helpers";
import { TortueModule } from "./index";
import { Configuration } from "./shared/configuration/configuration";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(TortueModule);

  configureViews(app);

  const { port } = app.get(ConfigService<Configuration>).get("server");
  await app.listen(port);
}

function configureViews(app: NestExpressApplication) {
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
}

bootstrap();
