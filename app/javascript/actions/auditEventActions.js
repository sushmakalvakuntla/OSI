import * as actionTypes from './actionTypes'

export const fetchAuditEventsActions = query => ({
  type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
  payload: query,
})

export const fetchUserAuditEventsActions = id => ({
  type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
  payload: { query: [{ field: 'user_id', value: id }] },
})

export const clearAuditEvents = () => ({
  type: actionTypes.CLEAR_AUDIT_EVENTS,
})
