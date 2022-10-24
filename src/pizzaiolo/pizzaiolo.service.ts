import { Injectable } from '@nestjs/common'
import { Comment, CommentPayload } from 'src/types/comment'
import { Review, ReviewPayload } from 'src/types/review'
import { PullRequest, PullRequestPayload, User } from 'src/types/pull_request'
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
import { format } from 'date-fns'

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
  url: string
  created_at: Date
  number: number
}

@Injectable()
export class PizzaioloService {
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

  formatMessageInfos(created_at, login, url) {
    let str = ''
    str += `*Data do Pedido*: ${format(created_at, 'DD/MM/YYYY HH:ss')}\n`
    str += `*Pizzaiolo*: ${login}\n`
    str += `*Veja essa beleza*: ${url}`
    return str
  }

  async openedPullRequest({
    slackService,
    user,
    created_at,
    url,
  }: PayloadAction) {
    let message = ''

    message += `🍕 Mama Mia! Código bonito! 🍕\n`
    message += this.formatMessageInfos(created_at, user.login, url)

    const response = await slackService.sendMessage(message)

    in_memory_database.addMessage({ ...response, pullRequestUrl: url })

    logger.info(JSON.stringify(response))
  }

  async closedPullRequest({ slackService, url }: PayloadAction) {
    const message = in_memory_database.getMessageByPullRequestUrl(url)
    await slackService.addReaction('checkered_flag', message?.ts)
  }

  async submittedPullRequest({ review, slackService, url }: PayloadAction) {
    const message = in_memory_database.getMessageByPullRequestUrl(url)

    const icon = {
      commented: 'speech_balloon',
      approved: 'white_check_mark',
      changes_requested: 'x',
    }

    await slackService.addReaction(icon[review.state], message?.ts)

    return false
  }

  async createdPullRequest({
    comment,
    slackService,
    user,
    created_at,
    url,
  }: PayloadAction) {
    let message = ''

    const messageFound = in_memory_database.getMessageByPullRequestUrl(url)

    if (comment) {
      message += `🍕 Mama Mia! *Reclamação do Cliente!* 🍕\n`
      message += `O *${comment.user.login}* falou: ${comment.body}\n`
    }

    message += this.formatMessageInfos(created_at, user.login, url)

    const response = await slackService.sendMessage(message, messageFound?.ts)

    logger.info(JSON.stringify(response))
  }

  async resolvedPUllRequest({
    thread,
    number,
    slackService,
    user,
    created_at,
    url,
  }: PayloadAction) {
    let message = ''

    if (number) message += `Número do Pedido: ${number}\n`

    message += `✅ Uma thread foi resolvida!\n`

    if (thread) {
      message += `URL: ${thread.comments[0].url}\n`
    }

    message += this.formatMessageInfos(created_at, user.login, url)

    const response = await slackService.sendMessage(message)

    logger.info(JSON.stringify(response))
  }

  async unresolvedPullRequest({
    thread,
    number,
    slackService,
    user,
    created_at,
    url,
  }: PayloadAction) {
    let message = ''

    if (number) message += `Número do Pedido: ${number}\n`

    message += `👉 Uma thread foi marcada como aberta!\n`

    if (thread) message += `URL: ${thread.comments[0].url}\n`

    message += this.formatMessageInfos(created_at, user.login, url)

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

    const { user, url, created_at, merged, draft } = pull_request as PullRequest

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
      url,
      created_at,
      number,
    })
  }
}
