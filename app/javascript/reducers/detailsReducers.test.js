import fetchDetails from './detailsReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('handles FETCH_DETAILS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_DETAILS_API_CALL_REQUEST,
    }
    const state = { details: null, initialDetails: null, fetching: false }
    expect(fetchDetails(state, requestAction)).toEqual({
      fetching: true,
      details: null,
      initialDetails: null,
      fetchDetailsError: null,
    })
  })

  it('handles FETCH_DETAILS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_DETAILS_API_CALL_SUCCESS,
      details: { id: 'key1', username: 'user1' },
    }
    const state = { details: null, fetching: true, fetchDetailsError: null }
    const records = {
      XHRStatus: 'ready',
      records: { id: 'key1', username: 'user1' },
    }

    expect(fetchDetails(state, responseAction)).toEqual({
      fetching: false,
      details: records,
      isEdit: false,
      fetchDetailsError: null,
      displayAlert: false,
      initialDetails: records.records,
    })
  })

  it('handles FETCH_DETAILS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_DETAILS_API_CALL_FAILURE,
      details: null,
      initialDetails: null,
      error: { user_message: 'error happened' },
    }
    const state = { details: null, initialDetails: null, fetching: true, error: null }
    expect(fetchDetails(state, failureAction)).toEqual({
      fetching: false,
      details: null,
      fetchDetailsError: { user_message: 'error happened' },
      error: null,
      displayAlert: false,
      initialDetails: null,
    })
  })

  it('handles HANDLE_DROPDOWN_CHANGE', () => {
    const name = 'permissions'
    const value = ['Snapshot-rollout']
    const handleDropDownAction = {
      type: actionTypes.HANDLE_DROPDOWN_CHANGE,
      payload: { name, value },
    }
    const details = {
      records: {
        user: {
          permissions: undefined,
        },
      },
    }
    const state = { details: details }
    expect(fetchDetails(state, handleDropDownAction)).toEqual({
      details: {
        records: { user: { permissions: ['Snapshot-rollout'] } },
      },
      displayAlert: false,
      disableActionBtn: false,
    })
  })

  it('handles HANDLE_USER_INPUT_CHANGE', () => {
    const name = 'email'
    const value = 'hello@gmail.com'

    const handleInputAction = {
      type: actionTypes.HANDLE_USER_INPUT_CHANGE,
      payload: { name, value },
    }
    const details = {
      records: {
        user: {
          email: value,
        },
      },
    }
    const state = { details: details }
    expect(fetchDetails(state, handleInputAction)).toEqual({
      details: {
        records: { user: { email: value } },
      },
      displayAlert: false,
      disableActionBtn: false,
    })
  })

  it('handles HANDLE_USER_INPUT_CHANGE for phone', () => {
    const name = 'phone_number'
    const value = '3334445555'

    const handleInputAction = {
      type: actionTypes.HANDLE_USER_INPUT_CHANGE,
      payload: { name, value },
    }
    const details = {
      records: {
        user: {
          phone_number: value,
        },
      },
    }
    const state = { details: details }
    expect(fetchDetails(state, handleInputAction)).toEqual({
      details: {
        records: { user: { phone_number: value } },
      },
      displayAlert: false,
      disableActionBtn: false,
    })
  })

  it('handles HANDLE_EDIT_BUTTON_CHANGE', () => {
    const value = true
    const handleEditButtonAction = {
      type: actionTypes.HANDLE_EDIT_BUTTON_CHANGE,
      payload: { value },
    }
    const state = { details: null, fetching: false }
    expect(fetchDetails(state, handleEditButtonAction)).toEqual({
      details: null,
      fetching: false,
      isEdit: true,
      displayAlert: false,
      disableActionBtn: true,
    })
  })

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      details: { hello: 'world' },
    }
    const state = { details: null, fetching: true, error: null }
    expect(fetchDetails(state, unexpectedAction)).toEqual(state)
  })

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    }
    const state = {
      details: null,
      fetching: false,
      isEdit: false,
      displayAlert: false,
      disableActionBtn: false,
      resendEmailUserId: [],
      resendEmailStatus: null,
      initialDetails: null,
    }
    expect(fetchDetails(undefined, randomAction)).toEqual(state)
  })

  it('clears details', () => {
    const before = { details: {}, initialDetails: {}, fetching: false, error: null, isEdit: false }
    let after
    expect(() => (after = fetchDetails(before, { type: actionTypes.CLEAR_USER_DETAILS }))).not.toThrow()
    expect(after).not.toEqual(before)
  })

  it('clears save Alert message', () => {
    const requestAction = {
      type: actionTypes.CLEAR_SAVE_ALERT,
    }
    const state = { fetching: false, displayAlert: false }
    expect(fetchDetails(state, requestAction)).toEqual({
      fetching: false,
      displayAlert: false,
    })
  })

  it('handles SAVE_USER_DETAILS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST,
    }
    const state = { fetching: false }
    expect(fetchDetails(state, requestAction)).toEqual({
      fetching: true,
      saveDetailsError: null,
    })
  })

  it('handles SAVE_USER_DETAILS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS,
      saveUserDetails: {
        last_name: 'first',
        username: 'user1',
      },
    }
    const state = {
      fetching: true,
      error: null,
      details: { records: { user: { email: 'email@gmail.com' } } },
    }

    expect(fetchDetails(state, responseAction)).toEqual({
      ...state,
      fetching: false,
      error: null,
      isEdit: false,
      saveDetailsError: null,
      displayAlert: true,
      initialDetails: { user: { email: 'email@gmail.com' } },
    })
  })

  it('handles SAVE_USER_DETAILS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE,
      error: 'error happened',
    }
    const state = {
      fetching: true,
      error: null,
    }
    expect(fetchDetails(state, failureAction)).toEqual({
      fetching: false,
      saveDetailsError: 'error happened',
      error: null,
      isEdit: true,
      displayAlert: true,
    })
  })
})
