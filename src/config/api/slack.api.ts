import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import Logger from 'src/common/utils/logger'

@Injectable()
export class SlackApi {
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

  async post(path: string, payload: unknown) {
    try {
      return this.client.post(path, payload)
    } catch (err) {
      Logger.error(err)

      throw err
    }
  }
}
