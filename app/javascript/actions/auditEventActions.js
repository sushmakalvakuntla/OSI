import * as actionTypes from './actionTypes'

export const fetchAuditEventsActions = query => ({
  type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
  payload: query,
})
