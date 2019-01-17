/* eslint camelcase: ["off"] */

import { checkDate } from '../_utils/formatters'

export const STATUS = [{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }]

export const toFullName = ({ first_name, last_name }) => `${last_name}, ${first_name}`

export const accountStatusFormat = ({ enabled }) => {
  return enabled ? 'Active' : 'Inactive'
}

export const lastLoginDate = ({ last_login_date_time }) => {
  return checkDate(last_login_date_time)
}

export const translateOfficeMap = (userObject, officeMap) => {
  const { office_id } = userObject
  if (!office_id) return ''
  const recordFound = officeMap[office_id]
  return recordFound ? recordFound.label : office_id
}

export const getOfficeTranslator = officesList => {
  const officeMap = []
  officesList.forEach(office => {
    officeMap[office.value] = office
  })
  return user => translateOfficeMap(user, officeMap)
}
