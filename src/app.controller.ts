import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return 'pong';
  }

  @Post('/webhook')
  webhook(@Body() payload: any): boolean {
    return this.appService.sendMessage(payload);
  }
}
