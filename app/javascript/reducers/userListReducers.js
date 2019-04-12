import * as actionTypes from '../actions/actionTypes'
import { getAdminOfficeIDs } from '../_utils/checkAdminRoles'

const getTilesInitialState = (userType, action, fieldType1, value1, fieldType2, value2) => ({
  title: userType,
  type: action,
  query: [
    {
      field: fieldType1,
      value: value1,
    },
    {
      field: fieldType2,
      value: value2,
    },
  ],
  count: 0,
})

const initialValue = {
  sort: [
    // {
    //   field: 'last_name',
    //   desc: false,
    // },
  ],
  from: 0,
  size: 50,
  query: [
    {
      field: 'last_name',
      value: '',
    },
    {
      field: 'office_ids',
      value: [],
    },
  ],
  users: [],
  fetching: false,
  error: null,
  inputData: {},
  adminAccountDetails: {},
  includeInactive: false,
  searchPageTiles: [
    getTilesInitialState('Active Users', actionTypes.GET_ACTIVE_USERS_REQUEST, 'enabled', true, 'status', 'CONFIRMED'),
    getTilesInitialState('Locked Users', actionTypes.GET_LOCKED_USERS_REQUEST, 'enabled', true, 'locked', true),
    getTilesInitialState('Inactive Users', actionTypes.GET_INACTIVE_USERS_REQUEST, 'enabled', false, 'status', 'CONFIRMED'),
  ],
}

function userListReducer(state = initialValue, { type, payload, error, meta }) {
  switch (type) {
    case actionTypes.FETCH_USERS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, query: payload.query }

    case actionTypes.FETCH_USERS_API_CALL_SUCCESS:
      const {
        records: users,
        meta: { total, request },
      } = payload
      return {
        ...state,
        users,
        ...request,
        total,
        fetching: false,
        error: null,
      }

    case actionTypes.FETCH_USERS_API_CALL_FAILURE:
      return {
        ...state,
        error,
        fetching: false,
        users: null,
      }

    case actionTypes.GET_ACTIVE_USERS_REQUEST:
      return { ...state, fetching: true, error: null, query: payload.query }

    case actionTypes.GET_ACTIVE_USERS_SUCCESS:
      state.searchPageTiles[0].count = payload.meta.total
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
        users: null,
      }

    case actionTypes.GET_INACTIVE_USERS_REQUEST:
      return { ...state, fetching: true, error: null, query: payload.query }

    case actionTypes.GET_INACTIVE_USERS_SUCCESS:
      state.searchPageTiles[1].count = payload.meta.total
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
        users: null,
      }

    case actionTypes.GET_LOCKED_USERS_REQUEST:
      return { ...state, fetching: true, error: null, query: payload.query }

    case actionTypes.GET_LOCKED_USERS_SUCCESS:
      state.searchPageTiles[2].count = payload.meta.total
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
        users: null,
      }

    case actionTypes.USER_LIST_SET_PAGE:
      return { ...state, from: payload * state.size }

    // TODO: fix FSA
    case actionTypes.USER_LIST_SET_SORT:
      const sort = payload
      return {
        ...state,
        sort,
      }

    case actionTypes.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        inputData: {
          ...state.inputData,
          [payload.key]: payload.value,
        },
      }

    case actionTypes.HANDLE_CHECKBOX_CHANGE:
      return {
        ...state,
        includeInactive: !state.includeInactive,
      }

    case actionTypes.USER_LIST_SET_SEARCH:
      const query = payload
      return {
        ...state,
        from: 0,
        query,
      }

    // TODO: fix FSA
    case actionTypes.USER_LIST_SET_PAGE_SIZE:
      const size = payload
      return { ...state, size, from: 0 }

    case actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        inputData: {
          ...state.inputData,
          officeNames: state.inputData.officeNames === undefined ? getAdminOfficeIDs(payload) : state.inputData.officeNames,
        },
        adminAccountDetails: payload,
        error: null,
      }

    case actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        inputData: {},
        error: payload.error,
      }

    default:
      return state
  }
}

export default userListReducer
