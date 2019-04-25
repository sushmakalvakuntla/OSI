import safeGet from 'lodash.get'

export const selectUserRecords = state => {
  if (!state.searchUserList) return []
  return Array.isArray(state.searchUserList.users) ? state.searchUserList.users : []
}

export const email = state => safeGet(state, 'searchUserList.inputData.email', '')

export const CWSLogin = state => safeGet(state, 'searchUserList.inputData.CWSLogin', '')

export const firstName = state => safeGet(state, 'searchUserList.inputData.firstName', '')

export const lastName = state => safeGet(state, 'searchUserList.inputData.lastName', '')

export const isLoading = state => {
  return state.searchUserList.fetching || false
}

export const getSearchParams = ({ searchUserList }) => {
  if (!searchUserList) return {}
  const { from, size, sort, query } = searchUserList
  const out = {}
  out.from = from
  out.size = size
  out.sort = (Array.isArray(sort) && sort.length && sort) || undefined
  out.query = (Array.isArray(query) && query.length && query) || undefined
  return out
}

export const getSerializedSearchParams = ({ searchUserList }) => {
  return encodeURIComponent(JSON.stringify(getSearchParams({ searchUserList })))
}

export const checkOfficeNames = offices => {
  if (offices && offices.length !== 0) {
    return offices.filter(value => value.trim() !== '')
  } else {
    return []
  }
}

export const selectSearchResultList = state => {
  const users = selectUserRecords(state)
  const query = safeGet(state, 'searchUserList.query')
  const CWSLogin = query.find(({ field }) => field === 'racfid')
  const email = query.find(({ field }) => field === 'email')
  const lastName = query.find(({ field }) => field === 'last_name')
  const firstName = query.find(({ field }) => field === 'first_name')
  const exactMatches = []
  const fuzzyMatches = []
  users.forEach(user => {
    const isMatched =
      CWSLogin.value === user.racfid ||
      firstName.value === user.first_name ||
      lastName.value === user.last_name ||
      email.value === user.email
    return isMatched ? exactMatches.push(user) : !isMatched ? fuzzyMatches.push(user) : []
  })
  return { exactMatches, fuzzyMatches }
}

export const cardHeaderText = state => {
  const roles = safeGet(state, 'searchUserList.adminAccountDetails.roles', [])
  const countyName = safeGet(state, 'searchUserList.adminAccountDetails.county_name', '')
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
  const roles = safeGet(state, 'searchUserList.adminAccountDetails.roles', [])
  if (roles.includes('Super-admin')) {
    return false
  } else if (roles.includes('State-admin')) {
    return false
  }
  return true
}
