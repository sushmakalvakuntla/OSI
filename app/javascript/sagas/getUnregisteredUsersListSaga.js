import { takeLatest, call, put } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import UserService from '../_services/users'

// worker saga: makes the api call when watcher saga sees the action
export function* unregisteredUsersList(action) {
  try {
    const response = yield call(UserService.searchForTiles, action.payload)
    // dispatch a success action to the store with the new users
    yield put({
      type: actionTypes.GET_UNREGISTERED_USERS_SUCCESS,
      payload: response,
    })
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.GET_UNREGISTERED_USERS_FAILURE,
      error,
    })
  }
}

export function* unregisteredUsersListSaga() {
  yield takeLatest(actionTypes.GET_UNREGISTERED_USERS_REQUEST, unregisteredUsersList)
}
