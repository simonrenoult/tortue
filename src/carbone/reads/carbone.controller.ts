import { Controller, Get, Inject, Res } from '@nestjs/common';
import { CarboneRepository } from '../shared/carbone.repository';
import { Response } from 'express';

@Controller()
export class CarboneController {
  constructor(
    @Inject('CarboneRepository') private readonly repository: CarboneRepository,
  ) {}

  @Get()
  async anotherLayout(@Res() res: Response) {
    const items = await this.repository.findAll();
    return res.render('carbone_catalogue', { items });
  }
}
