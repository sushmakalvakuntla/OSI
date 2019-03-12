import fetchAuditEvents from './auditEventsReducers'
import * as actionTypes from '../actions/actionTypes'

describe('fetchAuditEvents', () => {
  it('handles FETCH_AUDIT_EVENTS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
      payload: {
        query: [],
      },
    }
    const state = { auditEvents: null, fetching: false }
    expect(fetchAuditEvents(state, requestAction)).toEqual({
      fetching: true,
      auditEvents: null,
      error: null,
      query: [],
    })
  })

  it('handles FETCH_AUDIT_EVENTS_API_CALL_SUCCESS', () => {
    const action = {
      type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_SUCCESS,
      payload: {
        records: [
          {
            user_login: 'key1',
            comment: 'user1',
            event: {},
            event_source: 'CAP',
            event_type: 'Some Event',
            timestamp: '2019-09-09 15:33:55',
          },
          {
            user_login: 'id2',
            comment: null,
            event: {},
            event_source: 'CAP',
            event_type: 'Some Event',
            timestamp: '2019-09-09 13:33:55',
          },
        ],
      },
    }
    const before = {}
    let after
    expect(() => (after = fetchAuditEvents(before, action))).not.toThrow()
    expect(after.fetching).toEqual(false)
    expect(after.auditEvents.length).toBe(2)
    expect(after.error).toBe(null)
  })

  it('handles FETCH_AUDIT_EVENTS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_FAILURE,
      error: 'error happened',
    }
    const before = {}
    let after
    expect(() => (after = fetchAuditEvents(before, failureAction))).not.toThrow()
    expect(after.fetching).toBe(false)
    expect(after.auditEvents).toBeFalsy()
    expect(after.error).toEqual('error happened')
  })

  it('clears audit events', () => {
    const requestAction = {
      type: actionTypes.CLEAR_AUDIT_EVENTS,
    }
    const state = { fetching: false }
    expect(fetchAuditEvents(state, requestAction)).toEqual({ auditEvents: null, fetching: false })
  })
})
