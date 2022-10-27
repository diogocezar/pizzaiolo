import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return 'pong'
  }

  @Post('/webhook')
  // TODO: Implements where auth with GitHub secret
  webhook(@Body() payload: any): Promise<boolean> {
    return this.appService.sendMessage(payload)
  }
}
