import safeGet from 'lodash.get'
import { translateOfficeName } from './officeListSelector'

export const selectChangeLogAdminRecords = state => {
  const adminsObject = state.fetchChangeLogDetails ? state.fetchChangeLogDetails.changeLogDetails : null
  const adminData = adminsObject ? adminsObject.records : null
  return adminData
}

export const selectChangeLogAdminDetails = state => {
  const adminData = selectChangeLogAdminRecords(state)
  const adminDetails = adminData && adminData.user ? adminData.user : {}
  return adminDetails
}

export const selectChangeLogAdminOfficeName = state => {
  const officeId = safeGet(state, 'fetchChangeLogDetails.changeLogDetails.records.user.office_id')
  return translateOfficeName(state, officeId)
}
