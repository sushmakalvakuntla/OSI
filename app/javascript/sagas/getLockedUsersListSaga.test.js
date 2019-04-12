import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { lockedUsersListSaga, lockedUsersList } from './getLockedUsersListSaga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = lockedUsersListSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.GET_LOCKED_USERS_REQUEST, lockedUsersList))
  })

  describe('#lockedUsersList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn()
      UserService.search = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const searchParams = {}
        const gen = lockedUsersList({ payload: searchParams })
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.GET_LOCKED_USERS_SUCCESS,
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
        const gen = lockedUsersList(action)
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.GET_LOCKED_USERS_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
