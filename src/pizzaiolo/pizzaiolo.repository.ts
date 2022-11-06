import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/database/prisma/prisma.service'
import { PizzaioloEvent } from 'src/common/interfaces/pizzaiolo/pizzaiolo.event'
import { PizzaioloMessage } from 'src/common/interfaces/pizzaiolo/pizzaiolo.message'
import Logger from 'src/common/utils/logger'

@Injectable()
export class PizzaioloRepository {
  constructor(private prismaService: PrismaService) {}

  async save({ action, pull_request, user }: PizzaioloEvent) {
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

      return await this.prismaService.events.create(connectOrCreate)
    } catch (err) {
      Logger.error(err)
    }
  }

  async saveMessage({ timestamp, pull_request, url }: PizzaioloMessage) {
    try {
      return await this.prismaService.message.create({
        data: {
          ts: timestamp,
          pullRequest: {
            connectOrCreate: {
              where: {
                id: pull_request.id,
              },
              create: {
                id: pull_request.id,
                url: url,
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

  async findMessageTimeStamp(url: string): Promise<string | null> {
    try {
      const message = await this.prismaService.message.findFirst({
        where: {
          pullRequest: {
            url,
          },
        },
        include: {
          pullRequest: true,
        },
      })
      if (message?.ts) return message.ts
      return null
    } catch (err) {
      Logger.error(err)
    }
    return null
  }
}
