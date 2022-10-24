import { format, parseISO } from 'date-fns'

export const formatMessageInfos = (
  created_at: any,
  login: string,
  html_url: string
): string => {
  let str = ''
  str += `*Data do Pedido*: ${format(
    parseISO(created_at),
    'dd/MM/yyyy - HH:ss'
  )}\n`
  str += `*Pizzaiolo*: ${login}\n`
  str += `*Veja essa beleza*: ${html_url}`
  return str
}
