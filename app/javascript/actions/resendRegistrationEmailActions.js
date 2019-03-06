import { RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST, CLEAR_RESEND_INVITE } from './actionTypes'

export function resendRegistrationEmailActions(id) {
  return {
    type: RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
    payload: { id },
  }
}

export function clearResendEvent() {
  return {
    type: CLEAR_RESEND_INVITE,
  }
}
