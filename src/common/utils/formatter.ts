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
          text: `:pinched_fingers: ${title}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Desenvolvedor:*\n<example.com|${user_name}>`,
          },
          {
            type: 'mrkdwn',
            text: `*Data:*\n${date}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*URL:*\n${url}`,
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
