import resendRegistrationEmail from './resendRegistrationEmailReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
    }
    const state = {
      resendEmailUserId: [],
      fetching: false,
      registrationResentDateTime: null,
    }
    expect(resendRegistrationEmail(state, requestAction)).toEqual({
      fetching: true,
      resendEmailUserId: [],
      error: null,
      registrationResentDateTime: null,
    })
  })

  describe('handles RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS', () => {
    const state = {
      fetching: true,
      error: null,
      resendEmailUserId: [],
    }
    it('returns resendEmailUserId', () => {
      const responseAction = {
        type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
        resendEmailStatus: { user_id: 'SOME_ID' },
        id: 'SOME_ID',
      }
      expect(resendRegistrationEmail(state, responseAction)).toEqual({
        fetching: false,
        registrationResentDateTime: { user_id: 'SOME_ID' },
        resendEmailUserId: ['SOME_ID'],
        error: null,
      })
    })

    it('returns resendEmailUserId as array[id]', () => {
      const responseAction1 = {
        type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
        resendEmailStatus: { user_id: 'SOME_ID' },
        id: ['SOME_ID1', 'SOME_ID2'],
      }
      expect(resendRegistrationEmail(state, responseAction1)).toEqual({
        fetching: false,
        registrationResentDateTime: { user_id: 'SOME_ID' },
        resendEmailUserId: ['SOME_ID1', 'SOME_ID2'],
        error: null,
      })
    })
  })

  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE,
      registrationResentDateTime: null,
      error: 'error happened',
    }
    const state = { registrationResentDateTime: null, fetching: true, error: null }
    expect(resendRegistrationEmail(state, failureAction)).toEqual({
      fetching: false,
      registrationResentDateTime: null,
      error: 'error happened',
    })
  })

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    }
    const state = {
      fetching: false,
      resendEmailUserId: [],
      registrationResentDateTime: null,
    }
    expect(resendRegistrationEmail(undefined, randomAction)).toEqual(state)
  })

  it('clears details', () => {
    const before = { registrationResentDateTime: {}, fetching: false, error: null }
    let after
    expect(
      () =>
        (after = resendRegistrationEmail(before, {
          type: actionTypes.CLEAR_USER_DETAILS,
        }))
    ).not.toThrow()
    expect(after).not.toEqual(before)
  })
})
