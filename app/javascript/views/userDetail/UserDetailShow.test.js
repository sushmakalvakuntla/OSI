import React from 'react'
import { shallow } from 'enzyme'
import UserDetailShow from './UserDetailShow'

describe('UserDetailShow', () => {
  const details = {
    id: 'id',
    first_name: 'Firstname0',
    last_name: 'Lastname0',
    middle_name: 'Middlename0',
    county_name: 'MyCounty',
    status: 'FORCE_CHANGE_PASSWORD',
  }
  const userDetailObject = {
    editable: true,
    user: {},
  }

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<UserDetailShow details={details} />)
  })

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      wrapper = shallow(<UserDetailShow details={details} userDetailObject={userDetailObject} />)
      expect(wrapper.find('Cards').props().cardHeaderText).toBe(`County: ${details.county_name}`)
      expect(wrapper.find('ShowField').length).toBe(12)
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toEqual('Full Name')
      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toEqual('Office Name')
      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toEqual('CWS Login')
      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toEqual('Role')
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toEqual('Email')
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toEqual('Office Phone Number')
      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toEqual('Start Date')
      expect(
        wrapper
          .find('ShowField')
          .at(7)
          .props().label
      ).toEqual('Last Login')
      expect(
        wrapper
          .find('ShowField')
          .at(8)
          .props().label
      ).toEqual('Phone Number')
      expect(
        wrapper
          .find('ShowField')
          .at(9)
          .props().label
      ).toEqual('User Status')
      expect(
        wrapper
          .find('ShowField')
          .at(10)
          .props().label
      ).toEqual('Account Status')
      expect(
        wrapper
          .find('ShowField')
          .at(11)
          .props().label
      ).toEqual('Assigned Permissions')
    })

    it('renders the <ShowField/> props.children at label:fullName', () => {
      const expectedValue = [
        `${details.last_name}`,
        `${', '}`,
        `${details.first_name}`,
        `${' '}`,
        `${details.middle_name}`,
      ]
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().children
      ).toEqual(expectedValue)
    })

    it('sets card disabled prop to true based on disableEditBtn', () => {
      wrapper = shallow(<UserDetailShow details={details} disableEditBtn={true} />)
      expect(wrapper.find('Cards').props().disabled).toEqual(true)
    })

    describe('resend', () => {
      it('when user Status is FORCE_CHANGE_PASSWORD and no registrationResentDateTime it returns empty', () => {
        const details = {
          id: 'id',
          first_name: 'Firstname0',
          last_name: 'Lastname0',
          middle_name: 'Middlename0',
          county_name: 'MyCounty',
          status: 'FORCE_CHANGE_PASSWORD',
          last_registration_resubmit_date_time: null,
        }
        const wrapper = shallow(<UserDetailShow details={details} />)
        expect(wrapper.find('Button').length).toEqual(1)
        expect(wrapper.find('Button').props().btnName).toBe('Resend Invite')
        expect(wrapper.find('.resend-email-text').length).toEqual(0)
      })

      it('when user Status is FORCE_CHANGE_PASSWORD and registrationResentDateTime exists returns date in readable format', () => {
        const details = {
          id: 'id',
          first_name: 'Firstname0',
          last_name: 'Lastname0',
          middle_name: 'Middlename0',
          county_name: 'MyCounty',
          status: 'FORCE_CHANGE_PASSWORD',
        }
        const wrapper = shallow(
          <UserDetailShow details={details} disableEditBtn={true} disableResendEmailButton={true} />
        )
        expect(wrapper.find('Button').length).toEqual(1)
        expect(wrapper.find('Button').props().btnName).toBe('Resend Invite')
        expect(wrapper.find('Button').props().disabled).toBe(true)
      })

      describe('', () => {
        const details = {
          id: 'id',
          first_name: 'Firstname0',
          last_name: 'Lastname0',
          middle_name: 'Middlename0',
          county_name: 'MyCounty',
          status: 'FORCE_CHANGE_PASSWORD',
          last_registration_resubmit_date_time: null,
        }
        const wrapper = shallow(<UserDetailShow details={details} />)

        it('Resend invite button is disabled if user is not editable', () => {
          wrapper.setProps({ disableEditBtn: true, disableResendEmailButton: false })
          expect(wrapper.find('Button').props().disabled).toBe(true)
        })

        it('Resend button is not disabled if user is editable and before registration email has been sent', () => {
          wrapper.setProps({ disableEditBtn: false, disableResendEmailButton: false })
          expect(wrapper.find('Button').props().disabled).toBe(false)
        })

        it('Resend button is disabled if user is editable & after registration email has been sent', () => {
          wrapper.setProps({ disableEditBtn: false, disableResendEmailButton: true })
          expect(wrapper.find('Button').props().disabled).toBe(true)
        })
      })
    })
  })
})
