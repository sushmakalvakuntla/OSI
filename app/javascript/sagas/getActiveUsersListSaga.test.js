import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { activeUsersList, activeUsersListSaga } from './getActiveUsersListSaga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = activeUsersListSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.GET_ACTIVE_USERS_REQUEST, activeUsersList))
  })

  describe('#activeUsersList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn()
      UserService.search = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const searchParams = {}
        const gen = activeUsersList({ payload: searchParams })
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.GET_ACTIVE_USERS_SUCCESS,
            payload: resObj,
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const searchParams = {}
        const action = { payload: searchParams }
        const gen = activeUsersList(action)
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.GET_ACTIVE_USERS_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
