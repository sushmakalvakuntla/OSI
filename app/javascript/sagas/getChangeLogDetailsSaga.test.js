import UserService from '../_services/users'
import { changeLogDetailsSaga, getChangeLogAdminDetails } from './getChangeLogDetailsSaga'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = changeLogDetailsSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST, getChangeLogAdminDetails))
  })

  describe('#getChangeLogAdminDetails', () => {
    beforeEach(() => {
      UserService.fetchUserDetails = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { id: 'man1232' } }
        const gen = getChangeLogAdminDetails(action)
        expect(gen.next().value).toEqual(call(UserService.fetchUserDetails, action.payload.id))
        expect(gen.next([1234, 5678]).value).toEqual(
          put({
            type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_SUCCESS,
            changeLogDetails: [1234, 5678],
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const action = { payload: { id: 'man' } }
        const gen = getChangeLogAdminDetails(action)
        expect(gen.next().value).toEqual(call(UserService.fetchUserDetails, action.payload.id))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when empty comes back from the fetch', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { id: {} } }
        const gen = getChangeLogAdminDetails(action)
        expect(gen.next().value).toEqual(call(UserService.fetchUserDetails, action.payload.id))
        expect(gen.next([1234, 5678]).value).toEqual(
          put({
            type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_SUCCESS,
            changeLogDetails: [1234, 5678],
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
