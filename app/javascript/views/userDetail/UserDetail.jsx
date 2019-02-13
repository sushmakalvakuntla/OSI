import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Link as LinkRWD, PageHeader } from 'react-wood-duck'
import UserDetailEdit from './UserDetailEdit'
import UserDetailShow from './UserDetailShow'
import UserMessage from '../../common/UserMessage'
import Cards from '../../common/Card'
import ChangeLog from './ChangeLog'
import CWSPermissions from './CWSPermissions'
import Notes from './Notes'
import PageHeaderButtons from '../../common/PageHeaderButtons'

/* eslint camelcase: 0 */
export default class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resendEmailAlert: false,
    }
  }

  componentDidMount() {
    this.props.actions.fetchDetailsActions(this.props.match.params.id)
    this.props.actions.fetchPermissionsActions()
    this.props.actions.fetchRolesActions()
  }

  componentWillUnmount() {
    this.props.actions.clearDetails()
  }

  onSaveDetails = () => {
    const { updatedDetails, match, actions } = this.props
    actions.saveUserDetailsActions(match.params.id, updatedDetails)
    this.setState({ resendEmailAlert: false })
    actions.clearAddedUserDetailActions()
  }

  onResendInvite = () => {
    this.props.actions.resendRegistrationEmailActions(this.props.details.id)
    this.props.actions.clearSaveAlert()
    this.setState({ resendEmailAlert: true })
  }

  onReset = () => {
    this.props.actions.fetchDetailsActions(this.props.match.params.id)
    this.props.actions.clearAddedUserDetailActions()
    this.setState({ resendEmailAlert: false })
  }

  handleDropDownChange = (name, value) => {
    this.props.actions.handleDropdownChangeAction(name, value)
  }

  handleInputChange = (name, value) => {
    this.props.actions.handleInputChangeAction(name, value)
  }

  showAlert = (displayAlert, userDetailError, saveSuccessMsg) => {
    if (displayAlert) {
      if (userDetailError) {
        return <UserMessage errorMsg={userDetailError} />
      } else {
        return <UserMessage successMsg={saveSuccessMsg} />
      }
    }
    return null
  }

  showAddAlert = () => {
    if (this.props.id) {
      return (
        <UserMessage
          successMsg={`Successfully added new user. Registration email has been sent to ${this.props.details.email} `}
        />
      )
    }
    return null
  }

  emailSent = () => {
    if (this.state.resendEmailAlert) {
      return <UserMessage successMsg={'Registration email has been sent successfully'} />
    }
    return null
  }

  getChangeLogAdminDetails = value => {
    this.props.actions.fetchChangeLogAdminDetailsActions(value)
  }

  renderCards = () => {
    const {
      details,
      possiblePermissionsList,
      possibleRolesList,
      isRolesDisabled,
      startDate,
      userStatus,
      userStatusDescription,
      officeName,
      isEmailValid,
      assignedRole,
      accountStatus,
      assignedPermissions,
      lastLoginDateTime,
      officePhoneNumber,
      isPhoneNumberValid,
      workerPhoneNumber,
      unformattedPhoneNumber,
      phoneExtensionNumber,
      disableResendEmailButton,
      auditEvents,
      isUserEditable,
      notes,
      notesWordCount,
      changeLogAdminDetails,
      changeLogAdminOfficeName,
    } = this.props
    return details && details.id ? (
      <div>
        {this.props.isUserEditable ? (
          <UserDetailEdit
            details={details}
            possiblePermissionsList={possiblePermissionsList}
            possibleRolesList={possibleRolesList}
            isRolesDisabled={isRolesDisabled}
            onDropDownChange={this.handleDropDownChange}
            startDate={startDate}
            userStatus={userStatus}
            userStatusDescription={userStatusDescription}
            officeName={officeName}
            onInputChange={this.handleInputChange}
            isEmailValid={isEmailValid}
            lastLoginDateTime={lastLoginDateTime}
            officePhoneNumber={officePhoneNumber}
            isPhoneNumberValid={isPhoneNumberValid}
            unformattedPhoneNumber={unformattedPhoneNumber}
            phoneExtensionNumber={phoneExtensionNumber}
            onResendInvite={this.onResendInvite}
            disableResendEmailButton={disableResendEmailButton}
          />
        ) : (
          <UserDetailShow
            details={details}
            startDate={startDate}
            accountStatus={accountStatus}
            userStatus={userStatus}
            userStatusDescription={userStatusDescription}
            assignedPermissions={assignedPermissions}
            officeName={officeName}
            assignedRole={assignedRole}
            lastLoginDateTime={lastLoginDateTime}
            officePhoneNumber={officePhoneNumber}
            workerPhoneNumber={workerPhoneNumber}
          />
        )}
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CWSPermissions />
            </div>
            <div className="col-md-8">
              <Notes
                isUserEditable={isUserEditable}
                userNotes={notes}
                notesWordCount={notesWordCount}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-md-12">
              <ChangeLog
                auditEvents={auditEvents}
                getAdminDetails={this.getChangeLogAdminDetails}
                adminDetails={changeLogAdminDetails}
                userDetails={details}
                userOfficeName={officeName}
                adminOfficeName={changeLogAdminOfficeName}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col-md-12">
          <Cards cardHeaderText="User not found" />
        </div>
      </div>
    )
  }

  pageButton = () => {
    return (
      <PageHeaderButtons
        isUserEditable={this.props.isUserEditable}
        onSaveDetails={this.onSaveDetails}
        onReset={this.onReset}
        disableButtons={this.props.disableActionBtn}
      />
    )
  }

  render() {
    return (
      <div>
        <PageHeader pageTitle="User Profile" button={this.pageButton()} />
        <div className="container">
          <div className="col-md-12">
            Back to: <LinkRWD text="Dashboard" href={this.props.dashboardUrl} clickHandler={this.props.dashboardClickHandler} />
            &nbsp;&gt;&nbsp;
            <Link to="/">User List</Link>
            {this.showAlert(this.props.displayAlert, this.props.userDetailError, this.props.saveSuccessMsg)}
            {this.emailSent()}
            {this.showAddAlert()}
          </div>
          {this.props.fetchDetailsError ? (
            <UserMessage errorMsg={this.props.fetchDetailsError} />
          ) : this.props.XHRStatus !== 'ready' ? (
            <Cards>
              <span>{'Loading...'}</span>
            </Cards>
          ) : (
            this.renderCards()
          )}
        </div>
      </div>
    )
  }
}

