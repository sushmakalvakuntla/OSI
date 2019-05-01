import { groupUsersListReducer, groupUsersInitialValue } from './groupUsersListReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('check groupUsersListReducers initial state', () => {
    const action = {
      type: 'Unknown action type',
      payload: 'some payload',
    }
    const result = groupUsersListReducer(undefined, action)
    expect(result).toEqual(groupUsersInitialValue)
  })

  it('handles FETCH_GROUP_USERS_API_CALL_REQUEST', () => {
    const mockQuery = [{ f: 1 }]
    const requestAction = {
      type: actionTypes.FETCH_GROUP_USERS_API_CALL_REQUEST,
      payload: {
        query: mockQuery,
      },
    }
    const state = { groupUsers: null }
    expect(groupUsersListReducer(state, requestAction)).toEqual({
      groupUsers: null,
      error: null,
      query: mockQuery,
    })
  })

  it('handles FETCH_GROUP_USERS_API_CALL_SUCCESS', () => {
    const action = {
      type: actionTypes.FETCH_GROUP_USERS_API_CALL_SUCCESS,
      payload: {
        records: [{ id: 1 }, { id: 2 }],
        meta: {
          total: 42,
          request: {
            from: 0,
            size: 10,
            sort: [],
            query: [],
          },
        },
      },
    }
    const before = {}
    let after
    expect(() => (after = groupUsersListReducer(before, action))).not.toThrow()
    expect(after.groupUsers.length).toBe(2)
    expect(after.error).toBe(null)
  })

  it('handles FETCH_GROUP_USERS_API_CALL_FAILURE', () => {
    const errorMessage = 'error happened'
    const failureAction = {
      type: actionTypes.FETCH_GROUP_USERS_API_CALL_FAILURE,
      error: errorMessage,
    }
    const before = { groupUsers: [{ id: 1 }, { id: 2 }] }
    let after
    expect(() => (after = groupUsersListReducer(before, failureAction))).not.toThrow()
    expect(after.groupUsers).toEqual([])
    expect(after.error).toEqual(errorMessage)
  })

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      details: { hello: 'world' },
    }
    const state = { groupUsers: ['item1', 'item2'], error: null }
    expect(groupUsersListReducer(state, unexpectedAction)).toEqual(state)
  })
})
