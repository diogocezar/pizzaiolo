import { Injectable } from '@nestjs/common';
import { Comment, CommentPayload } from 'src/types/comment';
import { Review, ReviewPayload } from 'src/types/review';
import { PullRequest, PullRequestPayload } from 'src/types/pull_request';
import {
  CommentResolvedPayload,
  Thread as ThreadResolved,
} from 'src/types/comment_resolved';
import {
  CommentUnresolvedPayload,
  Thread as ThreadUnresolved,
} from 'src/types/comment_unresolved';

type Payload =
  | PullRequestPayload
  | CommentPayload
  | CommentResolvedPayload
  | CommentUnresolvedPayload
  | ReviewPayload;

@Injectable()
export class PizzaioloService {
  validatePayload(payload: any): boolean {
    const { action } = payload;

    const validActions = [
      'opened',
      'closed',
      'reopened',
      'submitted',
      'created',
      'resolved',
      'unresolved',
    ];

    return validActions.includes(action);
  }

  openedPullRequest() {
    return `🍕 Saindo uma Pizza do Forno! 🍕\n`;
  }

  closedPullRequest({ merged }: { merged: boolean }) {
    if (merged) {
      return `🔒 Uma PizzaRequest fechada com sucesso!\n`;
    }

    return `🔒 Uma PizzaRequest fechada com commits não mesclados!\n`;
  }

  submittedPullRequest({ review }: { review: Review }) {
    let message = '';

    if (review) {
      message += `✅ Uma PizzaRequest foi revisada com sucesso!\n`;
      message += `Usuário que revisou: ${review.user.login}\n`;
    }

    return message;
  }

  createdPullRequest({ comment }: { comment: Comment }) {
    let message = '';

    if (comment) {
      message += `💭 Um comentário foi adicionado a uma PizzaRequest!\n`;
      message += `Comentário: ${comment.body}\n`;
      message += `Usuário que comentou: ${comment.user.login}\n`;
    }

    return message;
  }

  resolvedPUllRequest({ thread }: { thread: ThreadResolved }) {
    let message = '';

    message += `✅ Uma thread foi resolvida!\n`;

    if (!thread) return message;

    message += `URL: ${thread.comments[0].url}\n`;

    return message;
  }

  unresolvedPullRequest({ thread }: { thread: ThreadUnresolved }) {
    let message = '';

    message += `👉 Uma thread foi marcada como aberta!\n`;

    if (!thread) return message;

    message += `URL: ${thread.comments[0].url}\n`;

    return message;
  }

  getMessage(payload: Payload) {
    // TODO: voltar aqui
    const { action, number, pull_request, review, comment, thread } =
      payload as any;

    let message = ``;

    if (number) message += `Número do Pedido: ${number}\n`;

    const { user, url, created_at, merged, draft } =
      pull_request as PullRequest;

    // The PullRequest was opened, but it's a draft, then we don't need to send a message for review
    if (draft && action === 'opened') return;

    const availableActions = {
      opened: this.openedPullRequest,
      closed: this.closedPullRequest,
      submitted: this.submittedPullRequest,
      created: this.createdPullRequest,
      resolved: this.resolvedPUllRequest,
      unresolved: this.unresolvedPullRequest,
      converted_to_draft: this.closedPullRequest,
    };

    message += availableActions[action]({
      merged,
      review,
      comment,
      thread,
      draft,
    });

    message += `Data do Pedido: ${created_at}\n`;
    message += `Usuário: ${user.login}\n`;
    message += `URL: ${url}`;

    return message;
  }
}
