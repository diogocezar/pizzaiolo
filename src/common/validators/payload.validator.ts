import { Payload } from 'src/common/interfaces/github/payload'

export const payloadValidator = (payload: Payload): boolean => {
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
