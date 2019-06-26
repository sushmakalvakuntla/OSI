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
    email: 'hello@gmail.com',
  }

  const onDropDownChangeSpy = jest.fn()
  const onInputChangeSpy = jest.fn()

  const rolesList = [{ id: 'role1', name: 'roleOne' }, { id: 'role2', name: 'roleTwo' }]
  const possibleRoles = [{ value: 'role1', label: 'roleOne' }, { value: 'role2', label: 'roleTwo' }]
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

      expect(
        wrapper
          .find('InputComponent')
          .at(3)
          .props().label
      ).toEqual('Cell Phone Number')
      expect(wrapper.find('[label="Account Status"]').exists()).toBe(true)
      expect(wrapper.find('[label="Assigned Permissions"]').exists()).toBe(true)
      expect(wrapper.find('[label="Email"]').exists()).toBe(true)
    })

    it('renders the <ShowField/> children at label:fullName', () => {
      const expectedValue = [`${details.last_name}`, `${', '}`, `${details.first_name}`, `${' '}`, `${details.middle_name}`]
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().children
      ).toEqual(expectedValue)
    })
  })

  describe('Resend invite', () => {
    const details = {
      id: 'id',
      first_name: 'Firstname0',
      last_name: 'Lastname0',
      middle_name: 'Middlename0',
      county_name: 'MyCounty',
      status: 'FORCE_CHANGE_PASSWORD',
      roles: ['ROLE1', 'ROLE2'],
      permissions: ['x', 'y'],
      racfid: 'my RACFID',
      email: 'hello@gmail.com',
    }
    const wrapper = shallow(
      <UserDetailEdit
        details={details}
        onDropDownChange={onDropDownChangeSpy}
        possibleRolesList={possibleRoles}
        possiblePermissionsList={possiblePermissionsList}
        rolesList={rolesList}
        onInputChange={onInputChangeSpy}
      />
    )

    it('Resend invite button is available when status is FORCE_CHANGE_PASSWORD', () => {
      expect(wrapper.find('Button').length).toBe(1)
    })

    it('Resend invite button is not available when status is CONFIRMED', () => {
      const details = {
        id: 'id',
        first_name: 'Firstname0',
        last_name: 'Lastname0',
        middle_name: 'Middlename0',
        county_name: 'MyCounty',
        status: 'CONFIRMED',
        roles: ['ROLE1', 'ROLE2'],
        permissions: ['x', 'y'],
        racfid: 'my RACFID',
        email: 'hello@gmail.com',
      }
      const wrapper = shallow(
        <UserDetailEdit
          details={details}
          onDropDownChange={onDropDownChangeSpy}
          possibleRolesList={possibleRoles}
          possiblePermissionsList={possiblePermissionsList}
          rolesList={rolesList}
          onInputChange={onInputChangeSpy}
        />
      )
      expect(wrapper.find('Button').length).toBe(0)
    })

    it('Resend button is disabled if user is editable & after registration email has been sent', () => {
      wrapper.setProps({ disableResendEmailButton: true })
      expect(wrapper.find('Button').props().disabled).toBe(true)
    })

    it('Resend button is disabled if user is editable & after registration email has not been sent', () => {
      wrapper.setProps({ disableResendEmailButton: false })
      expect(wrapper.find('Button').props().disabled).toBe(false)
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
      const permissions = [{ value: 'permission1', label: 'permissionOne' }, { value: 'permission2', label: 'permissionTwo' }]
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
          target: { value: '3334445555' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_number', 3334445555)
    })

    it('#PhoneNumber, handleInputChange function is called & returns phone number with zeros ', () => {
      wrapper
        .find('InputComponent')
        .at(1)
        .simulate('change', {
          target: { value: '3094405055' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_number', 3094405055)
    })

    it('#PhoneNumber, handleInputChange function is called & returns empty', () => {
      wrapper
        .find('InputComponent')
        .at(1)
        .simulate('change', {
          target: { value: 'Hello' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_number', '')
    })

    it('#PhoneExtensionNumber, handleInputChange function is called when onChange event triggered', () => {
      wrapper
        .find('InputComponent')
        .at(2)
        .simulate('change', {
          target: { value: '333' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_extension_number', '333')
    })

    it('#PhoneExtensionNumber, handleInputChange function is called & returns ext with zeros', () => {
      wrapper
        .find('InputComponent')
        .at(2)
        .simulate('change', {
          target: { value: '300' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('phone_extension_number', '300')
    })

    it('#CellPhoneNumber, handleInputChange function is called when onChange event triggered', () => {
      wrapper
        .find('InputComponent')
        .at(3)
        .simulate('change', {
          target: { value: '1234567891' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('cell_phone_number', 1234567891)
    })

    it('#CellPhoneNumber, handleInputChange function is called & returns ext with zeros', () => {
      wrapper
        .find('InputComponent')
        .at(3)
        .simulate('change', {
          target: { value: '1000000000' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('cell_phone_number', 1000000000)
    })

    it('#CellPhoneNumber, handleInputChange function is called & returns empty if not numbers are provided', () => {
      wrapper
        .find('InputComponent')
        .at(3)
        .simulate('change', {
          target: { value: 'asdfasd' },
        })
      expect(onInputChangeSpy).toHaveBeenCalledWith('cell_phone_number', '')
    })
  })
})
