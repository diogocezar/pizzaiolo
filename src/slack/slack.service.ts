/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common'
import * as axios from 'axios'
import { RequestInfos } from 'src/types/request.infos'
import { SlackMessage } from 'src/types/slack.message'

@Injectable()
export class SlackService {
  api: string
  client: axios.Axios

  constructor() {
    this.api = 'https://slack.com/api'
    this.client = this.instanceClient()
  }

  instanceClient() {
    // @ts-ignore
    return axios.create({
      baseURL: this.api,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    })
  }

  async sendMessage(
    message: string,
    timestamp?: string,
    requestInfos?: RequestInfos
  ): Promise<any> {
    let payload: SlackMessage = {
      channel: process.env.SLACK_CHANNEL,
      text: message,
      ...(timestamp && { timestamp }),
    }
    if (requestInfos) {
      const { title, date, pizzaiolo, pizzaioloAvatar, url } = requestInfos
      payload = {
        ...payload,
        attachments: [
          {
            color: '#fff',
            title: 'Veja os detalhes que acabaram de sair do forno:',
            fields: [
              {
                title: 'Ingredientes',
                value: title,
                short: false,
              },
              {
                title: 'Data do Pedido',
                value: date,
                short: true,
              },
              {
                title: 'Pizzaiolo',
                value: pizzaiolo,
                short: true,
              },
            ],
            title_link: url,
            author_icon: pizzaioloAvatar,
            author_name: pizzaiolo,
            footer: 'Não se esuqueça de dar uma olhada no pedido!',
          },
          {
            title: 'Que tal dar uma olhada nessa PR?',
            color: '#3AA3E3',
            actions: [
              {
                type: 'button',
                text: 'Pegue um Pedaço 🍕',
                url: url,
              },
            ],
          },
        ],
      }
    }
    const { data } = await this.client.post('/chat.postMessage', payload)
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
