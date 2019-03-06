import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'
import { saveUserDetailsSaga, saveDetails } from './saveUserDetailsSaga'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = saveUserDetailsSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST, saveDetails))
  })

  describe('#saveDetails', () => {
    const id = 'abcdefghijklmnopqrstuvwxyz'
    const details = { first_name: 'firstname', last_name: 'lastname' }
    const isRolesDisabled = true
    const initialDetails = { first_name: 'firstname', last_name: 'lastname' }
    const successAlert = 'Your changes have been made successfully'
    beforeEach(() => {
      UserService.saveUserDetails = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = {
          payload: {
            id: id,
            details: details,
            initialDetails: initialDetails,
            isRolesDisabled,
          },
        }
        const gen = saveDetails(action)

        expect(gen.next().value).toEqual(call(UserService.saveUserDetails, id, details, initialDetails, true))
        expect(
          gen.next({
            id: id,
            details: details,
            initialDetails: initialDetails,
          }).value
        ).toEqual(
          put({
            type: actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS,
            saveUserDetails: {
              id: id,
              details: details,
              initialDetails: initialDetails,
            },
            successAlert: successAlert,
          })
        )
        expect(gen.next({}).value).toEqual(
          put({
            type: actionTypes.CLEAR_AUDIT_EVENTS,
          })
        )
        expect(
          gen.next({
            id: id,
            details: details,
            initialDetails: initialDetails,
          }).value
        ).toEqual(
          put({
            type: actionTypes.FETCH_DETAILS_API_CALL_REQUEST,
            payload: { id: id },
          })
        )
        expect(gen.next({}).value).toEqual(
          put({
            type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
            payload: { query: [{ field: 'user_id', value: id }] },
          })
        )
        expect(gen.next().done).toBe(true)
      })

      it('when email is edited returns with different success message with details', () => {
        const id = 'abcdefghijklmnopqrstuvwxyz'
        const details = { first_name: 'firstname', last_name: 'lastname', email: 'abc@gmail.com' }
        const isRolesDisabled = true
        const initialDetails = { first_name: 'firstname', last_name: 'lastname' }
        const successAlert = 'Your changes have been made successfully. A Registration invite will be sent to the new email.'
        const action = {
          payload: { id: id, details: details, initialDetails: initialDetails, isRolesDisabled },
        }
        const gen = saveDetails(action)

        expect(gen.next().value).toEqual(call(UserService.saveUserDetails, id, details, initialDetails, true))
        expect(
          gen.next({
            id: id,
            details: details,
            initialDetails: initialDetails,
          }).value
        ).toEqual(
          put({
            type: actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS,
            saveUserDetails: {
              id: id,
              details: details,
              initialDetails: initialDetails,
            },
            successAlert: successAlert,
          })
        )
        // starts a retrieval saga
        expect(gen.next({}).value).toEqual(
          put({
            type: actionTypes.CLEAR_AUDIT_EVENTS,
          })
        )
        expect(
          gen.next({
            id: id,
            details: details,
            initialDetails: initialDetails,
          }).value
        ).toEqual(
          put({
            type: actionTypes.FETCH_DETAILS_API_CALL_REQUEST,
            payload: { id: id },
          })
        )
        expect(gen.next({}).value).toEqual(
          put({
            type: actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST,
            payload: { query: [{ field: 'user_id', value: id }] },
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from save', () => {
      it('handles the error', () => {
        const action = {
          payload: {
            id: id,
            details: details,
            initialDetails: initialDetails,
            isRolesDisabled: true,
          },
        }
        const gen = saveDetails(action)
        expect(gen.next().value).toEqual(call(UserService.saveUserDetails, id, details, initialDetails, true))
        expect(gen.throw('database not accessible').value).toEqual(
          put({
            type: actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE,
            error: 'database not accessible',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
