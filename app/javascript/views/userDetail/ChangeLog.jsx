import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'
import ModalComponent from './Modal'
import { checkDate } from '../../_utils/formatters'

const columnConfig = [
  {
    Header: 'Date/Time',
    accessor: 'timestamp',
    minWidth: 75,
    sortMethod: (a, b) => {
      return a > b ? 1 : -1
    },
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
    accessor: 'admin_name',
    minWidth: 70,
    Cell: row => {
      return `${row.original.event.admin_name} (${row.original.event.admin_role})`
    },
  },
  {
    Header: 'Notes & Details',
    // eslint-disable-next-line react/display-name
    Cell: row => <ModalComponent data={row.original} />,
    minWidth: 50,
  },
]

const ChangeLog = ({ auditEvents }) => (
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
          columns={columnConfig}
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
}

export default ChangeLog
