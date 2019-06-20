import React from 'react'
import PropTypes from 'prop-types'
import ShowField from '../../common/ShowField'
import { accountStatusFormat, lastLoginDate } from '../../_constants/constants'
import { formatRoles, formatOffices } from '../../_utils/formatters'
import { Link } from 'react-router-dom'
import { Card, IconButton } from '@cwds/components'
import UserMessage from '../../common/UserMessage'
const SearchResultComponent = ({ value, officeList, rolesList, unlockHandler, lockMessage }) => (
  <div
    className="result-card"
    style={{
      marginRight: '15px',
      marginBottom: '10px',
      border: '0.1rem solid #d4d4d4',
    }}
  >
    <div className="row">
      <div className="col-md-12 " style={{ marginBottom: '10px' }}>
        <div className="col-md-2">
          <ShowField label="First Name" labelClassName="result-card">
            {value.first_name}
          </ShowField>
        </div>
        <div className="col-md-2">
          <ShowField label="Middle Name" labelClassName="result-card">
            {value.middle_name}
          </ShowField>
        </div>
        <div className="col-md-2">
          <ShowField label="Last Name" labelClassName="result-card">
            {value.last_name}
          </ShowField>
        </div>
        <div className="col-md-2">
          <ShowField label="CWS Login" labelClassName="result-card">
            {value.racfid}
          </ShowField>
        </div>
        <div className="col-md-2">
          <ShowField label="Email" labelClassName="result-card">
            {value.email}
          </ShowField>
        </div>
        <div className="col-md-2">
          <Link
            to={{
              pathname: `/user_details/${value.id}`,
              fromGroupUserList: false,
            }}
            className="class1"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 " style={{ marginBottom: '10px' }}>
        <div className="col-md-2">
          <ShowField label="Last Log in" labelClassName="result-card">
            {lastLoginDate(value)}
          </ShowField>
        </div>
        <div className="col-md-2">
          <ShowField label="Status" labelClassName="result-card">
            {accountStatusFormat(value)}
          </ShowField>
        </div>
        <div className="col-md-4">
          <ShowField label="Office Name" labelClassName="result-card">
            {formatOffices(value.office_id, officeList)}
          </ShowField>
        </div>
        <div className="col-md-4">
          <ShowField label="Role" labelClassName="result-card">
            {formatRoles(value.roles, rolesList)}
          </ShowField>
        </div>
        <br />
      </div>
    </div>
    {value.locked ? (
      lockMessage.unlocked ? (
        <div className="row" style={{ marginLeft: '0px', marginRight: '0px', marginBottom: '0px' }}>
          <UserMessage successMsg={lockMessage.message} />
        </div>
      ) : (
        <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
          <Card style={{ border: '0px', marginBottom: '0px' }}>
            <div className="col-md-12 inlineAlertBox">
              <div className="col-md-11" style={{ paddingTop: '3px' }}>
                {lockMessage.message}
              </div>
              <div className="col-md-1">
                <IconButton
                  name="user"
                  onClick={() => {
                    unlockHandler(value.id)
                  }}
                >
                  Unlock
                </IconButton>
              </div>
            </div>
          </Card>
        </div>
      )
    ) : (
      ''
    )}
  </div>
)

SearchResultComponent.propTypes = {
  value: PropTypes.object,
  keys: PropTypes.number,
  officeList: PropTypes.array,
  rolesList: PropTypes.array,
  unlockHandler: PropTypes.func.isRequired,
  lockMessage: PropTypes.object,
}

SearchResultComponent.defaultProps = {
  lockMessage: { unlocked: false, message: '' },
}

export default SearchResultComponent
