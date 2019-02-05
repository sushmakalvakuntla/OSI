import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'
import ModalComponent from './Modal'
import { checkDate } from '../../_utils/formatters'
import safeGet from 'lodash.get'

export const sortByName = (a, b) => {
  const aName = safeGet(a, 'event.admin_name', '')
  const bName = safeGet(b, 'event.admin_name', '')
  if (aName === bName) {
    return a.timestamp > b.timestamp ? 1 : -1
  }
  return aName > bName ? 1 : -1
}

const columnConfig = (userDetails, getAdminDetails, adminDetails, userOfficeName, adminOfficeName) => [
  {
    Header: 'Date/Time',
    accessor: 'timestamp',
    minWidth: 75,

    Cell: row => {
      return `${checkDate(row.original.timestamp)}`
    },
  },
  {
    Header: 'Type',
    accessor: 'event_type',
    minWidth: 70,
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
    Header: 'Notes & Details',
    // eslint-disable-next-line react/display-name
    Cell: row => (
      <ModalComponent
        changeLogData={row.original}
        userDetails={userDetails}
        getAdminDetails={getAdminDetails}
        adminDetails={adminDetails}
        userOfficeName={userOfficeName}
        adminOfficeName={adminOfficeName}
      />
    ),
    minWidth: 50,
  },
]

const ChangeLog = ({ auditEvents, userDetails, getAdminDetails, adminDetails, userOfficeName, adminOfficeName }) => (
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
            maxHeight: '500px',
          }}
          columns={columnConfig(userDetails, getAdminDetails, adminDetails, userOfficeName, adminOfficeName)}
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
  adminDetails: PropTypes.object,
  adminOfficeName: PropTypes.string,
}

export default ChangeLog
