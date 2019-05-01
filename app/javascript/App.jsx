import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import GlobalHeader from './containers/globalHeaderContainer'
import { store } from './store/configureStore'
import SearchUserList from './containers/searchUserListContainer'
import GroupUsersList from './containers/groupUsersListContainer'
import DetailsPage from './containers/detailsContainer'
import AddUser from './containers/addUserContainer'
import { makeLogoutUrl } from './_utils/makeLogoutUrl'

const App = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalHeader logoutUrl={makeLogoutUrl()} />
      <Router basename={process.env.RAILS_RELATIVE_URL_ROOT || ''}>
        <Switch>
          <Route path="/" exact component={SearchUserList} />
          <Route path="/verify" component={AddUser} />
          <Route path="/user_details/:id" component={DetailsPage} />
          <Route path="/user_group_search" component={GroupUsersList} />
          <Route render={() => <h3>404</h3>} />
        </Switch>
      </Router>
    </Fragment>
  </Provider>
)

export default App
