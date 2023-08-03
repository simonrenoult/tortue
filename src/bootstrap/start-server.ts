import { Configuration } from "@nestjs/cli/lib/configuration";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { TortueModule } from "../index";
import { configureSentry } from "./sentry";
import { configureViews } from "./views";

export async function startServer() {
  const app = await NestFactory.create<NestExpressApplication>(TortueModule);

  configureViews(app);
  configureSentry(app);

  const { port } = app.get(ConfigService<Configuration>).get("server");
  await app.listen(port);
}
