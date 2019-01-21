import React from 'react'
import { shallow } from 'enzyme'
import UserDetailEdit from './UserDetailEdit'

describe('UserDetailEdit', () => {
  const details = {
    id: 'id',
    first_name: 'Firstname0',
    last_name: 'Lastname0',
    middle_name: 'Middlename0',
    office: 'officeNames',
    county_name: 'MyCounty',
    permissions: ['x', 'y'],
    racfid: 'my RACFID',
    roles: ['ROLE1', 'ROLE2'],
    status: 'FORCE_CHANGE_PASSWORD',
    last_registration_resubmit_date_time: '2012-09-22 11:22:33',
    email: 'hello@gmail.com',
  }

  const onDropDownChangeSpy = jest.fn()
  const onInputChangeSpy = jest.fn()

  const rolesList = [{ id: 'role1', name: 'roleOne' }, { id: 'role2', name: 'roleTwo' }]
  const possibleRoles = [{ value: 'role1', label: 'roleOne' }, { value: 'role2', label: 'roleTwo' }]
  const resentRegistrationExistingDateTime = 'September 22, 2012 11:22 AM'
  const possiblePermissionsList = [
    { value: 'permission1', label: 'permissionOne' },
    { value: 'permission2', label: 'permissionTwo' },
  ]
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <UserDetailEdit
        details={details}
        onDropDownChange={onDropDownChangeSpy}
        possibleRolesList={possibleRoles}
        possiblePermissionsList={possiblePermissionsList}
        rolesList={rolesList}
        onInputChange={onInputChangeSpy}
        resentRegistrationExistingDateTime={resentRegistrationExistingDateTime}
      />
    )
  })

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      expect(wrapper.find('Cards').props().cardHeaderText).toBe(`County: ${details.county_name}`)

      expect(wrapper.find('ShowField').length).toBe(7)
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
      ).toEqual('Office Phone Number')
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toEqual('Start Date')
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toEqual('Last Login')
      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toEqual('User Status')
      expect(
        wrapper
          .find('InputComponent')
          .at(0)
          .props().label
      ).toEqual('Email')
      expect(
        wrapper
          .find('InputComponent')
          .at(1)
          .props().label
      ).toEqual('Phone Number')
      expect(
        wrapper
          .find('InputComponent')
          .at(2)
          .props().label
      ).toEqual('Ext')
      expect(wrapper.find('[label="Account Status"]').exists()).toBe(true)
      expect(wrapper.find('[label="Assigned Permissions"]').exists()).toBe(true)
      expect(wrapper.find('[label="Email"]').exists()).toBe(true)
      expect(wrapper.find('.resend-email-text').text()).toEqual('Registration email resent:September 22, 2012 11:22 AM')
    })

    it('returns empty text without className when value for last_registration_resubmit_date_time is null', () => {
      const details = {
        id: 'id',
        first_name: 'Firstname0',
        last_name: 'Lastname0',
        middle_name: 'Middlename0',
        office: 'officeNames',
        county_name: 'MyCounty',
        permissions: ['x', 'y'],
        racfid: 'my RACFID',
        roles: ['ROLE1', 'ROLE2'],
        status: 'FORCE_CHANGE_PASSWORD',
        last_registration_resubmit_date_time: null,
      }
      wrapper = shallow(
        <UserDetailEdit
          details={details}
          possibleRolesList={possibleRoles}
          possiblePermissionsList={possiblePermissionsList}
        />
      )
      expect(wrapper.find('.resend-email-text').length).toEqual(0)
    })

    it('when user Status is FORCE_CHANGE_PASSWORD and registrationResentDateTime exists returns date in readable format', () => {
      const details = {
        id: 'id',
        roles: ['ROLE1', 'ROLE2'],
        status: 'FORCE_CHANGE_PASSWORD',
        last_registration_resubmit_date_time: null,
        permissions: ['permission1', 'permission2'],
      }
      const resentRegistrationNewDateTime = 'September 8, 2018 08:06 AM'
      const wrapper = shallow(
        <UserDetailEdit
          details={details}
          resentRegistrationNewDateTime={resentRegistrationNewDateTime}
          possibleRolesList={possibleRoles}
          possiblePermissionsList={possiblePermissionsList}
        />
      )
      expect(wrapper.find('.resend-email-text').text()).toEqual('Registration email resent:September 8, 2018 08:06 AM')
    })

    it('renders the <ShowField/> children at label:fullName', () => {
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
  })

  describe('#onChange', () => {
    it('#Assign Status, onStatusChange function is called when onChange event triggered ', () => {
      const value = 'Active'
      wrapper.find('#StatusDropDown').simulate('change', { value })
      expect(onDropDownChangeSpy).toHaveBeenCalledWith('enabled', value)
    })

    it('#AssignRoles, onRoleChange function is called when onChange event triggered ', () => {
      const value = 'Asian'
      wrapper.find('#RolesDropDown').simulate('change', { value })
      expect(onDropDownChangeSpy).toHaveBeenCalledWith('roles', [value])
    })

    it('#AssignPermissions, onPermissionChange function is called when onChange event triggered ', () => {
      const permissions = [
        { value: 'permission1', label: 'permissionOne' },
        { value: 'permission2', label: 'permissionTwo' },
      ]
      wrapper.find('#AssignPermissions').simulate('change', permissions)
      expect(onDropDownChangeSpy).toHaveBeenCalledWith('permissions', ['permission1', 'permission2'])
    })

    it('#Email, handleInputChange function is called when onChange event triggered', () => {
      wrapper
        .find('InputComponent')
        .at(0)
        .simulate('change', {
          target: { value: 'abcd@gmail.com' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('email', 'abcd@gmail.com')
    })

    it('#PhoneNumber, handleInputChange function is called when onChange event triggered', () => {
      wrapper
        .find('InputComponent')
        .at(1)
        .simulate('change', {
          target: { value: '3334445555', validity: { valid: true } },
        })

      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_number', '3334445555')
    })

    it('#PhoneExtensionNumber, handleInputChange function is called when onChange event triggered', () => {
      wrapper
        .find('InputComponent')
        .at(2)
        .simulate('change', {
          target: { value: '333', validity: { valid: true } },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_extension_number', 333)
    })
  })
})
