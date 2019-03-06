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
  const roles = safeGet(state, 'userList.adminAccountDetails.roles', [])
  const countyName = safeGet(state, 'userList.adminAccountDetails.county_name', '')
  const role = roles || []
  if (role.includes('Super-admin')) {
    return 'Global Administrator view'
  } else if (role.includes('State-admin')) {
    return 'State Administrator View'
  } else {
    return `County: ${countyName}`
  }
}

export const displayChangeLog = state => {
  const roles = safeGet(state, 'userList.adminAccountDetails.roles', [])
  if (roles.includes('Super-admin')) {
    return false
  } else if (roles.includes('State-admin')) {
    return false
  }
  return true
}
