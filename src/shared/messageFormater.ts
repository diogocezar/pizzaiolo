import { format, parseISO } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

import { Comment } from 'src/types/base/coment'

export const convertDate = (date: Date): string => {
  return format(zonedTimeToUtc(date, 'America/Sao_Paulo'), 'dd/MM/yyyy - HH:ss')
}

export const formatMessageInfos = (
  created_at: any,
  login: string,
  html_url: string
): string => {
  let str = ''
  str += `*Data do Pedido*: ${format(
    zonedTimeToUtc(parseISO(created_at), 'America/Sao_Paulo'),
    'dd/MM/yyyy - HH:ss'
  )}\n`
  str += `*Pizzaiolo*: ${login}\n`
  str += `*Veja essa beleza*: ${html_url}`
  return str
}

export const formatComment = (comment: Comment) => {
  return `O *${comment.user.login}* falou: ${comment.body}\n`
}

export const formatUrl = (url: string) => {
  return `URL: ${url}\n`
}
