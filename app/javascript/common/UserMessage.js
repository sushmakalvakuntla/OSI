import PropTypes from 'prop-types'
import React from 'react'
import { Alert } from '@cwds/components'

const UserMessage = ({ errorMsg, successMsg }) => {
  const successWithEmailChange = Array.isArray(successMsg) ? successMsg[1] : ''
  const successAlertMessage = Array.isArray(successMsg) ? successMsg[0] : successMsg
  return (
    <React.Fragment>
      {successAlertMessage && (
        <Alert className="successMessage-customizable" color="success">
          {successAlertMessage}
          <b>{successWithEmailChange}</b>
        </Alert>
      )}
      {errorMsg && (
        <Alert className="errorMessage-customizable" color="danger">
          {errorMsg.user_message ? errorMsg.user_message : errorMsg}
        </Alert>
      )}
    </React.Fragment>
  )
}
UserMessage.propTypes = {
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  successMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default UserMessage
