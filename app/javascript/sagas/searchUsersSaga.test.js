import { watchUserSearchParamUpdates, searchUserList } from './searchUsersSaga'
import { getSearchParams } from '../selectors/searchUserListSelector'
import { takeLatest, put, select } from 'redux-saga/effects'
import { USER_LIST_SET_SEARCH, FETCH_USERS_API_CALL_REQUEST } from '../actions/actionTypes'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = watchUserSearchParamUpdates()
    expect(gen.next().value).toEqual(takeLatest([USER_LIST_SET_SEARCH], searchUserList))
  })

  describe('when successful', () => {
    it('executes the happy-path saga', () => {
      const gen = searchUserList()
      expect(gen.next().value).toEqual(select(getSearchParams))
      expect(gen.next(['Hello', 'Bye']).value).toEqual(
        put({
          type: FETCH_USERS_API_CALL_REQUEST,
          payload: ['Hello', 'Bye'],
        })
      )
    })
  })

  describe('when failure', () => {
    it('handles error', () => {
      const gen = searchUserList()
      expect(gen.next().value).toEqual(select(getSearchParams))
      expect(gen.throw('SEARCH ERROR FAILURE').value).toEqual(
        put({
          error: 'SEARCH ERROR FAILURE',
        })
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
