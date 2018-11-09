import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import { Alert } from 'react-wood-duck'
import ShowField from '../../common/ShowField'
import { formatPhoneNumberWithExt } from '../../_utils/formatters'
import { translateOffice } from '../../_constants/constants'

/* eslint camelcase: 0 */

const AddNewUser = ({ onAddUser, verifyNewUserDetails, officesList }) => {
  return (
    <div>
      {verifyNewUserDetails.verification_passed ? (
        <div className="row">
          <div className="col-md-12">
            <Cards
              cardHeaderText="Add User"
              cardActionButtons={true}
              cardActionButton2={true}
              handleOnClickButton2={onAddUser}
              rightActionBtnName="Add User"
            >
              <div className="col-md-12">
                <div className="row">
                  <label htmlFor="text">
                    Please Verify the details of the CWS/CMS user you want to add to CWS-CARES
                  </label>
                  <div className="col-md-3">
                    <ShowField label="Full Name">
                      {verifyNewUserDetails.user.last_name}
                      {', '}
                      {verifyNewUserDetails.user.first_name} {verifyNewUserDetails.user.middle_name}
                    </ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="Office Name">{translateOffice(verifyNewUserDetails.user, officesList)}</ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="CWS Login">{verifyNewUserDetails.user.racfid}</ShowField>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <ShowField label="Email">{verifyNewUserDetails.user.email}</ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="Office Phone Number">
                      <span>{formatPhoneNumberWithExt(verifyNewUserDetails.user)}</span>
                    </ShowField>
                  </div>
                </div>
              </div>
            </Cards>
          </div>
        </div>
      ) : verifyNewUserDetails.verification_passed === false ? (
        <div className="row">
          <div className="col-md-12">
            <div className="alert">
              <Alert alertClassName="error" faIcon="fa-exclamation-triangle" alertCross={false}>
                {verifyNewUserDetails.verification_message}
              </Alert>
            </div>
          </div>
        </div>
      ) : (
        <Cards>
          <span>{'Loading.....'}</span>
        </Cards>
      )}
    </div>
  )
}

AddNewUser.propTypes = {
  onAddUser: PropTypes.func,
  verifyNewUserDetails: PropTypes.object,
  email: PropTypes.string,
  racfid: PropTypes.string,
  officesList: PropTypes.arrayOf(
    PropTypes.shape({
      office_name: PropTypes.string.isRequired,
      office_id: PropTypes.string.isRequired,
    })
  ),
}

export default AddNewUser
