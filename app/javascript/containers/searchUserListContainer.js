import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchUserList from '../views/searchUserList/SearchUserList'
import {
  searchUsers,
  setSearch,
  handleSearchChange,
  fetchAccountActions,
  handleCheckBoxChangeActions,
  setSearchForTiles,
  clearSearch,
  unlockUser,
} from '../actions/searchUserListActions'
import { fetchOfficesActions } from '../actions/officesActions'
import { fetchAuditEventsActions, clearAuditEvents } from '../actions/auditEventActions'
import { fetchRolesActions } from '../actions/rolesActions'
import {
  checkOfficeNames,
  cardHeaderText,
  displayChangeLog,
  email,
  CWSLogin,
  firstName,
  lastName,
  selectSearchResultList,
  exactMatchResultText,
} from '../selectors/searchUserListSelector'
import { selectAuditEvents } from '../selectors/auditEventsSelector'
import { officesList } from '../selectors/officeListSelector'
import { rolesList } from '../selectors/rolesListSelector'
import { clearAddedUserDetailActions } from '../actions/addUserActions'
import { fetchChangeLogAdminDetailsActions, fetchDetailsActions } from '../actions/detailActions'
import { selectChangeLogAdminDetails, selectChangeLogAdminOfficeName } from '../selectors/changeLogDetailsSelector'
import { selectDetailRecords, officeName } from '../selectors/detailSelector'
function mapStateToProps(state) {
  const { searchUserList, searchTilesReducer } = state
  return {
    userList: searchUserList.users || [],
    cardHeaderValue: cardHeaderText(state),
    fetching: searchUserList.fetching,
    userListUrl: '/#',
    dashboardUrl: '/',
    size: searchUserList.size,
    from: searchUserList.from,
    sort: searchUserList.sort,
    query: searchUserList.query,
    aggregate: searchUserList.aggregate,
    total: searchUserList.total,
    error: searchUserList.error,
    officesList: officesList(state),
    inputData: searchUserList.inputData,
    firstName: firstName(state),
    email: email(state),
    CWSLogin: CWSLogin(state),
    lastName: lastName(state),
    officeNames: checkOfficeNames(searchUserList.inputData.officeNames),
    rolesList: rolesList(state),
    includeInactive: searchUserList.includeInactive,
    auditEvents: selectAuditEvents(state),
    changeLogAdminDetails: selectChangeLogAdminDetails(state),
    changeLogAdminOfficeName: selectChangeLogAdminOfficeName(state),
    userOfficeName: officeName(state),
    userDetails: selectDetailRecords(state),
    displayChangeLog: displayChangeLog(state),
    searchPageTiles: searchTilesReducer.searchPageTiles,
    exactMatches: selectSearchResultList(state).exactMatches,
    fuzzyMatches: selectSearchResultList(state).fuzzyMatches,
    exactMatchResultText: exactMatchResultText(state),
    unlockedUsers: searchUserList.unlockedUsers || {},
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchUsers,
        fetchAccountActions,
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
        clearSearch,
        unlockUser,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserList)
