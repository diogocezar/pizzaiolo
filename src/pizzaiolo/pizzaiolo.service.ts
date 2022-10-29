import { Injectable } from '@nestjs/common'

import { Review } from 'src/types/review'
import { PullRequestPayload } from 'src/types/pull_request'

import { SlackService } from 'src/slack/slack.service'
import logger from 'src/shared/logger'
import {
  formatMessageInfos,
  formatComment,
  formatUrl,
  convertDate,
} from 'src/shared/messageFormater'
import { PrismaService } from 'src/shared/prisma.service'
import { User } from 'src/types/base/user'
import { Thread } from 'src/types/base/thread'
import { Comment } from 'src/types/base/coment'
import { PullRequest } from 'src/types/base/pull-request'

import { icons } from 'src/shared/icons'
import { messages } from 'src/shared/messages'
import { RequestInfos } from 'src/types/request.infos'

interface PayloadAction {
  title: string
  merged: boolean
  review?: Review
  comment?: Comment
  thread?: Thread
  draft: boolean
  slackService: SlackService
  user: User
  html_url: string
  pull_request: PullRequest
  created_at: Date
}

@Injectable()
export class PizzaioloService {
  constructor(private prismaService: PrismaService) {}

  validatePayload(payload: any): boolean {
    const { action } = payload

    const validActions = [
      'opened',
      'closed',
      'reopened',
      'submitted',
      'created',
      'resolved',
      'unresolved',
    ]

    return validActions.includes(action)
  }

  async openedPullRequest({
    slackService,
    user,
    title,
    created_at,
    html_url,
    pull_request,
  }: PayloadAction) {
    let message = ''

    message += messages.open_pull_request

    const requestInfos: RequestInfos = {
      title,
      pizzaioloAvatar: user.avatar_url,
      url: html_url,
      date: convertDate(created_at),
      pizzaiolo: user.login,
    }

    const response = await slackService.sendMessage(message, null, requestInfos)

    await this.saveMessage({
      pull_request,
      timestamp: response.ts,
      url: html_url,
    })

    logger.info(response)
  }

  async closedPullRequest({ slackService, html_url }: PayloadAction) {
    const messageTimeStamp = await this.findMessageTimeStamp({ html_url })
    await slackService.addReaction(icons['closed'], messageTimeStamp)
  }

  async submittedPullRequest({
    review,
    slackService,
    html_url,
  }: PayloadAction) {
    const messageTimeStamp = await this.findMessageTimeStamp({ html_url })

    if (review.state === 'approved') {
      const count = this.findSubmittedPullRequest({ html_url })

      return slackService.addReaction(
        icons[`approved_${count}`],
        messageTimeStamp
      )
    }

    return slackService.addReaction(icons[review.state], messageTimeStamp)
  }

  async createdPullRequest({
    comment,
    slackService,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    let message = ''

    if (comment) {
      message += messages.comment
      message += formatComment(comment)
    }

    const messageTimeStamp = await this.findMessageTimeStamp({ html_url })

    const requestInfos: RequestInfos = {
      title: 'Uma nova atualização deste pedido!',
      pizzaioloAvatar: user.avatar_url,
      url: html_url,
      date: convertDate(created_at),
      pizzaiolo: user.login,
    }

    const response = await slackService.sendMessage(
      message,
      messageTimeStamp,
      requestInfos
    )

    logger.info(response)
  }

  async resolvedPullRequest({
    thread,
    slackService,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    let message = ''

    message += messages.resolved

    if (thread) {
      message += formatUrl(thread.comments[0].html_url)
    }

    message += formatMessageInfos(created_at, user.login, html_url)

    const messageTimeStamp = await this.findMessageTimeStamp({ html_url })

    const requestInfos: RequestInfos = {
      title: 'Pizza entregue!',
      pizzaioloAvatar: user.avatar_url,
      url: html_url,
      date: convertDate(created_at),
      pizzaiolo: user.login,
    }

    const response = await slackService.sendMessage(
      message,
      messageTimeStamp,
      requestInfos
    )

    logger.info(response)
  }

  async unresolvedPullRequest({
    thread,
    slackService,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    let message = ''
    message += messages.opened

    if (thread) message += formatUrl(thread.comments[0].html_url)

    message += formatMessageInfos(created_at, user.login, html_url)

    const messageTimeStamp = await this.findMessageTimeStamp({ html_url })

    const requestInfos: RequestInfos = {
      title: 'Eita, a pizza voltou!',
      pizzaioloAvatar: user.avatar_url,
      url: html_url,
      date: convertDate(created_at),
      pizzaiolo: user.login,
    }

    const response = await slackService.sendMessage(
      message,
      messageTimeStamp,
      requestInfos
    )

    logger.info(response)
  }

  async saveMessage({
    timestamp,
    pull_request,
    url,
  }: {
    timestamp: string
    pull_request: PullRequest
    url: string
  }): Promise<void> {
    await this.prismaService.message.create({
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
  }

  async saveOnDatabase({
    action,
    pull_request,
    user,
  }: {
    action: string
    pull_request: PullRequest
    user: User
  }): Promise<void> {
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
  }

  async findSubmittedPullRequest({
    html_url,
  }: {
    html_url: string
  }): Promise<number> {
    const count: number = await this.prismaService.events.count({
      where: { action: 'submitted', pullRequest: { url: html_url } },
    })
    return count
  }

  async findMessageTimeStamp({
    html_url,
  }: {
    html_url: string
  }): Promise<string | null> {
    const message = await this.prismaService.message.findFirst({
      where: {
        pullRequest: {
          url: html_url,
        },
      },
      include: {
        pullRequest: true,
      },
    })
    if (message?.ts) return message.ts
    return null
  }

  async executeActions({
    payload,
    slackService,
  }: {
    payload: PullRequestPayload
    slackService: SlackService
  }) {
    const { action, pull_request } = payload

    const { user, html_url, created_at, merged, draft, title } = pull_request

    if (draft && action === 'opened') return

    // We need to keep this way because this context inside class
    const payloadToSend: PayloadAction = {
      title,
      merged,
      draft,
      slackService,
      user,
      html_url,
      pull_request,
      created_at,
      ...payload,
    }

    switch (action) {
      case 'opened':
        this.openedPullRequest(payloadToSend)
        break
      case 'closed':
        this.closedPullRequest(payloadToSend)
        break
      case 'submitted':
        this.submittedPullRequest(payloadToSend)
        break
      case 'created':
        this.createdPullRequest(payloadToSend)
        break
      case 'resolved':
        this.resolvedPullRequest(payloadToSend)
        break
      case 'unresolved':
        this.unresolvedPullRequest(payloadToSend)
        break
      case 'converted_to_draft':
        this.closedPullRequest(payloadToSend)
        break
    }
    await this.saveOnDatabase({ action, pull_request, user })
  }
}
