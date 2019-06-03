import * as actionTypes from './actionTypes'

export const fetchAccountActions = token => ({
  type: actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST,
  payload: token,
})

export const searchUsers = params => ({
  type: actionTypes.FETCH_USERS_API_CALL_REQUEST,
  payload: params,
})

/**
 * Set search
 * @param {Object[]} query
 * @param {string} query[].field Identifier for the field on which to search
 * @param {string|number|boolean} query[].value Value on which to search
 */
export const setSearch = query => ({
  type: actionTypes.USER_LIST_SET_SEARCH,
  payload: query,
})

/**
 * Clear search
 */
export const clearSearch = () => ({
  type: actionTypes.USER_LIST_CLEAR_SEARCH,
})

/**
 * Set search for tiles
 * @param {string} type
 * @param {Object[]} query
 * @param {string} query[].field Identifier for the field on which to search
 * @param {string|number|boolean} query[].value Value on which to search
 */
export const setSearchForTiles = (type, query) => ({
  type,
  payload: { query: query },
})

/**
 * Updates the "preflight" search input for both `last_name` and `office_name`)
 * @param {string} lastName and @param {Array} officeNames search string
 */

export const handleSearchChange = (key, value) => ({
  type: actionTypes.HANDLE_INPUT_CHANGE,
  payload: { key, value },
})

export const handleCheckBoxChangeActions = () => ({
  type: actionTypes.HANDLE_CHECKBOX_CHANGE,
})

export const unlockUser = userId => ({
  type: actionTypes.USER_STATUS_CHANGE_REQUEST,
  payload: { id: userId },
})
