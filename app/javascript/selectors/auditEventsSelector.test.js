import { selectAuditEvents } from './auditEventsSelector'

describe('#selectAuditEvents', () => {
  it('returns the audit events', () => {
    const auditEvents = [
      {
        event_type: 'User Created',
        event_source: 'CAP',
        timestamp: '2019-01-14 15:10:41',
      },
    ]
    const state = {
      fetchAuditEvents: {
        auditEvents: {
          county_name: 'County1',
          auditEvents: auditEvents,
        },
      },
    }
    expect(selectAuditEvents(state)).toEqual({
      auditEvents: [{ event_source: 'CAP', event_type: 'User Created', timestamp: '2019-01-14 15:10:41' }],
      county_name: 'County1',
    })
  })

  it('returns an empty array when there are no audit events', () => {
    const state = { fetchAuditEvents: {} }
    expect(selectAuditEvents(state)).toEqual([])
  })

  it('returns an empty array when fetchAuditEvents node is null', () => {
    const state = { fetchAuditEvents: null }
    expect(selectAuditEvents(state)).toEqual([])
  })

  it('returns an empty array when audit events are undefined', () => {
    const state = { fetchAuditEvents: undefined }
    expect(selectAuditEvents(state)).toEqual([])
  })

  it('returns an empty array when audit events are null', () => {
    const state = { fetchAuditEvents: { auditEvents: null } }
    expect(selectAuditEvents(state)).toEqual([])
  })
})
