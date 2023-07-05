import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPage(@Res() res : Response){
    res.sendFile('index.html');
  }
}
