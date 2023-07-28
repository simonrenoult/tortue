import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ClsService } from "nestjs-cls";

import { Context } from "./index";

@Injectable()
export class LogIncomingRequestMiddleware implements NestMiddleware {
  constructor(private readonly clsService: ClsService<Context>) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      "correlationId: " + this.clsService.get("correlationId"),
      "requestId: " + this.clsService.get("requestId"),
      res.statusCode,
      req.method,
      req.url,
    );
    return next();
  }
}
