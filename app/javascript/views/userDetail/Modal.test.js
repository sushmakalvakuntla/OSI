import React from 'react'
import { shallow } from 'enzyme'
import ModalComponent from './Modal'

describe('ChangeLog', () => {
  let wrapper

  const props = {
    data: {
      event_type: 'User Email Changed',
      timestamp: '2019-01-23 10:09:21',
      event: {
        admin_name: 'adminName',
        admin_role: 'roleOne',
        user_name: 'UserName',
        user_roles: 'roleThree',
        new_value: 'ChangedValue',
        old_value: 'OldValue',
      },
    },
  }
  beforeEach(() => {
    wrapper = shallow(<ModalComponent {...props} />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Button').exists()).toBe(true)
    expect(wrapper.find('Modal').exists()).toBe(true)
    expect(wrapper.find('ModalHeader').exists()).toBe(true)
    expect(wrapper.find('ModalBody').exists()).toBe(true)
  })

  it('toggles the ModelOpen', () => {
    wrapper.setState({ ModalOpen: false })
    const instance = wrapper.instance()
    instance.toggle({
      ModalOpen: true,
    })
    expect(instance.state.ModalOpen).toEqual(true)
  })

  describe('changeLogDetails', () => {
    it('should render avatar with size large', () => {
      expect(wrapper.find('Avatar').length).toEqual(1)
      expect(wrapper.find('Avatar').props().size).toEqual('lg')
    })

    it('should display the user name', () => {
      expect(
        wrapper
          .find('div')
          .at(8)
          .props().children
      ).toBe('UserName')
    })

    it('should display the user role', () => {
      expect(
        wrapper
          .find('div')
          .at(9)
          .props().children
      ).toBe('roleThree')
    })

    it('should display the admin name', () => {
      expect(
        wrapper
          .find('div')
          .at(13)
          .props().children
      ).toBe('adminName')
    })

    it('should display the admin role', () => {
      expect(
        wrapper
          .find('div')
          .at(14)
          .props().children
      ).toBe('roleOne')
    })

    describe('change details', () => {
      it('should display the formated date and time of the event', () => {
        expect(
          wrapper
            .find('div')
            .at(18)
            .props().children
        ).toBe('Change date: January 23, 2019 10:09 AM')
      })

      it('should display the event type', () => {
        expect(
          wrapper
            .find('div')
            .at(19)
            .props().children
        ).toBe('Change type: User Email Changed')
      })

      it('should display the old Value before event', () => {
        expect(
          wrapper
            .find('div')
            .at(20)
            .props().children
        ).toBe('Change from: OldValue')
      })

      it('should display the new Value after event', () => {
        expect(
          wrapper
            .find('div')
            .at(21)
            .props().children
        ).toBe('Change to: ChangedValue')
      })
    })
  })
})
