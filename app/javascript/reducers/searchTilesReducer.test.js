import reducer from './searchTilesReducer'
import * as actionTypes from '../actions/actionTypes'
import { getTilesInitialState } from '../_utils/commonHelper'

describe('reducer', () => {
  const tilesInitialState = [
    getTilesInitialState('Active Users', actionTypes.GET_ACTIVE_USERS_REQUEST, 'enabled', true, 'status', 'CONFIRMED'),
    getTilesInitialState('Locked Users', actionTypes.GET_LOCKED_USERS_REQUEST, 'enabled', true, 'locked', true),
    getTilesInitialState('Inactive Users', actionTypes.GET_INACTIVE_USERS_REQUEST, 'enabled', false, 'status', 'CONFIRMED'),
    getTilesInitialState(
      'Unregistered Users',
      actionTypes.GET_UNREGISTERED_USERS_REQUEST,
      'enabled',
      true,
      'status',
      'FORCE_CHANGE_PASSWORD'
    ),
  ]
  it('handles GET_ACTIVE_USERS_REQUEST', () => {
    const requestAction = {
      type: actionTypes.GET_ACTIVE_USERS_REQUEST,
      payload: {
        query: [],
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, requestAction)).toEqual({
      fetching: true,
      searchPageTiles: tilesInitialState,
      error: null,
    })
  })

  it('handles GET_ACTIVE_USERS_FAILURE', () => {
    const failureAction = {
      type: actionTypes.GET_ACTIVE_USERS_FAILURE,
      error: 'error happened',
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, failureAction)).toEqual({
      fetching: false,

      searchPageTiles: tilesInitialState,
      error: 'error happened',
    })
  })

  it('handles GET_ACTIVE_USERS_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_ACTIVE_USERS_SUCCESS,
      payload: {
        records: [{ id: 'key1', username: 'user1' }, { id: 'key2', username: 'user2' }],
        meta: {
          total: 42,
          request: {
            from: 0,
            size: 10,
            sort: [],
          },
        },
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    let after
    expect(() => (after = reducer(state, action))).not.toThrow()
    expect(after.searchPageTiles[0].count).toBe(42)
  })

  it('handles GET_LOCKED_USERS_REQUEST', () => {
    const requestAction = {
      type: actionTypes.GET_LOCKED_USERS_REQUEST,
      payload: {
        query: [],
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, requestAction)).toEqual({
      fetching: true,
      searchPageTiles: tilesInitialState,
      error: null,
    })
  })

  it('handles GET_LOCKED_USERS_FAILURE', () => {
    const failureAction = {
      type: actionTypes.GET_LOCKED_USERS_FAILURE,
      error: 'error happened',
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, failureAction)).toEqual({
      fetching: false,
      searchPageTiles: tilesInitialState,
      error: 'error happened',
    })
  })

  it('handles GET_LOCKED_USERS_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_LOCKED_USERS_SUCCESS,
      payload: {
        records: [{ id: 'key1', username: 'user1' }, { id: 'key2', username: 'user2' }],
        meta: {
          total: 42,
          request: {
            from: 0,
            size: 10,
            sort: [],
          },
        },
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    let after
    expect(() => (after = reducer(state, action))).not.toThrow()
    expect(after.searchPageTiles[1].count).toBe(42)
  })

  it('handles GET_INACTIVE_USERS_REQUEST', () => {
    const requestAction = {
      type: actionTypes.GET_INACTIVE_USERS_REQUEST,
      payload: {
        query: [],
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, requestAction)).toEqual({
      fetching: true,
      searchPageTiles: tilesInitialState,
      error: null,
    })
  })

  it('handles GET_INACTIVE_USERS_FAILURE', () => {
    const failureAction = {
      type: actionTypes.GET_INACTIVE_USERS_FAILURE,
      error: 'error happened',
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, failureAction)).toEqual({
      fetching: false,
      searchPageTiles: tilesInitialState,
      error: 'error happened',
    })
  })

  it('handles GET_INACTIVE_USERS_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_INACTIVE_USERS_SUCCESS,
      payload: {
        records: [{ id: 'key1', username: 'user1' }, { id: 'key2', username: 'user2' }],
        meta: {
          total: 42,
          request: {
            from: 0,
            size: 10,
            sort: [],
          },
        },
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    let after
    expect(() => (after = reducer(state, action))).not.toThrow()
    expect(after.searchPageTiles[2].count).toBe(42)
  })

  it('handles GET_UNREGISTERED_USERS_REQUEST', () => {
    const requestAction = {
      type: actionTypes.GET_UNREGISTERED_USERS_REQUEST,
      payload: {
        query: [],
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, requestAction)).toEqual({
      fetching: true,
      searchPageTiles: tilesInitialState,
      error: null,
    })
  })

  it('handles GET_UNREGISTERED_USERS_FAILURE', () => {
    const failureAction = {
      type: actionTypes.GET_UNREGISTERED_USERS_FAILURE,
      error: 'error happened',
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    expect(reducer(state, failureAction)).toEqual({
      fetching: false,
      searchPageTiles: tilesInitialState,
      error: 'error happened',
    })
  })

  it('handles GET_UNREGISTERED_USERS_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_UNREGISTERED_USERS_SUCCESS,
      payload: {
        records: [{ id: 'key1', username: 'user1' }, { id: 'key2', username: 'user2' }],
        meta: {
          total: 42,
          request: {
            from: 0,
            size: 10,
            sort: [],
          },
        },
      },
    }
    const state = { fetching: false, searchPageTiles: tilesInitialState }
    let after
    expect(() => (after = reducer(state, action))).not.toThrow()
    expect(after.searchPageTiles[3].count).toBe(42)
  })
})
