import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from '@cwds/components'
import { Button } from 'react-wood-duck'
import ShowField from '../../common/ShowField'

export default class ModalComponent extends Component {
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

  render() {
    const { oldValue, newValue, comment, data } = this.props
    const modalTitle = `${data.timestamp} ${data.event_type} ${data.admin_name}`
    return (
      <div>
        <Button btnClassName="default" btnName="View" onClick={this.toggle} />
        <Modal className="warning-modal" isOpen={this.state.ModalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <span className="modal-title">{modalTitle}</span>
          </ModalHeader>
          <ModalBody className="warning-modal-body">
            <div className="col-md-12">
              <div className="row" style={{ marginBottom: '15px' }}>
                <span className="modal-body">Details</span>
                <hr />
                <div className="col-md-6">
                  <ShowField label="Changed From">
                    <span>{oldValue}</span>
                  </ShowField>
                </div>
                <div className="col-md-6">
                  <ShowField label="Changed To">
                    <span>{newValue}</span>
                  </ShowField>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <span className="modal-body">Notes</span>
                <hr />
                <span>{comment}</span>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

ModalComponent.propTypes = {
  oldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]),
  newValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]),
  comment: PropTypes.oneOfType([PropTypes.string]),
  data: PropTypes.object,
}
