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
 * Set number of records per page
 * @param {number} size Integer number of records per page
 */
export const setPageSize = size => ({
  type: actionTypes.USER_LIST_SET_PAGE_SIZE,
  payload: size,
})

/**
 * Set the current page of paged results
 * @param {number} pageNumber Integer page number of paged results
 */
export const setPage = pageNumber => ({
  type: actionTypes.USER_LIST_SET_PAGE,
  payload: pageNumber,
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
 * Updates the "preflight" search input for both `last_name` and `office_name`)
 * @param {string} lastName and @param {Array} officeNames search string
 */

export const handleSearchChange = (key, value) => ({
  type: actionTypes.HANDLE_INPUT_CHANGE,
  payload: { key, value },
})

/**
 * Sets the sort criteria for the table
 * @param {Array<{ field: string, desc?: boolean }>} sort Array of applied sorts
 */
export const setSort = sort => ({
  payload: sort,
  type: actionTypes.USER_LIST_SET_SORT,
})

export const handleCheckBoxChangeActions = () => ({
  type: actionTypes.HANDLE_CHECKBOX_CHANGE,
})
