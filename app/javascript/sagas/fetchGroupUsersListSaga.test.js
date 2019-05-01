import UserService from '../_services/users'
import { fetchGroupUsersListSaga, fetchGroupUsersList } from './fetchGroupUsersListSaga'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = fetchGroupUsersListSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.FETCH_GROUP_USERS_API_CALL_REQUEST, fetchGroupUsersList))
  })

  describe('#grouUsersList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn()
      UserService.search = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = fetchGroupUsersList({ payload: { query: {}, size: 100 } })
        expect(gen.next().value).toEqual(call(UserService.search, { from: 0, query: {}, size: 100, sort: [] }))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.FETCH_GROUP_USERS_API_CALL_SUCCESS,
            payload: resObj,
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const action = { payload: { query: {}, size: 100 } }
        const gen = fetchGroupUsersList(action)
        expect(gen.next().value).toEqual(call(UserService.search, { from: 0, query: {}, size: 100, sort: [] }))
        expect(gen.throw('Error').value).toEqual(
          put({
            type: actionTypes.FETCH_GROUP_USERS_API_CALL_FAILURE,
            error: 'Error',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
