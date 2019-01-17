import { connect } from 'react-redux'
import UserDetail from '../views/userDetail/UserDetail'
import {
  selectDetailRecords,
  checkEditDisable,
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
  resentRegistrationDate,
  lastLogin,
  formattedPhoneNumber,
  isPhoneNumberValid,
  unformattedPhoneNumber,
  phoneExtension,
} from '../selectors/detailSelector'
import { rolesList } from '../selectors/rolesListSelector'
import {
  fetchDetailsActions,
  saveUserDetailsActions,
  clearDetails,
  handleDropdownChangeAction,
  handleEditButtonChangeAction,
  handleInputChangeAction,
  clearSaveAlert,
} from '../actions/detailActions'
import { resentRegistrationNewDateTime, disableResendEmailButton } from '../selectors/resendEmailSelector'
import { fetchPermissionsActions } from '../actions/permissionsActions'
import { fetchRolesActions } from '../actions/rolesActions'
import { resendRegistrationEmailActions } from '../actions/resendRegistrationEmailActions'
import { bindActionCreators } from 'redux'
import { addUserRecords } from '../selectors/addUserSelector'
import { clearAddedUserDetailActions } from '../actions/addUserActions'

function mapStateToProps(state) {
  return {
    updatedDetails: selectModifiedDetails(state),
    accountStatus: selectAccountStatus(state),
    userStatusDescription: userStatusDescription(state),
    userStatus: userStatus(state),
    isEdit: state.fetchDetails.isEdit,
    displayAlert: state.fetchDetails.displayAlert,
    isEmailValid: isEmailValid(state),
    id: addUserRecords(state),
    XHRStatus: fetchingStatus(state),
    possibleRolesList: selectPossibleRolesList(state),
    disableEditBtn: checkEditDisable(state),
    details: selectDetailRecords(state),
    possiblePermissionsList: selectPossiblePermissionsList(state),
    rolesList: rolesList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT ? process.env.RAILS_RELATIVE_URL_ROOT : '/',
    userDetailError: state.fetchDetails.saveDetailsError,
    fetchDetailsError: state.fetchDetails.fetchDetailsError,
    resentRegistrationNewDateTime: resentRegistrationNewDateTime(state),
    disableResendEmailButton: disableResendEmailButton(state),
    isRolesDisabled: disableRolesDropDown(state),
    disableActionBtn: disableActionButton(state),
    startDate: selectStartDate(state),
    assignedPermissions: selectAssignedPermissions(state),
    officeName: officeName(state),
    initialDetails: state.fetchDetails.initialDetails,
    assignedRole: assignedRoles(state),
    lastLoginDateTime: lastLogin(state),
    resentRegistrationExistingDateTime: resentRegistrationDate(state),
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
    handleEditButtonChangeAction,
    handleInputChangeAction,
  }
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail)
