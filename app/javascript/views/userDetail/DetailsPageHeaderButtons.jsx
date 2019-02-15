import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@cwds/components'
import NoPermissionsWarning from './NoPermissionsWarning'

const PageHeaderButtons = ({ isUserEditable, onSaveDetails, onReset, disableButtons, isPermissionsEmpty }) => (
  <div>
    {isUserEditable ? (
      <div className="pull-right">
        <Button
          color="default"
          size="lg"
          type="cancel"
          id="resetButton"
          className="page-buttons btn btn-default"
          onClick={onReset}
          disabled={disableButtons}
        >
          RESET
        </Button>
        {!disableButtons && isPermissionsEmpty ? (
          <NoPermissionsWarning onSaveDetails={onSaveDetails} disabled={disableButtons} />
        ) : (
          <Button
            color="default"
            size="lg"
            type="save"
            id="saveButton"
            className="page-buttons btn btn-default"
            onClick={onSaveDetails}
            disabled={disableButtons}
          >
            SAVE
          </Button>
        )}
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
  isPermissionsEmpty: PropTypes.bool,
}

export default PageHeaderButtons
