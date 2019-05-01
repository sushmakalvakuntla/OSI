import * as actionTypes from './actionTypes'

export const fetchGroupUsersList = (query, size) => ({
  type: actionTypes.FETCH_GROUP_USERS_API_CALL_REQUEST,
  payload: { query, size },
})
