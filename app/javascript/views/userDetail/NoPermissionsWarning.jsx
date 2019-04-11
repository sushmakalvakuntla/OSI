import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter, ModalHeader, PrimitiveButton as Button } from '@cwds/components'

export default class NoPermissionsWarning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalOpen: false,
    }
  }
  toggle = () => {
    this.setState(prevState => ({
      ModalOpen: !prevState.ModalOpen,
    }))
  }

  onConfirm = () => {
    this.props.onSaveDetails()
    this.setState(prevState => ({
      ModalOpen: !prevState.ModalOpen,
    }))
  }

  render() {
    return (
      <div className="pull-right">
        <Button
          color="default"
          size="lg"
          id="modal"
          className="page-buttons btn btn-default"
          onClick={this.toggle}
          disabled={this.props.disableButtons}
        >
          SAVE
        </Button>
        <Modal className="warning-modal" isOpen={this.state.ModalOpen} toggle={this.toggle}>
          <ModalHeader>
            <div className="header">No Permissions Selected</div>
          </ModalHeader>
          <ModalBody className="warning-modal-body">
            <div className="nopermissionmodal-body-text">
              There are <b> No Permissions </b> selected. Are you sure you would like to Save now?
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" size="lg" id="cancel" className="page-buttons" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color="primary" size="lg" type="save" id="saveButton" className="page-buttons" onClick={this.onConfirm}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

NoPermissionsWarning.propTypes = {
  disableButtons: PropTypes.bool,
  onSaveDetails: PropTypes.func,
}
