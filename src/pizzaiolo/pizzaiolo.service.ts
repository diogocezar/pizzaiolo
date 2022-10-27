import { Injectable } from '@nestjs/common'
import { Comment, CommentPayload, User } from 'src/types/comment'
import { Review, ReviewPayload } from 'src/types/review'
import { PullRequest, PullRequestPayload } from 'src/types/pull_request'
import {
  CommentResolvedPayload,
  Thread as ThreadResolved,
} from 'src/types/comment_resolved'
import {
  CommentUnresolvedPayload,
  Thread as ThreadUnresolved,
} from 'src/types/comment_unresolved'
import { SlackService } from 'src/slack/slack.service'
import logger from 'src/logger'
import in_memory_database from 'src/in_memory_database'
import { formatMessageInfos } from 'src/helpers/messageFormater'
import { PrismaService } from 'src/utils/prisma.service'

type Payload =
  | PullRequestPayload
  | CommentPayload
  | CommentResolvedPayload
  | CommentUnresolvedPayload
  | ReviewPayload

interface PayloadAction {
  merged: boolean
  review: Review
  comment: Comment
  thread: ThreadResolved | ThreadUnresolved
  draft: boolean
  slackService: SlackService
  user: User
  html_url: string
  created_at: Date
  number: number
}

@Injectable()
export class PizzaioloService {
  constructor(private prisma: PrismaService) {}

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

    message += `🤌 Mama Mia! Que código bonito! 🤌\n`
    message += formatMessageInfos(created_at, user.login, html_url)

    const response = await slackService.sendMessage(message)

    in_memory_database.addMessage({ ...response, pullRequestUrl: html_url })

    logger.info(JSON.stringify(response))
  }

  async closedPullRequest({ slackService, html_url }: PayloadAction) {
    const messageFound = in_memory_database.getMessageByPullRequestUrl(html_url)
    await slackService.addReaction('pinched_fingers', messageFound?.ts)
  }

  async submittedPullRequest({
    review,
    slackService,
    html_url,
  }: PayloadAction) {
    const messageFound = in_memory_database.getMessageByPullRequestUrl(html_url)

    const icon = {
      commented: 'speech_balloon',
      approved: 'white_check_mark',
      changes_requested: 'x',
    }

    await slackService.addReaction(icon[review.state], messageFound?.ts)

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

    const messageFound = in_memory_database.getMessageByPullRequestUrl(html_url)

    if (comment) {
      message += `🍕 Mama Mia! *Reclamação do Cliente!* 🍕\n`
      message += `O *${comment.user.login}* falou: ${comment.body}\n`
    }

    message += formatMessageInfos(created_at, user.login, html_url)

    const response = await slackService.sendMessage(message, messageFound?.ts)

    logger.info(JSON.stringify(response))
  }

  async resolvedPUllRequest({
    thread,
    slackService,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    let message = ''

    message += `✅ Uma thread foi resolvida!\n`

    if (thread) {
      message += `URL: ${thread.comments[0].html_url}\n`
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
    message += `👉 Uma thread foi marcada como aberta!\n`

    if (thread) message += `URL: ${thread.comments[0].html_url}\n`

    message += formatMessageInfos(created_at, user.login, html_url)

    const response = await slackService.sendMessage(message)

    logger.info(JSON.stringify(response))
  }

  async executeActions({
    payload,
    slackService,
  }: {
    payload: Payload
    slackService: SlackService
  }) {
    // TODO: voltar aqui
    const { action, number, pull_request, review, comment, thread } =
      payload as any

    const { user, html_url, created_at, merged, draft } =
      pull_request as PullRequest

    // The PullRequest was opened, but it's a draft, then we don't need to send a message for review
    if (draft && action === 'opened') return

    const availableActions = {
      opened: this.openedPullRequest,
      closed: this.closedPullRequest,
      submitted: this.submittedPullRequest,
      created: this.createdPullRequest,
      resolved: this.resolvedPUllRequest,
      unresolved: this.unresolvedPullRequest,
      converted_to_draft: this.closedPullRequest,
    }

    await availableActions[action]({
      merged,
      review,
      comment,
      thread,
      draft,
      slackService,
      user,
      html_url,
      created_at,
      number,
    })

    this.prisma.events.create({
      data: {
        type: action,
        pullRequest: {
          connectOrCreate: {
            where: {
              id: pull_request.id,
            },
            create: {
              id: pull_request.id,
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
}
