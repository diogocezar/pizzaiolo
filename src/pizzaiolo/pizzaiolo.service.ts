import { Injectable } from '@nestjs/common'

import { Review } from 'src/types/review'
import { PullRequestPayload } from 'src/types/pull_request'

import { SlackService } from 'src/slack/slack.service'
import logger from 'src/shared/logger'
import {
  formatMessageInfos,
  formatComment,
  formatUrl,
} from 'src/shared/messageFormater'
import { PrismaService } from 'src/shared/prisma.service'
import { User } from 'src/types/base/user'
import { Thread } from 'src/types/base/thread'
import { Comment } from 'src/types/base/coment'
import { PullRequest } from '@prisma/client'

import { icons } from 'src/shared/icons'
import { messages } from 'src/shared/messages'

interface PayloadAction {
  merged: boolean
  review: Review
  comment: Comment
  thread: Thread
  draft: boolean
  slackService: SlackService
  user: User
  html_url: string
  created_at: Date
  number: number
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
    created_at,
    html_url,
  }: PayloadAction) {
    let message = ''

    message += messages.open_pull_request
    message += formatMessageInfos(created_at, user.login, html_url)

    const response = await slackService.sendMessage(message)

    logger.info(JSON.stringify(response))
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

    await slackService.addReaction(icons[review.state], messageTimeStamp)

    return false
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

    message += formatMessageInfos(created_at, user.login, html_url)

    const response = await slackService.sendMessage(message, messageTimeStamp)

    logger.info(JSON.stringify(response))
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

    const response = await slackService.sendMessage(message)

    logger.info(JSON.stringify(response))
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

    const response = await slackService.sendMessage(message)

    logger.info(JSON.stringify(response))
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
    console.log(action, pull_request, user)
    this.prismaService.events.create({
      data: {
        type: action,
        pullRequest: {
          connectOrCreate: {
            where: {
              id: pull_request.id,
            },
            create: {
              id: pull_request.id,
              url: pull_request.url,
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
    })
  }

  async findMessageTimeStamp({
    html_url,
  }: {
    html_url: string
  }): Promise<string | null> {
    const message = await this.prismaService.message.findFirstOrThrow({
      where: {
        pullRequest: {
          url: html_url,
        },
      },
      include: {
        pullRequest: true,
      },
    })
    if (message.ts) return message.ts
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

    const { user, html_url, created_at, merged, draft } = pull_request

    if (draft && action === 'opened') return

    const availableActions = {
      opened: this.openedPullRequest,
      closed: this.closedPullRequest,
      submitted: this.submittedPullRequest,
      created: this.createdPullRequest,
      resolved: this.resolvedPullRequest,
      unresolved: this.unresolvedPullRequest,
      converted_to_draft: this.closedPullRequest,
    }

    await availableActions[action]({
      merged,
      draft,
      slackService,
      user,
      html_url,
      created_at,
      ...payload,
    })

    await this.saveOnDatabase({ action, pull_request, user })
  }
}
