import { Controller, Get, Inject, Render } from '@nestjs/common';
import { CarboneRepository } from '../shared/carbone.repository';

@Controller()
export class CarboneController {
  constructor(
    @Inject('CarboneRepository') private readonly repository: CarboneRepository,
  ) {}

  @Get()
  @Render('index')
  async getHello(): Promise<object> {
    const all = await this.repository.findAll();
    return { items: all };
  }
}
