import safeGet from 'lodash.get'

export const userName = state => {
  const lastName = safeGet(state, 'searchUserList.adminAccountDetails.last_name', '')
  const firstName = safeGet(state, 'searchUserList.adminAccountDetails.first_name', '')
  return `${firstName} ${lastName}`
}
