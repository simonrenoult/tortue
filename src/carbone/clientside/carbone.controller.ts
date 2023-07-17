import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class CarboneController {
  @Get()
  @Render('index')
  getHello(): object {
    return { message: 'foobar' };
  }
}
