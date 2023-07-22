import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { CarboneRepository } from "../shared/carbone.repository";
import { Request, Response } from "express";
import { CarboneItem } from "../shared/types";

@Controller()
export class CarboneController {
  constructor(
    @Inject("CarboneRepository") private readonly repository: CarboneRepository,
  ) {}

  @Get()
  async index(@Res() res: Response) {
    const items = await this.repository.findAll();
    return res.render("carbone_catalogue", { items });
  }

  @Get("/comparator")
  async comparator(@Res() res: Response) {
    const items = await this.repository.findAll();
    return res.render("carbone_comparator", { items });
  }

  @Post("/compare")
  @HttpCode(200)
  async compare(@Req() req: Request, @Res() res: Response) {
    const { elementToCompareA, elementToCompareB } = req.body;

    const items = await this.repository.findAll();
    const itemA = items.find((i) => i.name === elementToCompareA);
    if (!itemA) {
      return res.render("carbone_catalogue_result_not_found_error", {
        name: elementToCompareA,
        layout: null,
      });
    }
    const itemB = items.find((i) => i.name === elementToCompareB);
    if (!itemB) {
      return res.render("carbone_catalogue_result_not_found_error", {
        name: elementToCompareB,
        layout: null,
      });
    }

    const comparisonResult = compareItems(itemA, itemB);

    return res.render("carbone_comparator_result", {
      ...comparisonResult,
      layout: null,
    });
  }
}

function compareItems(
  itemA: CarboneItem,
  itemB: CarboneItem,
): null | { otherImpactor: CarboneItem; worstImpactor: CarboneItem } {
  return itemA.impact > itemB.impact
    ? { worstImpactor: itemA, otherImpactor: itemB }
    : itemA.impact == itemB.impact
    ? null
    : { worstImpactor: itemB, otherImpactor: itemA };
}
