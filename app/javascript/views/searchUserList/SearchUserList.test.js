import React from 'react'
import { mount, shallow } from 'enzyme'
import SearchUserList from './SearchUserList.jsx'

describe('SearchUserList', () => {
  let wrapper
  let mockSetNextSearchActions
  let mockSetOfficesListAction
  let mockHandleSearchChange
  let mockClearAddedUserDetailActions
  let mockHandleCheckBoxChangeActions
  let mockSetSearchActions
  let mockClearSearchActions
  let mockSetSearchForTiles
  let mockFetchChangeLogAdminDetailsActions
  let mockFetchDetailsActions
  let mockClearAuditEvents
  let mockFetchAuditEventsActions

  const query = [
    {
      field: 'first_name',
      value: 'first_name_value',
    },
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

  const exactMatches = [
    {
      first_name: 'first name',
      last_name: 'last name',
      county_name: 'county',
      email: 'email@email.com',
    },
  ]

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
    mockClearSearchActions = jest.fn()

    wrapper = shallow(
      <SearchUserList
        dashboardUrl={'dburl'}
        actions={{
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
          clearSearch: mockClearSearchActions,
        }}
        cardHeaderValue="County: CountyName"
        query={query}
        includeInactive={false}
        searchPageTiles={searchPageTiles}
        officesList={['office1', 'office2']}
        firstName=""
        lastName=""
        email=""
        CWSLogin=""
        exactMatches={exactMatches}
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
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          adminAccountDetails={{ roles: ['State-admin'] }}
          query={query}
          lastName="last_name_value"
          firstName="first_name_value"
          racfid="RACFID"
          email="email+address@example.com"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={false}
          officeList={[{ value: 'someOffice1', label: 'someOfficeOne' }, { value: 'someOffice2', label: 'someOfficeTwo' }]}
          cardHeaderValue="State Administrator view"
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
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

  describe('#handleEmailSearch', () => {
    it('sets state based on the user action', () => {
      const myFunction = wrapper.instance().handleEmailSearch
      expect(() => myFunction('Hello@gmail.com')).not.toThrow()
    })
  })

  describe('#Alert', () => {
    it('sets state based on the user action', () => {
      wrapper.setProps({ error: 'IfSomeErrorShowsUp' })
      expect(wrapper.find('Alert').length).toEqual(1)
    })
  })

  describe('#handleOfficeChange', () => {
    it('Office change calls handleOfficeChange Actions', () => {
      const newQuery = [
        { field: 'office_ids', value: ['offices1'] },
        { field: 'last_name', value: '' },
        { field: 'first_name', value: '' },
        { field: 'email', value: '' },
        { field: 'racfid', value: '' },
        { field: 'enabled', value: true },
      ]
      const offices = [{ value: 'offices1', label: 'OfficeOne' }]
      wrapper.instance().handleOfficeChange(offices)
      expect(mockHandleSearchChange).toHaveBeenCalledWith('officeNames', ['offices1'])
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
      expect(mockFetchAuditEventsActions).toHaveBeenCalledWith({
        query: [{ field: 'office_ids', value: ['offices1'] }],
      })
    })

    it('Office change calls handleOfficeChange Actions with last name', () => {
      const newQuery = [
        { field: 'office_ids', value: ['offices1'] },
        { field: 'last_name', value: 'SOME_LAST_NAME' },
        { field: 'first_name', value: '' },
        { field: 'email', value: '' },
        { field: 'racfid', value: '' },
        { field: 'enabled', value: true },
      ]
      const offices = [{ value: 'offices1', label: 'OfficeOne' }]
      wrapper.setProps({ lastName: 'SOME_LAST_NAME' })
      wrapper.instance().handleOfficeChange(offices)
      expect(mockHandleSearchChange).toHaveBeenCalledWith('officeNames', ['offices1'])
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
      expect(mockFetchAuditEventsActions).toHaveBeenCalledWith({
        query: [{ field: 'office_ids', value: ['offices1'] }],
      })
    })
  })

  describe('#validateEmailField', () => {
    it('validates email when correct format and special characters are given as input', () => {
      const instance = wrapper.instance()
      instance.validateEmailField('foo@gmail.com')
      expect(wrapper.instance().state.errorMessage).toEqual('')
      instance.validateEmailField(`foo!#$%^....&*-_+={'?/@gmail.com`)
      expect(wrapper.instance().state.errorMessage).toEqual('')
    })

    it('validates email when not allowed characters are given as input', () => {
      const instance = wrapper.instance()
      instance.validateEmailField('foo@<|}][()>@gmail.com')
      expect(wrapper.instance().state.errorMessage).toEqual('Please enter a valid email.')
      instance.validateEmailField('fo@o@gmail.com')
      expect(wrapper.instance().state.errorMessage).toEqual('Please enter a valid email.')
      instance.validateEmailField('someValue')
      expect(wrapper.instance().state.errorMessage).toEqual('Please enter a valid email.')
    })

    it('validates empty email field input', () => {
      const instance = wrapper.instance()
      instance.validateEmailField('')
      expect(wrapper.instance().state.errorMessage).toEqual('')
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
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          query={query}
          firstName="first_name_value"
          lastName="last_name_value"
          email="email+address@example.com"
          CWSLogin="racfid"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      const newQuery = [
        {
          field: 'first_name',
          value: 'first_name_value',
        },
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['north', 'south', 'east', 'west'],
        },
        {
          field: 'email',
          value: 'email+address@example.com',
        },
        {
          field: 'racfid',
          value: 'racfid',
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
            clearAddedUserDetailActions: () => {},
            fetchAuditEventsActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          query={query}
          firstName="first_name_value"
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          CWSLogin="racfid"
          email="email+address@example.com"
          includeInactive={true}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      const newQuery = [
        {
          field: 'first_name',
          value: 'first_name_value',
        },
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['north', 'south', 'east', 'west'],
        },
        {
          field: 'email',
          value: 'email+address@example.com',
        },
        {
          field: 'racfid',
          value: 'racfid',
        },
        { field: 'enabled', value: '' },
      ]
      const event = { preventDefault: () => {} }
      wrapperLocal.instance().submitSearch(event)
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
    })
  })

  describe('#handleCheckBoxChange', () => {
    it('calls the handleCheckBoxChange Actions with includeInactive props as false', () => {
      const query = [
        {
          field: 'first_name',
          value: '',
        },
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'email',
          value: '',
        },
        {
          field: 'racfid',
          value: '',
        },
        {
          field: 'office_ids',
          value: [],
        },
        { field: 'enabled', value: '' },
      ]
      wrapper.setProps({ lastName: 'last_name_value' })
      wrapper.instance().handleCheckBoxChange()
      expect(mockHandleCheckBoxChangeActions).toHaveBeenCalledWith()
      expect(mockSetSearchActions).toHaveBeenCalledWith(query)
    })

    it('calls the handleCheckBoxChange Actions with includeInactive props as true ', () => {
      const query = [
        {
          field: 'first_name',
          value: '',
        },
        {
          field: 'last_name',
          value: '',
        },
        {
          field: 'email',
          value: '',
        },
        {
          field: 'racfid',
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

  describe('#submitClear', () => {
    it('calls the clearSearch Actions', () => {
      wrapper.instance().submitClear()
      expect(mockClearSearchActions).toHaveBeenCalledWith()
    })

    it('resets errorMessage to empty string', () => {
      wrapper.instance().setState({ errorMessage: 'some_error_message' })
      wrapper.instance().submitClear()
      expect(wrapper.instance().state.errorMessage).toEqual('')
    })
  })

  describe('#isDisabledSearchBtn', () => {
    it('returns true when all search fields are empty ', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={query}
          lastName=""
          firstName=""
          email=""
          CWSLogin=""
          officeNames={['somevalue']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledSearchBtn()).toEqual(true)
    })

    it('returns false when any of the search fields is non-empty', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={query}
          lastName="new_last_name"
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledSearchBtn()).toEqual(false)
    })
  })

  describe('#isDisabledAddUsrBtn', () => {
    it('returns true when search query contains all empty fields', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={allEmptySearchQuery}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(true)
    })

    it('returns false when search query contains non-empty last_name field', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={prepareQuery('last_name')}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(false)
    })

    it('returns false when search query contains non-empty first_name field', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={prepareQuery('first_name')}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(false)
    })

    it('returns false when search query contains non-empty email field', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={prepareQuery('email')}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(false)
    })

    it('returns false when search query contains non-empty racfid field', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={prepareQuery('racfid')}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(false)
    })

    it('returns false when search query contains non-empty office-ids field', () => {
      const query = [
        {
          field: 'office_ids',
          value: ['some_value1', 'some_value2'],
        },
      ]
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={query}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(false)
    })

    it('returns true when search query is empty', () => {
      const query = []
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          query={query}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
        />
      )
      expect(component.instance().isDisabledAddUsrBtn()).toEqual(true)
    })
  })

  describe('#isSearchValueAbsent', () => {
    it('returns true for undefined node', () => {
      let node
      expect(wrapper.instance().isSearchValueAbsent(node)).toBe(true)
    })

    it('returns true when there is no value', () => {
      const node = { field: 'first_name' }
      expect(wrapper.instance().isSearchValueAbsent(node)).toBe(true)
    })

    it('returns true for zero-sized value', () => {
      const node = { field: 'last_name', value: '' }
      expect(wrapper.instance().isSearchValueAbsent(node)).toBe(true)
    })

    it('returns false for non-empty value', () => {
      const node = { field: 'last_name', value: 'some_name' }
      expect(wrapper.instance().isSearchValueAbsent(node)).toBe(false)
    })
  })

  describe('#isDisabledClearBtn', () => {
    it('returns true when all search fields are empty ', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          lastName=""
          firstName=""
          email=""
          CWSLogin=""
          officeNames={[]}
          query={query}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledClearBtn()).toEqual(true)
    })

    it('returns false when lastName search field is non-empty', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          lastName="new_last_name"
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          searchPageTiles={searchPageTiles}
          query={query}
        />
      )
      expect(component.instance().isDisabledClearBtn()).toEqual(false)
    })

    it('returns false when firstName search field is non-empty', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          firstName="new_first_name"
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          query={query}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledClearBtn()).toEqual(false)
    })

    it('returns false when email search field is non-empty', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          email="new_email"
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          query={query}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledClearBtn()).toEqual(false)
    })

    it('returns false when CWSLogin search field is non-empty', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          CWSLogin="new_CWSLogin"
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          query={query}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledClearBtn()).toEqual(false)
    })

    it('returns false when officeNames list is non-empty', () => {
      const component = shallow(
        <SearchUserList
          dashboardUrl={'dburl'}
          actions={defaultEmptyActions}
          officeNames={['new_CWSLogin']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          query={query}
          searchPageTiles={searchPageTiles}
        />
      )
      expect(component.instance().isDisabledClearBtn()).toEqual(false)
    })
  })

  describe('#componentDidMount', () => {
    let mockFetchAccountActions
    let mockFetchOfficeListActions
    let mockFetchRolesActions
    let mockSetSearch
    let mockSetSearchForTiles
    let mockClearAddedUserDetailActions

    beforeEach(() => {
      mockFetchAccountActions = jest.fn()
      mockFetchOfficeListActions = jest.fn()
      mockFetchRolesActions = jest.fn()
      mockSetSearch = jest.fn()
      mockSetSearchForTiles = jest.fn()
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
            clearAddedUserDetailActions: mockClearAddedUserDetailActions,
            fetchAuditEventsActions: mockFetchAuditEventsActions,
          }}
          from={0}
          sort={[]}
          size={50}
          total={25}
          query={query}
          firstName="some_firstname_value"
          lastName="some_value"
          racfid="RACFID"
          email="email@example.com"
          officeNames={['north']}
          inputData={{ officeNames: ['north'] }}
          selectedOfficesList={['somevalue']}
          includeInactive={false}
          auditEvents={auditEvents}
          userDetails={details}
          changeLogAdminDetails={{ county_name: 'Admin County', email: 'some@email.com' }}
          changeLogAdminOfficeName={'Admin Office'}
          searchPageTiles={searchPageTiles}
          exactMatches={exactMatches}
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

    it('performs search with query', () => {
      const query = [
        { field: 'first_name', value: 'some_firstname_value' },
        { field: 'last_name', value: 'some_value' },
        { field: 'email', value: 'email@example.com' },
        { field: 'racfid', value: undefined },
        { field: 'office_ids', value: ['north'] },
        { field: 'enabled', value: true },
      ]
      expect(mockSetSearch).toHaveBeenCalledWith(query)
    })
  })

  function prepareQuery(fieldName) {
    const result = allEmptySearchQuery.slice()
    const objIndex = result.findIndex(obj => obj.field === fieldName)
    result[objIndex].value = 'new_value'
    return result
  }

  const defaultEmptyActions = {
    searchUsers: () => {},
    fetchAccountActions: () => {},
    fetchOfficesActions: () => {},
    fetchRolesActions: () => {},
    setSearch: () => {},
    clearAddedUserDetailActions: () => {},
    fetchAuditEventsActions: () => {},
  }

  const allEmptySearchQuery = [
    {
      field: 'last_name',
      value: '',
    },
    {
      field: 'first_name',
      value: '',
    },
    {
      field: 'office_ids',
      value: [],
    },
    {
      field: 'racfid',
      value: '',
    },
    {
      field: 'email',
      value: '',
    },
  ]
})
