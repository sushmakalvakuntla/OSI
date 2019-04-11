import UserService from '../_services/users'
import { searchUserListSaga, searchUserList } from './getUserListSaga'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = searchUserListSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.FETCH_USERS_API_CALL_REQUEST, searchUserList))
  })

  describe('#searchUserList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn()
      UserService.search = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const searchParams = {}
        const gen = searchUserList({ payload: searchParams })
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        const resObj = {}
        expect(gen.next(resObj).value).toEqual(
          put({
            type: actionTypes.FETCH_USERS_API_CALL_SUCCESS,
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
        const gen = searchUserList(action)
        expect(gen.next().value).toEqual(call(UserService.search, searchParams))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_USERS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
