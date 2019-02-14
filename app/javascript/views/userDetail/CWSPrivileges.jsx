import React from 'react'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'
import PropTypes from 'prop-types'

const NoPrivilegesComp = () => {
  return (
    <React.Fragment>
      <h1>No Privileges from CWS-CMS</h1>
      <p>There is no record of Privileges provided by the CWS-CMS at this time.</p>
    </React.Fragment>
  )
}

const cwsPrivilegesColumnConfig = () => [
  {
    Header: 'Category',
    accessor: 'category',
    minWidth: 55,
  },
  {
    Header: 'Privilege',
    id: 'privilege',
    accessor: 'privilege',
    minWidth: 90,
  },
]

const CWSPrivileges = ({ CWSPrivileges }) => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>
          {`Privileges from CWS-CMS (${CWSPrivileges.length})`}
        </CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        <DataGrid
          data={CWSPrivileges}
          defaultPageSize={100}
          style={{
            maxHeight: '500px',
          }}
          columns={cwsPrivilegesColumnConfig()}
          sortable={true}
          defaultSorted={[
            {
              id: 'category',
              desc: false,
            },
          ]}
          className="client-grid audit-events"
          minRows={3}
          maxRows={100}
          noDataText={NoPrivilegesComp()}
          showPaginationBottom={false}
        />
      </CardBody>
    </Card>
  </Rolodex>
)

CWSPrivileges.propTypes = {
  CWSPrivileges: PropTypes.array,
}

export default CWSPrivileges
