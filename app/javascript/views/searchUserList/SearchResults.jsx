import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SearchResultComponent from './SearchResultComponent'

class SearchResults extends PureComponent {
  render() {
    const { matchedUsers, officesList, rolesList, fetching } = this.props

    return matchedUsers.map((value, key) => {
      return (
        <SearchResultComponent
          value={value}
          key={key}
          officeList={officesList}
          rolesList={rolesList}
          fetching={fetching}
          unlockHandler={this.props.actions.unlockUser}
          lockMessage={
            this.props.unlockedUsers[value.id]
              ? this.props.unlockedUsers[value.id]
              : value.locked
                ? { unlocked: false, message: 'This user has been locked for too many failed attempts' }
                : { unlocked: true, message: '' }
          }
        />
      )
    })
  }
}

SearchResults.propTypes = {
  matchedUsers: PropTypes.array.isRequired,
  officesList: PropTypes.array.isRequired,
  rolesList: PropTypes.array,
  unlockedUsers: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
}

export default SearchResults
