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
    this.props.getAdminDetails(this.props.changeLogData.user_login)
    this.setState(prevState => ({
      ModalOpen: !prevState.ModalOpen,
    }))
  }

  changesMadeTo = () => {
    const { changeLogData, userDetails, userOfficeName } = this.props
    return (
      <div className="col-md-6">
        <div className="change-made-header">Changes made to</div>
        <div className="col-md-1 avatar">
          <Avatar size="lg" />
        </div>
        <div className="change-made-to">{changeLogData.event.user_name}</div>
        <div className="change-made-to-user-info">{changeLogData.event.user_roles}</div>
        <div
          className="change-made-to-user-info"
          style={{
            display: 'flex',
            paddingLeft: '29px',
          }}
        >
          <div style={{ paddingRight: '10px' }}>{userDetails.county_name}</div>
          <div className="col-md-1 vertical-line" id="vertical-line1" />
          <div>{userOfficeName}</div>
        </div>
        <div className="change-made-to-user-info">{userDetails.email}</div>
      </div>
    )
  }

  changesMadeBy = () => {
    const { changeLogData, adminDetails, adminOfficeName } = this.props
    return (
      <div>
        <div className="col-md-1 vertical-line" id="vertical-line2" style={{ height: '100px' }} />
        <div className="col-md-5">
          <div className="change-made-header">Changes made by</div>
          <div className="change-made-by">{changeLogData.event.admin_name}</div>
          <div className="change-made-by-user-info">{changeLogData.event.admin_role}</div>
          <div
            className="change-made-by-user-info"
            style={{
              display: 'flex',
            }}
          >
            <div style={{ paddingRight: '10px' }}>{adminDetails.county_name}</div>
            <div className="col-md-1 vertical-line" id="vertical-line3" />
            <div>{`${adminOfficeName}`}</div>
          </div>
          <div className="change-made-by-user-info">{adminDetails.email}</div>
        </div>
      </div>
    )
  }

  changeDetails = () => {
    const { changeLogData } = this.props
    return (
      <div className="col-md-12">
        <div className="row">
          {this.changesMadeTo()}
          {this.changesMadeBy()}
        </div>
        <hr />
        <div className="change-details">
          <div className="col-md-12">
            <div>
              Change date :{'    '}
              <div className="change-details-content" id="changeDate">
                {checkDate(changeLogData.timestamp)}
              </div>
            </div>
            <div>
              Change type :{'    '}
              <div className="change-details-content" id="changeType">
                {changeLogData.event_type}
              </div>
            </div>
            <div>
              Change from :{'    '}
              <div className="change-details-content" id="changeFrom">
                {changeLogData.event.old_value}
              </div>
            </div>
            <div>
              Change to :{'    '}
              <div className="change-details-content" id="changeFrom">
                {changeLogData.event.new_value}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
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
          <ModalBody className="warning-modal-body">{this.changeDetails()}</ModalBody>
        </Modal>
      </div>
    )
  }
}

ModalComponent.propTypes = {
  oldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]),
  newValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.array]),
  comment: PropTypes.oneOfType([PropTypes.string]),
  getAdminDetails: PropTypes.func,
  changeLogData: PropTypes.object,
  userOfficeName: PropTypes.string,
  userDetails: PropTypes.object,
  adminDetails: PropTypes.object,
  adminOfficeName: PropTypes.string,
}
