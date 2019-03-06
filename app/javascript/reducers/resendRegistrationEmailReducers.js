import * as actionTypes from '../actions/actionTypes'

const initialState = {
  fetching: false,
  resendEmailUserId: [],
  registrationResentDateTime: null,
}

function resendRegistrationEmail(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS:
      const status = {
        XHRStatus: 'ready',
        response: { ...action.resendEmailStatus },
      }

      return {
        ...state,
        fetching: false,
        resendEmailUserId: state.resendEmailUserId.concat(action.id),
        error: null,
        registrationResentDateTime: status.response,
      }

    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        registrationResentDateTime: null,
        error: action.error,
      }

    case actionTypes.CLEAR_RESEND_INVITE:
      return {
        ...state,
        fetching: false,
        registrationResentDateTime: null,
      }

    default:
      return state
  }
}

export default resendRegistrationEmail
