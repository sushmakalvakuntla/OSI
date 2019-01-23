import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { fetchDetailsActions } from '../actions/detailActions'
// worker saga: makes the api call when watcher saga sees the action
export function* saveDetails(action) {
  const successAlert =
    action.payload.details.email === undefined
      ? 'Your changes have been made successfully'
      : 'Your changes have been made successfully. A Registration invite will be sent to the new email.'
  try {
    const saveUserDetailsActions = action.payload
    const saveUserDetails = yield call(
      UserService.saveUserDetails,
      saveUserDetailsActions.id,
      saveUserDetailsActions.details,
      saveUserDetailsActions.initialDetails,
      saveUserDetailsActions.isRolesDisabled
    )
    // dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS,
      saveUserDetails,
      successAlert,
    })
    yield put(fetchDetailsActions(saveUserDetailsActions.id))
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE,
      error,
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* saveUserDetailsSaga() {
  yield takeLatest(actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST, saveDetails)
}
