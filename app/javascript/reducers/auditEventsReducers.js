import * as actionTypes from '../actions/actionTypes'

const initialValue = {
  sort: [],
  from: 0,
  size: 50,
  query: [
    {
      field: 'last_name',
      value: '',
    },
    {
      field: 'office_ids',
      value: [],
    },
  ],
  auditEvents: [],
  fetching: false,
  error: null,
}

function fetchAuditEvents(state = initialValue, { type, payload, error }) {
  switch (type) {
    case actionTypes.FETCH_AUDIT_EVENTS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, query: payload.query }

    case actionTypes.FETCH_AUDIT_EVENTS_API_CALL_SUCCESS: {
      const { records: auditEvents } = payload
      return {
        ...state,
        auditEvents,
        fetching: false,
        error: null,
      }
    }

    case actionTypes.FETCH_AUDIT_EVENTS_API_CALL_FAILURE: {
      return {
        ...state,
        error,
        fetching: false,
        auditEvents: null,
      }
    }

    default:
      return state
  }
}

export default fetchAuditEvents
