import { takeLatest, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actionTypes from '../actions/actionTypes'
import UserService from '../_services/users'

// worker saga: makes the api call when watcher saga sees the action
export function* getAuditEvents(action) {
  try {
    // delay for 800 milli seconds to get updated auditEvents from dora
    yield call(delay, 800)
    const response = yield call(UserService.auditEvents, action.payload)
    // dispatch a success action to the store with the new users
    yield put({
      type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_SUCCESS,
      payload: response,
    })
    // wait for another 3 seconds and fetch again to confirm the updated response
    yield call(delay, 3000)
    yield put({
      type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_SUCCESS,
      payload: response,
    })
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_FAILURE,
      error,
    })
  }
}

export function* getAuditEventsSaga() {
  yield takeLatest(actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST, getAuditEvents)
}
