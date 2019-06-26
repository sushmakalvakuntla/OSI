import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import ShowField from '../../common/ShowField'
import { InputComponent } from 'react-wood-duck'
import { PrimitiveButton as Button } from '@cwds/components'
import DropDown from '../../common/DropDown'
import { STATUS } from '../../_constants/constants'
/* eslint camelcase: 0 */

const UserDetailEdit = ({
  details,
  possiblePermissionsList,
  possibleRolesList,
  isRolesDisabled,
  onDropDownChange,
  startDate,
  userStatus,
  userStatusDescription,
  officeName,
  onInputChange,
  lastLoginDateTime,
  officePhoneNumber,
  unformattedPhoneNumber,
  phoneExtensionNumber,
  onResendInvite,
  disableResendEmailButton,
  handleUserStatusChange,
  headerButtonLabel,
  systemStatus,
  isLockButtonDisabled,
  statusClassName,
  headerButtonType,
  cellPhoneNumber,
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
              <DropDown
                multiSelect={false}
                simpleValue={false}
                selectedOption={possibleRolesList.find(({ value }) => value === details.roles.toString())}
                id="RolesDropDown"
                label="Role"
                onChange={selectedValue => onDropDownChange('roles', [selectedValue.value])}
                options={possibleRolesList}
                disabled={isRolesDisabled}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <InputComponent
                id="InputEmail"
                label="Email"
                fieldClassName="form-group"
                type="email"
                placeholder="Add Email Address"
                value={details.email}
                onChange={event => onInputChange('email', event.target.value)}
              />
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
              <InputComponent
                id="InputPhoneNumber"
                label="Phone Number"
                fieldClassName="form-group"
                type="tel"
                placeholder="Enter numbers only"
                value={unformattedPhoneNumber}
                allowCharacters={/^[0-9]*$/i}
                onChange={event => onInputChange('phone_number', parseInt(event.target.value) || '')}
                maxLength={10}
              />
            </div>
            <div className="col-md-1 col-md-offset-2">
              <InputComponent
                id="InputPhoneNumberExtension"
                label="Ext"
                fieldClassName="form-group"
                type="tel"
                value={phoneExtensionNumber}
                maxLength={7}
                allowCharacters={/^[0-9]*$/i}
                onChange={event => onInputChange('phone_extension_number', event.target.value)}
              />
            </div>
            <div className="col-md-3">
              <InputComponent
                id="InputCellPhone"
                label="Cell Phone Number"
                fieldClassName="form-group"
                type="tel"
                value={cellPhoneNumber}
                maxLength={10}
                allowCharacters={/^[0-9]*$/i}
                onChange={event => onInputChange('cell_phone_number', parseInt(event.target.value) || '')}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div>
              <div className="col-md-3">
                <ShowField label="User Status">
                  {userStatus}
                  <div className="value-text-color">
                    {userStatusDescription}
                    {details.status === 'FORCE_CHANGE_PASSWORD' && (
                      <Button
                        color="primary"
                        className="resend-email-btn"
                        size="lg"
                        id="resendInvite"
                        type="submit"
                        onClick={onResendInvite}
                        disabled={disableResendEmailButton}
                      >
                        RESEND INVITE
                      </Button>
                    )}
                  </div>
                </ShowField>
              </div>
              <div className="col-md-3">
                <DropDown
                  multiSelect={false}
                  simpleValue={false}
                  id="StatusDropDown"
                  selectedOption={STATUS.find(({ value }) => value === details.enabled)}
                  options={STATUS}
                  label="Account Status"
                  onChange={selectedValue => onDropDownChange('enabled', selectedValue.value)}
                />
              </div>
              <div className="col-md-6">
                <DropDown
                  id="AssignPermissions"
                  selectedOption={possiblePermissionsList.filter(({ value }) => details.permissions.includes(value))}
                  options={possiblePermissionsList}
                  label="Assigned Permissions"
                  onChange={possiblePermissionsList =>
                    onDropDownChange('permissions', possiblePermissionsList.map(value => value.value))
                  }
                  multiSelect={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
)

UserDetailEdit.propTypes = {
  officeName: PropTypes.string,
  details: PropTypes.object,
  startDate: PropTypes.string,
  lastLoginDateTime: PropTypes.string,
  onDropDownChange: PropTypes.func,
  onInputChange: PropTypes.func,
  userStatusDescription: PropTypes.string,
  userStatus: PropTypes.string,
  possibleRolesList: PropTypes.array,
  isEmailValid: PropTypes.bool,
  officePhoneNumber: PropTypes.string,
  disableResendEmailButton: PropTypes.bool,
  possiblePermissionsList: PropTypes.array,
  isRolesDisabled: PropTypes.bool,
  isPhoneNumberValid: PropTypes.bool,
  onResendInvite: PropTypes.func,
  unformattedPhoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  phoneExtensionNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleUserStatusChange: PropTypes.func,
  headerButtonLabel: PropTypes.string,
  systemStatus: PropTypes.string,
  isLockButtonDisabled: PropTypes.bool,
  statusClassName: PropTypes.string,
  headerButtonType: PropTypes.string,
  cellPhoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

UserDetailEdit.defaultProps = {
  possiblePermissionsList: [],
}

export default UserDetailEdit
