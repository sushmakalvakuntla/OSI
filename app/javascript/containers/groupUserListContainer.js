import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GroupUserList from '../views/groupUserList/GroupUserList'
import { officesList } from '../selectors/officeListSelector'
import { rolesList } from '../selectors/rolesListSelector'

function mapStateToProps(state) {
  const { searchUserList } = state
  return {
    officesList: officesList(state),
    rolesList: rolesList(state),
    searchPageTiles: searchUserList.searchPageTiles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        // empty for now
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupUserList)
