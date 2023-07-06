import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {

  @Get('/home')
  getHello(){
    var res = {
        message : 'hello user!'
    }

    return res;
  }

}
