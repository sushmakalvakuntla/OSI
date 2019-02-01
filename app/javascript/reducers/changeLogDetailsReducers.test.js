import fetchChangeLogDetails from './changeLogDetailsReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('handles FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST', () => {
    const requestAction = { type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST }
    const state = { changeLogDetails: null, fetching: false }
    expect(fetchChangeLogDetails(state, requestAction)).toEqual({
      fetching: true,
      changeLogDetails: null,
      fetchChangeLogDetailsError: null,
    })
  })

  it('handles FETCH_CHANGE_LOG_DETAILS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_SUCCESS,
      changeLogDetails: { id: 'key1', username: 'user1' },
    }
    const state = { changeLogDetails: null, fetching: true, fetchChangeLogDetailsError: 'someError' }
    const records = { XHRStatus: 'ready', records: { id: 'key1', username: 'user1' } }

    expect(fetchChangeLogDetails(state, responseAction)).toEqual({
      fetching: false,
      changeLogDetails: records,
      fetchChangeLogDetailsError: null,
    })
  })

  it('handles FETCH_CHANGE_LOG_DETAILS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_FAILURE,
      changeLogDetails: null,
      error: { user_message: 'error happened' },
    }
    const state = { changeLogDetails: null, fetching: true, error: null }
    expect(fetchChangeLogDetails(state, failureAction)).toEqual({
      fetching: false,
      changeLogDetails: null,
      fetchChangeLogDetailsError: { user_message: 'error happened' },
      error: null,
    })
  })
})
