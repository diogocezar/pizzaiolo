import {
  ParsedPayloadInteractivity,
  PayloadInteractivity,
} from 'src/common/interfaces/slack/interactivity.payload'

export const interactivityValidator = (
  payload: PayloadInteractivity
): ParsedPayloadInteractivity | false => {
  if (!payload.payload) return false

  const parsedPayload = JSON.parse(
    payload.payload
  ) as ParsedPayloadInteractivity

  if (!parsedPayload.actions.some((action) => action.value === 'resend')) {
    return false
  }

  return parsedPayload
}
