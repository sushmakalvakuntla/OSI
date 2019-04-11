import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { Link as LinkRWD, InputComponent, PageHeader, Alert } from 'react-wood-duck'
import CheckBoxRadio from '../../common/CheckBoxRadio'
import { PrimitiveButton as Button } from '@cwds/components'
import DropDown from '../../common/DropDown'
import Cards from '../../common/Card'
import ReactTable from 'react-table'
import Pagination from './Pagination'
import './UsersList.scss'
import { toFullName, accountStatusFormat, lastLoginDate, getOfficeTranslator } from '../../_constants/constants'
import { isEqual } from 'lodash'
import { formatRoles } from '../../_utils/formatters'
import ChangeLog from '../userDetail/ChangeLog'
import CommonTile from './CommonTile'

class UserList extends PureComponent {
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
    // this.props.actions.setSearch([
    //   { field: 'last_name', value: this.props.lastName },
    //   { field: 'office_ids', value: this.props.officeNames },
    //   { field: 'enabled', value: this.props.includeInactive ? '' : true },
    // ])
    this.props.actions.setPage(Math.floor(this.props.from / this.props.size))
    this.props.actions.clearAddedUserDetailActions()
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: this.props.officeNames }] })
  }

  componentWillUnmount() {
    this.props.actions.clearAuditEvents()
  }

  componentDidUpdate(prevProps) {
    if (isEqual(prevProps.inputData, {}) && this.props.inputData.officeNames) {
      this.props.actions.setSearch([
        { field: 'last_name', value: this.props.lastName },
        { field: 'office_ids', value: this.props.officeNames },
        { field: 'enabled', value: this.props.includeInactive ? '' : true },
      ])
    }
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
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: this.props.officeNames }] })
  }

  isDisabledSearchBtn = () => {
    const { officeNames, lastName, query } = this.props
    const lastNameSearch = query.find(({ field }) => field === 'last_name')
    const officeSearch = query.find(({ field }) => field === 'office_ids')
    return lastNameSearch && lastNameSearch.value === lastName && isEqual(officeSearch.value.sort(), officeNames.sort())
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
  renderPageHeader = () => {
    return (
      <PageHeader
        pageTitle="Manage Users"
        button={
          <div className="pull-right">
            <Button color="default" size="lg" type="cancel" id="addButton" className="page-buttons" onClick={this.handleOnAdd}>
              + ADD A USER
            </Button>
          </div>
        }
      />
    )
  }

  renderSearchComponents = () => {
    const { officesList, officeNames, lastName } = this.props
    return (
      <form onSubmit={this.submitSearch} autoComplete="off">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <DropDown
              id="searchOfficeName"
              selectedOption={officesList.filter(({ value }) => officeNames.includes(value))}
              options={officesList}
              label="Filter by Office Name"
              placeholder={`(${officesList.length})`}
              onChange={officesList =>
                this.props.actions.handleSearchChange('officeNames', officesList.map(selectedOptions => selectedOptions.value))
              }
              multiSelect={true}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <div style={{ float: 'right' }}>
              <CheckBoxRadio
                id="includeInactive"
                label="Include Inactive"
                type="checkbox"
                onChange={this.handleCheckBoxChange}
                checked={this.props.includeInactive}
              />
            </div>
            <InputComponent
              label="Search user list"
              id="searchLastName"
              fieldClassName="form-group"
              type="text"
              value={lastName}
              onChange={event => this.props.actions.handleSearchChange('lastName', event.target.value)}
              placeholder="Search users by Last name"
              autocomplete="off"
            />
          </div>
          <div className="col-md-2 col-sm-6">
            <button type="submit" className="btn btn-primary btn-block btn-sm searchButton" disabled={this.isDisabledSearchBtn()}>
              Search
            </button>
          </div>
        </div>
      </form>
    )
  }

  render() {
    return (
      <div role="main">
        {this.state.addUser ? (
          <Redirect push to="/verify" />
        ) : (
          <div>
            {this.renderPageHeader()}
            <div className="container">
              {this.renderBreadcrumb()}
              <Cards cardHeaderText={this.props.cardHeaderValue} columnMediumWidth={9} columnLargeWidth={9} columnXsmallWidth={9}>
                {this.renderSearchComponents()}
                {this.props.error && (
                  <Alert alertClassName="error" faIcon="fa-exclamation-triangle" alertCross={false}>
                    <strong>Oh no!</strong> An unexpected error occurred!
                  </Alert>
                )}
                <br />
                {/* {this.renderUsersTable({
                  data: this.props.userList,
                  officesList: this.props.officesList,
                  rolesList: this.props.rolesList,
                })} */}
              </Cards>
              <div className="tilesPanel col-md-3">
                {this.props.dashboardTiles.map((dashboardTile, index) => (
                  <CommonTile
                    key={index}
                    query={dashboardTile.query}
                    count={dashboardTile.count}
                    title={dashboardTile.title}
                    type={dashboardTile.type}
                    setSearchForTiles={this.props.actions.setSearchForTiles}
                  />
                ))}
              </div>
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

UserList.propTypes = {
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
  inputData: PropTypes.object,
  rolesList: PropTypes.array,
  includeInactive: PropTypes.bool,
  changeLogAdminDetails: PropTypes.object,
  changeLogAdminOfficeName: PropTypes.string,
  userOfficeName: PropTypes.string,
  auditEvents: PropTypes.array,
  userDetails: PropTypes.object,
  displayChangeLog: PropTypes.bool,
}

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  pageSizeOptions: [5, 10, 25, 50, 100],
  officesList: [],
  lastName: '',
  officeNames: [],
}
export default UserList
