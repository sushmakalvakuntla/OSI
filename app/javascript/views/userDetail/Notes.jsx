import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, Input } from '@cwds/components'

const Notes = ({ isUserEditable, userNotes, notesWordCount, onChange }) => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Notes</CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        {isUserEditable ? (
          <div>
            <Input
              type="textarea"
              className="form-control text-area"
              value={userNotes}
              onChange={event => onChange('notes', event.target.value)}
              maxLength={250}
            />
            <div className="pull-right">Characters used: {`${notesWordCount}/250`}</div>
          </div>
        ) : (
          { userNotes }
        )}
      </CardBody>
    </Card>
  </Rolodex>
)

Notes.propTypes = {
  userNotes: PropTypes.string,
  notesWordCount: PropTypes.number,
  onChange: PropTypes.func,
  isUserEditable: PropTypes.bool,
}

export default Notes
