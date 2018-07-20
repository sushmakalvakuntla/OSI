import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, InputComponent, PageHeader } from 'react-wood-duck';
import Cards from '../../common/Card';
import AddUser from '../../containers/addUserContainer';
import ReactTable from 'react-table';

const hackBtnStyles = {
  marginTop: '22px',
  padding: '14px 0',
  textAlign: 'center',
};

export const toFullName = ({ first_name, last_name }) =>
  `${last_name}, ${first_name}`;

class UserList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addUser: false,
    };
  }

  componentDidMount() {
    this.props.actions.searchUsers({
      query: this.props.query,
      sort: this.props.sort,
      size: this.props.size,
      from: this.props.from,
    });
    this.props.actions.fetchAccountActions();
  }

  handleOnAdd = () => {
    this.setState({ addUser: true });
  };

  handlePageChange = pageIndex => {
    this.props.actions.setPage(pageIndex);
  };

  handlePageSizeChange = (pageSize, pageIndex) => {
    this.props.actions.setPageSize(pageSize);
  };

  handleSortChange = (newSorted, column, shiftKey) => {
    this.props.actions.setSort(
      newSorted.map(s => ({ field: s.id, desc: s.desc }))
    );
  };

  handleSearchChange = e => {
    this.props.actions.setNextSearch(e.target.value);
  };

  submitSearch = e => {
    e.preventDefault();
    this.props.actions.setSearch([
      { field: 'last_name', value: this.props.nextSearch },
    ]);
  };

  getTotalPages = () =>
    this.props.total ? Math.ceil(this.props.total / this.props.size) : -1;

  getCurrentPageNumber = () => Math.floor(this.props.from / this.props.size);

  isDisabledSearchBtn = () => {
    const { query, nextSearch } = this.props;
    if (!query) return false;
    const lastNameSearch = query.find(
      ({ field, value }) => field === 'last_name'
    );
    if (!lastNameSearch) return false;
    return lastNameSearch.value === nextSearch;
  };

  renderUsersTable = ({ data }) => {
    return (
      <ReactTable
        data={data}
        showPaginationTop={20 <= this.props.size}
        columns={[
          {
            Header: 'Full Name',
            id: 'last_name',
            accessor: toFullName,
            Cell: ({ value, original }) => (
              <Link
                href={`${this.props.location.pathname}/user_details/${
                  original.id
                }`}
                text={value}
              />
            ),
            minWidth: 400,
          },
          {
            Header: 'Status',
            accessor: 'enabled',
          },
          {
            Header: 'Last Login',
            accessor: 'last_login_date_time',
          },
          {
            Header: 'CWS Login',
            accessor: 'racfid',
          },
          {
            Header: 'End date',
            accessor: 'end_date',
          },
        ]}
        manual
        sorted={this.props.sort.map(d => ({ id: d.field, desc: d.desc }))}
        page={this.getCurrentPageNumber()}
        pages={this.getTotalPages()}
        pageSize={this.props.size}
        loading={this.props.fetching}
        onFetchData={this.search}
        defaultPageSize={10}
        className="-striped -highlight"
        onPageChange={this.handlePageChange}
        onPageSizeChange={this.handlePageSizeChange}
        onSortedChange={this.handleSortChange}
      />
    );
  };

  renderBreadcrumb = () => {
    const { dashboardUrl, dashboardClickHandler } = this.props;
    return (
      <div>
        Back to:{' '}
        <Link
          text="Dashboard"
          href={dashboardUrl}
          clickHandler={dashboardClickHandler}
        />
      </div>
    );
  };

  render() {
    const { accountCounty } = this.props;
    return (
      <div role="main">
        {this.state.addUser ? (
          <AddUser addUser={this.state.addUser} />
        ) : (
          <div>
            <PageHeader pageTitle="Manage Users" button="" />
            <div className="container">
              {this.renderBreadcrumb()}
              <Cards
                cardHeaderText={'Manage Users: ' + accountCounty}
                cardHeaderButton={true}
                headerBtnName="+ Add a user"
                onEdit={this.handleOnAdd}
              >
                <form onSubmit={this.submitSearch}>
                  <div className="row">
                    <div className="col-md-10 col-sm-6">
                      <InputComponent
                        id="searchtext"
                        fieldClassName="form-group"
                        type="text"
                        value={this.props.nextSearch}
                        onChange={this.handleSearchChange}
                        placeholder="search user by Last name"
                        autocomplete="off"
                      />
                    </div>
                    <div className="col-md-2 col-sm-6">
                      <button
                        type="submit"
                        style={hackBtnStyles}
                        className="btn btn-primary btn-block btn-sm"
                        disabled={this.isDisabledSearchBtn()}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
                <pre style={{ color: 'white' }}>
                  {JSON.stringify(
                    {
                      sort: this.props.sort,
                      fetching: this.props.fetching,
                      page: this.props.page,
                      size: this.props.size,
                      from: this.props.from,
                      query: this.props.query,
                      total: this.props.total,
                    },
                    null,
                    2
                  )}
                </pre>
                <br />
                <div>
                  {this.renderUsersTable({
                    data: this.props.userList,
                  })}
                </div>
              </Cards>
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  page: PropTypes.number,
  from: PropTypes.number,
  size: PropTypes.number,
  fetching: PropTypes.bool,
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  accountCounty: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
  nextSearch: PropTypes.string,
  total: PropTypes.number,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      desc: PropTypes.bool,
    })
  ),
  query: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    })
  ),
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
};
export default UserList;
