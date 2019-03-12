import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UsersList from '../views/usersList/UsersList'
import {
  searchUsers,
  setPage,
  setPageSize,
  setSort,
  setSearch,
  handleSearchChange,
  fetchAccountActions,
  handleCheckBoxChangeActions,
} from '../actions/userListActions'
import { fetchOfficesActions } from '../actions/officesActions'
import { fetchAuditEventsActions, clearAuditEvents } from '../actions/auditEventActions'
import { fetchRolesActions } from '../actions/rolesActions'
import { checkOfficeNames, cardHeaderText, displayChangeLog } from '../selectors/userListSelector'
import { selectAuditEvents } from '../selectors/auditEventsSelector'
import { officesList } from '../selectors/officeListSelector'
import { rolesList } from '../selectors/rolesListSelector'
import { clearAddedUserDetailActions } from '../actions/addUserActions'
import { fetchChangeLogAdminDetailsActions, fetchDetailsActions } from '../actions/detailActions'
import { selectChangeLogAdminDetails, selectChangeLogAdminOfficeName } from '../selectors/changeLogDetailsSelector'
import { selectDetailRecords, officeName } from '../selectors/detailSelector'
function mapStateToProps(state) {
  const { userList } = state
  return {
    userList: userList.users || [],
    cardHeaderValue: cardHeaderText(state),
    fetching: userList.fetching,
    userListUrl: '/#',
    dashboardUrl: '/',
    size: userList.size,
    from: userList.from,
    sort: userList.sort,
    query: userList.query,
    aggregate: userList.aggregate,
    total: userList.total,
    error: userList.error,
    officesList: officesList(state),
    inputData: userList.inputData,
    lastName: userList.inputData.lastName,
    officeNames: checkOfficeNames(userList.inputData.officeNames),
    rolesList: rolesList(state),
    includeInactive: userList.includeInactive,
    auditEvents: selectAuditEvents(state),
    changeLogAdminDetails: selectChangeLogAdminDetails(state),
    changeLogAdminOfficeName: selectChangeLogAdminOfficeName(state),
    userOfficeName: officeName(state),
    userDetails: selectDetailRecords(state),
    displayChangeLog: displayChangeLog(state),
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
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
