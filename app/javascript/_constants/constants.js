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
