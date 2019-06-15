import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
// worker saga: makes the api call when watcher saga sees the action

export function* userStatusChange(action) {
  const successAlert = 'Success! You have successfully unlocked this user.'
  try {
    const userID = action.payload.id
    yield call(UserService.userStatusChange, userID)

    // Dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.USER_STATUS_CHANGE_SUCCESS,
      successAlert,
      payload: { id: userID },
    })
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.USER_STATUS_CHANGE_FAILURE,
      error,
      payload: { id: action.payload.id },
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* userStatusSaga() {
  yield takeLatest(actionTypes.USER_STATUS_CHANGE_REQUEST, userStatusChange)
}
