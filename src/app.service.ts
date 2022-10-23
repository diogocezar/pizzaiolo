import { Injectable } from '@nestjs/common'
import { SlackService } from 'nestjs-slack'
import { validatePayload, getMessage } from './helper'

@Injectable()
export class AppService {
  constructor(private slack: SlackService) {}
  sendMessage(payload): boolean {
    if (!validatePayload(payload)) return false

    const message = getMessage(payload)

    console.log(message)

    this.slack.sendText(message, { channel: process.env.CHANNEL })

    return true
  }
}
