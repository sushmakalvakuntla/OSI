import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { userStatusSaga, userStatusChange } from './changeUserStatusSaga'

describe('sagas', () => {
  it('starts the worker saga', () => {
    const gen = userStatusSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.USER_STATUS_CHANGE_REQUEST, userStatusChange))
  })

  describe('#userStatusChange', () => {
    beforeEach(() => {
      UserService.userStatusChange = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { id: 'userID123' } }
        const gen = userStatusChange(action)
        const successAlert = 'Success! You have successfully unlocked this user.'
        expect(gen.next().value).toEqual(call(UserService.userStatusChange, action.payload.id))
        expect(gen.next({ id: action.payload.id }).value).toEqual(
          put({
            type: actionTypes.USER_STATUS_CHANGE_SUCCESS,
            successAlert,
            payload: { id: action.payload.id },
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures', () => {
      it('handles the error', () => {
        const action = { payload: { id: 'userID345' } }
        const gen = userStatusChange(action)
        expect(gen.next().value).toEqual(call(UserService.userStatusChange, action.payload.id))
        expect(gen.throw('User status cannot be changed right now').value).toEqual(
          put({
            type: actionTypes.USER_STATUS_CHANGE_FAILURE,
            error: 'User status cannot be changed right now',
            payload: {
              id: 'userID345',
            },
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when empty', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: {} }
        const gen = userStatusChange(action)
        const successAlert = 'Success! You have successfully unlocked this user.'
        expect(gen.next().value).toEqual(call(UserService.userStatusChange, action.payload.id))
        expect(gen.next({ id: action.payload.id }).value).toEqual(
          put({
            type: actionTypes.USER_STATUS_CHANGE_SUCCESS,
            successAlert,
            payload: action.payload,
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
