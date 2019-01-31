import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle } from '@cwds/components'

const Notes = ({ userNotes }) => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Notes</CardTitle>
      </CardHeader>
      <CardBody className="pt-0" />
    </Card>
  </Rolodex>
)

Notes.propTypes = {
  userNotes: PropTypes.string,
}

export default Notes
