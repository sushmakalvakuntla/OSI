import { resendRegistrationEmailActions, clearResendEvent } from './resendRegistrationEmailActions'
import { RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST, CLEAR_RESEND_INVITE } from './actionTypes'

describe('#resendRegistrationEmailActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID'
    expect(resendRegistrationEmailActions(id)).toEqual({
      type: RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
      payload: { id },
    })
  })
})

describe('#clearResendEvent', () => {
  it('returns type ', () => {
    expect(clearResendEvent()).toEqual({
      type: CLEAR_RESEND_INVITE,
    })
  })
})
