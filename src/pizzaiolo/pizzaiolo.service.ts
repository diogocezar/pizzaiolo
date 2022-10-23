import { Injectable } from '@nestjs/common';

@Injectable()
export class PizzaioloService {
  validatePayload(payload: any): boolean {
    const { action } = payload;
    const validActions = [
      `opened`,
      `closed`,
      `reopened`,
      `submitted`,
      `created`,
      `resolved`,
      `unresolved`,
    ];
    if (!validActions.includes(action)) {
      return false;
    }
    return true;
  }
  getMessage(payload: any): string {
    const { action, number, pull_request, review, comment, thread } = payload;
    let message = ``;
    if (number) message += `Número do Pedido: ${number}\n`;
    if (pull_request) {
      const { user, url, created_at, merged } = pull_request;
      if (action === `opened`) {
        message += `🍕 Saindo uma Pizza do Forno! 🍕\n`;
      }
      if (action === `closed` && merged === false) {
        message += `🔒 Uma PizzaRequest fechada com commits não mesclados!\n`;
      }
      if (action === `closed` && merged === true) {
        message += `🔒 Uma PizzaRequest fechada com sucesso!\n`;
      }
      if (action === `submitted`) {
        if (review) {
          message += `✅ Uma PizzaRequest foi revisada com sucesso!\n`;
          message += `Usuário que revisou: ${review.user.login}\n`;
        }
      }
      if (action === `created`) {
        if (comment) {
          message += `💭 Um comentário foi adicionado a uma PizzaRequest!\n`;
          message += `Comentário: ${comment.body}\n`;
          message += `Usuário que comentou: ${comment.user.login}\n`;
        }
      }
      if (action === `resolved`) {
        message += `✅ Uma thread foi resolvida!\n`;
        if (thread) {
          message += `URL: ${thread.comments[0].url}\n`;
        }
      }
      if (action === `unresolved`) {
        message += `👉 Uma thread foi marcada como aberta!\n`;
        if (thread) {
          message += `URL: ${thread.comments[0].url}\n`;
        }
      }
      message += `Data do Pedido: ${created_at}\n`;
      message += `Usuário: ${user.login}\n`;
      message += `URL: ${url}`;
    }
    return message;
  }
}
