import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Link as LinkRWD, PageHeader } from 'react-wood-duck'
import UserDetailEdit from './UserDetailEdit'
import UserDetailShow from './UserDetailShow'
import UserMessage from '../../common/UserMessage'
import Cards from '../../common/Card'
import ChangeLog from './ChangeLog'
import CWSPrivileges from './CWSPrivileges'
import Notes from './Notes'
import PageHeaderButtons from './DetailsPageHeaderButtons'

export default class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { resendEmailAlert: false, missingFields: false }
  }

  componentDidMount() {
    this.props.actions.fetchAccountActions()
    this.props.actions.fetchOfficesActions()
    this.props.actions.fetchDetailsActions(this.props.match.params.id)
    this.props.actions.fetchPermissionsActions()
    this.props.actions.fetchRolesActions()
    this.props.actions.fetchUserAuditEventsActions(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.actions.clearDetails()
    this.props.actions.clearAuditEvents()
  }

  onSaveDetails = () => {
    const { updatedDetails, match, actions, details } = this.props
    if (details.phone_number) {
      actions.saveUserDetailsActions(match.params.id, updatedDetails)
      this.setState({ resendEmailAlert: false })
      actions.clearAddedUserDetailActions()
    } else {
      this.setState({ missingFields: true })
    }
    return null
  }

  onResendInvite = () => {
    this.props.actions.resendRegistrationEmailActions(this.props.details.id)
    this.setState({ resendEmailAlert: true, missingFields: false })
    this.props.actions.clearAddedUserDetailActions()
    this.props.actions.clearSaveAlert()
  }

  onReset = () => {
    this.props.actions.fetchDetailsActions(this.props.match.params.id)
    this.props.actions.clearAddedUserDetailActions()
    this.setState({ resendEmailAlert: false, missingFields: false })
  }

  handleDropDownChange = (name, value) => {
    this.setState({ missingFields: false })
    this.props.actions.handleDropdownChangeAction(name, value)
  }

  handleInputChange = (name, value) => {
    this.setState({ missingFields: false })
    this.props.actions.handleInputChangeAction(name, value)
  }

  showAlert = (displayAlert, userDetailError, saveSuccessMsg) => {
    if (displayAlert)
      return (
        <div>{userDetailError ? <UserMessage errorMsg={userDetailError} /> : <UserMessage successMsg={saveSuccessMsg} />}</div>
      )
    return null
  }

  showAddAlert = () => (
    <div>
      {this.props.id ? (
        <UserMessage
          successMsg={`Successfully added new user. Registration email has been sent to ${this.props.details.email} `}
        />
      ) : null}
    </div>
  )

  emailSent = () => (
    <div>{this.state.resendEmailAlert ? <UserMessage successMsg={'Registration email has been sent successfully'} /> : null}</div>
  )

  getChangeLogAdminDetails = value => {
    this.props.actions.fetchChangeLogAdminDetailsActions(value)
  }

  onUserStatusChange = () => {
    this.setState({ missingFields: false })
    this.props.actions.handleStatusChangeAction(this.props.match.params.id)
  }

  displayMissingFieldAlert = () => {
    return this.state.missingFields ? (
      !this.props.details.phone_number ? (
        <UserMessage errorMsg={'Phone Number is required in order to save. Please enter a valid phone number and try again.'} />
      ) : (
        ''
      )
    ) : (
      ''
    )
  }

  renderCards = () => {
    return this.props.details && this.props.details.id ? (
      <div>
        {this.props.isUserEditable ? (
          <UserDetailEdit
            details={this.props.details}
            possiblePermissionsList={this.props.possiblePermissionsList}
            possibleRolesList={this.props.possibleRolesList}
            isRolesDisabled={this.props.isRolesDisabled}
            onDropDownChange={this.handleDropDownChange}
            startDate={this.props.startDate}
            userStatus={this.props.userStatus}
            userStatusDescription={this.props.userStatusDescription}
            officeName={this.props.officeName}
            onInputChange={this.handleInputChange}
            lastLoginDateTime={this.props.lastLoginDateTime}
            officePhoneNumber={this.props.officePhoneNumber}
            unformattedPhoneNumber={this.props.unformattedPhoneNumber}
            phoneExtensionNumber={this.props.phoneExtensionNumber}
            onResendInvite={this.onResendInvite}
            disableResendEmailButton={this.props.disableResendEmailButton}
            handleUserStatusChange={this.onUserStatusChange}
            headerButtonLabel={this.props.statusButtonProperties.headerButtonLabel}
            systemStatus={this.props.statusButtonProperties.systemStatus}
            isLockButtonDisabled={this.props.statusButtonProperties.isDisabled}
            statusClassName={this.props.statusButtonProperties.className}
            headerButtonType={this.props.statusButtonProperties.buttonType}
            cellPhoneNumber={this.props.cellPhoneNumber}
          />
        ) : (
          <UserDetailShow
            details={this.props.details}
            startDate={this.props.startDate}
            accountStatus={this.props.accountStatus}
            userStatus={this.props.userStatus}
            userStatusDescription={this.props.userStatusDescription}
            assignedPermissions={this.props.assignedPermissions}
            officeName={this.props.officeName}
            assignedRole={this.props.assignedRole}
            lastLoginDateTime={this.props.lastLoginDateTime}
            officePhoneNumber={this.props.officePhoneNumber}
            workerPhoneNumber={this.props.workerPhoneNumber}
            handleUserStatusChange={this.onUserStatusChange}
            headerButtonLabel={this.props.statusButtonProperties.headerButtonLabel}
            systemStatus={this.props.statusButtonProperties.systemStatus}
            isLockButtonDisabled={this.props.statusButtonProperties.isDisabled}
            statusClassName={this.props.statusButtonProperties.className}
            headerButtonType={this.props.statusButtonProperties.buttonType}
            cellPhoneNumber={this.props.cellPhoneNumber}
          />
        )}
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CWSPrivileges CWSPrivileges={this.props.privilegesFromCWS} />
            </div>
            <div className="col-md-6">
              <Notes
                isUserEditable={this.props.isUserEditable}
                userNotes={this.props.notes}
                notesWordCount={this.props.notesWordCount}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-md-12">
              <ChangeLog
                auditEvents={this.props.auditEvents}
                getAdminDetails={this.getChangeLogAdminDetails}
                adminDetails={this.props.changeLogAdminDetails}
                userDetails={this.props.details}
                userOfficeName={this.props.officeName}
                adminOfficeName={this.props.changeLogAdminOfficeName}
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
        disableActionBtn={this.props.disableActionBtn}
        isPermissionsEmpty={this.props.isPermissionsEmpty}
      />
    )
  }

  renderBreadCrumb = () => {
    return (
      <Fragment>
        Back to: <LinkRWD text="Dashboard" href={this.props.dashboardUrl} clickHandler={this.props.dashboardClickHandler} />
        &nbsp;&gt;&nbsp;
        {this.props.location.fromGroupUserList ? (
          <Fragment>
            <Link to="/">User List</Link>
            &nbsp;&gt;&nbsp;
            <Link to="/user_group_search">Filter User List</Link>
          </Fragment>
        ) : (
          <Link to="/">User List</Link>
        )}
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        <PageHeader pageTitle="User Profile" button={this.pageButton()} />
        <div className="container">
          <div className="col-md-12">
            {this.renderBreadCrumb()}
            {this.showAlert(this.props.displayAlert, this.props.userDetailError, this.props.saveSuccessMsg)}
            {this.emailSent()}
            {this.showAddAlert()}
            {this.displayMissingFieldAlert()}
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
  saveSuccessMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  unformattedPhoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  phoneExtensionNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeLogAdminOfficeName: PropTypes.string,
  changeLogAdminDetails: PropTypes.object,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  notes: PropTypes.string,
  notesWordCount: PropTypes.number,
  isPermissionsEmpty: PropTypes.bool,
  privilegesFromCWS: PropTypes.array,
  statusButtonProperties: PropTypes.object,
  location: PropTypes.object,
  cellPhoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

UserDetail.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  statusButtonProperties: {
    headerButtonLabel: 'Unlocked',
    systemStatus: 'System Status',
    isDisabled: true,
    className: 'unlockedStatus',
    buttonType: 'secondary',
  },
  location: {
    fromGroupUserList: false,
  },
}
