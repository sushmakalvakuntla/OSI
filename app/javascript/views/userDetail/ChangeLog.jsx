import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'
import ModalComponent from './Modal'
import { formatChangeLogValues } from '../../_utils/formatters'

const data = [
  {
    timestamp: 'Thu Mar 03 2018 14:22:43',
    event_type: 'Permission',
    admin_name: 'Huckleberry',
    admin_role: 'county-admin',
    old_value: ['RFA-rollout'],
    new_value: ['Hotline-rollout'],
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
    timestamp: 'Thu Mar 03 2018 12:22:43',
    event_type: 'User Creation',
    admin_name: 'Hardword',
    old_value: '',
    new_value: '',
    admin_role: ['office-admin'],
    comment: '',
  },
  {
    timestamp: 'Wed Feb 03 2017 14:22:43',
    event_type: 'Account Status',
    admin_name: 'Annie',
    old_value: false,
    new_value: true,
    admin_role: ['office-admin'],
    comment: '',
  },
  {
    timestamp: 'Mon Jan 10 2018 14:22:43',
    event_type: 'User Role',
    admin_name: 'Bumblebee',
    old_value: ['Office-admin'],
    new_value: ['CWS-worker'],
    admin_role: ['state-admin'],
    comment: '',
  },
  {
    timestamp: 'Thu Jan 03 2019 14:22:43',
    event_type: 'Registration Completion',
    admin_name: 'Akon',
    old_value: '',
    new_value: '',
    admin_role: ['office-admin'],
    comment: '',
  },
  {
    timestamp: 'Tue Nov 05 2017 14:22:43',
    event_type: 'Registration Resends',
    admin_name: 'Cluster',
    old_value: true,
    new_value: true,
    admin_role: ['Office-admin'],
    comment: '',
  },
  {
    timestamp: 'Fri Dec 23 2018 09:22:43',
    event_type: 'Email Address Updates',
    admin_name: 'King',
    old_value: 'abcd@hm.cpk',
    new_value: 'khgw@kjbgs.poi',
    admin_role: ['Office-admin'],
    comment: '',
  },
]

const ChangeLog = ({ permissionsList, rolesList }) => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Change Log ({data.length})</CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        <DataGrid
          data={data}
          columns={[
            {
              Header: 'Date/Time',
              accessor: 'timestamp',
              minWidth: 75,
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
            },
            {
              Header: 'Notes & Details',
              // eslint-disable-next-line react/display-name
              Cell: ({ row, original }) => (
                <ModalComponent
                  data={row}
                  oldValue={formatChangeLogValues(row.event_type, original.old_value, permissionsList, rolesList)}
                  newValue={formatChangeLogValues(row.event_type, original.new_value, permissionsList, rolesList)}
                  comment={original.comment}
                />
              ),
              minWidth: 50,
            },
          ]}
          sortable={true}
          className="client-grid"
          minRows={3}
          noDataText={'No records found'}
          showPaginationBottom={false}
        />
      </CardBody>
    </Card>
  </Rolodex>
)

ChangeLog.propTypes = {
  row: PropTypes.node,
  original: PropTypes.node,
  permissionsList: PropTypes.array,
  rolesList: PropTypes.array,
}

export default ChangeLog
