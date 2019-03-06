import safeGet from 'lodash.get'

export const selectAuditEvents = state => safeGet(state, 'fetchAuditEvents.auditEvents', []) || []
