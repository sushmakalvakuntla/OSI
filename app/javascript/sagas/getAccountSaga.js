import AccountService from '../_services/account'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

// worker saga: makes the api call when watcher saga sees the action
export function* getAccount() {
  try {
    const response = yield call(AccountService.fetchCurrent)

    // Dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      payload: response,
    })
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE,
      error,
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* accountSaga() {
  yield takeLatest(actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST, getAccount)
}
