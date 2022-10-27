import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Payload } from 'src/types/payload'
import { AppService } from 'src/app.service'
import { GithubWebHookGuard } from 'src/guards/github.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return 'pong'
  }

  @Post('/webhook')
  @UseGuards(GithubWebHookGuard)
  webhook(@Body() payload: Payload): Promise<boolean> {
    return this.appService.sendMessage(payload)
  }
}
