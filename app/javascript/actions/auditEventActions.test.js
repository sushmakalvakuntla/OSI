import { fetchAuditEventsActions } from './auditEventActions'
import { FETCH_AUDIT_EVENTS_API_CALL_REQUEST } from './actionTypes'

describe('#fetchAuditEventsActions', () => {
  it('returns type and payload', () => {
    const query = {}
    expect(fetchAuditEventsActions(query)).toEqual({
      type: FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
      payload: query,
    })
  })
})
