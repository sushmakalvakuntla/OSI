import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { inactiveUsersListSaga, inactiveUsersList } from './getInactiveUsersListSaga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = inactiveUsersListSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.GET_INACTIVE_USERS_REQUEST, inactiveUsersList))
  })

  describe('#inactiveUsersList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn()
      UserService.search = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const searchParams = {}
        const gen = inactiveUsersList({ payload: searchParams })
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.GET_INACTIVE_USERS_SUCCESS,
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
        const gen = inactiveUsersList(action)
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.GET_INACTIVE_USERS_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
