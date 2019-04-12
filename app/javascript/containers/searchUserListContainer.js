import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchUserList from '../views/searchUserList/SearchUserList'
import {
  searchUsers,
  setPage,
  setPageSize,
  setSort,
  setSearch,
  handleSearchChange,
  fetchAccountActions,
  handleCheckBoxChangeActions,
  setSearchForTiles,
} from '../actions/searchUserListActions'
import { fetchOfficesActions } from '../actions/officesActions'
import { fetchAuditEventsActions, clearAuditEvents } from '../actions/auditEventActions'
import { fetchRolesActions } from '../actions/rolesActions'
import { checkOfficeNames, cardHeaderText, displayChangeLog } from '../selectors/searchUserListSelector'
import { selectAuditEvents } from '../selectors/auditEventsSelector'
import { officesList } from '../selectors/officeListSelector'
import { rolesList } from '../selectors/rolesListSelector'
import { clearAddedUserDetailActions } from '../actions/addUserActions'
import { fetchChangeLogAdminDetailsActions, fetchDetailsActions } from '../actions/detailActions'
import { selectChangeLogAdminDetails, selectChangeLogAdminOfficeName } from '../selectors/changeLogDetailsSelector'
import { selectDetailRecords, officeName } from '../selectors/detailSelector'
function mapStateToProps(state) {
  const { searchUserList } = state
  return {
    userList: searchUserList.users || [],
    cardHeaderValue: cardHeaderText(state),
    fetching: searchUserList.fetching,
    userListUrl: '/#',
    dashboardUrl: '/',
    size: searchUserList.size,
    searchedForUsers: searchUserList.searchedForUsers,
    from: searchUserList.from,
    sort: searchUserList.sort,
    query: searchUserList.query,
    aggregate: searchUserList.aggregate,
    total: searchUserList.total,
    error: searchUserList.error,
    officesList: officesList(state),
    inputData: searchUserList.inputData,
    lastName: searchUserList.inputData.lastName,
    officeNames: checkOfficeNames(searchUserList.inputData.officeNames),
    rolesList: rolesList(state),
    includeInactive: searchUserList.includeInactive,
    auditEvents: selectAuditEvents(state),
    changeLogAdminDetails: selectChangeLogAdminDetails(state),
    changeLogAdminOfficeName: selectChangeLogAdminOfficeName(state),
    userOfficeName: officeName(state),
    userDetails: selectDetailRecords(state),
    displayChangeLog: displayChangeLog(state),
    searchPageTiles: searchUserList.searchPageTiles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchUsers,
        fetchAccountActions,
        setPage,
        setPageSize,
        setSort,
        setSearch,
        fetchOfficesActions,
        handleSearchChange,
        fetchRolesActions,
        clearAddedUserDetailActions,
        clearAuditEvents,
        handleCheckBoxChangeActions,
        fetchChangeLogAdminDetailsActions,
        fetchAuditEventsActions,
        fetchDetailsActions,
        setSearchForTiles,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserList)
