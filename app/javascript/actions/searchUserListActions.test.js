import {
  searchUsers,
  setSearch,
  handleSearchChange,
  fetchAccountActions,
  handleCheckBoxChangeActions,
  setSearchForTiles,
  clearSearch,
  unlockUser,
} from './searchUserListActions'
import {
  FETCH_USERS_API_CALL_REQUEST,
  USER_LIST_SET_SEARCH,
  HANDLE_INPUT_CHANGE,
  FETCH_ACCOUNT_API_CALL_REQUEST,
  HANDLE_CHECKBOX_CHANGE,
  USER_LIST_CLEAR_SEARCH,
  USER_STATUS_CHANGE_REQUEST,
} from './actionTypes'

describe('#fetchAccountActions', () => {
  it('returns type and payload', () => {
    const token = 'ABCDEFGHIJKLMOPQRST'
    expect(fetchAccountActions(token)).toEqual({
      type: FETCH_ACCOUNT_API_CALL_REQUEST,
      payload: token,
    })
  })
})

describe('SearchUserListActions Actions', () => {
  describe('#searchUsers', () => {
    it('returns type and payload', () => {
      const params = { query: {} }
      expect(searchUsers(params)).toEqual({
        type: FETCH_USERS_API_CALL_REQUEST,
        payload: params,
      })
    })
  })

  describe('#setSearch', () => {
    it('returns type and payload', () => {
      const query = {}
      expect(setSearch(query)).toEqual({
        type: USER_LIST_SET_SEARCH,
        payload: query,
      })
    })
  })

  describe('#clearSearch', () => {
    it('returns type', () => {
      expect(clearSearch()).toEqual({
        type: USER_LIST_CLEAR_SEARCH,
      })
    })
  })

  describe('#setSearchForTiles', () => {
    it('returns type and payload', () => {
      const query = {}
      expect(setSearchForTiles('GET_ACTIVE_USERS_REQUEST', query)).toEqual({
        payload: { query: {} },
        type: 'GET_ACTIVE_USERS_REQUEST',
      })
    })
  })

  describe('#handleSearchChange', () => {
    it('returns type and payload', () => {
      const value = {}
      const key = 'someString'

      expect(handleSearchChange(key, value)).toEqual({
        type: HANDLE_INPUT_CHANGE,
        payload: { key, value },
      })
    })
  })

  describe('#handleCheckBoxChangeActions', () => {
    it('returns type', () => {
      expect(handleCheckBoxChangeActions()).toEqual({
        type: HANDLE_CHECKBOX_CHANGE,
      })
    })
  })

  describe('#unlockUser', () => {
    it('returns type', () => {
      expect(unlockUser('some_userid')).toEqual({
        type: USER_STATUS_CHANGE_REQUEST,
        payload: { id: 'some_userid' },
      })
    })
  })
})
