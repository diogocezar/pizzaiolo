import { Injectable } from '@nestjs/common'
import Logger from 'src/common/utils/logger'
import { formatAttachment, convertDate } from 'src/common/utils/formatter'
import { SlackService } from 'src/slack/slack.service'
import { PizzaioloRepository } from './pizzaiolo.repository'
import { PayloadAction } from 'src/common/interfaces/pizzaiolo/pizzaiolo.action'
import { SlackMessage } from 'src/common/interfaces/slack/slack.message'

import { ICONS, MESSAGES } from 'src/common/constants'
import { PullRequestPayload } from 'src/common/interfaces/github/pull_request'
import { ReviewState } from 'src/common/enums/reviewState.enum'
import { LogType } from 'src/common/enums/logType.enum'

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

      Logger.info({
        type: LogType.OPENED_PULL_REQUEST,
        slack: responseSlack,
        base: responseBase,
      })
    } catch (err) {
      Logger.error({ type: LogType.OPENED_PULL_REQUEST, error: err })
    }
  }

  async closedPullRequest({ html_url }: PayloadAction) {
    try {
      const messageTimeStamp =
        await this.pizzaioloRepository.findMessageTimeStamp(html_url)

      await this.slackService.addReaction({
        name: ICONS.CLOSED,
        timestamp: messageTimeStamp,
      })

      Logger.info({
        type: LogType.CLOSED_PULL_REQUEST,
        messageTimeStamp,
      })
    } catch (err) {
      Logger.error({ type: LogType.CLOSED_PULL_REQUEST, error: err })
    }
  }

  async submittedPullRequest({ review, html_url }: PayloadAction) {
    try {
      let count = 0
      const messageTimeStamp =
        await this.pizzaioloRepository.findMessageTimeStamp(html_url)

      if (review.state === ReviewState.APPROVED) {
        count = await this.pizzaioloRepository.findSubmittedPullRequest(
          html_url
        )

        await this.slackService.addReaction({
          name: ICONS[`APPROVED_${count}`],
          timestamp: messageTimeStamp,
        })

        Logger.info({
          type: LogType.SUBMITTED_PULL_REQUEST,
          messageTimeStamp,
          state: review.state,
          count: count,
        })

        return
      }

      await this.slackService.addReaction({
        name: ICONS.APPROVED,
        timestamp: messageTimeStamp,
      })

      Logger.info({
        type: LogType.SUBMITTED_PULL_REQUEST,
        messageTimeStamp,
        state: review.state,
      })
    } catch (err) {
      Logger.error({ type: LogType.SUBMITTED_PULL_REQUEST, error: err })
    }
  }

  async createdPullRequest({
    comment,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    try {
      const messageTimeStamp =
        await this.pizzaioloRepository.findMessageTimeStamp(html_url)

      const attachments = formatAttachment({
        title: comment ? MESSAGES.COMMENT : MESSAGES.OPEN_PULL_REQUEST,
        date: convertDate(created_at),
        user_name: user.login,
        user_avatar: user.avatar_url,
        url: html_url,
      })

      const responseSlack = await this.slackService.sendMessage({
        text: comment ? comment : MESSAGES.OPEN_PULL_REQUEST,
        timestamp: messageTimeStamp,
        attachments,
      } as SlackMessage)

      Logger.info({
        type: LogType.CREATED_PULL_REQUEST,
        slack: responseSlack,
        messageTimeStamp,
      })
    } catch (err) {
      Logger.error({ type: LogType.CREATED_PULL_REQUEST, error: err })
    }
  }

  async resolvedPullRequest({
    thread,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    try {
      const sendUrl = thread.comments[0].html_url || html_url

      const messageTimeStamp =
        await this.pizzaioloRepository.findMessageTimeStamp(html_url)

      const attachments = formatAttachment({
        title: MESSAGES.RESOLVED,
        date: convertDate(created_at),
        user_name: user.login,
        user_avatar: user.avatar_url,
        url: sendUrl,
      })

      const responseSlack = await this.slackService.sendMessage({
        text: MESSAGES.RESOLVED,
        timestamp: messageTimeStamp,
        attachments,
      } as SlackMessage)

      Logger.info({
        type: LogType.RESOLVED_PULL_REQUEST,
        slack: responseSlack,
        messageTimeStamp,
      })
    } catch (err) {
      Logger.error({ type: LogType.RESOLVED_PULL_REQUEST, error: err })
    }
  }

  async unresolvedPullRequest({
    thread,
    user,
    created_at,
    html_url,
  }: PayloadAction) {
    try {
      const sendUrl = thread.comments[0].html_url || html_url

      const messageTimeStamp =
        await this.pizzaioloRepository.findMessageTimeStamp(html_url)

      const attachments = formatAttachment({
        title: MESSAGES.UNRESOLVED,
        date: convertDate(created_at),
        user_name: user.login,
        user_avatar: user.avatar_url,
        url: sendUrl,
      })

      const responseSlack = await this.slackService.sendMessage({
        text: MESSAGES.UNRESOLVED,
        timestamp: messageTimeStamp,
        attachments,
      } as SlackMessage)

      Logger.info({
        type: LogType.UNRESOLVED_PULL_REQUEST,
        slack: responseSlack,
        messageTimeStamp,
      })
    } catch (err) {
      Logger.error({ type: LogType.UNRESOLVED_PULL_REQUEST, error: err })
    }
  }

  async executeActions(payload: PullRequestPayload) {
    const { action, pull_request } = payload
    const { user, html_url, created_at, merged, draft, title } = pull_request
    if (draft && action === 'opened') return
    const payloadToSend: PayloadAction = {
      title,
      merged,
      draft,
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
    }

    await this.pizzaioloRepository.save({ action, pull_request, user })
  }
}
