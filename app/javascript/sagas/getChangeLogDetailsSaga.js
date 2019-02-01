import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

export function* getChangeLogAdminDetails(action) {
  try {
    const id = action.payload
    const changeLogDetails = yield call(UserService.fetchUserDetails, id.id)
    // dispatch a success action to the store with the new users
    yield put({
      type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_SUCCESS,
      changeLogDetails,
    })
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_FAILURE,
      error,
    })
  }
}

export function* changeLogDetailsSaga() {
  yield takeLatest(actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST, getChangeLogAdminDetails)
}
