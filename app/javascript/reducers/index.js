import { combineReducers } from 'redux'
import userList from './userListReducers'
import fetchDetails from './detailsReducers'
import fetchPermissions from './permissionsReducers'
import fetchOffices from './officesReducers'
import validateNewUser from './validateNewUserReducer'
import addUser from './addUserReducers'
import fetchRoles from './rolesReducers'
import resendRegistrationEmail from './resendRegistrationEmailReducers'
import fetchChangeLogDetails from './changeLogDetailsReducers'
import fetchAuditEvents from './auditEventsReducers'
const reducer = combineReducers({
  userList,
  fetchDetails,
  fetchPermissions,
  fetchOffices,
  validateNewUser,
  addUser,
  fetchRoles,
  resendRegistrationEmail,
  fetchChangeLogDetails,
  fetchAuditEvents,
})

export default reducer
