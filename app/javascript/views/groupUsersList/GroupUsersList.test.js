import React from 'react'
import { shallow } from 'enzyme'
import GroupUsersList from './GroupUsersList'

describe('GroupUserList', () => {
  let wrapper
  let mockFetchGroupUsersList
  const mockFilter = [{ key1: 'some key' }]
  const location = { filter: { query: mockFilter, size: 10 } }

  beforeEach(() => {
    mockFetchGroupUsersList = jest.fn()

    wrapper = shallow(
      <GroupUsersList
        location={location}
        actions={{
          fetchGroupUsersList: mockFetchGroupUsersList,
        }}
      />,
      {
        disableLifecycleMethods: true,
      }
    )
  })

  describe('#componentDidMount', () => {
    it('componentDidMount is called', () => {
      shallow(
        <GroupUsersList
          location={location}
          actions={{
            fetchGroupUsersList: mockFetchGroupUsersList,
          }}
        />
      )
      expect(mockFetchGroupUsersList).toHaveBeenCalledWith(mockFilter, 10)
    })

    it('componentDidMount is called with empty location, FetchGroupUsersList is not called', () => {
      shallow(
        <GroupUsersList
          location={{}}
          actions={{
            fetchGroupUsersList: mockFetchGroupUsersList,
          }}
        />
      )
      expect(mockFetchGroupUsersList).not.toHaveBeenCalled()
    })
  })

  describe('#Alert', () => {
    it('Alert is showing up when error is present', () => {
      wrapper.setProps({ error: 'IfSomeErrorShowsUp' })
      expect(wrapper.find('Alert').length).toEqual(1)
    })
  })

  describe('#Brwadcrumbs', () => {
    it('renders navigation link to Dashboard', () => {
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard')
    })

    it('renders navigation link to User List', () => {
      expect(
        wrapper
          .find('Link')
          .at(1)
          .props().children
      ).toContain('User List')
    })
  })

  describe('#showAlert()', () => {
    it('displays error <Alert/>', () => {
      const props = { user_message: 'Cognito user validation is failed' }
      wrapper.setProps({ userUnlockError: props })
      wrapper.setState({ alert: true })
      const alertBox = wrapper.find('Alert')
      expect(alertBox.length).toBe(1)
      expect(alertBox.props().children).toEqual('Cognito user validation is failed')
    })

    it('displays success <UserMessage/>', () => {
      wrapper.setState({ alert: true })
      wrapper.setProps({ userUnlockError: null })
      const alertBox = wrapper.find('Alert')
      expect(alertBox.length).toBe(1)
      expect(alertBox.props().children).toEqual('Success! You have successfully unlocked this user.')
    })
  })

  describe('#GroupUserList output', () => {
    it('contains Table and headers', () => {
      wrapper.setProps({ groupUsers: [] })
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable').length
      ).toBe(1)
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns').length
      ).toBe(7)
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[0].id
      ).toBe('last_name')
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[1].id
      ).toBe('enabled')
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[2].id
      ).toBe('last_login_date_time')
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[3].accessor
      ).toBe('racfid')
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[4].id
      ).toBe('office_name')
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[5].id
      ).toBe('user_role')
      expect(
        wrapper
          .find('DataGrid')
          .dive()
          .find('ReactTable')
          .prop('columns')[6].id
      ).toBe('ellipsis')
    })
  })
})
