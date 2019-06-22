import React from 'react'
import { shallow } from 'enzyme'
import ChangeLogDetails from './ChangeLogDetailsView'

describe('ChangeLogDetails', () => {
  let wrapper
  let mockGetAdminDetails
  let mockGetUserDetails

  const props = {
    changeLogData: {
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
    userDetails: {
      county_name: 'countyName',
      email: 'some@email.com',
    },
    userOfficeName: 'userOffice',
    adminOfficeName: 'adminOffice',
    adminDetails: {
      county_name: 'countyName',
      email: 'some@email.com',
    },
  }
  beforeEach(() => {
    mockGetAdminDetails = jest.fn().mockReturnValue(Promise.resolve([]))
    mockGetUserDetails = jest.fn().mockReturnValue(Promise.resolve([]))
    wrapper = shallow(<ChangeLogDetails {...props} getAdminDetails={mockGetAdminDetails} getUserDetails={mockGetUserDetails} />)
  })

  describe('renders the Components ', () => {
    it('renders Modal components', () => {
      expect(wrapper.find('Modal').exists()).toBe(true)
      expect(wrapper.find('ModalHeader').exists()).toBe(true)
      expect(wrapper.find('ModalBody').exists()).toBe(true)
    })

    it('render View Change Details Button on ListView', () => {
      wrapper.setProps({ isListView: true })
      expect(wrapper.find('Button').exists()).toBe(true)
      expect(wrapper.find('Button').props().children).toBe('View Change Details')
    })

    it('render view Button when no ListView', () => {
      wrapper.setProps({ isListView: false })
      expect(wrapper.find('Button').exists()).toBe(true)
      expect(wrapper.find('Button').props().children).toBe('view')
    })
  })

  it('toggles the ModelOpen', () => {
    wrapper.setState({ ModalOpen: false })
    const instance = wrapper.instance()
    instance.toggle({
      ModalOpen: true,
    })
    expect(instance.state.ModalOpen).toEqual(true)
  })

  describe('#toggle', () => {
    it('calls getAdminDetails, getUserDetails with ID, when isListView is true', () => {
      wrapper.setProps({ isListView: true })
      wrapper.instance().toggle()
      expect(mockGetAdminDetails).toHaveBeenCalledWith('SOME_ID')
      expect(mockGetUserDetails).toHaveBeenCalledWith('SOME_USER_ID')
    })

    it('calls getAdminDetails with ID, when isListView is not true', () => {
      wrapper.instance().toggle()
      expect(mockGetAdminDetails).toHaveBeenCalledWith('SOME_ID')
    })
  })

  describe('changesMadeTo', () => {
    it('should render avatar with size large', () => {
      expect(wrapper.find('Avatar').length).toEqual(1)
      expect(wrapper.find('Avatar').props().size).toEqual('lg')
    })

    it('should display the user name', () => {
      expect(
        wrapper
          .find('div')
          .at(7)
          .props().children
      ).toBe('UserName')
    })

    it('should display the user role', () => {
      expect(
        wrapper
          .find('div')
          .at(8)
          .props().children
      ).toBe('roleThree')
    })

    it('should display the user county name', () => {
      expect(
        wrapper
          .find('div')
          .at(10)
          .props().children
      ).toBe('countyName')
    })

    it('should display the user office name', () => {
      expect(
        wrapper
          .find('div')
          .at(12)
          .props().children
      ).toBe('userOffice')
    })

    it('should display the user email', () => {
      expect(
        wrapper
          .find('div')
          .at(13)
          .props().children
      ).toBe('some@email.com')
    })
  })

  describe('changesMadeBy', () => {
    it('should display the admin name', () => {
      expect(
        wrapper
          .find('div')
          .at(18)
          .props().children
      ).toBe('adminName')
    })

    it('should display the admin role', () => {
      expect(
        wrapper
          .find('div')
          .at(19)
          .props().children
      ).toBe('roleOne')
    })

    it('should display the admin county name', () => {
      expect(
        wrapper
          .find('div')
          .at(21)
          .props().children
      ).toBe('countyName')
    })

    it('should display the admin office name', () => {
      expect(
        wrapper
          .find('div')
          .at(23)
          .props().children
      ).toBe('adminOffice')
    })

    it('should display the admin email', () => {
      expect(
        wrapper
          .find('div')
          .at(24)
          .props().children
      ).toBe('some@email.com')
    })
  })

  describe('change details', () => {
    it('should display the formated date and time of the event', () => {
      expect(
        wrapper
          .find('div')
          .at(28)
          .props().children
      ).toBe('January 23, 2019 10:09 AM')
    })

    it('should display the event type', () => {
      expect(
        wrapper
          .find('div')
          .at(30)
          .props().children
      ).toBe('User Email Changed')
    })

    it('should display the old Value before event', () => {
      expect(
        wrapper
          .find('div')
          .at(32)
          .props().children
      ).toBe('OldValue')
    })

    it('should display the new Value after event', () => {
      expect(
        wrapper
          .find('div')
          .at(34)
          .props().children
      ).toBe('ChangedValue')
    })
  })
})
