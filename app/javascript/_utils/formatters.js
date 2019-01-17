/* eslint camelcase: 0 */

import { DateTime } from 'luxon'
import { accountStatusFormat } from '../_constants/constants'

export const formatPhoneNumber = phone_number => {
  if (phone_number && phone_number.replace) {
    phone_number = phone_number.replace(/[^\d]/g, '')
    const length = 10
    if (phone_number.length === length) {
      const phoneNumber = phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
      return phoneNumber
    }
  }
  return ''
}

export function formatPhoneNumberWithExt(phone_number, phone_extension_number) {
  const ext = phone_extension_number === '0' ? phone_extension_number === '' : phone_extension_number
  const phoneNumber =
    phone_number && ext
      ? `${formatPhoneNumber(phone_number)} Ext ${ext}`
      : phone_number && !ext
        ? `${formatPhoneNumber(phone_number)} Ext`
        : ''
  return phoneNumber
}

export function checkDate(date) {
  return date ? formatLastLogin(date.split(' ')) : ''
}

export function formatDate(date) {
  const formattedDate = date ? DateTime.fromISO(date).toFormat('MM/dd/yyyy') : ''
  return formattedDate
}

function formatLastLogin(array) {
  const hoursMinutes = array[1].slice(0, -3)
  const time = hoursMinutes.split(':')
  const hours = time[0] > 12 ? `${time[0] - 12}` : time[0]
  const hour = hours < 10 ? `0${hours}` : hours
  const formattedTime = time[0] < 12 ? `${hoursMinutes} AM` : `${`${hour}:${time[1]}`} PM`
  return `${DateTime.fromISO(array[0]).toFormat('DDD')} ${formattedTime}`
}

export function formatRoles(assignedRoles, rolesList) {
  let role = ''
  if (!Array.isArray(assignedRoles)) return ''
  if (assignedRoles && assignedRoles.length !== 0) {
    role = assignedRoles
      .map(role => rolesList.find(d => d.value === role))
      .filter(value => value)
      .map(({ value, label }) => label)[0]
  }
  if (role === undefined) {
    role = assignedRoles[0]
  }
  return role
}

export function formatPermissions(assignedPermissions, permissionList) {
  if (!Array.isArray(assignedPermissions)) return ''
  return (
    assignedPermissions &&
    assignedPermissions.length > 0 &&
    assignedPermissions
      .map(permission => permissionList.find(d => d.value === permission))
      .filter(value => Boolean(value))
      .map(({ value, label }) => label)
      .join(', ')
  )
}

export function formatChangeLogValues(eventType, value, permissionsList, rolesList) {
  switch (eventType) {
    case 'Permission':
      return formatPermissions(value, permissionsList)
    case 'User Role':
      return formatRoles(value, rolesList)
    case 'Account Status':
      return accountStatusFormat({ enabled: value })
    default:
      return value
  }
}
