import safeGet from 'lodash.get'
import { formatDate, formatRoles, checkDate, formatPermissions, formatPhoneNumberWithExt } from '../_utils/formatters'
import { rolesList } from './rolesListSelector'
import { permissionsList } from './permissionsListSelector'
import { translateOfficeName } from './officeListSelector'

export const selectUserDetailObject = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null
  const userData = usersObject ? usersObject.records : null
  return userData
}

export const selectDetailRecords = state => {
  const userData = selectUserDetailObject(state)
  const userDetails = userData && userData.user ? userData.user : {}
  return userDetails
}

export const selectAssignedPermissions = state => {
  const assignedPermissions = safeGet(state, 'fetchDetails.details.records.user.permissions')
  return formatPermissions(assignedPermissions, permissionsList(state))
}

export const selectPossiblePermissionsList = state => {
  const possiblePermissions = safeGet(
    state,
    'fetchDetails.details.records.edit_details.permissions.possible_values',
    []
  )
  const permissions = permissionsList(state)
  const options = []
  permissions.forEach(permission => {
    possiblePermissions.forEach(item => {
      if (item === permission.value) {
        options.push({ value: permission.value, label: permission.label })
      }
    })
  })
  return options
}

export const selectPossibleRolesList = state => {
  const possibleRoles = safeGet(state, 'fetchDetails.details.records.edit_details.roles.possible_values', [])
  const roles = rolesList(state)
  const options = []
  roles.forEach(role => {
    possibleRoles.forEach(item => {
      if (item === role.value) {
        options.push({ value: role.value, label: role.label })
      }
    })
  })
  return options
}

export const isEmailValid = state => {
  const email = safeGet(state, 'fetchDetails.details.records.user.email')
  return /^[a-zA-Z0-9_!#$%&’*+/=?`'{^.-]*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i.test(email)
}

export const disableActionButton = state => {
  if (!isEmailValid(state) || !isPhoneNumberValid(state)) {
    return true
  }
  return safeGet(state, 'fetchDetails.disableActionBtn')
}

export const checkEditDisable = state => !safeGet(state, 'fetchDetails.details.records.edit_details.editable')

export const disableRolesDropDown = state => !safeGet(state, 'fetchDetails.details.records.edit_details.roles.editable')

export const fetchingStatus = state => safeGet(state, 'fetchDetails.details.XHRStatus')

export const selectStartDate = state => {
  const date = safeGet(state, 'fetchDetails.details.records.user.start_date')
  return formatDate(date)
}

export const selectAccountStatus = state => {
  const status = safeGet(state, 'fetchDetails.details.records.user.enabled')
  const accountStatus = {
    true: 'Active',
    false: 'Inactive',
  }
  return accountStatus[status]
}

const status = state => safeGet(state, 'fetchDetails.details.records.user.status')

export const userStatusDescription = state => {
  const userStatus = status(state)
  const description = {
    UNCONFIRMED: 'User has been created but not confirmed.',
    CONFIRMED: 'User has been confirmed.',
    ARCHIVED: 'User is no longer active.',
    COMPROMISED: 'User is disabled due to a potential security threat.',
    UNKNOWN: 'User status is not known.',
    RESET_REQUIRED: 'Need to reset user.',
    FORCE_CHANGE_PASSWORD: 'User has never logged in.',
  }
  return description[userStatus] || ''
}

export const userStatus = state => {
  const userStatus = status(state)
  const userText = {
    CONFIRMED: 'Confirmed',
    FORCE_CHANGE_PASSWORD: 'Registration Incomplete',
  }
  return userText[userStatus] || ''
}

export const officeName = state => {
  const officeId = safeGet(state, 'fetchDetails.details.records.user.office_id')
  return translateOfficeName(state, officeId)
}

const checkForModifiedDetails = (initialDetails, updatedDetails) => {
  return initialDetails === updatedDetails ? undefined : updatedDetails
}

export const selectModifiedDetails = state => {
  const initialDetails = safeGet(state, 'fetchDetails.initialDetails.user', {})
  const modifiedDetails = selectDetailRecords(state)
  const userData = {
    permissions: checkForModifiedDetails(initialDetails.permissions, modifiedDetails.permissions),
    email: checkForModifiedDetails(initialDetails.email, modifiedDetails.email),
    enabled: checkForModifiedDetails(initialDetails.enabled, modifiedDetails.enabled),
    phone_number: checkForModifiedDetails(initialDetails.phone_number, modifiedDetails.phone_number),
    phone_extension_number: checkForModifiedDetails(
      initialDetails.phone_extension_number,
      modifiedDetails.phone_extension_number
    ),
    roles: disableRolesDropDown(state)
      ? undefined
      : checkForModifiedDetails(initialDetails.roles, modifiedDetails.roles),
  }
  return userData
}

export const formattedDateTime = date => {
  return checkDate(date)
}

export const lastLogin = state => {
  return formattedDateTime(safeGet(state, 'fetchDetails.details.records.user.last_login_date_time', ''))
}

export const resentRegistrationDate = state => {
  return formattedDateTime(safeGet(state, 'fetchDetails.details.records.user.last_registration_resubmit_date_time', ''))
}

export const assignedRoles = state => {
  const assignedRole = safeGet(state, 'fetchDetails.details.records.user.roles', [])
  return formatRoles(assignedRole, rolesList(state))
}

export const unformattedPhoneNumber = state => {
  const workerPhone = safeGet(state, 'fetchDetails.details.records.user.phone_number') || ''
  if (workerPhone && workerPhone.length === 11) {
    const phone = workerPhone.substring(1)
    return phone
  }
  return workerPhone
}

export const isPhoneNumberValid = state => {
  const phoneNumber = unformattedPhoneNumber(state)
  return /^[1-9]\d{9}$/i.test(phoneNumber)
}

export const formattedPhoneNumber = state => {
  const workerExt = safeGet(state, 'fetchDetails.details.records.user.phone_extension_number', '')
  const officePhone = safeGet(state, 'fetchDetails.details.records.user.office_phone_number', '')
  const officeExt = safeGet(state, 'fetchDetails.details.records.user.office_phone_extension_number', '')
  const workerPhone = unformattedPhoneNumber(state)
  return {
    officePhoneNumber: formatPhoneNumberWithExt(officePhone, officeExt),
    workerPhoneNumber: formatPhoneNumberWithExt(workerPhone, workerExt),
  }
}

export const phoneExtension = state => {
  return safeGet(state, 'fetchDetails.details.records.user.phone_extension_number') || ''
}
