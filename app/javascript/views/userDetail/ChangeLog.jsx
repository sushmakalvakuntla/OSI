import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'
import ChangeLogDetails from './ChangeLogDetailsView'
import { checkDate } from '../../_utils/formatters'
import safeGet from 'lodash.get'

export const sortByName = (a, b, desc) => {
  const aName = safeGet(a, 'event.admin_name', '').toLowerCase()
  const bName = safeGet(b, 'event.admin_name', '').toLowerCase()
  if (aName === bName) {
    return timestampCompareDescending(a, b, desc)
  }
  return aName > bName ? 1 : -1
}
export const sortByMadeTo = (a, b, desc) => {
  const aName = safeGet(a, 'event.user_name', '').toLowerCase()
  const bName = safeGet(b, 'event.user_name', '').toLowerCase()
  if (aName === bName) {
    return timestampCompareDescending(a, b, desc)
  }
  return aName > bName ? 1 : -1
}
export const sortByType = (a, b, desc) => {
  const aType = safeGet(a, 'event_type', '').toLowerCase()
  const bType = safeGet(b, 'event_type', '').toLowerCase()

  if (aType === bType) {
    return timestampCompareDescending(a, b, desc)
  }
  return aType > bType ? 1 : -1
}
export const viewHeightSize = isListView => {
  return isListView ? '1200px' : '500px'
}

const timestampCompareDescending = (a, b, desc) => {
  return desc ? (a.timestamp > b.timestamp ? 1 : -1) : a.timestamp < b.timestamp ? 1 : -1
}

const columnConfig = (
  userDetails,
  getAdminDetails,
  adminDetails,
  userOfficeName,
  adminOfficeName,
  getUserDetails,
  isListView
) => [
  {
    Header: 'Date/Time',
    accessor: 'timestamp',
    minWidth: 75,

    Cell: row => {
      return `${checkDate(row.original.timestamp)}`
    },
  },

  {
    Header: 'Made To',
    id: 'made_to',
    accessor: d => d,
    minWidth: 70,
    Cell: row => {
      return `${row.original.event.user_name} (${row.original.event.user_roles})`
    },
    sortMethod: sortByMadeTo,
    show: Boolean(isListView),
  },

  {
    Header: 'Made By',
    id: 'made_by',
    accessor: d => d,
    minWidth: 70,
    Cell: row => {
      return `${row.original.event.admin_name} (${row.original.event.admin_role})`
    },
    sortMethod: sortByName,
  },
  {
    Header: 'Type',
    id: 'event_type',
    accessor: d => d,
    minWidth: 70,
    Cell: row => {
      return `${row.original.event_type}`
    },
    sortMethod: sortByType,
  },
  {
    Header: 'Notes & Details',
    // eslint-disable-next-line react/display-name
    Cell: row => (
      <ChangeLogDetails
        changeLogData={row.original}
        userDetails={userDetails}
        getAdminDetails={getAdminDetails}
        adminDetails={adminDetails}
        userOfficeName={userOfficeName}
        adminOfficeName={adminOfficeName}
        getUserDetails={getUserDetails}
        isListView={isListView}
      />
    ),
    minWidth: 50,
  },
]

const ChangeLog = ({
  auditEvents,
  userDetails,
  getAdminDetails,
  adminDetails,
  userOfficeName,
  adminOfficeName,
  getUserDetails,
  isListView,
}) => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Change Log ({auditEvents.length})</CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        <DataGrid
          data={auditEvents}
          defaultPageSize={100}
          style={{
            maxHeight: viewHeightSize(isListView),
          }}
          columns={columnConfig(
            userDetails,
            getAdminDetails,
            adminDetails,
            userOfficeName,
            adminOfficeName,
            getUserDetails,
            isListView
          )}
          sortable={true}
          className="client-grid audit-events"
          minRows={3}
          maxRows={100}
          noDataText={'No records found'}
          showPaginationBottom={false}
          defaultSorted={[
            {
              id: 'timestamp',
              desc: true,
            },
          ]}
        />
      </CardBody>
    </Card>
  </Rolodex>
)

ChangeLog.propTypes = {
  row: PropTypes.node,
  auditEvents: PropTypes.array,
  changeLogDetails: PropTypes.any,
  userDetails: PropTypes.object,
  userOfficeName: PropTypes.string,
  getAdminDetails: PropTypes.func,
  getUserDetails: PropTypes.func,
  adminDetails: PropTypes.object,
  adminOfficeName: PropTypes.string,
  isListView: PropTypes.bool,
}

export default ChangeLog
