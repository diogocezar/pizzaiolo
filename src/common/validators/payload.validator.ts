import { Payload } from 'src/common/interfaces/github/payload'
import { Actions } from 'src/common/enums/actions.enum'

export const payloadValidator = (payload: Payload): boolean => {
  const { action } = payload

  const validActions = [
    Actions.OPENED,
    Actions.CLOSED,
    Actions.REOPENED,
    Actions.SUBMITTED,
    Actions.CREATED,
    Actions.RESOLVED,
    Actions.UNRESOLVED,
  ]

  return validActions.includes(action)
}
