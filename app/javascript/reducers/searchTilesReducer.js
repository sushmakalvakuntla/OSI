import * as actionTypes from '../actions/actionTypes'
import { getTilesInitialState, modifyTileData } from '../_utils/commonHelper'

const initialValue = {
  searchPageTiles: [
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
  ],
}

function searchForTiles(state = initialValue, { type, payload, error, meta }) {
  switch (type) {
    case actionTypes.GET_ACTIVE_USERS_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.GET_ACTIVE_USERS_SUCCESS:
      modifyTileData(state.searchPageTiles, 'Active Users', payload)
      return {
        ...state,
        searchPageTiles: [...state.searchPageTiles],
        fetching: false,
        error: null,
      }

    case actionTypes.GET_ACTIVE_USERS_FAILURE:
      return {
        ...state,
        error,
        fetching: false,
      }

    case actionTypes.GET_LOCKED_USERS_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.GET_LOCKED_USERS_SUCCESS:
      modifyTileData(state.searchPageTiles, 'Locked Users', payload)
      return {
        ...state,
        searchPageTiles: [...state.searchPageTiles],
        fetching: false,
        error: null,
      }

    case actionTypes.GET_LOCKED_USERS_FAILURE:
      return {
        ...state,
        error,
        fetching: false,
      }

    case actionTypes.GET_INACTIVE_USERS_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.GET_INACTIVE_USERS_SUCCESS:
      modifyTileData(state.searchPageTiles, 'Inactive Users', payload)
      return {
        ...state,
        searchPageTiles: [...state.searchPageTiles],
        fetching: false,
        error: null,
      }

    case actionTypes.GET_INACTIVE_USERS_FAILURE:
      return {
        ...state,
        error,
        fetching: false,
      }

    case actionTypes.GET_UNREGISTERED_USERS_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.GET_UNREGISTERED_USERS_SUCCESS:
      modifyTileData(state.searchPageTiles, 'Unregistered Users', payload)
      return {
        ...state,
        searchPageTiles: [...state.searchPageTiles],
        fetching: false,
        error: null,
      }

    case actionTypes.GET_UNREGISTERED_USERS_FAILURE:
      return {
        ...state,
        error,
        fetching: false,
      }

    default:
      return state
  }
}

export default searchForTiles
