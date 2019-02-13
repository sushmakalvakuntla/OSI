import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import UserMessage from '../../common/UserMessage'
import ShowField from '../../common/ShowField'

/* eslint camelcase: 0 */

const AddNewUser = ({ onAddUser, verifyNewUserDetails, officeName, officePhoneNumber, workerPhoneNumber }) => {
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
                  <label htmlFor="text">Please Verify the details of the CWS/CMS user you want to add to CWS-CARES</label>
                  <div className="col-md-3">
                    <ShowField label="Full Name">
                      {verifyNewUserDetails.user.last_name}
                      {', '}
                      {verifyNewUserDetails.user.first_name} {verifyNewUserDetails.user.middle_name}
                    </ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="Office Name">{officeName}</ShowField>
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
                      <span>{officePhoneNumber}</span>
                    </ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="Phone Number">{workerPhoneNumber}</ShowField>
                  </div>
                </div>
              </div>
            </Cards>
          </div>
        </div>
      ) : verifyNewUserDetails.verification_passed === false ? (
        <UserMessage errorMsg={verifyNewUserDetails.verification_message} />
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
  officeName: PropTypes.string,
  officePhoneNumber: PropTypes.string,
  workerPhoneNumber: PropTypes.string,
}

export default AddNewUser
