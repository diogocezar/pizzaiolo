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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return axios.create({
      baseURL: this.api,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    })
  }

  async post(path: string, payload: Record<any, any>): Promise<any> {
    try {
      return this.client.post(path, payload)
    } catch (err) {
      Logger.error(err)

      throw err
    }
  }

  async get(path: string, queryParams: Record<any, any>): Promise<any> {
    try {
      return this.client.get(`${path}?${new URLSearchParams(queryParams)}`)
    } catch (err) {
      Logger.error(err)

      throw err
    }
  }
}
