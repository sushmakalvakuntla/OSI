import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import ShowField from '../../common/ShowField'

/* eslint camelcase: 0 */

const UserDetailShow = ({
  details,
  startDate,
  accountStatus,
  userStatus,
  userStatusDescription,
  assignedPermissions,
  officeName,
  assignedRole,
  lastLoginDateTime,
  officePhoneNumber,
  workerPhoneNumber,
  handleUserStatusChange,
  headerButtonLabel,
  systemStatus,
  isLockButtonDisabled,
  statusClassName,
  headerButtonType,
}) => (
  <div className="row">
    <div className="col-md-12">
      <Cards
        cardHeaderText={`County: ${details.county_name}`}
        cardHeaderButton={true}
        cardActionButtons={false}
        handleUserStatusChange={handleUserStatusChange}
        headerButtonLabel={headerButtonLabel}
        systemStatus={systemStatus}
        isHeaderButtonDisabled={isLockButtonDisabled}
        statusClassName={statusClassName}
        headerButtonType={headerButtonType}
      >
        <meta name="format-detection" content="telephone=no" />
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Full Name">
                {details.last_name}, {details.first_name} {details.middle_name}
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Name">{officeName}</ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="CWS Login">{details.racfid}</ShowField>
            </div>
            <div className="col-md-4">
              <ShowField label="Role">{assignedRole}</ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Email">{details.email}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Phone Number">
                <span>{officePhoneNumber}</span>
              </ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="Start Date">{startDate}</ShowField>
            </div>
            <div className="col-md-4">
              <ShowField label="Last Login">{lastLoginDateTime}</ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Phone Number">
                <span>{workerPhoneNumber}</span>
              </ShowField>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3">
              <ShowField label="User Status">
                {userStatus}
                <div className="value-text-color">{userStatusDescription}</div>
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Account Status">{accountStatus}</ShowField>
            </div>
            <div className="col-md-6">
              <ShowField label="Assigned Permissions">{assignedPermissions}</ShowField>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
)

UserDetailShow.propTypes = {
  details: PropTypes.object,
  officeName: PropTypes.string,
  userStatus: PropTypes.string,
  userStatusDescription: PropTypes.string,
  accountStatus: PropTypes.string,
  assignedRole: PropTypes.string,
  assignedPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  startDate: PropTypes.string,
  lastLoginDateTime: PropTypes.string,
  officePhoneNumber: PropTypes.string,
  workerPhoneNumber: PropTypes.string,
  handleUserStatusChange: PropTypes.func,
  headerButtonLabel: PropTypes.string,
  systemStatus: PropTypes.string,
  isLockButtonDisabled: PropTypes.bool,
  statusClassName: PropTypes.string,
  headerButtonType: PropTypes.string,
}

export default UserDetailShow
