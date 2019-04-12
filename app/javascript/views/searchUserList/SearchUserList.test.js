import React from 'react'
import { mount, shallow } from 'enzyme'
import SearchUserList from './SearchUserList.jsx'
import { Link } from 'react-router-dom'

describe('SearchUserList', () => {
  let wrapper
  let mockSetPageActions
  let mockSetPageSizeActions
  let mockSetSortActions
  let mockSetNextSearchActions
  let mockSetOfficesListAction
  let mockHandleSearchChange
  let mockClearAddedUserDetailActions
  let mockHandleCheckBoxChangeActions
  let mockSetSearchActions
  let mockSetSearchForTiles
  let mockFetchChangeLogAdminDetailsActions
  let mockFetchDetailsActions
  let mockClearAuditEvents
  let mockFetchAuditEventsActions

  const query = [
    {
      field: 'last_name',
      value: 'last_name_value',
    },
    {
      field: 'office_ids',
      value: ['north', 'south', 'east', 'west'],
    },
    { field: 'enabled', value: true },
  ]

  const auditEvents = [
    {
      event_type: 'User Email Changed',
      timestamp: '2019-01-23 10:09:21',
      event: {
        admin_name: 'adminName',
        admin_role: 'roleOne',
        user_name: 'UserName',
        user_roles: 'roleThree',
        new_value: 'ChangedValue',
        old_value: 'OldValue',
        user_id: 'SOME_USER_ID',
      },
      user_login: 'SOME_ID',
    },
  ]

  const details = {
    first_name: 'first name',
    last_name: 'last name',
    county_name: 'county',
    email: 'email@email.com',
  }

  const searchPageTiles = [
    {
      title: 'user Type',
      type: 'action',
      query: [
        {
          field: 'fieldType1',
          value: 'value1',
        },
        {
          field: 'fieldType2',
          value: 'value2',
        },
      ],
      count: 0,
    },
  ]

  beforeEach(() => {
    mockSetPageActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetPageSizeActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetSortActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetNextSearchActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetOfficesListAction = jest.fn().mockReturnValue(Promise.resolve([]))
    mockHandleSearchChange = jest.fn().mockReturnValue(Promise.resolve([]))
    mockClearAddedUserDetailActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetSearchActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetSearchForTiles = jest.fn().mockReturnValue(Promise.resolve([]))
    mockHandleCheckBoxChangeActions = jest.fn()
    mockFetchChangeLogAdminDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockFetchDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockFetchAuditEventsActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockClearAuditEvents = jest.fn()

    wrapper = shallow(
      <SearchUserList
        dashboardUrl={'dburl'}
        actions={{
          setPage: mockSetPageActions,
          setPageSize: mockSetPageSizeActions,
          setSort: mockSetSortActions,
          setNextSearch: mockSetNextSearchActions,
          setOfficesList: mockSetOfficesListAction,
          handleSearchChange: mockHandleSearchChange,
          clearAddedUserDetailActions: mockClearAddedUserDetailActions,
          handleCheckBoxChangeActions: mockHandleCheckBoxChangeActions,
          setSearch: mockSetSearchActions,
          setSearchForTiles: mockSetSearchForTiles,
          fetchChangeLogAdminDetailsActions: mockFetchChangeLogAdminDetailsActions,
          fetchDetailsActions: mockFetchDetailsActions,
          fetchAuditEventsActions: mockFetchAuditEventsActions,
          clearAuditEvents: mockClearAuditEvents,
        }}
        cardHeaderValue="County: CountyName"
        query={query}
        includeInactive={false}
        searchPageTiles={searchPageTiles}
        searchedForUsers={true}
        officesList={['office1', 'office2']}
      />,
      {
        disableLifecycleMethods: true,
      }
    )
  })

  describe('#componentWillUnmount', () => {
    it('componentWillUnmount should be called on unmount', () => {
      const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount')
      wrapper.unmount()
      expect(componentWillUnmount).toHaveBeenCalledWith()
    })
  })

  describe('renders components', () => {
    it('renders card component', () => {
      expect(wrapper.find('Cards').length).toBeGreaterThan(0)
    })

    it('checks card component props', () => {
      expect(wrapper.find('Cards').props().cardHeaderText).toBe('Search Existing User Accounts')
    })

    it('display <ChangeLog/> ', () => {
      wrapper.setProps({ displayChangeLog: false })
      expect(wrapper.find('ChangeLog').length).toBe(0)
      wrapper.setProps({ displayChangeLog: true })
      expect(wrapper.find('ChangeLog').length).toBe(1)
    })

    it('cardHeaderText is passed to Card props as value', () => {
      const wrapperLocal = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          adminAccountDetails={{ roles: ['State-admin'] }}
          query={query}
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={false}
          officeList={[{ value: 'someOffice1', label: 'someOfficeOne' }, { value: 'someOffice2', label: 'someOfficeTwo' }]}
          cardHeaderValue="State Administrator view"
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(wrapperLocal.find('Cards').props().cardHeaderText).toBe('Search Existing User Accounts')
    })

    it('renders PageHeader component', () => {
      expect(wrapper.find('PageHeader').length).toBe(1)
    })
  })

  describe('#handleOnAdd', () => {
    it('sets state based on the user action', () => {
      wrapper.instance().handleOnAdd()
      expect(wrapper.instance().state.addUser).toEqual(true)
    })
  })

  describe('#handleOnInput', () => {
    it('sets state based on the user action', () => {
      const myFunction = wrapper.instance().handleOnInput
      expect(() => myFunction('Hello@gmail.com')).not.toThrow()
    })
  })

  describe('#Alert', () => {
    it('sets state based on the user action', () => {
      wrapper.setProps({ error: 'IfSomeErrorShowsUp' })
      expect(wrapper.find('Alert').length).toEqual(1)
    })
  })

  describe('#handlePageChange', () => {
    it('calls the setPage Actions', () => {
      const pageIndex = 'someValue'
      wrapper.instance().handlePageChange(pageIndex)
      expect(mockSetPageActions).toHaveBeenCalledWith(pageIndex)
    })
  })

  describe('#handleOfficeChange', () => {
    it('Office change calls handleSearchChange Actions', () => {
      const newQuery = [{ field: 'office_ids', value: ['offices1'] }]
      const offices = [{ value: 'offices1', label: 'OfficeOne' }]
      wrapper.find('#searchOfficeName').simulate('change', offices)
      expect(mockHandleSearchChange).toHaveBeenCalledWith('officeNames', ['offices1'])
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
      expect(mockFetchAuditEventsActions).toHaveBeenCalledWith({ query: [{ field: 'office_ids', value: ['offices1'] }] })
    })
  })

  describe('#handlePageSizeChange', () => {
    it('calls the setPageSize Actions', () => {
      const pageIndex = 'someValue'
      const pageSize = 30
      wrapper.instance().handlePageSizeChange(pageSize, pageIndex)
      expect(mockSetPageSizeActions).toHaveBeenCalledWith(pageSize)
    })
  })

  describe('#getChangeLogAdminDetails', () => {
    it('should fetch changeLog admin details when event is triggered', () => {
      wrapper.instance().getChangeLogAdminDetails('SOME_ID')
      expect(mockFetchChangeLogAdminDetailsActions).toHaveBeenCalledWith('SOME_ID')
    })
  })

  describe('#getChangeLogUserDetails', () => {
    it('should fetch changeLog admin details when event is triggered', () => {
      wrapper.instance().getChangeLogUserDetails('SOME_ID')
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('SOME_ID')
    })
  })

  describe('#submitSearch', () => {
    it('calls the setSearch Actions', () => {
      const wrapperLocal = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          query={query}
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
        />
      )
      const newQuery = [
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['north', 'south', 'east', 'west'],
        },
        { field: 'enabled', value: true },
      ]
      const event = { preventDefault: () => {} }
      wrapperLocal.instance().submitSearch(event)
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
    })

    it('calls the setSearch Actions with includeInactive props as true', () => {
      const wrapperLocal = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          query={query}
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={true}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
        />
      )
      const newQuery = [
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['north', 'south', 'east', 'west'],
        },
        { field: 'enabled', value: '' },
      ]
      const event = { preventDefault: () => {} }
      wrapperLocal.instance().submitSearch(event)
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
    })
  })

  describe('#handleSortChange', () => {
    it('calls the sortChange Actions', () => {
      const shiftKey = 'someKey'
      const column = 'Full Name'
      const newSorted = [
        {
          id: 'someId',
          desc: 'someValue',
        },
      ]
      wrapper.instance().handleSortChange(newSorted, column, shiftKey)
      expect(mockSetSortActions).toHaveBeenCalledWith([{ desc: 'someValue', field: 'someId' }])
    })
  })

  describe('#handleCheckBoxChange', () => {
    it('calls the handleCheckBoxChange Actions with includeInactive props as false', () => {
      const query = [
        {
          field: 'last_name',
          value: '',
        },
        {
          field: 'office_ids',
          value: [],
        },
        { field: 'enabled', value: '' },
      ]
      wrapper.instance().handleCheckBoxChange()
      expect(mockHandleCheckBoxChangeActions).toHaveBeenCalledWith()
      expect(mockSetSearchActions).toHaveBeenCalledWith(query)
    })

    it('calls the handleCheckBoxChange Actions with includeInactive props as true ', () => {
      const query = [
        {
          field: 'last_name',
          value: '',
        },
        {
          field: 'office_ids',
          value: [],
        },
        { field: 'enabled', value: true },
      ]
      wrapper.setProps({ includeInactive: true })
      wrapper.instance().handleCheckBoxChange()
      expect(mockHandleCheckBoxChangeActions).toHaveBeenCalledWith()
      expect(mockSetSearchActions).toHaveBeenCalledWith(query)
    })
  })

  describe('#isDisabledSearchBtn', () => {
    const query = [
      {
        field: 'last_name',
        value: 'last_name_value',
      },
      {
        field: 'office_ids',
        value: ['somevalue'],
      },
    ]
    it('returns true when query and entered search criteria are same', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setSearch: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
          }}
          query={query}
          lastName="last_name_value"
          officeNames={['somevalue']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledSearchBtn()).toEqual(true)
    })

    it('returns false when search query and entered search criteria are different', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setSearch: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
          }}
          query={query}
          lastName="new_last_name"
          officeNames={['new_value']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledSearchBtn()).toEqual(false)
    })
  })

  describe('getTotalPages', () => {
    it('retuns 1 when resultset is empty', () => {
      wrapper.setProps({ size: 10, userList: [], total: 419 })
      expect(wrapper.instance().getTotalPages()).toEqual(1)
    })

    it('calculates correct page count (total / size) + 1 if there is a remainder.', () => {
      wrapper.setProps({ size: 10, userList: [{}], total: 419 })
      expect(wrapper.instance().getTotalPages()).toEqual(42)
      wrapper.setProps({ size: 10, total: 420, userList: [{}] })
      expect(wrapper.instance().getTotalPages()).toEqual(42)
      wrapper.setProps({ size: 10, total: 421, userList: [{}] })
      expect(wrapper.instance().getTotalPages()).toEqual(43)
    })

    it('returns -1 (indeterminate) when total numPages can not be calculated', () => {
      wrapper.setProps({ size: undefined, userList: [{}], total: undefined })
      expect(wrapper.instance().getTotalPages()).toEqual(-1)
      wrapper.setProps({ size: 0, userList: [{}], total: 0 })
      expect(wrapper.instance().getTotalPages()).toEqual(-1)
    })
  })

  describe('#componentDidMount', () => {
    let mockFetchAccountActions
    let mockFetchOfficeListActions
    let mockFetchRolesActions
    let mockSetSearch
    let mockSetSearchForTiles
    let mockSetPage
    let mockClearAddedUserDetailActions

    beforeEach(() => {
      mockFetchAccountActions = jest.fn()
      mockFetchOfficeListActions = jest.fn()
      mockFetchRolesActions = jest.fn()
      mockSetSearch = jest.fn()
      mockSetSearchForTiles = jest.fn()
      mockSetPage = jest.fn()
      mockClearAddedUserDetailActions = jest.fn()
      wrapper = mount(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            fetchAccountActions: mockFetchAccountActions,
            fetchOfficesActions: mockFetchOfficeListActions,
            fetchRolesActions: mockFetchRolesActions,
            setSearch: mockSetSearch,
            setSearchForTiles: mockSetSearchForTiles,
            setPage: mockSetPage,
            clearAddedUserDetailActions: mockClearAddedUserDetailActions,
            fetchAuditEventsActions: mockFetchAuditEventsActions,
          }}
          from={0}
          sort={[]}
          size={50}
          total={25}
          query={query}
          lastName="some_value"
          officeNames={['north']}
          inputData={{ officeNames: ['north'] }}
          selectedOfficesList={['somevalue']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          changeLogAdminDetails={{ county_name: 'Admin County', email: 'some@email.com' }}
          changeLogAdminOfficeName={'Admin Office'}
          searchPageTiles={searchPageTiles}
        />
      )
    })

    it('fetches the account details', () => {
      expect(mockFetchAccountActions).toHaveBeenCalledWith()
    })

    it('fetches the office list', () => {
      expect(mockFetchOfficeListActions).toHaveBeenCalledWith()
    })

    it('fetches the roles list', () => {
      expect(mockFetchRolesActions).toHaveBeenCalledWith()
    })
  })

  describe('#UserList output', () => {
    it('contains Table and headers', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setSearch: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
          }}
          from={0}
          size={50}
          total={25}
          query={query}
          sort={[
            {
              field: 'last_name',
              desc: 'value',
            },
          ]}
          selectedOfficesList={['somevalue']}
          includeInactive={false}
          auditEvents={auditEvents}
          searchPageTiles={searchPageTiles}
          searchedForUsers={true}
        />
      )

      const value = 'value'
      const original = {
        id: '1234AGFS',
      }
      expect(wrapper.find('ReactTable').length).toBe(1)
      expect(wrapper.find('ReactTable').prop('columns').length).toBe(6)
      expect(wrapper.find('ReactTable').prop('columns')[0].id).toBe('last_name')
      expect(wrapper.find('ReactTable').prop('columns')[1].id).toBe('enabled')
      expect(wrapper.find('ReactTable').prop('columns')[2].id).toBe('last_login_date_time')
      expect(wrapper.find('ReactTable').prop('columns')[3].accessor).toBe('racfid')
      expect(component.find('ReactTable').prop('sorted')).toEqual([{ desc: 'value', id: 'last_name' }])
      expect(
        wrapper
          .find('ReactTable')
          .prop('columns')[0]
          .Cell({ value, original })
      ).toEqual(<Link to="/user_details/1234AGFS">value</Link>)
    })

    it('renders navigation link to Dashboard', () => {
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard')
    })

    it('first link is pointed at dashboard', () => {
      expect(wrapper.find('Link').get(0).props.href).toEqual('dburl')
    })

    it('default props', () => {
      expect(SearchUserList.defaultProps.dashboardUrl).toEqual('/')
      expect(SearchUserList.defaultProps.dashboardClickHandler).not.toThrow()
    })
  })
})
