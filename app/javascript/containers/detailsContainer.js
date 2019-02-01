import { connect } from 'react-redux'
import UserDetail from '../views/userDetail/UserDetail'
import {
  selectDetailRecords,
  isUserEditable,
  selectAuditEvents,
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
  isEmailValid,
  disableActionButton,
  selectModifiedDetails,
  assignedRoles,
  lastLogin,
  formattedPhoneNumber,
  isPhoneNumberValid,
  unformattedPhoneNumber,
  phoneExtension,
} from '../selectors/detailSelector'
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
} from '../actions/detailActions'
import { disableResendEmailButton } from '../selectors/resendEmailSelector'
import { fetchPermissionsActions } from '../actions/permissionsActions'
import { fetchRolesActions } from '../actions/rolesActions'
import { resendRegistrationEmailActions } from '../actions/resendRegistrationEmailActions'
import { bindActionCreators } from 'redux'
import { addUserRecords } from '../selectors/addUserSelector'
import { clearAddedUserDetailActions } from '../actions/addUserActions'

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
    isEmailValid: isEmailValid(state),
    XHRStatus: fetchingStatus(state),
    possibleRolesList: selectPossibleRolesList(state),
    auditEvents: selectAuditEvents(state),
    possiblePermissionsList: selectPossiblePermissionsList(state),
    rolesList: rolesList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT ? process.env.RAILS_RELATIVE_URL_ROOT : '/',
    disableResendEmailButton: disableResendEmailButton(state),
    isRolesDisabled: disableRolesDropDown(state),
    disableActionBtn: disableActionButton(state),
    startDate: selectStartDate(state),
    assignedPermissions: selectAssignedPermissions(state),
    officeName: officeName(state),
    assignedRole: assignedRoles(state),
    lastLoginDateTime: lastLogin(state),
    officePhoneNumber: formattedPhoneNumber(state).officePhoneNumber,
    workerPhoneNumber: formattedPhoneNumber(state).workerPhoneNumber,
    isPhoneNumberValid: isPhoneNumberValid(state),
    unformattedPhoneNumber: unformattedPhoneNumber(state),
    phoneExtensionNumber: phoneExtension(state),
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
    fetchRolesActions,
    saveUserDetailsActions,
    resendRegistrationEmailActions,
    clearDetails,
    clearAddedUserDetailActions,
    clearSaveAlert,
    handleDropdownChangeAction,
    handleInputChangeAction,
    fetchChangeLogAdminDetailsActions,
  }
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail)
