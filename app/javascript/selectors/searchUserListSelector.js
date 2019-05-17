import safeGet from 'lodash.get'
import React from 'react'
import { getAdminOfficeIDs } from '../_utils/checkAdminRoles'

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
    return undefined
  }
}

export const selectSearchResultList = state => {
  const users = selectUserRecords(state)
  const query = safeGet(state, 'searchUserList.query')

  const CWSLogin = query.find(({ field, value }) => {
    return field === 'racfid' && typeof value === 'string' && value !== ''
  })
  const email = query.find(({ field, value }) => {
    return field === 'email' && typeof value === 'string' && value !== ''
  })

  const lastName = query.find(({ field, value }) => {
    return field === 'last_name' && typeof value === 'string' && value !== ''
  })

  const firstName = query.find(({ field, value }) => {
    return field === 'first_name' && typeof value === 'string' && value !== ''
  })

  const matchSubquery = (queryParam, userValue) => {
    const testValue = userValue || ''
    if (queryParam && queryParam.value && queryParam.value.length > 0) {
      return queryParam.value.toLowerCase() === testValue.toLowerCase()
    } else return true
  }
  const exactMatches = []
  const fuzzyMatches = []
  users.forEach(user => {
    const isMatched =
      matchSubquery(CWSLogin, user.racfid) &&
      matchSubquery(lastName, user.last_name) &&
      matchSubquery(firstName, user.first_name) &&
      matchSubquery(email, user.email)
    return isMatched ? exactMatches.push(user) : fuzzyMatches.push(user)
  })
  return { exactMatches, fuzzyMatches }
}

export const exactMatchResultText = state => {
  const { exactMatches } = selectSearchResultList(state)
  return exactMatches.length > 0 ? (
    <span>
      <b>Exact</b> matches found based on search criteria
    </span>
  ) : (
    ''
  )
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
