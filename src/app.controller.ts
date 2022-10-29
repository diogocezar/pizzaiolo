import { Body, Controller, Post } from '@nestjs/common'
import { Payload } from 'src/common/interfaces/github/payload'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/webhook')
  webhook(@Body() payload: Payload): Promise<boolean> {
    return this.appService.sendMessage(payload)
  }
}
