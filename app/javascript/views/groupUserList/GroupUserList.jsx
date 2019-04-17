import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRWD, PageHeader, Alert } from 'react-wood-duck'
import { Link } from 'react-router-dom'
import Cards from '../../common/Card'
import ReactTable from 'react-table'
import { toFullName, accountStatusFormat, lastLoginDate, getOfficeTranslator } from '../../_constants/constants'
import { formatRoles } from '../../_utils/formatters'
import queryString from 'query-string'

class GroupUserList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const filterType = queryString.parse(this.props.location.search).filterType;
    if (filterType) {
        this.setState({users: this.findUsersList(filterType) });
    }
  }

  findUsersList(filterType) {
    return this.props.searchPageTiles.filter((tile) => tile.type === filterType)[0].users;
  }

  renderUsersTable = ({ data, officesList, rolesList}) => {
    const translateOffice = getOfficeTranslator(officesList)
    const translateRoles = data => formatRoles(data.roles, rolesList)
    return (
      <div className="col-md-12" style={{ marginTop: '30px' }}>
        <ReactTable
          data={data}
          columns={[
            { Header: 'Full Name', id: 'last_name', accessor: toFullName, minWidth: 200 },
            { Header: 'Status', id: 'enabled', accessor: accountStatusFormat, minWidth: 60 },
            { Header: 'Last Login', id: 'last_login_date_time', minWidth: 150, accessor: lastLoginDate },
            { Header: 'CWS Login', minWidth: 80, accessor: 'racfid' },
            { Header: 'Office Name', id: 'office_name', accessor: translateOffice },
            { Header: 'Role', id: 'user_role', accessor: translateRoles },
          ]}
          manual
          showPagination = {false}
          sorted={this.props.sort.map(d => ({ id: d.field, desc: d.desc }))}
          sortable={false}
          loading={this.props.fetching}
//          onFetchData={this.search}
          className="-striped -highlight"
          onSortedChange={this.handleSortChange}
        />
      </div>
    )
  }

  handleSortChange = newSorted => this.props.actions.setSort(newSorted.map(s => ({ field: s.id, desc: s.desc })))

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
    const { officesList, officeNames, lastName, firstName, email, CWSLogin } = this.props
    return (
      <Fragment>
        <Cards cardHeaderText={'Filter User List'} columnMediumWidth={9} columnLargeWidth={9} columnXsmallWidth={9}>
          <div>
              <div className="row">
                <div>
                  {this.renderUsersTable({
                    data: this.state.users,
                    officesList,
                    rolesList: this.props.rolesList,
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

GroupUserList.propTypes = {
  fetching: PropTypes.bool,
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  cardHeaderValue: PropTypes.string,
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

GroupUserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  officesList: [],
  lastName: '',
  officeNames: [],
}

export default GroupUserList
