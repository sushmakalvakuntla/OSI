import { takeLatest, select, put } from 'redux-saga/effects'
import { getSearchParams } from '../selectors/userListSelector'
import { searchUsers } from '../actions/userListActions'
import { fetchAuditEventsActions } from '../actions/auditEventActions'
import * as actionTypes from '../actions/actionTypes'

export function* doSomething(action) {
  try {
    const params = yield select(getSearchParams)
    yield put(searchUsers(params))
    yield put(fetchAuditEventsActions(params))
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
    doSomething
  )
}
