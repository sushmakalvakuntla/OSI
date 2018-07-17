import UserService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// worker saga: makes the api call when watcher saga sees the action
export function* countyUsersList(action) {
  try {
    let searchKey = action.payload;
    const users = yield call(UserService.fetch, searchKey.lastName);

    // dispatch a success action to the store with the new users
    yield put({
      type: actionTypes.FETCH_USERS_API_CALL_SUCCESS,
      payload: { users },
    });
    // console.log("userList:"+ userList.message);
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_USERS_API_CALL_FAILURE,
      error,
    });
  }
}

export function* countyUsersListSaga() {
  yield takeLatest(actionTypes.FETCH_USERS_API_CALL_REQUEST, countyUsersList);
}
