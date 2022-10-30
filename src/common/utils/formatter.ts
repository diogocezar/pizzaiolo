import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { Attachments } from 'src/common/interfaces/slack/slack.message'

export const formatAttachment = ({
  title,
  date,
  user_name,
  user_avatar,
  url,
}): Array<Attachments> => {
  const attachments: Array<any> = [
    {
      color: '#fff',
      title: 'Veja os detalhes que acabaram de sair do forno:',
      fields: [
        {
          title: 'Ingredientes',
          value: title,
          short: false,
        },
        {
          title: 'Data do Pedido',
          value: date,
          short: true,
        },
        {
          title: 'Pizzaiolo',
          value: user_name,
          short: true,
        },
      ],
      title_link: url,
      author_icon: user_avatar,
      author_name: user_name,
      footer: 'Não se esqueça de dar uma olhada no pedido!',
    },
    {
      title: 'Que tal dar uma olhada nessa PR?',
      color: '#3AA3E3',
      actions: [
        {
          type: 'button',
          style: 'primary',
          text: 'Pegue um Pedaço 🍕',
          url: url,
        },
      ],
    },
    {
      blocks: [
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Reenviar pizza 🍕',
                emoji: true,
              },
              value: 'resend',
              action_id: 'resend',
            },
          ],
        },
      ],
    },
  ]

  return attachments
}

export const convertDate = (date: Date): string => {
  return format(zonedTimeToUtc(date, 'America/Sao_Paulo'), 'dd/MM/yyyy - HH:ss')
}
