import { Injectable } from '@nestjs/common'

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
  openedPullRequest() {
    return `🍕 Saindo uma Pizza do Forno! 🍕\n`
  }

  closedPullRequest({ merged }: { merged: boolean }) {
    if (merged) {
      return `🔒 Uma PizzaRequest fechada com sucesso!\n`
    }

    return `🔒 Uma PizzaRequest fechada com commits não mesclados!\n`
  }

  submittedPullRequest({ review }: { review: any }) {
    let message = ''

    if (review) {
      message += `✅ Uma PizzaRequest foi revisada com sucesso!\n`
      message += `Usuário que revisou: ${review.user.login}\n`
    }

    return message
  }

  createdPullRequest({ comment }: { comment: any }) {
    let message = ''

    if (comment) {
      message += `💭 Um comentário foi adicionado a uma PizzaRequest!\n`
      message += `Comentário: ${comment.body}\n`
      message += `Usuário que comentou: ${comment.user.login}\n`
    }

    return message
  }

  resolvedPUllRequest({ thread }: { thread: any }) {
    let message = ''

    message += `✅ Uma thread foi resolvida!\n`

    if (!thread) return message

    message += `URL: ${thread.comments[0].url}\n`

    return message
  }

  unresolvedPullRequest({ thread }: { thread: any }) {
    let message = ''

    message += `👉 Uma thread foi marcada como aberta!\n`

    if (!thread) return message

    message += `URL: ${thread.comments[0].url}\n`

    return message
  }

  getMessage(payload: any) {
    const { action, number, pull_request, review, comment, thread } = payload

    let message = ``

    if (number) message += `Número do Pedido: ${number}\n`

    if (!pull_request) return message

    const availableActions = {
      opened: this.openedPullRequest,
      closed: this.closedPullRequest,
      submitted: this.submittedPullRequest,
      created: this.createdPullRequest,
      resolved: this.resolvedPUllRequest,
      unresolved: this.unresolvedPullRequest,
    }

    const { user, url, created_at, merged } = pull_request

    message += availableActions[action]({
      merged,
      review,
      comment,
      thread,
    })

    message += `Data do Pedido: ${created_at}\n`
    message += `Usuário: ${user.login}\n`
    message += `URL: ${url}`

    return message
  }
}
