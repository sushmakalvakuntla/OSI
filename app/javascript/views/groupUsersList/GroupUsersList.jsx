import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRWD, PageHeader, Alert } from 'react-wood-duck'
import { Link } from 'react-router-dom'
import Cards from '../../common/Card'
import { DataGrid, CardBody } from '@cwds/components'
import { toFullName, accountStatusFormat, lastLoginDate, getOfficeTranslator } from '../../_constants/constants'
import { formatRoles } from '../../_utils/formatters'
class GroupUsersList extends PureComponent {
  componentDidMount() {
    if (this.props.location.filter && this.props.location.filter.query && this.props.location.filter.size) {
      this.props.actions.fetchGroupUsersList(this.props.location.filter.query, this.props.location.filter.size)
    }
  }

  renderUsersTable = ({ data = [], officesList, rolesList }) => {
    const translateOffice = getOfficeTranslator(officesList)
    const translateRoles = data => formatRoles(data.roles, rolesList)
    return (
      <CardBody className="pt-0">
        <DataGrid
          data={data}
          columns={[
            { Header: 'Full Name', id: 'last_name', accessor: toFullName, minWidth: 200 },
            { Header: 'Status', id: 'enabled', accessor: accountStatusFormat, minWidth: 60 },
            { Header: 'Last Login', id: 'last_login_date_time', minWidth: 150, accessor: lastLoginDate },
            { Header: 'CWS Login', minWidth: 80, accessor: 'racfid' },
            { Header: 'Office Name', id: 'office_name', accessor: translateOffice },
            { Header: 'Role', id: 'user_role', accessor: translateRoles },
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
        <Link to="/">Manage Users</Link>
      </div>
    )
  }

  renderComponents = () => {
    const { officesList, rolesList } = this.props
    return (
      <Fragment>
        <Cards cardHeaderText={'Filter User List'} columnMediumWidth={12} columnLargeWidth={12} columnXsmallWidth={12}>
          {this.props.error && (
            <Alert alertClassName="error" faIcon="fa-exclamation-triangle" alertCross={false}>
              <strong>Oh no!</strong> An unexpected error occurred!
            </Alert>
          )}
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
}

export default GroupUsersList
