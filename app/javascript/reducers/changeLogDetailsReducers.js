import * as actionTypes from '../actions/actionTypes'

function fetchChangeLogDetails(
  state = {
    fetching: false,
    changeLogDetails: null,
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, fetchChangeLogDetailsError: null }

    case actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_SUCCESS:
      const userRecords = {
        XHRStatus: 'ready',
        records: { ...action.changeLogDetails },
      }
      return {
        ...state,
        fetching: false,
        changeLogDetails: userRecords,
        fetchChangeLogDetailsError: null,
      }

    case actionTypes.FETCH_CHANGE_LOG_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        changeLogDetails: null,
        fetchChangeLogDetailsError: action.error,
      }
    default:
      return state
  }
}

export default fetchChangeLogDetails
