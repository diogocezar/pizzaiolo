import { format, parseISO } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

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
