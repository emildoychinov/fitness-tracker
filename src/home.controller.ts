import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {

  @Get('/home')
  getHello(): string {
    return 'Hello user'
  }
}
