import createSagaMiddleware from 'redux-saga'
import { initSagas } from '../initSagas'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createStore, applyMiddleware } from 'redux'
import { SyncStore, observeStore } from './syncStore'
import { getSearchParams } from '../selectors/searchUserListSelector'
import reducer from '../reducers'

const sessionStore = new SyncStore(window.sessionStorage)

export const store = configureStore({
  // Initial State
  ...sessionStore.loadState(),
})

observeStore(store, getSearchParams, () => sessionStore.saveState(store.getState()))

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)))
  initSagas(sagaMiddleware)
  return store
}
