import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class SlackService {
  api: string
  client: AxiosInstance

  constructor() {
    this.api = 'https://slack.com/api'
    this.client = this.instanceClient()
  }

  instanceClient() {
    return axios.create({
      baseURL: this.api,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    })
  }

  async sendMessage(message: string, thread_ts?: string): Promise<any> {
    const { data } = await this.client.post('/chat.postMessage', {
      channel: process.env.SLACK_CHANNEL,
      text: message,
      ...(thread_ts && { thread_ts }),
    })

    return data
  }

  async addReaction(reaction: string, timestamp: string): Promise<void> {
    if (!timestamp) return

    await this.client.post('/reactions.add', {
      channel: process.env.SLACK_CHANNEL,
      name: reaction,
      timestamp,
    })
  }
}
