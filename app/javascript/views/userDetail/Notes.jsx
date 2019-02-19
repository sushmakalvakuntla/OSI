import React from 'react'
import PropTypes from 'prop-types'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, Input } from '@cwds/components'

export const allowUserInput = event => {
  const notes = event.target.value
  const value = notes.normalize()
  if (value.length > 250) {
    return value.substring(0, 250)
  }
  return value
}

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
              onChange={event => onChange('notes', allowUserInput(event))}
              maxLength={250}
            />
            <div className="pull-right">Characters used: {`${notesWordCount}/250`}</div>
          </div>
        ) : (
          <div>
            <br />
            {userNotes}
          </div>
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
