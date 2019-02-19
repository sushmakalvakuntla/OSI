import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { resendRegistrationEmailSaga, resendEmail } from './resendRegistrationEmailSaga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = resendRegistrationEmailSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST, resendEmail))
  })

  describe('#resendEmail', () => {
    const id = 'abcdefghijklmnopqrstuvwxyz'
    const resendEmailStatus = 200
    beforeEach(() => {
      UserService.resendRegistrationEmail = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { id } }
        const gen = resendEmail(action)

        expect(gen.next().value).toEqual(call(UserService.resendRegistrationEmail, id))
        expect(gen.next({ resendEmailStatus, id }).value).toEqual(
          put({
            type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
            resendEmailStatus: { resendEmailStatus, id },
            id,
          })
        )
        expect(gen.next({ resendEmailStatus, id }).value).toEqual(
          put({
            type: actionTypes.FETCH_DETAILS_API_CALL_REQUEST,
            payload: { id: id },
          })
        )
        expect(gen.next({ resendEmailStatus, id }).value).toEqual(
          put({
            type: actionTypes.CLEAR_ADDED_USER_DETAILS,
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back ', () => {
      it('handles the error', () => {
        const action = { payload: { id } }
        const gen = resendEmail(action)

        expect(gen.next().value).toEqual(call(UserService.resendRegistrationEmail, id))
        expect(gen.throw('database not accessible').value).toEqual(
          put({
            type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE,
            error: 'database not accessible',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
