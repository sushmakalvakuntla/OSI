import reducer from './searchUserListReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('handles FETCH_ACCOUNT_API_CALL_REQUEST', () => {
    const before = {
      fetching: false,
    }
    const action = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST,
      payload: 'Asdfggzxcvb',
    }
    const after = reducer(before, action)
    expect(after.fetching).toEqual(true)
  })

  it('handles FETCH_ACCOUNT_API_CALL_SUCCESS', () => {
    const before = {
      inputData: {},
      adminAccountDetails: {
        county_name: '',
        first_name: '',
        last_name: '',
      },
    }
    const action = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      payload: {
        roles: ['Office-admin'],
        admin_office_ids: ['1234509876'],
        county_name: 'Madera',
        first_name: 'User first name',
        last_name: 'User last name',
      },
    }
    const after = reducer(before, action)
    expect(after.inputData.officeNames).toEqual(['1234509876'])
  })

  it('handles FETCH_ACCOUNT_API_CALL_SUCCESS when officeNames is undefined and role is office-admin', () => {
    const before = {
      inputData: {
        officeNames: undefined,
      },
      adminAccountDetails: {},
    }
    const action = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      payload: { admin_office_ids: ['1234509876'], county_name: 'Madera', roles: ['Office-admin', 'Admin2'] },
    }
    const after = reducer(before, action)
    expect(after.inputData.officeNames).toEqual(['1234509876'])
  })

  it('handles FETCH_ACCOUNT_API_CALL_SUCCESS when officeNames is undefined & not a office-admin', () => {
    const before = {
      inputData: {
        officeNames: undefined,
      },
      adminAccountDetails: {},
    }
    const action = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      payload: { admin_office_ids: ['1234509876'], county_name: 'Madera', roles: ['Admin1', 'Admin2'] },
    }
    const after = reducer(before, action)
    expect(after.inputData.officeNames).toEqual([])
  })

  it('handles FETCH_ACCOUNT_API_CALL_SUCCESS when officeNames has value & not a office-admin', () => {
    const before = {
      inputData: {
        officeNames: ['123QWERTY'],
      },
      adminAccountDetails: {},
    }
    const action = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      payload: { admin_office_ids: ['1234509876'], county_name: 'Madera', roles: ['Admin1', 'Admin2'] },
    }
    const after = reducer(before, action)
    expect(after.inputData.officeNames).toEqual(['123QWERTY'])
  })

  it('handles FETCH_ACCOUNT_API_CALL_FAILURE', () => {
    const before = {
      error: null,
    }
    const action = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE,
      payload: { error: 'someError' },
    }
    const after = reducer(before, action)
    expect(after.error).toEqual('someError')
  })

  it('handles USER_STATUS_CHANGE_SUCCESS', () => {
    const before = {
      unlockedUsers: {},
    }
    const action = {
      type: actionTypes.USER_STATUS_CHANGE_SUCCESS,
      payload: { id: 'user_id' },
      successAlert: 'hooray',
    }
    const after = reducer(before, action)
    expect(after.unlockedUsers).toEqual({ user_id: { message: 'hooray', unlocked: true } })
  })

  it('handles USER_STATUS_CHANGE_FAIL', () => {
    const before = {
      unlockedUsers: {},
    }
    const action = {
      type: actionTypes.USER_STATUS_CHANGE_FAILURE,
      payload: { id: 'user_id' },
      error: { user_message: 'some_error' },
    }
    const after = reducer(before, action)
    expect(after.unlockedUsers).toEqual({ user_id: { message: 'some_error', unlocked: false } })
  })

  it('handles FETCH_USERS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_USERS_API_CALL_REQUEST,
      payload: {
        query: [],
      },
    }
    const state = { userList: null, fetching: false }
    expect(reducer(state, requestAction)).toEqual({
      fetching: true,
      userList: null,
      error: null,
      unlockedUsers: {},
      query: [],
    })
  })

  it('handles FETCH_USERS_API_CALL_SUCCESS', () => {
    const action = {
      type: actionTypes.FETCH_USERS_API_CALL_SUCCESS,
      payload: {
        records: [{ id: 'key1', username: 'user1' }, { id: 'key2', username: 'user2' }],
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
    expect(() => (after = reducer(before, action))).not.toThrow()
    expect(after.fetching).toEqual(false)
    expect(after.users.length).toBe(2)
    expect(after.error).toBe(null)
  })

  it('handles FETCH_USERS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_USERS_API_CALL_FAILURE,
      error: 'error happened',
    }
    const before = {}
    let after
    expect(() => (after = reducer(before, failureAction))).not.toThrow()
    expect(after.fetching).toBe(false)
    expect(after.users).toBeFalsy()
    expect(after.error).toEqual('error happened')
  })

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      details: { hello: 'world' },
    }
    const state = { userList: ['item1', 'item2'], fetching: true, error: null }
    expect(reducer(state, unexpectedAction)).toEqual(state)
  })

  it('handles input change', () => {
    const before = {
      inputData: { lastName: 'oldLastName' },
    }
    const key = 'lastName'
    const value = 'newLastName'
    const action = {
      type: actionTypes.HANDLE_INPUT_CHANGE,
      payload: {
        key,
        value,
      },
    }
    const after = reducer(before, action)
    expect(after.inputData).toEqual({ lastName: 'newLastName' })
  })

  it('handles checkbox change', () => {
    const before = {
      includeInactive: false,
    }
    const action = {
      type: actionTypes.HANDLE_CHECKBOX_CHANGE,
    }
    const after = reducer(before, action)
    expect(after.includeInactive).toBeTruthy()
  })

  it('handles search criteria updates', () => {
    const myQuery = [{ field: 'haystack', value: 'needle' }]
    const state = reducer(
      {},
      {
        type: actionTypes.USER_LIST_SET_SEARCH,
        payload: myQuery,
      }
    )
    expect(state.query).toEqual(myQuery)
  })

  it('handles clear search', () => {
    const before = {
      inputData: {
        lastName: 'someLastName',
        firstName: 'someFirstName',
        CWSLogin: 'someCWDSLogin',
        email: 'some@email.com',
      },
      includeInactive: false,
    }
    const action = {
      type: actionTypes.USER_LIST_CLEAR_SEARCH,
    }
    const after = reducer(before, action)
    expect(after.inputData).toEqual({
      lastName: '',
      firstName: '',
      CWSLogin: '',
      email: '',
      officeNames: [],
    })
    expect(after.includeInactive).toEqual(true)
  })

  it('has an initial state', () => {
    expect(reducer(undefined, {})).toBeTruthy()
  })

  it('returns the state tree when no action types match', () => {
    const randomAction = {
      type: 'DOES_NOT_EXIST',
      payload: {},
    }
    expect(reducer({}, randomAction)).toBeTruthy()
  })
})
