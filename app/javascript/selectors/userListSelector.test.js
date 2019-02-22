import {
  selectUserRecords,
  isLoading,
  getSearchParams,
  getSerializedSearchParams,
  checkOfficeNames,
  cardHeaderText,
  selectAuditEvents,
  displayChangeLog,
} from './userListSelector'

describe('selectors', () => {
  describe('#selectUserRecords', () => {
    it('returns array of users', () => {
      const users = []
      const state = {
        userList: {
          users,
        },
      }
      expect(selectUserRecords(state)).toBe(users)
    })

    it('returns empty array if no users defined', () => {
      const state = { userList: {} }
      expect(selectUserRecords(state)).toEqual([])
      expect(selectUserRecords({})).toEqual([])
    })
  })

  describe('#isLoading', () => {
    it('returns true if fetching', () => {
      const state = {
        userList: {},
      }
      expect(isLoading(state)).toEqual(false)
    })
  })

  describe('getSearchParams', () => {
    it('returns the search params', () => {
      const state = {
        userList: {
          from: 0,
          size: 10,
          sort: [{ field: 'haystack' }, { field: 'other_haystack', desc: true }],
          query: [
            {
              field: 'haystack',
              value: 'needle',
            },
          ],
        },
      }
      let searchParams
      expect(() => (searchParams = getSearchParams(state))).not.toThrow()
      expect(searchParams.from).toEqual(0)
      expect(searchParams.size).toEqual(10)
      expect(searchParams.query).toEqual([{ field: 'haystack', value: 'needle' }])
      expect(searchParams.sort).toEqual([{ field: 'haystack' }, { field: 'other_haystack', desc: true }])

      const state1 = 'some_value'
      expect(() => (searchParams = getSearchParams(state1))).not.toThrow()
      expect(getSearchParams(state1)).toEqual({})
    })
  })

  describe('getSerializedSearchParams', () => {
    it('returns the serialized json repr of search params', () => {
      const state = {
        userList: {
          size: 20,
          from: 40,
        },
      }
      let serialized
      expect(() => (serialized = getSerializedSearchParams(state))).not.toThrow()
      expect(serialized).toEqual(jasmine.any(String))
      // Serialization order not gauranteed so parse and test for equality
      let parsed
      expect(() => (parsed = JSON.parse(decodeURIComponent(serialized)))).not.toThrow()
      expect(parsed).toEqual({ size: 20, from: 40 })
    })
  })

  describe('#checkOfficeNames', () => {
    it('filters out empty string from the offices array ', () => {
      const expectedValue = ['someValue']
      const offices = ['', 'someValue']
      expect(checkOfficeNames(offices)).toEqual(expectedValue)
    })
  })

  it('returns empty array when offices are not available', () => {
    const offices = []
    const expectedValue = []
    expect(checkOfficeNames(offices)).toEqual(expectedValue)
  })

  it('returns empty array when office is undefined', () => {
    const expectedValue = []
    expect(checkOfficeNames(undefined)).toEqual(expectedValue)
  })

  describe('#cardHeaderText', () => {
    const getState = role => {
      return {
        userList: {
          adminAccountDetails: {
            county_name: 'County1',
            roles: role,
          },
        },
      }
    }
    it('returns text Global Administrator view if user Role is Super-admin ', () => {
      const state = getState(['Super-admin'])
      expect(cardHeaderText(state)).toEqual('Global Administrator view')
    })

    it('returns text State Administrator view if user Role is State-admin ', () => {
      const state = getState(['State-admin'])
      expect(cardHeaderText(state)).toEqual('State Administrator View')
    })

    it('returns county name if user role is not state admin ', () => {
      const state = getState(['County-admin'])
      expect(cardHeaderText(state)).toEqual('County: County1')
    })

    it('returns county name if user role is null ', () => {
      const state = getState(null)
      expect(cardHeaderText(state)).toEqual('County: County1')
    })

    it('returns county name if user role is undefined ', () => {
      const state = getState(undefined)
      expect(cardHeaderText(state)).toEqual('County: County1')
    })
  })

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

  describe('#displayChangeLog', () => {
    it('returns true if logged in user role is Office Admin', () => {
      const state = { userList: { adminAccountDetails: { roles: ['Office-admin'] } } }
      expect(displayChangeLog(state)).toBe(true)
    })

    it('returns true if logged in user role is County Admin', () => {
      const state = { userList: { adminAccountDetails: { roles: ['County-admin'] } } }
      expect(displayChangeLog(state)).toBe(true)
    })

    it('returns false if logged in user role is State admin', () => {
      const state = { userList: { adminAccountDetails: { roles: ['State-admin'] } } }
      expect(displayChangeLog(state)).toBe(false)
    })

    it('returns false if logged in user role is Super admin', () => {
      const state = { userList: { adminAccountDetails: { roles: ['Super-admin'] } } }
      expect(displayChangeLog(state)).toBe(false)
    })
  })
})
