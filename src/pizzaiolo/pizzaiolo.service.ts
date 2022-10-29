import { Injectable } from '@nestjs/common'
import Logger from 'src/shared/logger'
import { ICONS, MESSAGES } from 'src/common/constants'
import { formatAttachment, convertDate } from 'src/common/utils/formater'
import { SlackService } from 'src/slack/slack.service'
import { PizzaioloRepository } from './pizzaiolo.repository'
import { PayloadAction } from 'src/common/interfaces/pizzaiolo/pizzaiolo.action'
import { SlackMessage } from 'src/common/interfaces/slack/slack.message'

@Injectable()
export class PizzaioloService {
  constructor(
    private pizzaioloRepository: PizzaioloRepository,
    private slackService: SlackService
  ) {}

  async openedPullRequest({
    user,
    title,
    created_at,
    html_url,
    pull_request,
  }: PayloadAction) {
    try {
      const text = MESSAGES.OPEN_PULL_REQUEST

      const attachments = formatAttachment({
        title,
        date: convertDate(created_at),
        user_name: user.login,
        user_avatar: user.avatar_url,
        url: html_url,
      })

      const responseSlack = await this.slackService.sendMessage({
        text,
        timestamp: null,
        attachments,
      } as SlackMessage)

      const responseBase = await this.pizzaioloRepository.saveMessage({
        pull_request,
        timestamp: responseSlack.ts,
        url: html_url,
      })

      Logger.info({ slack: responseSlack, base: responseBase })
    } catch (err) {
      Logger.error(err)
    }
  }

  //TODO : Parei aqui

  async closedPullRequest({ html_url }: PayloadAction) {
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
