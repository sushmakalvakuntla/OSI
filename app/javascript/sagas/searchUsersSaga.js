import { takeLatest, select, put } from 'redux-saga/effects'
import { getSearchParams } from '../selectors/userListSelector'
import { searchUsers } from '../actions/userListActions'
import * as actionTypes from '../actions/actionTypes'

export function* searchUserList(action) {
  try {
    const params = yield select(getSearchParams)
    yield put(searchUsers(params))
  } catch (error) {
    yield put({
      error,
    })
  }
}

export function* watchUserSearchParamUpdates() {
  yield takeLatest(
    [
      actionTypes.USER_LIST_SET_SEARCH,
      actionTypes.USER_LIST_SET_SORT,
      actionTypes.USER_LIST_SET_PAGE,
      actionTypes.USER_LIST_SET_PAGE_SIZE,
    ],
    searchUserList
  )
}
