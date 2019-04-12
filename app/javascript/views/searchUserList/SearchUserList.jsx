import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { Link as LinkRWD, PageHeader, Alert } from 'react-wood-duck'
import CheckBoxRadio from '../../common/CheckBoxRadio'
import DropDown from '../../common/DropDown'
import Cards from '../../common/Card'
import ReactTable from 'react-table'
import Pagination from './Pagination'
import './SearchUserList.scss'
import { toFullName, accountStatusFormat, lastLoginDate, getOfficeTranslator } from '../../_constants/constants'
import { formatRoles } from '../../_utils/formatters'
import ChangeLog from '../userDetail/ChangeLog'
import CommonTile from './CommonTile'
import SearchUsers from './SearchUsers'

class SearchUserList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      addUser: false,
    }
  }

  componentDidMount() {
    this.props.actions.fetchAccountActions()
    this.props.actions.fetchOfficesActions()
    this.props.actions.fetchRolesActions()
    this.props.actions.clearAddedUserDetailActions()
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: this.props.officeNames }] })
  }

  componentWillUnmount() {
    this.props.actions.clearAuditEvents()
  }

  handleOnAdd = () => this.setState({ addUser: true })

  handleCheckBoxChange = () => {
    this.props.actions.handleCheckBoxChangeActions()
    this.props.actions.setSearch([
      { field: 'last_name', value: this.props.lastName },
      { field: 'office_ids', value: this.props.officeNames },
      { field: 'enabled', value: !this.props.includeInactive ? '' : true },
    ])
  }

  handlePageChange = pageIndex => {
    window.scrollTo(0, 0)
    this.props.actions.setPage(pageIndex)
  }

  handlePageSizeChange = pageSize => {
    window.scrollTo(0, 0)
    this.props.actions.setPageSize(pageSize)
  }

  handleSortChange = newSorted => this.props.actions.setSort(newSorted.map(s => ({ field: s.id, desc: s.desc })))

  submitSearch = e => {
    e.preventDefault()
    this.props.actions.setSearch([
      { field: 'last_name', value: this.props.lastName },
      { field: 'office_ids', value: this.props.officeNames },
      { field: 'enabled', value: this.props.includeInactive ? '' : true },
    ])

    this.props.actions.setPage(Math.floor(this.props.from / this.props.size))
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: this.props.officeNames }] })
  }

  isDisabledSearchBtn = () => {
    const { lastName, query } = this.props
    const lastNameSearch = query.find(({ field }) => field === 'last_name')
    return lastNameSearch && lastNameSearch.value === lastName
  }

  getTotalPages = () => {
    const { userList: records, total, size } = this.props
    if (!records) return -1
    if (records && Array.isArray(records) && !records.length) return 1
    if (total && size) return Math.ceil(total / size)
    return -1
  }

  getCurrentPageNumber = () => Math.floor(this.props.from / this.props.size)

  renderUsersTable = ({ data, officesList, rolesList }) => {
    const translateOffice = getOfficeTranslator(officesList)
    const translateRoles = data => formatRoles(data.roles, rolesList)
    return (
      <div className="col-md-12" style={{ marginTop: '30px' }}>
        <ReactTable
          data={data}
          showPaginationTop={true}
          showPaginationBottom={this.props.size >= 20}
          columns={[
            {
              Header: 'Full Name',
              id: 'last_name',
              accessor: toFullName,
              Cell: ({ value, original }) => <Link to={`/user_details/${original.id}`}>{value}</Link>,
              minWidth: 200,
            },
            { Header: 'Status', id: 'enabled', accessor: accountStatusFormat, minWidth: 60 },
            { Header: 'Last Login', id: 'last_login_date_time', minWidth: 150, accessor: lastLoginDate },
            { Header: 'CWS Login', minWidth: 80, accessor: 'racfid' },
            { Header: 'Office Name', id: 'office_name', accessor: translateOffice },
            { Header: 'Role', id: 'user_role', accessor: translateRoles },
          ]}
          manual
          sorted={this.props.sort.map(d => ({ id: d.field, desc: d.desc }))}
          sortable={false}
          page={this.getCurrentPageNumber()}
          pages={this.getTotalPages()}
          pageSize={this.props.size}
          pageSizeOptions={this.props.pageSizeOptions}
          defaultPageSize={10}
          loading={this.props.fetching}
          onFetchData={this.search}
          className="-striped -highlight"
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
          onSortedChange={this.handleSortChange}
          PaginationComponent={Pagination}
        />
      </div>
    )
  }

  renderBreadcrumb = () => {
    const { dashboardUrl, dashboardClickHandler } = this.props
    return (
      <div>
        Back to: <LinkRWD text="Dashboard" href={dashboardUrl} clickHandler={dashboardClickHandler} />
      </div>
    )
  }

  getChangeLogAdminDetails = value => {
    this.props.actions.fetchChangeLogAdminDetailsActions(value)
  }

  getChangeLogUserDetails = value => {
    this.props.actions.fetchDetailsActions(value)
  }

  handleOfficeChange = officesList => {
    this.props.actions.handleSearchChange('officeNames', officesList.map(selectedOptions => selectedOptions.value))
    const selectedOffices = officesList.map(selectedOptions => selectedOptions.value)
    this.props.actions.setSearch([{ field: 'office_ids', value: selectedOffices }])
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: selectedOffices }] })
  }

  handleOnInput = (name, value) => this.props.actions.handleSearchChange(name, value)

  renderComponents = () => {
    const { officesList, officeNames, lastName, firstName, email, CWSLogin } = this.props
    return (
      <Fragment>
        <Cards cardHeaderText={'Search Existing User Accounts'} columnMediumWidth={9} columnLargeWidth={9} columnXsmallWidth={9}>
          <br />
          <span>
            Search using any combination of the fields below. The ability to create a new user is available after a search has
            been conducted.{' '}
          </span>
          <br />
          <SearchUsers
            lastName={lastName}
            firstName={firstName}
            email={email}
            CWSLogin={CWSLogin}
            isDisabledSearchBtn={this.isDisabledSearchBtn}
            handleInput={this.handleOnInput}
            handleOnSearch={this.submitSearch}
            handleOnCreateUser={this.handleOnAdd}
          />
          {this.props.error && (
            <Alert alertClassName="error" faIcon="fa-exclamation-triangle" alertCross={false}>
              <strong>Oh no!</strong> An unexpected error occurred!
            </Alert>
          )}
          <br />
          <div>
            {this.props.searchedForUsers ? (
              <div className="row">
                <div className="col-md-12">
                  <hr
                    style={{
                      width: '105.8%',
                      height: '1px',
                      border: 'none',
                      color: '#333',
                      backgroundColor: '#333',
                      marginLeft: '-30px',
                    }}
                  />
                  <div className="col-md-5" style={{ marginTop: '27px', paddingLeft: '0px' }}>
                    <span>Results found based on Search Criteria</span>
                  </div>
                  <div className="col-md-3" style={{ marginTop: '20px' }}>
                    <CheckBoxRadio
                      id="includeInactive"
                      label="Include Inactive"
                      type="checkbox"
                      onChange={this.handleCheckBoxChange}
                      checked={this.props.includeInactive}
                    />
                  </div>
                  <div className="col-md-4">
                    <DropDown
                      id="searchOfficeName"
                      selectedOption={officesList.filter(({ value }) => officeNames.includes(value))}
                      options={officesList}
                      placeholder={`Filter by Office Name (${officesList.length})`}
                      onChange={officesList => this.handleOfficeChange(officesList)}
                      multiSelect={true}
                    />
                  </div>
                </div>
                <div>
                  {this.renderUsersTable({
                    data: this.props.userList,
                    officesList,
                    rolesList: this.props.rolesList,
                  })}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </Cards>
        <div className="tilesPanel col-md-3">
          {this.props.searchPageTiles.map((searchPageTile, index) => (
            <CommonTile
              key={index}
              query={searchPageTile.query}
              count={searchPageTile.count}
              title={searchPageTile.title}
              type={searchPageTile.type}
              setSearchForTiles={this.props.actions.setSearchForTiles}
            />
          ))}
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div role="main">
        {this.state.addUser ? (
          <Redirect push to="/verify" />
        ) : (
          <div>
            <PageHeader pageTitle="Manage Users" button="" />
            <div className="container">
              {this.renderBreadcrumb()}
              {this.renderComponents()}
              {this.props.displayChangeLog ? (
                <div className="col-md-12 card-margin">
                  <ChangeLog
                    auditEvents={this.props.auditEvents}
                    getAdminDetails={this.getChangeLogAdminDetails}
                    getUserDetails={this.getChangeLogUserDetails}
                    adminDetails={this.props.changeLogAdminDetails}
                    userDetails={this.props.userDetails}
                    userOfficeName={this.props.userOfficeName}
                    adminOfficeName={this.props.changeLogAdminOfficeName}
                    isListView={true}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

SearchUserList.propTypes = {
  page: PropTypes.number,
  from: PropTypes.number,
  size: PropTypes.number,
  fetching: PropTypes.bool,
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  cardHeaderValue: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
  total: PropTypes.number,
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
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  error: PropTypes.any,
  officesList: PropTypes.array,
  handleSearchChange: PropTypes.func,
  officeNames: PropTypes.array,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string,
  CWSLogin: PropTypes.string,
  inputData: PropTypes.object,
  rolesList: PropTypes.array,
  includeInactive: PropTypes.bool,
  changeLogAdminDetails: PropTypes.object,
  changeLogAdminOfficeName: PropTypes.string,
  userOfficeName: PropTypes.string,
  auditEvents: PropTypes.array,
  userDetails: PropTypes.object,
  displayChangeLog: PropTypes.bool,
  searchPageTiles: PropTypes.array,
  searchedForUsers: PropTypes.bool,
}

SearchUserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  pageSizeOptions: [5, 10, 25, 50, 100],
  officesList: [],
  lastName: '',
  officeNames: [],
}
export default SearchUserList
