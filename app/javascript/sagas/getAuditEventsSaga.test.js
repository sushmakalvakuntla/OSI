import { getAuditEventsSaga, getAuditEvents } from './getAuditEventsSaga'
import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = getAuditEventsSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST, getAuditEvents))
  })

  describe('#getAuditEvents', () => {
    beforeEach(() => {
      UserService.auditEvents = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const params = {}
        const gen = getAuditEvents({ payload: params })
        expect(gen.next().value).toEqual(call(delay, 800))
        expect(gen.next().value).toEqual(call(UserService.auditEvents, params))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_SUCCESS,
            payload: resObj,
          })
        )
        expect(gen.next().value).toEqual(call(delay, 3000))
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_SUCCESS,
            payload: resObj,
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const params = {}
        const action = { payload: params }
        const gen = getAuditEvents(action)
        expect(gen.next().value).toEqual(call(delay, 800))
        expect(gen.next().value).toEqual(call(UserService.auditEvents, params))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
