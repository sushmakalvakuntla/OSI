import { combineReducers } from 'redux'
import searchUserList from './searchUserListReducers'
import groupUsersList from './groupUsersListReducers'
import fetchDetails from './detailsReducers'
import fetchPermissions from './permissionsReducers'
import fetchOffices from './officesReducers'
import validateNewUser from './validateNewUserReducer'
import addUser from './addUserReducers'
import fetchRoles from './rolesReducers'
import resendRegistrationEmail from './resendRegistrationEmailReducers'
import fetchChangeLogDetails from './changeLogDetailsReducers'
import fetchAuditEvents from './auditEventsReducers'
import searchTilesReducer from './searchTilesReducer'
const reducer = combineReducers({
  searchUserList,
  fetchDetails,
  fetchPermissions,
  fetchOffices,
  validateNewUser,
  addUser,
  fetchRoles,
  resendRegistrationEmail,
  fetchChangeLogDetails,
  fetchAuditEvents,
  groupUsersList,
  searchTilesReducer,
})

export default reducer
