import { Injectable } from '@nestjs/common'
import { Message, PullRequest } from '@prisma/client'
import { PrismaService } from 'src/common/database/prisma/prisma.service'
import { PizzaioloEvent } from 'src/common/interfaces/pizzaiolo/pizzaiolo.event'
import { PizzaioloMessage } from 'src/common/interfaces/pizzaiolo/pizzaiolo.message'
import Logger from 'src/common/utils/logger'

@Injectable()
export class PizzaioloRepository {
  constructor(private prismaService: PrismaService) {}

  async save({ action, pull_request, user }: PizzaioloEvent): Promise<void> {
    try {
      const connectOrCreate = {
        data: {
          action,
          pullRequest: {
            connectOrCreate: {
              where: {
                id: pull_request.id,
              },
              create: {
                id: pull_request.id,
                url: pull_request.html_url,
              },
            },
          },
          user: {
            connectOrCreate: {
              where: {
                id: user.id,
              },
              create: {
                email: user.login,
                id: user.id,
              },
            },
          },
        },
      }
      await this.prismaService.events.create(connectOrCreate)
    } catch (err) {
      Logger.error(err)
    }
  }

  async saveMessage({
    timestamp,
    pull_request,
    url,
  }: PizzaioloMessage): Promise<Message | void> {
    try {
      if (!timestamp) {
        throw new Error('Timestamp is required')
      }
      return this.prismaService.message.create({
        data: {
          ts: timestamp,
          pullRequest: {
            connectOrCreate: {
              where: {
                id: pull_request?.id || undefined,
              },
              create: {
                id: pull_request?.id || undefined,
                url: url || undefined,
              },
            },
          },
        },
      })
    } catch (err) {
      Logger.error(err)
    }
  }

  async findSubmittedPullRequest(url: string): Promise<number> {
    try {
      const count: number = await this.prismaService.events.count({
        where: { action: 'submitted', pullRequest: { url } },
      })
      return count
    } catch (err) {
      Logger.error(err)
    }
    return 0
  }

  async findPullRequest({
    timestamp,
  }: {
    timestamp: string
  }): Promise<PullRequest | undefined> {
    try {
      const pullRequest = await this.prismaService.message.findFirst({
        where: {
          ts: timestamp,
        },
        include: {
          pullRequest: true,
        },
      })

      return pullRequest?.pullRequest || undefined
    } catch (err) {
      Logger.error(err)
    }
  }

  async findMessageTimeStamp(url: string): Promise<string | undefined> {
    try {
      const message = await this.prismaService.message.findFirst({
        where: {
          pullRequest: {
            url,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          pullRequest: true,
        },
      })

      return message?.ts || undefined
    } catch (err) {
      Logger.error(err)
    }
  }
}
