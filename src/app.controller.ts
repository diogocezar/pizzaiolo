import { Body, Controller, Get, Post } from '@nestjs/common'
import { CommentPayload } from 'src/types/comment'
import { Payload } from 'src/types/payload'
import { PullRequestPayload } from 'src/types/pull_request'
import { ReviewPayload } from 'src/types/review'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return 'pong'
  }

  @Post('/webhook')
  webhook(@Body() payload: Payload): Promise<boolean> {
    return this.appService.sendMessage(payload)
  }
}
