import * as actionTypes from '../actions/actionTypes'

export const groupUsersInitialValue = {
  sort: [],
  from: 0,
  size: 10,
  groupUsers: [],
}

export function groupUsersListReducer(state = groupUsersInitialValue, { type, payload, error, meta }) {
  switch (type) {
    case actionTypes.FETCH_GROUP_USERS_API_CALL_REQUEST:
      return { ...state, error: null, query: payload.query }

    case actionTypes.FETCH_GROUP_USERS_API_CALL_SUCCESS:
      const {
        records: users,
        meta: { total, request },
      } = payload
      return {
        ...state,
        groupUsers: users,
        ...request,
        total,
        error: null,
      }

    case actionTypes.FETCH_GROUP_USERS_API_CALL_FAILURE:
      return {
        ...state,
        error,
        groupUsers: [],
      }

    default:
      return state
  }
}

export default groupUsersListReducer