UserDetail.propTypes = {
  details: PropTypes.object,
  updatedDetails: PropTypes.object,
  initialDetails: PropTypes.object,
  id: PropTypes.string,
  actions: PropTypes.object.isRequired,
  fetchDetailsError: PropTypes.string,
  userDetailError: PropTypes.object,
  isUserEditable: PropTypes.bool,
  disableResendEmailButton: PropTypes.bool,
  XHRStatus: PropTypes.string,
  assignedPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  possibleRolesList: PropTypes.array,
  possiblePermissionsList: PropTypes.array,
  accountStatus: PropTypes.string,
  startDate: PropTypes.string,
  lastLoginDateTime: PropTypes.string,
  userStatusDescription: PropTypes.string,
  userStatus: PropTypes.string,
  officeName: PropTypes.string,
  isRolesDisabled: PropTypes.bool,
  assignedRole: PropTypes.string,
  displayAlert: PropTypes.bool,
  disableActionBtn: PropTypes.bool,
  match: PropTypes.object,
  isEmailValid: PropTypes.bool,
  officePhoneNumber: PropTypes.string,
  workerPhoneNumber: PropTypes.string,
  auditEvents: PropTypes.array,
  isPhoneNumberValid: PropTypes.bool,
  saveSuccessMsg: PropTypes.string,
  unformattedPhoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  phoneExtensionNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeLogAdminOfficeName: PropTypes.string,
  changeLogAdminDetails: PropTypes.object,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  notes: PropTypes.string,
  notesWordCount: PropTypes.number,
}

UserDetail.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
}
