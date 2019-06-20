import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Link as LinkRWD, PageHeader, Alert } from 'react-wood-duck'
import CheckBoxRadio from '../../common/CheckBoxRadio'
import DropDown from '../../common/DropDown'
import Cards from '../../common/Card'
import './SearchUserList.scss'
import ChangeLog from '../userDetail/ChangeLog'
import CommonTile from './CommonTile'
import SearchUsers from './SearchUsers'
import SearchResults from './SearchResults'
import { Icon } from '@cwds/components'

class SearchUserList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      addUser: false,
      disableSearch: true,
      valid: true,
      errorMessage: '',
      disableSearchByOptions: false,
    }
  }

  componentDidMount() {
    const { lastName, firstName, email, CWSLogin, officeNames, includeInactive } = this.props
    this.props.actions.fetchAccountActions()
    this.props.actions.fetchOfficesActions()
    this.props.actions.fetchRolesActions()
    this.props.actions.clearAddedUserDetailActions()
    this.props.actions.setSearch([
      { field: 'first_name', value: firstName ? firstName.trim() : '' },
      { field: 'last_name', value: lastName ? lastName.trim() : '' },
      { field: 'email', value: email },
      { field: 'racfid', value: CWSLogin ? CWSLogin.trim() : '' },
      { field: 'office_ids', value: officeNames },
      { field: 'enabled', value: includeInactive ? '' : true },
    ])
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: this.props.officeNames }] })
  }

  componentWillUnmount() {
    this.props.actions.clearAuditEvents()
  }

  handleOnAdd = () => this.setState({ addUser: true })

  handleCheckBoxChange = () => {
    const { lastName, firstName, email, CWSLogin, officeNames, includeInactive } = this.props
    this.props.actions.handleCheckBoxChangeActions()
    this.props.actions.setSearch([
      { field: 'first_name', value: firstName ? firstName.trim() : '' },
      { field: 'last_name', value: lastName ? lastName.trim() : '' },
      { field: 'email', value: email },
      { field: 'racfid', value: CWSLogin ? CWSLogin.trim() : '' },
      { field: 'office_ids', value: officeNames },
      { field: 'enabled', value: !includeInactive ? '' : true },
    ])
  }

  submitSearch = e => {
    const { lastName, firstName, email, CWSLogin, includeInactive, officeNames } = this.props
    e.preventDefault()
    this.props.actions.setSearch([
      { field: 'first_name', value: firstName ? firstName.trim() : '' },
      { field: 'last_name', value: lastName ? lastName.trim() : '' },
      { field: 'office_ids', value: officeNames },
      { field: 'email', value: email },
      { field: 'racfid', value: CWSLogin ? CWSLogin.trim() : '' },
      { field: 'enabled', value: includeInactive ? '' : true },
    ])
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: this.props.officeNames }] })
    this.setState({ disableSearchByOptions: false })
  }

  submitClear = () => {
    this.props.actions.clearSearch()
    this.setState({ errorMessage: '' })
  }

  unlockUser = userId => {
    this.props.actions.unlockUser(userId)
  }

  isDisabledSearchBtn = () => {
    const { lastName, firstName, email, CWSLogin } = this.props
    return lastName === '' && firstName === '' && email === '' && CWSLogin === ''
  }

  isSearchValueAbsent = node => {
    return !node || !node.value || !node.value.length
  }

  isDisabledAddUsrBtn = () => {
    const { query } = this.props
    const lastName = query.find(({ field }) => field === 'last_name')
    const firstName = query.find(({ field }) => field === 'first_name')
    const racfid = query.find(({ field }) => field === 'racfid')
    const email = query.find(({ field }) => field === 'email')
    return [lastName, firstName, racfid, email].every(this.isSearchValueAbsent)
  }

  isDisabledClearBtn = () => {
    const { lastName = '', firstName = '', email = '', CWSLogin = '' } = this.props
    return lastName === '' && firstName === '' && email === '' && CWSLogin === ''
  }

  renderSearchResults = () => {
    const { exactMatches, officesList, rolesList, fuzzyMatches, fetching } = this.props
    const exactMatchResults =
      exactMatches.length > 0 ? (
        <SearchResults
          fetching={fetching}
          matchedUsers={exactMatches}
          officesList={officesList}
          rolesList={rolesList}
          unlockedUsers={this.props.unlockedUsers}
          actions={this.props.actions}
        />
      ) : (
        <div className="no-search-results-box">
          We didn&apos;t find any <b>exact</b> matches based on search criteria.
        </div>
      )

    const fuzzyMatchResults =
      fuzzyMatches.length > 0 ? (
        <div>
          <div style={{ paddingLeft: '0px', fontSize: '14px', marginBottom: '10px' }}>
            <b>Similar</b> results we found based on search criteria
          </div>
          <SearchResults
            fetching={fetching}
            matchedUsers={fuzzyMatches}
            officesList={officesList}
            rolesList={rolesList}
            unlockedUsers={this.props.unlockedUsers}
            actions={this.props.actions}
          />
        </div>
      ) : (
        ''
      )
    return fetching ? (
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <Icon name="circle-notch" size="2x" spin />
      </div>
    ) : exactMatches.length > 0 || fuzzyMatches.length > 0 ? (
      <div>
        <div className="exact-matches">{exactMatchResults}</div>
        <div className="fuzzy-matches">{fuzzyMatchResults}</div>
      </div>
    ) : (
      <p>
        Based on search criteria, <b>no search results have been found</b>
      </p>
    )
  }

  renderBreadcrumb = () => {
    return (
      <div>
        Back to: <LinkRWD text="Dashboard" href={this.props.dashboardUrl} clickHandler={this.props.dashboardClickHandler} />
      </div>
    )
  }

  handleOfficeChange = officesList => {
    const { lastName, firstName, email, CWSLogin, includeInactive } = this.props
    this.props.actions.handleSearchChange('officeNames', officesList.map(selectedOptions => selectedOptions.value))
    const selectedOffices = officesList.map(selectedOptions => selectedOptions.value)
    this.props.actions.setSearch([
      { field: 'office_ids', value: selectedOffices },
      { field: 'last_name', value: lastName ? lastName.trim() : '' },
      { field: 'first_name', value: firstName ? firstName.trim() : '' },
      { field: 'email', value: email },
      { field: 'racfid', value: CWSLogin ? CWSLogin.trim() : '' },
      { field: 'enabled', value: includeInactive ? '' : true },
    ])
    this.props.actions.fetchAuditEventsActions({ query: [{ field: 'office_ids', value: selectedOffices }] })
  }

  handleOnInput = (name, value) => {
    const val = value ? value.replace(/^\s*/, '') : ''
    this.props.actions.handleSearchChange(name, val)
    this.setState({ disableSearchByOptions: true })
  }

  handleEmailSearch = (name, value) => {
    const val = value ? value.replace(/^\s*/, '') : ''
    this.props.actions.handleSearchChange(name, val)
    this.validateEmailField(val)
    this.setState({ disableSearchByOptions: true })
  }

  validateEmailField = value => {
    const emailValueValid = /^\s*(?:[a-zA-Z0-9_!#$%&’*+/=?`'{^.-]*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6})?$/i.test(value)
    emailValueValid ? this.setState({ errorMessage: '' }) : this.setState({ errorMessage: 'Please enter a valid email.' })
  }

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
            handleEmailSearch={this.handleEmailSearch}
            valid={this.state.valid}
            disableSearch={this.state.errorMessage !== ''}
            errorMessage={this.state.errorMessage}
            handleOnSearch={this.submitSearch}
            handleOnCreateUser={this.handleOnAdd}
            isDisabledAddUsrBtn={this.isDisabledAddUsrBtn}
            isDisabledClearBtn={this.isDisabledClearBtn}
            handleOnClear={this.submitClear}
          />
          {this.props.error && (
            <Alert alertClassName="error" faIcon="fa-exclamation-triangle" alertCross={false}>
              <strong>Oh no!</strong> An unexpected error occurred!
            </Alert>
          )}
          <br />
          <div>
            {!this.isDisabledAddUsrBtn() ? (
              <div className="row">
                <div className="col-md-12">
                  <hr className="hr-style" />
                  <div className="col-md-5" style={{ marginTop: '27px', paddingLeft: '0px', fontSize: '14px' }}>
                    {this.props.exactMatchResultText}
                  </div>
                  <div className="col-md-3" style={{ marginTop: '12px' }}>
                    <CheckBoxRadio
                      id="includeInactive"
                      label="Include Inactive"
                      type="checkbox"
                      onChange={this.handleCheckBoxChange}
                      checked={this.props.includeInactive}
                      disabled={this.state.disableSearchByOptions}
                    />
                  </div>
                  <div className="col-md-4" style={{ marginBottom: '10px' }}>
                    <DropDown
                      id="searchOfficeName"
                      selectedOption={officesList.filter(({ value }) => officeNames.includes(value))}
                      options={officesList}
                      placeholder={`Filter by Office Name (${officesList.length})`}
                      onChange={officesList => this.handleOfficeChange(officesList)}
                      multiSelect={true}
                      disabled={this.state.disableSearchByOptions}
                    />
                  </div>
                </div>
                <div className="col-md-12">{this.renderSearchResults()}</div>
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
              tilesQuery={searchPageTile.tilesQuery}
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
                    getAdminDetails={this.props.actions.fetchChangeLogAdminDetailsActions}
                    getUserDetails={this.props.actions.fetchDetailsActions}
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
  fetching: PropTypes.bool,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
  query: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
    })
  ),
  error: PropTypes.any,
  officesList: PropTypes.array,
  handleSearchChange: PropTypes.func,
  officeNames: PropTypes.array,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
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
  exactMatches: PropTypes.array,
  fuzzyMatches: PropTypes.array,
  unlockedUsers: PropTypes.object,
  exactMatchResultText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

SearchUserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  officesList: [],
  officeNames: [],
  searchPageTiles: [],
  unlockedUsers: {},
}
export default SearchUserList
