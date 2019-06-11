import PropTypes from 'prop-types'
import React from 'react'
import { AlertUncontrolled } from '@cwds/components'

const UserMessage = ({ errorMsg, successMsg }) => {
  const successWithEmailChange = Array.isArray(successMsg) ? successMsg[1] : ''
  const successAlertMessage = Array.isArray(successMsg) ? successMsg[0] : successMsg
  return (
    <React.Fragment>
      {successAlertMessage && (
        <AlertUncontrolled className="successMessage-customizable" color="success" style={{ marginBottom: '0px' }}>
          {successAlertMessage}
          <b>{successWithEmailChange}</b>
        </AlertUncontrolled>
      )}
      {errorMsg && (
        <AlertUncontrolled className="errorMessage-customizable" color="danger">
          {errorMsg.user_message ? errorMsg.user_message : errorMsg}
        </AlertUncontrolled>
      )}
    </React.Fragment>
  )
}
UserMessage.propTypes = {
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  successMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default UserMessage
