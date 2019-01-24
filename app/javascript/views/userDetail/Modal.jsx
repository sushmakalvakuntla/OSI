import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader, Avatar } from '@cwds/components'
import { checkDate } from '../../_utils/formatters'
import { Button } from 'react-wood-duck'
import { Circle } from '../../_utils/faIcons'

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

  changeLogDetails = data => {
    return (
      <div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className="change-made-header">Changes made to</div>
              <div className="col-md-1 avatar">
                <Avatar size="lg" />
              </div>
              <div className="change-made-to">{`${data.event.user_name}`}</div>
              <div className="change-made-to-user-info">{`${data.event.user_roles}`}</div>
            </div>
            <div
              className="col-md-1"
              id="vertical-line"
              style={{
                borderLeft: '1px solid #B2B2B2',
                background: '#FFFFFF',
                height: '100px',
                width: 0,
              }}
            />
            <div className="col-md-5">
              <div className="change-made-header">Changes made by</div>
              <div className="change-made-by">{`${data.event.admin_name}`}</div>
              <div className="change-made-by-user-info">{`${data.event.admin_role}`}</div>
            </div>
          </div>
          <hr />
        </div>
        <div className="change-details">
          <div className="col-md-12">
            <div>
              Change date :{'    '}
              <div className="change-details-content" id="changeDate">
                {checkDate(data.timestamp)}
              </div>
            </div>
            <div>
              Change type :{'    '}
              <div className="change-details-content" id="changeType">
                {data.event_type}
              </div>
            </div>
            <div>
              Change from :{'    '}
              <div className="change-details-content" id="changeFrom">
                {data.event.old_value}
              </div>
            </div>
            <div>
              Change to :{'    '}
              <div className="change-details-content" id="changeFrom">
                {data.event.new_value}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="notes">Notes</div>
            <hr />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.props
    const closeBtn = (
      <div className="row">
        <button id="close_button" className="btn btn-link closeButton-customizable" type="close" onClick={this.toggle}>
          close {Circle()}
        </button>
      </div>
    )
    return (
      <div>
        <Button btnClassName="default" btnName="View" onClick={this.toggle} />
        <Modal className="warning-modal modal-lg" isOpen={this.state.ModalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            <div className="header">{'Change Log Details'}</div>
          </ModalHeader>
          <ModalBody className="warning-modal-body">{this.changeLogDetails(data)}</ModalBody>
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
