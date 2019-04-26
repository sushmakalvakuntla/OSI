import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { unregisteredUsersListSaga, unregisteredUsersList } from './getUnregisteredUsersListSaga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = unregisteredUsersListSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.GET_UNREGISTERED_USERS_REQUEST, unregisteredUsersList))
  })

  describe('#unregisteredUsersList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn()
      UserService.searchForTiles = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const searchParams = {}
        const gen = unregisteredUsersList({ payload: searchParams })
        expect(gen.next().value).toEqual(call(UserService.searchForTiles, searchParams))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.GET_UNREGISTERED_USERS_SUCCESS,
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
        const gen = unregisteredUsersList(action)
        expect(gen.next().value).toEqual(call(UserService.searchForTiles, searchParams))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.GET_UNREGISTERED_USERS_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
