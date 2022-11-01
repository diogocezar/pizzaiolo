import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { Attachments } from 'src/common/interfaces/slack/slack.message'

export const formatAttachment = ({
  title,
  date,
  user_name,
  url,
}): Array<Attachments> => {
  const attachments: Attachments = {
    color: '#bd2222',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: ':pinched_fingers: Mama Mia! Que código bonito! :pinched_fingers:',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Pizzaiolo:*\n<example.com|${user_name}>`,
          },
          {
            type: 'mrkdwn',
            text: `*Data do Pedido:*\n${date}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Nome:*\n ${title}`,
          },
          {
            type: 'mrkdwn',
            text: `*URL:*\n${url}`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: 'Não se esqueça de dar uma olhada nessa beleza! :pinched_fingers:',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Opções',
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Pegue um pedaço da *PIZZA!* 🍕',
        },
        accessory: {
          type: 'button',
          url,
          text: {
            type: 'plain_text',
            text: 'Acessar a PR',
            emoji: true,
          },
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Coloque mais *TOMPERO!* 🧂',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Recolocar no canal',
            emoji: true,
          },
          value: 'resend',
          action_id: 'resend',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Reações',
          emoji: true,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: ':one: :two: :three: Aprovações \n :pinched_fingers: Mesclado \n :speech_balloon: Comentário \n :salt: Repostar',
          },
        ],
      },
    ],
  }
  const templateToReturn: Array<Attachments> = []
  templateToReturn.push(attachments)
  return templateToReturn
}

export const convertDate = (date: Date): string => {
  return format(zonedTimeToUtc(date, 'America/Sao_Paulo'), 'dd/MM/yyyy - HH:ss')
}
