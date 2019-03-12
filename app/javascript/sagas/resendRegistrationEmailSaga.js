import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { fetchUserAuditEventsActions } from '../actions/auditEventActions'

// worker saga: makes the api call when watcher saga sees the action
export function* resendEmail(action) {
  try {
    const id = action.payload.id
    const resendEmailStatus = yield call(UserService.resendRegistrationEmail, id)
    // dispatch a success action to the store with the new users
    yield put({
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
      resendEmailStatus,
      id,
    })
    // reload the audit log for the user
    yield put(fetchUserAuditEventsActions(id))
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE,
      error,
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* resendRegistrationEmailSaga() {
  yield takeLatest(actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST, resendEmail)
}
