import React from 'react'
import PropTypes from 'prop-types'
import { PrimitiveButton as Button } from '@cwds/components'
import NoPermissionsWarning from './NoPermissionsWarning'

const PageHeaderButtons = ({ isUserEditable, onSaveDetails, onReset, disableActionBtn, isPermissionsEmpty }) => (
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
          disabled={disableActionBtn}
        >
          RESET
        </Button>
        {!disableActionBtn && isPermissionsEmpty ? (
          <NoPermissionsWarning onSaveDetails={onSaveDetails} disabled={disableActionBtn} />
        ) : (
          <Button
            color="default"
            size="lg"
            type="save"
            id="saveButton"
            className="page-buttons btn btn-default"
            onClick={onSaveDetails}
            disabled={disableActionBtn}
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
  disableActionBtn: PropTypes.bool,
  onSaveDetails: PropTypes.func,
  onReset: PropTypes.func,
  isPermissionsEmpty: PropTypes.bool,
}

export default PageHeaderButtons
