import { Injectable } from '@nestjs/common'
import * as axios from 'axios'
import Logger from 'src/common/utils/logger'

@Injectable()
export class SlackApi {
  api: string
  client: axios.Axios

  constructor() {
    this.api = 'https://slack.com/api'
    this.client = this.instanceClient()
  }

  instanceClient() {
    return axios.default.create({
      baseURL: this.api,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    })
  }

  async post(path, payload): Promise<any> {
    try {
      await this.client.post(path, payload)
    } catch (err) {
      Logger.error(err)
    }
  }
}
