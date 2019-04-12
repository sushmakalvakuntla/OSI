import {
  searchUsers,
  setPageSize,
  setPage,
  setSearch,
  handleSearchChange,
  setSort,
  fetchAccountActions,
  handleCheckBoxChangeActions,
  setSearchForTiles,
} from './searchUserListActions'
import {
  FETCH_USERS_API_CALL_REQUEST,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_PAGE,
  USER_LIST_SET_SEARCH,
  USER_LIST_SET_SORT,
  HANDLE_INPUT_CHANGE,
  FETCH_ACCOUNT_API_CALL_REQUEST,
  HANDLE_CHECKBOX_CHANGE,
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

  describe('#setPageSize', () => {
    it('returns type and payload', () => {
      expect(setPageSize(20)).toEqual({
        type: USER_LIST_SET_PAGE_SIZE,
        payload: 20,
      })
    })
  })

  describe('#setPage', () => {
    it('returns type and payload', () => {
      expect(setPage(2)).toEqual({
        type: USER_LIST_SET_PAGE,
        payload: 2,
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

  describe('#setSort', () => {
    it('returns type and payload', () => {
      const sort = []
      expect(setSort(sort)).toEqual({
        type: USER_LIST_SET_SORT,
        payload: sort,
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
})
