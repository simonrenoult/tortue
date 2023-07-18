import { Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { CarboneRepository } from '../shared/carbone.repository';
import { Request, Response } from 'express';

@Controller()
export class CarboneController {
  constructor(
    @Inject('CarboneRepository') private readonly repository: CarboneRepository,
  ) {}

  @Get()
  async index(@Res() res: Response) {
    const items = await this.repository.findAll();
    return res.render('carbone_catalogue', { items });
  }

  @Get('/comparator')
  async comparator(@Res() res: Response) {
    const items = await this.repository.findAll();
    return res.render('carbone_comparator', { items });
  }

  @Post('/compare')
  async compare(@Req() req: Request) {
    const items = await this.repository.findAll();
  }
}
