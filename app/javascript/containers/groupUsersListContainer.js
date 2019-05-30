import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GroupUsersList from '../views/groupUsersList/GroupUsersList'
import { officesList } from '../selectors/officeListSelector'
import { rolesList } from '../selectors/rolesListSelector'
import { fetchGroupUsersList } from '../actions/groupUsersListActions'
import { handleStatusChangeAction } from '../actions/detailActions'

function mapStateToProps(state) {
  const { groupUsersList, fetchDetails } = state
  return {
    officesList: officesList(state),
    rolesList: rolesList(state),
    error: groupUsersList.error,
    groupUsers: groupUsersList.groupUsers,
    query: groupUsersList.query,
    size: groupUsersList.size,
    userUnlockError: fetchDetails.saveDetailsError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchGroupUsersList,
        handleStatusChangeAction,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupUsersList)
