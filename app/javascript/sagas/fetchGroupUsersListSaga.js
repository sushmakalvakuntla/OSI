import { takeLatest, call, put } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import UserService from '../_services/users'

export function* fetchGroupUsersList(action) {
  try {
    const response = yield call(UserService.search, { query: action.payload.query, sort: [], size: action.payload.size, from: 0 })
    yield put({
      type: actionTypes.FETCH_GROUP_USERS_API_CALL_SUCCESS,
      payload: response,
    })
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_GROUP_USERS_API_CALL_FAILURE,
      error,
    })
  }
}

export function* fetchGroupUsersListSaga() {
  yield takeLatest(actionTypes.FETCH_GROUP_USERS_API_CALL_REQUEST, fetchGroupUsersList)
}
