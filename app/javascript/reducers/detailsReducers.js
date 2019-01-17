import * as actionTypes from '../actions/actionTypes'

function fetchDetails(
  state = {
    details: null,
    fetching: false,
    isEdit: false,
    displayAlert: false,
    disableActionBtn: false,
    resendEmailUserId: [],
    resendEmailStatus: null,
    initialDetails: null,
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, fetchDetailsError: null }

    case actionTypes.FETCH_DETAILS_API_CALL_SUCCESS:
      const userRecords = {
        XHRStatus: 'ready',
        records: { ...action.details },
      }
      return {
        ...state,
        fetching: false,
        details: userRecords,
        fetchDetailsError: null,
        isEdit: false,
        displayAlert: false,
        resendEmailUserId: state.resendEmailUserId,
        initialDetails: userRecords.records,
      }

    case actionTypes.FETCH_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        details: null,
        fetchDetailsError: action.error,
        displayAlert: false,
        initialDetails: null,
      }

    case actionTypes.CLEAR_USER_DETAILS:
      return {
        details: null,
        fetching: false,
        displayAlert: false,
        resendEmailUserId: state.resendEmailUserId,
        initialDetails: null,
      }

    case actionTypes.HANDLE_EDIT_BUTTON_CHANGE:
      return {
        ...state,
        isEdit: action.payload.value,
        displayAlert: false,
        disableActionBtn: true,
      }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, saveDetailsError: null }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        saveDetailsError: null,
        isEdit: false,
        displayAlert: true,
        initialDetails: state.details.records,
      }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        isEdit: true,
        saveDetailsError: action.error,
        displayAlert: true,
      }

    case actionTypes.CLEAR_SAVE_ALERT:
      return {
        ...state,
        fetching: false,
        displayAlert: false,
      }

    case actionTypes.HANDLE_DROPDOWN_CHANGE:
      return {
        ...state,
        displayAlert: false,
        disableActionBtn: false,
        details: {
          ...state.details,
          records: {
            ...state.details.records,
            user: {
              ...state.details.records.user,
              [action.payload.name]: action.payload.value,
            },
          },
        },
      }

    case actionTypes.HANDLE_USER_INPUT_CHANGE:
      return {
        ...state,
        displayAlert: false,
        disableActionBtn: false,
        details: {
          ...state.details,
          records: {
            ...state.details.records,
            user: {
              ...state.details.records.user,
              [action.payload.name]: action.payload.value,
            },
          },
        },
      }

    default:
      return state
  }
}

export default fetchDetails
