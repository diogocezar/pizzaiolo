import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { PayloadInteractivity } from 'src/common/interfaces/slack/interactivity.payload'
import { Payload } from 'src/common/interfaces/github/payload'
import { AppService } from './app.service'
import { GithubWebHookGuard } from 'src/common/guards/github.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/webhook')
  @UseGuards(GithubWebHookGuard)
  webhook(@Body() payload: Payload): Promise<boolean> {
    return this.appService.sendMessage(payload)
  }

  @Post('/interactivity')
  interactivity(@Body() payload: PayloadInteractivity): Promise<boolean> {
    return this.appService.interactivity(payload)
  }
}
