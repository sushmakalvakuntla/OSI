import React from 'react'
import PropTypes from 'prop-types'
import { InputComponent } from 'react-wood-duck'
import { Button } from '@cwds/components'
/* eslint camelcase: 0 */

const SearchUsers = ({
  lastName,
  firstName,
  email,
  CWSLogin,
  isDisabledSearchBtn,
  handleOnSearch,
  handleOnCreateUser,
  handleInput,
  handleEmailSearch,
  errorMessage,
  valid,
  disableSearch,
  isDisabledAddUsrBtn,
  isDisabledClearBtn,
  handleOnClear,
}) => (
  <form onSubmit={handleOnSearch} autoComplete="off">
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <InputComponent
              label="First Name"
              id="searchWithFirstName"
              fieldClassName="form-group"
              type="text"
              value={firstName}
              onChange={event => handleInput('firstName', event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <InputComponent
              label="Last Name"
              id="searchWithLastName"
              fieldClassName="form-group"
              type="text"
              value={lastName}
              onChange={event => handleInput('lastName', event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <InputComponent
              label="Email"
              id="searchWithEmail"
              fieldClassName="form-group"
              type="text"
              value={email}
              onChange={event => handleEmailSearch('email', event.target.value)}
              autoComplete="off"
              validationErrorMessage={errorMessage}
              maxLength={50}
              validationError={valid}
            />
          </div>
          <div className="col-md-3">
            <InputComponent
              label="CWS Login"
              id="searchWithCWSLogin"
              fieldClassName="form-group"
              type="text"
              value={CWSLogin}
              onChange={event => handleInput('CWSLogin', event.target.value)}
              autocomplete="off"
              maxLength={8}
              allowCharacters={/^[A-Z0-9]+$/i}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="pull-right" style={{ paddingTop: '0px', display: 'flex' }}>
              <div style={{ paddingRight: '15px' }}>
                <Button
                  className="buttons-height"
                  size="lg"
                  id=""
                  type="button"
                  onClick={handleOnCreateUser}
                  disabled={isDisabledAddUsrBtn()}
                >
                  CREATE A NEW USER
                </Button>
              </div>
              <div className="col-md-1 vertical-line" id="vertical-line3" style={{ height: '40px' }} />
              <div className="col-md-4 col-sm-2" style={{ paddingLeft: '0px' }}>
                <Button
                  className="buttons-height"
                  size="lg"
                  id="clearSearch"
                  type="button"
                  onClick={handleOnClear}
                  disabled={isDisabledClearBtn()}
                >
                  CLEAR
                </Button>
              </div>
              <div className="col-md-4 col-sm-2" style={{ paddingLeft: '0px' }}>
                <Button
                  primary={true}
                  className="buttons-height"
                  size="lg"
                  id="searchForUsers"
                  type="submit"
                  disabled={disableSearch || isDisabledSearchBtn()}
                >
                  SEARCH
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
)

SearchUsers.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  CWSLogin: PropTypes.string,
  errorMessage: PropTypes.string,
  isDisabledSearchBtn: PropTypes.func,
  handleOnCreateUser: PropTypes.func,
  handleOnSearch: PropTypes.func,
  handleInput: PropTypes.func,
  handleEmailSearch: PropTypes.func,
  disableSearch: PropTypes.bool,
  valid: PropTypes.bool,
  isDisabledAddUsrBtn: PropTypes.func,
  isDisabledClearBtn: PropTypes.func,
  handleOnClear: PropTypes.func,
}

export default SearchUsers
