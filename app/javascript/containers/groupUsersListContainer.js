import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GroupUsersList from '../views/groupUsersList/GroupUsersList'
import { officesList } from '../selectors/officeListSelector'
import { rolesList } from '../selectors/rolesListSelector'
import { fetchGroupUsersList } from '../actions/groupUsersListActions'

function mapStateToProps(state) {
  const { groupUsersList } = state
  return {
    officesList: officesList(state),
    rolesList: rolesList(state),
    error: groupUsersList.error,
    groupUsers: groupUsersList.groupUsers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchGroupUsersList,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupUsersList)
