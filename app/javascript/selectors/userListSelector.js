import safeGet from 'lodash.get'

export const selectUserRecords = state => {
  if (!state.userList) return []
  return Array.isArray(state.userList.users) ? state.userList.users : []
}

export const isLoading = state => {
  return state.userList.fetching || false
}

export const getSearchParams = ({ userList }) => {
  if (!userList) return {}
  const { from, size, sort, query } = userList
  const out = {}
  out.from = from
  out.size = size
  out.sort = (Array.isArray(sort) && sort.length && sort) || undefined
  out.query = (Array.isArray(query) && query.length && query) || undefined
  return out
}

export const getSerializedSearchParams = ({ userList }) => {
  return encodeURIComponent(JSON.stringify(getSearchParams({ userList })))
}

export const checkOfficeNames = offices => {
  if (offices && offices.length !== 0) {
    return offices.filter(value => value.trim() !== '')
  } else {
    return []
  }
}

export const cardHeaderText = state => {
  const roles = safeGet(state, 'userList.userAccountDetails.roles', [])
  const countyName = safeGet(state, 'userList.userAccountDetails.county_name', '')
  const role = roles || []
  const cardHeaderText = role.includes('State-admin') ? 'State Administrator View' : `County: ${countyName}`
  return cardHeaderText
}
