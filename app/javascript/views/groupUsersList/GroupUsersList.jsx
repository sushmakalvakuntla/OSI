import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRWD, PageHeader } from 'react-wood-duck'
import { Link } from 'react-router-dom'
import Cards from '../../common/Card'
import { DataGrid, CardBody, MenuItem, UncontrolledMenu as Menu, Alert } from '@cwds/components'
import { toFullName, accountStatusFormat, lastLoginDate, getOfficeTranslator } from '../../_constants/constants'
import { formatRoles } from '../../_utils/formatters'
import { dateTimeComparator } from '../../_utils/comparators'

class GroupUsersList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      alert: false,
    }
  }
  componentDidMount() {
    if (this.props.location.filter && this.props.location.filter.query && this.props.location.filter.size) {
      this.props.actions.fetchGroupUsersList(this.props.location.filter.query, this.props.location.filter.size)
    }
  }

  onUserStatusChange(userId) {
    this.props.actions.handleStatusChangeAction(userId)
    this.setState({ alert: true })
  }

  showAlert = (displayAlert, error) => {
    if (displayAlert)
      return error ? (
        <Alert className="errorMessage-customizable" color="danger">
          {error.user_message}
        </Alert>
      ) : (
        <Alert className="successMessage-customizable" color="success">
          Success! You have successfully unlocked this user.
        </Alert>
      )
    return null
  }

  renderUsersTable = ({ data = [], officesList, rolesList }) => {
    const translateOffice = getOfficeTranslator(officesList)
    const translateRoles = data => formatRoles(data.roles, rolesList)
    return (
      <CardBody className="pt-0">
        <DataGrid
          data={data}
          columns={[
            {
              Header: 'Full Name',
              id: 'last_name',
              accessor: toFullName,
              minWidth: 200,
              Cell: ({ value, original }) => (
                <Link
                  to={{
                    pathname: `/user_details/${original.id}`,
                    fromGroupUserList: true,
                  }}
                >
                  {value}
                </Link>
              ),
            },
            { Header: 'Status', id: 'enabled', accessor: accountStatusFormat, minWidth: 60 },
            {
              Header: 'Last Login',
              id: 'last_login_date_time',
              minWidth: 150,
              accessor: lastLoginDate,
              sortMethod: dateTimeComparator,
            },
            { Header: 'CWS Login', minWidth: 80, accessor: 'racfid' },
            { Header: 'Office Name', minWidth: 150, id: 'office_name', accessor: translateOffice },
            { Header: 'Role', minWidth: 150, id: 'user_role', accessor: translateRoles },
            {
              Header: '',
              id: 'ellipsis',
              Cell: row => {
                const { locked } = row.original
                return locked ? (
                  <Menu>
                    <MenuItem className={'group-list-action'} onClick={() => this.onUserStatusChange(row.original.id)}>
                      Unlock User
                    </MenuItem>
                  </Menu>
                ) : null
              },
              sortable: false,
            },
          ]}
          defaultSorted={[
            {
              id: 'last_name',
              desc: false,
            },
          ]}
        />
      </CardBody>
    )
  }

  renderBreadcrumb = () => {
    const { dashboardUrl, dashboardClickHandler } = this.props
    return (
      <div>
        Back to: <LinkRWD text="Dashboard" href={dashboardUrl} clickHandler={dashboardClickHandler} />
        &nbsp;&gt;&nbsp;
        <Link to="/">User List</Link>
      </div>
    )
  }

  renderComponents = () => {
    const { officesList, rolesList, userUnlockError } = this.props
    return (
      <Fragment>
        <Cards cardHeaderText={'Filter User List'} columnMediumWidth={12} columnLargeWidth={12} columnXsmallWidth={12}>
          {this.props.error && (
            <Alert alertClassName="error" faIcon="fa-exclamation-triangle" alertCross={false}>
              <strong>Oh no!</strong> An unexpected error occurred!
            </Alert>
          )}
          {this.showAlert(this.state.alert, userUnlockError)}
          <div>
            <div className="row">
              <div>
                {this.renderUsersTable({
                  data: this.props.groupUsers,
                  officesList,
                  rolesList,
                })}
              </div>
            </div>
          </div>
        </Cards>
      </Fragment>
    )
  }

  render() {
    return (
      <div role="main">
        {
          <div>
            <PageHeader pageTitle="Filter User List" button="" />
            <div className="container">
              {this.renderBreadcrumb()}
              {this.renderComponents()}
            </div>
          </div>
        }
      </div>
    )
  }
}

GroupUsersList.propTypes = {
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  rolesList: PropTypes.array,
  officesList: PropTypes.array,
  groupUsers: PropTypes.array,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  userUnlockError: PropTypes.object,
  size: PropTypes.number,
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      desc: PropTypes.bool,
    })
  ),
  query: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
    })
  ),
  error: PropTypes.any,
}

GroupUsersList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  officesList: [],
  lastName: '',
  officeNames: [],
  userUnlockError: {
    user_message: '',
  },
}

export default GroupUsersList
