import { fetchAuditEventsActions, fetchUserAuditEventsActions, clearAuditEvents } from './auditEventActions'
import { FETCH_AUDIT_EVENTS_API_CALL_REQUEST, CLEAR_AUDIT_EVENTS } from './actionTypes'

describe('#fetchAuditEventsActions', () => {
  it('returns type and payload', () => {
    const query = {}
    expect(fetchAuditEventsActions(query)).toEqual({
      type: FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
      payload: query,
    })
  })
})

describe('#fetchUserAuditEventsActions', () => {
  it('returns type and payload as query', () => {
    const id = 'SomeID'
    const query = { query: [{ field: 'user_id', value: id }] }
    expect(fetchUserAuditEventsActions(id)).toEqual({
      type: FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
      payload: query,
    })
  })
})

describe('#clearAuditEvents', () => {
  it('returns type ', () => {
    expect(clearAuditEvents()).toEqual({
      type: CLEAR_AUDIT_EVENTS,
    })
  })
})
