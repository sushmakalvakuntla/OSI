import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import { InputComponent } from 'react-wood-duck'

/* eslint camelcase: 0 */

const VerifyUser = ({ onVerify, handleEmailChange, handleRacfChange, disableActionBtn, errorMessage, valid }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <Cards
          cardHeaderText="Verify User"
          rightActionBtnName="Verify User"
          cardActionButtons={true}
          cardActionButton2={true}
          handleOnClickButton2={onVerify}
          disableActionBtn={disableActionBtn}
        >
          <div className="col-md-12">
            <div className="row">
              <label htmlFor="text">
                Enter the CWS Login and email address of the user you are adding in order to verify that this is a new CWS-CARES
                user
              </label>
              <div className="col-md-3">
                <InputComponent
                  label="CWS Login"
                  fieldClassName="form-group"
                  type="text"
                  placeholder="Enter CWS Login"
                  onChange={handleRacfChange}
                />
              </div>
              <div className="col-md-3">
                <InputComponent
                  label="Email Address"
                  fieldClassName="form-group"
                  type="email"
                  placeholder="Add Email Address"
                  onChange={handleEmailChange}
                  validationErrorMessage={errorMessage.emailError}
                  validationError={valid.emailValueValid}
                />
              </div>
            </div>
          </div>
        </Cards>
      </div>
    </div>
  )
}

VerifyUser.propTypes = {
  onVerifyCancel: PropTypes.func,
  onVerify: PropTypes.func,
  handleRacfChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  disableActionBtn: PropTypes.bool,
  errorMessage: PropTypes.any,
  valid: PropTypes.any,
}

export default VerifyUser
