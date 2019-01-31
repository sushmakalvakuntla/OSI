import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'

const PageHeaderButtons = ({ isUserEditable, onSaveDetails, onReset, disableButtons }) => (
  <div>
    {isUserEditable ? (
      <div className="pull-right">
        <Button
          color="default"
          size="lg"
          type="cancel"
          id="resetButton"
          className="page-buttons btn btn-default"
          tabIndex="-2"
          onClick={onReset}
          disabled={disableButtons}
        >
          RESET
        </Button>
        <Button
          color="default"
          size="lg"
          type="save"
          id="saveButton"
          className="page-buttons btn btn-default"
          tabIndex="-2"
          onClick={onSaveDetails}
          disabled={disableButtons}
        >
          SAVE
        </Button>
      </div>
    ) : (
      <div className="pull-right">
        <Button
          color="default"
          size="lg"
          type="submit"
          id="validateButton"
          className="page-buttons btn btn-default"
          tabIndex="-2"
          disabled={true}
        >
          SAVE
        </Button>
      </div>
    )}
  </div>
)

PageHeaderButtons.propTypes = {
  isUserEditable: PropTypes.bool,
  disableButtons: PropTypes.bool,
  onSaveDetails: PropTypes.func,
  onReset: PropTypes.func,
}

export default PageHeaderButtons
