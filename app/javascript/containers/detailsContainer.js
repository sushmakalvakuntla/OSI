import { connect } from 'react-redux'
import UserDetail from '../views/userDetail/UserDetail'
import {
  selectDetailRecords,
  isUserEditable,
  selectPossibleRolesList,
  disableRolesDropDown,
  fetchingStatus,
  selectStartDate,
  selectAccountStatus,
  selectAssignedPermissions,
  userStatus,
  userStatusDescription,
  officeName,
  selectPossiblePermissionsList,
  selectModifiedDetails,
  assignedRoles,
  lastLogin,
  formattedPhoneNumber,
  unformattedPhoneNumber,
  phoneExtension,
  userNotes,
  isPermissionsEmpty,
  selectCWSPrivileges,
  statusButtonProperties,
  cellPhoneNumber,
} from '../selectors/detailSelector'
import { selectAuditEvents } from '../selectors/auditEventsSelector'
import { selectChangeLogAdminDetails, selectChangeLogAdminOfficeName } from '../selectors/changeLogDetailsSelector'
import { rolesList } from '../selectors/rolesListSelector'
import {
  fetchDetailsActions,
  saveUserDetailsActions,
  clearDetails,
  handleDropdownChangeAction,
  handleInputChangeAction,
  clearSaveAlert,
  fetchChangeLogAdminDetailsActions,
  handleStatusChangeAction,
} from '../actions/detailActions'
import { disableResendEmailButton } from '../selectors/resendEmailSelector'
import { fetchPermissionsActions } from '../actions/permissionsActions'
import { fetchRolesActions } from '../actions/rolesActions'
import { resendRegistrationEmailActions } from '../actions/resendRegistrationEmailActions'
import { bindActionCreators } from 'redux'
import { addUserRecords } from '../selectors/addUserSelector'
import { clearAddedUserDetailActions } from '../actions/addUserActions'
import { fetchUserAuditEventsActions, clearAuditEvents } from '../actions/auditEventActions'
import { fetchOfficesActions } from '../actions/officesActions'
import { fetchAccountActions } from '../actions/searchUserListActions'

function mapStateToProps(state) {
  return {
    details: selectDetailRecords(state),
    updatedDetails: selectModifiedDetails(state),
    changeLogAdminDetails: selectChangeLogAdminDetails(state),
    changeLogAdminOfficeName: selectChangeLogAdminOfficeName(state),
    initialDetails: state.fetchDetails.initialDetails,
    id: addUserRecords(state),
    fetchDetailsError: state.fetchDetails.fetchDetailsError,
    userDetailError: state.fetchDetails.saveDetailsError,
    isUserEditable: isUserEditable(state),
    accountStatus: selectAccountStatus(state),
    userStatusDescription: userStatusDescription(state),
    userStatus: userStatus(state),
    displayAlert: state.fetchDetails.displayAlert,
    saveSuccessMsg: state.fetchDetails.saveSuccessAlert,
    XHRStatus: fetchingStatus(state),
    possibleRolesList: selectPossibleRolesList(state),
    auditEvents: selectAuditEvents(state),
    possiblePermissionsList: selectPossiblePermissionsList(state),
    rolesList: rolesList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT ? process.env.RAILS_RELATIVE_URL_ROOT : '/',
    disableResendEmailButton: disableResendEmailButton(state),
    isRolesDisabled: disableRolesDropDown(state),
    disableActionBtn: state.fetchDetails.disableActionBtn,
    startDate: selectStartDate(state),
    assignedPermissions: selectAssignedPermissions(state),
    officeName: officeName(state),
    assignedRole: assignedRoles(state),
    lastLoginDateTime: lastLogin(state),
    officePhoneNumber: formattedPhoneNumber(state).officePhoneNumber,
    workerPhoneNumber: formattedPhoneNumber(state).workerPhoneNumber,
    unformattedPhoneNumber: unformattedPhoneNumber(state),
    phoneExtensionNumber: phoneExtension(state),
    notes: userNotes(state).notes,
    notesWordCount: userNotes(state).notesLength,
    isPermissionsEmpty: isPermissionsEmpty(state),
    privilegesFromCWS: selectCWSPrivileges(state),
    statusButtonProperties: statusButtonProperties(state),
    cellPhoneNumber: cellPhoneNumber(state),
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
    fetchRolesActions,
    fetchUserAuditEventsActions,
    saveUserDetailsActions,
    resendRegistrationEmailActions,
    clearDetails,
    clearAddedUserDetailActions,
    clearSaveAlert,
    clearAuditEvents,
    handleDropdownChangeAction,
    handleInputChangeAction,
    fetchChangeLogAdminDetailsActions,
    handleStatusChangeAction,
    fetchAccountActions,
    fetchOfficesActions,
  }
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail)
