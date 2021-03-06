import {
  handleDropdownChangeAction,
  fetchDetailsActions,
  clearDetails,
  saveUserDetailsActions,
  clearSaveAlert,
  handleInputChangeAction,
  fetchChangeLogAdminDetailsActions,
  handleStatusChangeAction,
} from './detailActions'
import {
  FETCH_DETAILS_API_CALL_REQUEST,
  FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST,
  SAVE_USER_DETAILS_API_CALL_REQUEST,
  CLEAR_USER_DETAILS,
  HANDLE_DROPDOWN_CHANGE,
  CLEAR_SAVE_ALERT,
  HANDLE_USER_INPUT_CHANGE,
  USER_STATUS_CHANGE_REQUEST,
} from './actionTypes'

describe('#handleDropDownChangeAction', () => {
  it('returns type and payload', () => {
    const name = 'roles'
    const value = ['Office-admin']
    expect(handleDropdownChangeAction(name, value)).toEqual({
      type: HANDLE_DROPDOWN_CHANGE,
      payload: { name, value },
    })
  })
})

describe('#handleInputChangeAction', () => {
  it('returns type and payload', () => {
    const name = 'email'
    const value = 'hello@gmail.com'
    expect(handleInputChangeAction(name, value)).toEqual({
      type: HANDLE_USER_INPUT_CHANGE,
      payload: { name, value },
    })
  })
})

describe('#fetchDetailsActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID'
    expect(fetchDetailsActions(id)).toEqual({
      type: FETCH_DETAILS_API_CALL_REQUEST,
      payload: { id: id },
    })
  })
})

describe('#fetchChangeLogAdminDetailsActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID'
    expect(fetchChangeLogAdminDetailsActions(id)).toEqual({
      type: FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST,
      payload: { id: id },
    })
  })
})

describe('#saveUserDetailsActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID'
    const isRolesDisabled = false
    const details = {
      first_name: 'firstName',
      last_name: 'lastName',
      enabled: true,
      permissions: ['permission1'],
      role: ['roleOne'],
    }
    const initialDetails = {
      first_name: 'firstName',
      last_name: 'lastName',
      enabled: false,
      permissions: ['permission'],
      role: ['role'],
    }
    expect(saveUserDetailsActions(id, details, initialDetails, isRolesDisabled)).toEqual({
      type: SAVE_USER_DETAILS_API_CALL_REQUEST,
      payload: { id: id, details: details, initialDetails: initialDetails, isRolesDisabled },
    })
  })
})

describe('#clearDetails', () => {
  it('returns type ', () => {
    expect(clearDetails()).toEqual({
      type: CLEAR_USER_DETAILS,
    })
  })
})

describe('#clearSaveAlert', () => {
  it('returns type ', () => {
    expect(clearSaveAlert()).toEqual({
      type: CLEAR_SAVE_ALERT,
    })
  })
})

describe('#handleStatusChangeAction', () => {
  it('returns type and payload', () => {
    const id = 'userID1213'
    expect(handleStatusChangeAction(id)).toEqual({
      type: USER_STATUS_CHANGE_REQUEST,
      payload: { id },
    })
  })
})
