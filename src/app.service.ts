import { Injectable } from '@nestjs/common'
import { Payload } from 'src/common/interfaces/github/payload'
import { PizzaioloService } from 'src/pizzaiolo/pizzaiolo.service'
import { payloadValidator } from 'src/common/validators/payload.validator'
import { PrismaService } from 'src/common/database/prisma/prisma.service'
import { MESSAGES } from 'src/common/constants'
import { formatAttachment } from 'src/common/utils/formatter'

@Injectable()
export class AppService {
  constructor(
    private pizzaioloService: PizzaioloService,
    private prismaService: PrismaService
  ) {}

  async sendMessage(payload: Payload): Promise<boolean> {
    if (!payloadValidator(payload)) return false
    this.pizzaioloService.executeActions(payload)
    return true
  }

  async command(payload: any): Promise<any> {
    console.log(payload)

    const PRurl = payload.text

    const foundPullRequest = await this.prismaService.pullRequest.findFirst({
      where: { url: PRurl },
    })

    // if (!foundPullRequest) {
    //   return {
    //     response_type: 'ephemeral',
    //     text: '😱🍕 Pizza não encontrada',
    //   }
    // }

    return {
      response_type: 'in_channel',
      text: MESSAGES.OPEN_PULL_REQUEST,
      attachments: formatAttachment({
        date: '',
        title: '',
        url: '',
        user_avatar: '',
        user_name: '',
      }),
    }
  }
}
