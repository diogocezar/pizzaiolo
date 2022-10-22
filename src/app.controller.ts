import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendMessage(): string {
    return this.appService.sendMessage();
  }

  @Post('/webhook')
  webhook(@Body() params: any): string {
    console.log(params);
    return 'ok';
  }
}
