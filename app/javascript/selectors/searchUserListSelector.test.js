import React from 'react'
import {
  selectUserRecords,
  isLoading,
  getSearchParams,
  getSerializedSearchParams,
  checkOfficeNames,
  cardHeaderText,
  displayChangeLog,
  email,
  firstName,
  lastName,
  CWSLogin,
  exactMatchResultText,
  selectSearchResultList,
} from './searchUserListSelector'

describe('selectors', () => {
  describe('#selectUserRecords', () => {
    it('returns array of users', () => {
      const users = []
      const state = {
        searchUserList: {
          users,
        },
      }
      expect(selectUserRecords(state)).toBe(users)
    })

    it('returns empty array if no users defined', () => {
      const state = { searchUserList: {} }
      expect(selectUserRecords(state)).toEqual([])
      expect(selectUserRecords({})).toEqual([])
    })
  })

  describe('#isLoading', () => {
    it('returns true if fetching', () => {
      const state = {
        searchUserList: {},
      }
      expect(isLoading(state)).toEqual(false)
    })
  })

  describe('getSearchParams', () => {
    it('returns the search params', () => {
      const state = {
        searchUserList: {
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
        searchUserList: {
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

  describe('#email', () => {
    it('returns email', () => {
      const state = {
        searchUserList: {
          inputData: { email: 'email@email.com' },
        },
      }
      expect(email(state)).toEqual('email@email.com')
    })

    it('returns empty when email not found', () => {
      const state = {
        searchUserList: {
          inputData: {},
        },
      }
      expect(email(state)).toEqual('')
    })
  })

  describe('#lastName', () => {
    it('returns lastName', () => {
      const state = {
        searchUserList: {
          inputData: { lastName: 'lastName' },
        },
      }
      expect(lastName(state)).toEqual('lastName')
    })

    it('returns empty when lastName not found', () => {
      const state = {
        searchUserList: {
          inputData: {},
        },
      }
      expect(lastName(state)).toEqual('')
    })
  })

  describe('#firstName', () => {
    it('returns firstName', () => {
      const state = {
        searchUserList: {
          inputData: { firstName: 'firstName' },
        },
      }
      expect(firstName(state)).toEqual('firstName')
    })

    it('returns empty when firstName not found', () => {
      const state = {
        searchUserList: {
          inputData: {},
        },
      }
      expect(firstName(state)).toEqual('')
    })
  })

  describe('#CWSLogin', () => {
    it('returns CWSLogin', () => {
      const state = {
        searchUserList: {
          inputData: { CWSLogin: 'CWSLogin' },
        },
      }
      expect(CWSLogin(state)).toEqual('CWSLogin')
    })

    it('returns empty when CWSLogin not found', () => {
      const state = {
        searchUserList: {
          inputData: {},
        },
      }
      expect(CWSLogin(state)).toEqual('')
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
    const offices = undefined
    const expectedValue = undefined
    expect(checkOfficeNames(offices)).toEqual(expectedValue)
  })

  describe('#selectSearchResultList', () => {
    it('returns exact matches and fuzzy matches', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: '' },
            { field: 'last_name', value: 'CASE insensitive' },
            { field: 'email', value: '' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [{ first_name: 'firstName', last_name: 'case INSENSITIVE' }, { first_name: 'firstName', last_name: 'Ratnesh' }],
        },
      }
      expect(selectSearchResultList(state)).toEqual({
        exactMatches: [{ first_name: 'firstName', last_name: 'case INSENSITIVE' }],
        fuzzyMatches: [{ first_name: 'firstName', last_name: 'Ratnesh' }],
      })
    })

    it('returns empty array when no users', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: '' },
            { field: 'last_name', value: '' },
            { field: 'email', value: '' },
            { field: 'racfid', value: '' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [],
        },
      }
      expect(selectSearchResultList(state)).toEqual({ exactMatches: [], fuzzyMatches: [] })
    })

    it('recovers when user record values are undefined', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: 'X' },
            { field: 'last_name', value: 'X' },
            { field: 'email', value: 'X' },
            { field: 'racfid', value: 'X' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [
            { first_name: undefined, last_name: undefined, racfid: undefined, email: undefined },
            { first_name: null, last_name: null, racfid: null, email: null },
          ],
        },
      }
      expect(selectSearchResultList(state)).toEqual({
        exactMatches: [],
        fuzzyMatches: [
          { first_name: undefined, last_name: undefined, racfid: undefined, email: undefined },
          { first_name: null, last_name: null, racfid: null, email: null },
        ],
      })
    })

    it('returns fuzzy matches when thers is no exact matches found', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: '' },
            { field: 'last_name', value: 'Raval' },
            { field: 'email', value: '' },
            { field: 'racfid', value: '' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [{ first_name: 'firstName', last_name: 'lastName' }],
        },
      }
      expect(selectSearchResultList(state)).toEqual({
        exactMatches: [],
        fuzzyMatches: [{ first_name: 'firstName', last_name: 'lastName' }],
      })
    })

    it('returns fuzzy matches when there is a single match but not the combination', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: 'other FirstName' },
            { field: 'last_name', value: 'lastName' },
            { field: 'email', value: '' },
            { field: 'racfid', value: '' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [
            { first_name: 'firstName', last_name: 'lastName' },
            { first_name: 'other FirstName', last_name: 'other LastName' },
          ],
        },
      }
      expect(selectSearchResultList(state)).toEqual({
        exactMatches: [],
        fuzzyMatches: [
          { first_name: 'firstName', last_name: 'lastName' },
          { first_name: 'other FirstName', last_name: 'other LastName' },
        ],
      })
    })
  })

  describe('#exactMatchResultText', () => {
    it('returns html element when last name in query and last name in users matches', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: '' },
            { field: 'last_name', value: 'Raval' },
            { field: 'email', value: '' },
            { field: 'racfid', value: '' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [{ first_name: 'firstName', last_name: 'Raval' }],
        },
      }
      expect(exactMatchResultText(state)).toEqual(
        <span>
          <b>Exact</b> matches found based on search criteria
        </span>
      )
    })

    it('returns empty string when no exact matches', () => {
      const state = {
        searchUserList: {
          query: [
            { field: 'first_name', value: '' },
            { field: 'last_name', value: 'Raval' },
            { field: 'email', value: '' },
            { field: 'racfid', value: '' },
            { field: 'office_ids', value: [] },
            { field: 'enabled', value: '' },
          ],
          users: [{ first_name: 'firstName', last_name: 'lastName' }],
        },
      }
      expect(exactMatchResultText(state)).toEqual('')
    })
  })

  describe('#cardHeaderText', () => {
    const getState = role => {
      return {
        searchUserList: {
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

  describe('#displayChangeLog', () => {
    it('returns true if logged in user role is Office Admin', () => {
      const state = { searchUserList: { adminAccountDetails: { roles: ['Office-admin'] } } }
      expect(displayChangeLog(state)).toBe(true)
    })

    it('returns true if logged in user role is County Admin', () => {
      const state = { searchUserList: { adminAccountDetails: { roles: ['County-admin'] } } }
      expect(displayChangeLog(state)).toBe(true)
    })

    it('returns false if logged in user role is State admin', () => {
      const state = { searchUserList: { adminAccountDetails: { roles: ['State-admin'] } } }
      expect(displayChangeLog(state)).toBe(false)
    })

    it('returns false if logged in user role is Super admin', () => {
      const state = { searchUserList: { adminAccountDetails: { roles: ['Super-admin'] } } }
      expect(displayChangeLog(state)).toBe(false)
    })
  })
})
