import {
  selectDetailRecords,
  isUserEditable,
  fetchingStatus,
  selectUserDetailObject,
  disableRolesDropDown,
  selectStartDate,
  userStatusDescription,
  userStatus,
  selectPossibleRolesList,
  selectAccountStatus,
  selectAssignedPermissions,
  selectCWSPrivileges,
  officeName,
  selectPossiblePermissionsList,
  selectModifiedDetails,
  formattedDateTime,
  assignedRoles,
  lastLogin,
  formattedPhoneNumber,
  unformattedPhoneNumber,
  phoneExtension,
  userNotes,
  isPermissionsEmpty,
  isUserLocked,
  checkStatus,
  statusButtonProperties,
  cellPhoneNumber,
} from './detailSelector'

describe('selectors', () => {
  const editDetails = {
    edit_details: {
      editable: true,
      roles: { possible_values: ['role1', 'role2'] },
    },
    user: {},
  }
  const initialState = {
    fetchDetails: {
      details: {
        XHRStatus: 'ready',
        records: editDetails,
      },
    },
  }

  const getState = ({
    isEnabled,
    startDate,
    countyName,
    disableActionBtn,
    assignedPermissions,
    possibleRoles,
    isRolesEditable,
    isDetailsEditable,
    status,
    rolesList,
    permissionsList,
    possiblePermissions,
    officeId,
    email,
    assignedRoles,
    fetchDetailsError,
    lastLoginDateTime,
    phoneNumber,
    phoneExtensionNumber,
    officePhoneNumber,
    officePhoneExtensionNumber,
    auditEvents,
    notes,
    CWSPrivileges,
    isUserLocked,
    cellPhoneNumber,
  }) => {
    return {
      fetchDetails: {
        fetchDetailsError: fetchDetailsError,
        disableActionBtn: disableActionBtn,
        initialDetails: {
          user: {
            permissions: 'permissionOne, permissionTwo',
            roles: 'roleOne',
            email: 'hello@gmail.com',
            enabled: true,
            phone_number: '3334445555',
            phone_extension_number: '222',
            notes: 'This is the content of my notes',
            cell_phone_number: '2000000000',
          },
        },
        details: {
          records: {
            edit_details: {
              editable: isDetailsEditable,
              permissions: {
                possible_values: possiblePermissions,
                editable: true,
              },
              roles: {
                possible_values: possibleRoles,
                editable: isRolesEditable,
              },
            },
            user: {
              enabled: isEnabled,
              start_date: startDate,
              county_name: countyName,
              permissions: assignedPermissions,
              status: status,
              office_id: officeId,
              email: email,
              roles: assignedRoles,
              phone_number: phoneNumber,
              phone_extension_number: phoneExtensionNumber,
              office_phone_number: officePhoneNumber,
              office_phone_extension_number: officePhoneExtensionNumber,
              last_login_date_time: lastLoginDateTime,
              notes: notes,
              cws_privileges: CWSPrivileges,
              locked: isUserLocked,
              cell_phone_number: cellPhoneNumber,
            },
            auditevents: auditEvents,
          },
        },
      },
      fetchPermissions: {
        permissions: permissionsList,
      },
      fetchRoles: {
        roles: rolesList,
      },
      fetchOffices: {
        offices: [{ office_id: 'north', office_name: 'North Office' }, { office_id: 'south', office_name: 'South Office' }],
      },
    }
  }

  describe('#selectUserDetailObject', () => {
    it('selects the user detail object when records exists', () => {
      expect(selectUserDetailObject(initialState)).toEqual(editDetails)
    })

    it('selects the user detail object when fetchDetails does not exist', () => {
      const state = {}
      expect(selectUserDetailObject(state)).toEqual(null)
    })

    it('selects the user detail object when fetchDetails exist', () => {
      const state = {
        fetchDetails: {},
      }
      expect(selectUserDetailObject(state)).toEqual(null)
    })

    it('selects the user detail object when details are empty', () => {
      const state = {
        fetchDetails: {
          details: {},
        },
      }
      expect(selectUserDetailObject(state)).toEqual(undefined)
    })
  })

  describe('#cwsPrivileges', () => {
    const CWSPrivileges = [{ category: 'Access Authority', privilege: 'Adoptions' }]

    it('selects the CWS privileges', () => {
      const state = getState({ CWSPrivileges: CWSPrivileges })
      expect(selectCWSPrivileges(state)).toEqual(CWSPrivileges)
    })

    it('selects an empty array when there are no CWS privileges', () => {
      const state = getState({})
      expect(selectCWSPrivileges(state)).toEqual([])
    })

    it('selects an empty array when CWSPrivileges is undefined ', () => {
      const state = getState({ CWSPrivileges: undefined })
      expect(selectCWSPrivileges(state)).toEqual([])
    })

    it('selects an empty array when CWSPrivileges is null ', () => {
      const state = getState({ CWSPrivileges: null })
      expect(selectCWSPrivileges(state)).toEqual([])
    })
  })

  describe('#accountStatus', () => {
    it('return Active when enabled is true ', () => {
      const state = getState({ isEnabled: true })
      expect(selectAccountStatus(state)).toEqual('Active')
    })

    it('return Inactive when enabled is false ', () => {
      const state = getState({ isEnabled: false })
      expect(selectAccountStatus(state)).toEqual('Inactive')
    })
  })

  describe('#selectStartDate', () => {
    describe('When date exists ', () => {
      it('returns formated date', () => {
        const state = getState({ startDate: '2001-09-01' })
        expect(selectStartDate(state)).toEqual('09/01/2001')
      })
    })

    describe('When date is an empty string', () => {
      it('returns empty string ', () => {
        const state = getState({ startDate: '' })
        expect(selectStartDate(state)).toEqual('')
      })
    })
  })

  describe('#officeName', () => {
    describe('When officeId exists ', () => {
      it('returns officeName', () => {
        const state = getState({ officeId: 'north' })
        expect(officeName(state)).toEqual('North Office')
      })
    })

    describe('When officeId is an empty string', () => {
      it('returns empty string ', () => {
        const state = getState({ officeId: '' })
        expect(officeName(state)).toEqual('')
      })
    })
  })

  describe('#selectDetailRecords', () => {
    it('selects the user detail records ', () => {
      const state = getState({
        isEnabled: false,
        countyName: 'first',
        startDate: '11/11/1111',
        assignedPermissions: ['a', 'b'],
        status: 'Hello',
      })
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: false,
        permissions: ['a', 'b'],
        start_date: '11/11/1111',
        status: 'Hello',
      })
    })

    it('returns empty when fetchDetails does not exit', () => {
      const state = {}
      expect(selectDetailRecords(state)).toEqual({})
    })

    it('returns empty when fetchDetails returns unknown user', () => {
      const state = { fetchDetails: { details: { records: {} } } }
      expect(selectDetailRecords(state)).toEqual({})
    })
  })

  describe('#selectAssignedPermissions', () => {
    const permissionsList = [
      { name: 'permission1', description: 'permissionOne' },
      { name: 'permission2', description: 'permissionTwo' },
      { name: 'permission3', description: 'permissionThree' },
    ]
    describe('When assignedPermissions exists ', () => {
      it('returns description/label with matched value', () => {
        const state = getState({ assignedPermissions: ['permission1'], permissionsList })
        expect(selectAssignedPermissions(state)).toEqual('permissionOne')
      })
    })

    describe('When assignedPermissions is null ', () => {
      it('returns empty', () => {
        const state = getState({ assignedPermissions: null, permissionsList })
        expect(selectAssignedPermissions(state)).toEqual('')
      })
    })

    describe('When assignedPermissions is undefined', () => {
      it('returns empty', () => {
        const state = getState({ assignedPermissions: undefined, permissionsList })
        expect(selectAssignedPermissions(state)).toEqual('')
      })
    })

    describe('When assignedPermissions and permissionsList are null', () => {
      it('returns empty', () => {
        const state = getState({ assignedPermissions: null, permissionsList: null })
        expect(selectAssignedPermissions(state)).toEqual('')
      })
    })
  })

  describe('#selectPossiblePermissionsList', () => {
    const permissionsList = [
      { name: 'permission1', description: 'permissionOne' },
      { name: 'permission2', description: 'permissionTwo' },
      { name: 'permission3', description: 'permissionThree' },
    ]
    it('renders the description of a permission given possiblePermission with permission name', () => {
      const possiblePermissions = ['permission1', 'permission2']
      const expectedValue = [{ value: 'permission1', label: 'permissionOne' }, { value: 'permission2', label: 'permissionTwo' }]
      const state = getState({
        possiblePermissions: possiblePermissions,
        permissionsList: permissionsList,
      })
      expect(selectPossiblePermissionsList(state)).toEqual(expectedValue)
    })
  })

  describe('#selectPossibleRolesList', () => {
    const rolesList = [{ id: 'role1', name: 'roleOne' }, { id: 'role2', name: 'roleTwo' }, { id: 'role3', name: 'roleThree' }]
    it('renders the name of a role given possibleRoles with role_id', () => {
      const possibleRoles = ['role1', 'role2']
      const expectedValue = [{ value: 'role1', label: 'roleOne' }, { value: 'role2', label: 'roleTwo' }]
      const state = getState({
        possibleRoles: possibleRoles,
        rolesList: rolesList,
      })
      expect(selectPossibleRolesList(state)).toEqual(expectedValue)
    })
  })

  describe('#isUserEditable', () => {
    it('returns true when editable is true', () => {
      const state = getState({ isDetailsEditable: true })
      expect(isUserEditable(state)).toEqual(true)
    })

    it('returns false when editable is false', () => {
      const state = getState({ isDetailsEditable: false })
      expect(isUserEditable(state)).toEqual(false)
    })

    it('returns false when editable is null', () => {
      const state = getState({ isDetailsEditable: null })
      expect(isUserEditable(state)).toEqual(false)
    })

    it('returns false if editable is not available', () => {
      const state = getState({ fetchDetails: {} })
      expect(isUserEditable(state)).toEqual(false)
    })
  })

  describe('#isUserLocked', () => {
    it('returns true when locked is true', () => {
      const state = getState({ isUserLocked: true })
      expect(isUserLocked(state)).toEqual(true)
    })

    it('returns undefined if locked is not available', () => {
      const state = getState({ fetchDetails: {} })
      expect(isUserLocked(state)).toEqual(undefined)
    })
  })

  describe('#statusButtonProperties', () => {
    const buttonProperties = {
      buttonType: 'primary',
      className: 'lockedStatus',
      headerButtonLabel: 'LOCKED',
      isDisabled: true,
      systemStatus: 'This user has been locked for too many login attempts:',
    }
    it('returns buttonProperties when locked is true', () => {
      const state = getState({ isUserLocked: true })
      expect(statusButtonProperties(state)).toEqual(buttonProperties)
    })

    it('returns undefined when locked is false', () => {
      const state = getState({ isUserLocked: false })
      expect(statusButtonProperties(state)).toEqual(undefined)
    })

    it('returns undefined when locked is null', () => {
      const state = getState({ isUserLocked: null })
      expect(statusButtonProperties(state)).toEqual(undefined)
    })

    it('returns undefined when locked is undefined', () => {
      const state = getState({ isUserLocked: undefined })
      expect(statusButtonProperties(state)).toEqual(undefined)
    })
  })

  describe('#checkStatus', () => {
    const editableProperties = {
      headerButtonLabel: 'UNLOCK USER',
      systemStatus: `This user has been locked for too many login attempts:`,
      className: 'lockedStatus',
      isDisabled: false,
      buttonType: 'primary',
    }
    const nonEditableProperties = {
      systemStatus: `This user has been locked for too many login attempts:`,
      headerButtonLabel: 'LOCKED',
      isDisabled: true,
      className: 'lockedStatus',
      buttonType: 'primary',
    }
    it('returns editable properties when editable is true', () => {
      const state = getState({ isDetailsEditable: true })
      expect(checkStatus(state)).toEqual(editableProperties)
    })

    it('returns non editable properties when editable is false', () => {
      const state = getState({ isDetailsEditable: false })
      expect(checkStatus(state)).toEqual(nonEditableProperties)
    })

    it('returns non editable properties when editable is null', () => {
      const state = getState({ isDetailsEditable: null })
      expect(checkStatus(state)).toEqual(nonEditableProperties)
    })

    it('returns non editable properties when editable is undefined', () => {
      const state = getState({ isDetailsEditable: undefined })
      expect(checkStatus(state)).toEqual(nonEditableProperties)
    })
  })

  describe('#userStatusDescription', () => {
    describe('return a description based on user status value ', () => {
      it('return description when status is UNCONFIRMED', () => {
        const state = getState({ status: 'UNCONFIRMED' })
        expect(userStatusDescription(state)).toEqual('User has been created but not confirmed.')
      })

      it('return description when status is CONFIRMED ', () => {
        const state = getState({ status: 'CONFIRMED' })
        expect(userStatusDescription(state)).toEqual('User has been confirmed.')
      })

      it('return description when status is ARCHIVED  ', () => {
        const state = getState({ status: 'ARCHIVED' })
        expect(userStatusDescription(state)).toEqual('User is no longer active.')
      })

      it('return description when status is COMPROMISED  ', () => {
        const state = getState({ status: 'COMPROMISED' })
        expect(userStatusDescription(state)).toEqual('User is disabled due to a potential security threat.')
      })

      it('return description when status is UNKNOWN  ', () => {
        const state = getState({ status: 'UNKNOWN' })
        expect(userStatusDescription(state)).toEqual('User status is not known.')
      })

      it('return description when status is RESET_REQUIRED ', () => {
        const state = getState({ status: 'RESET_REQUIRED' })
        expect(userStatusDescription(state)).toEqual('Need to reset user.')
      })

      it('return description when status is FORCE_CHANGE_PASSWORD ', () => {
        const state = getState({ status: 'FORCE_CHANGE_PASSWORD' })
        expect(userStatusDescription(state)).toEqual('User has never logged in.')
      })

      it('return empty string when status is other ', () => {
        const state = getState({ status: 'ASDFGADFASD' })
        expect(userStatusDescription(state)).toEqual('')
      })

      it('return empty string when status is empty ', () => {
        const state = getState({ status: '' })
        expect(userStatusDescription(state)).toEqual('')
      })
    })
  })

  describe('#userStatus', () => {
    describe('return user friendly text based on user status value ', () => {
      it('return userStatus friendly text when status is CONFIRMED ', () => {
        const state = getState({ status: 'CONFIRMED' })
        expect(userStatus(state)).toEqual('Confirmed')
      })

      it('return userStatus friendly text when status is FORCE_CHANGE_PASSWORD ', () => {
        const state = getState({ status: 'FORCE_CHANGE_PASSWORD' })
        expect(userStatus(state)).toEqual('Registration Incomplete')
      })

      it('return empty when status is other ', () => {
        const state = getState({ status: 'ASDFGADFASD' })
        expect(userStatus(state)).toEqual('')
      })

      it('return empty when status is empty ', () => {
        const state = getState({ status: '' })
        expect(userStatus(state)).toEqual('')
      })
    })
  })

  describe('#disableRolesDropDown', () => {
    it('return true when editable is false', () => {
      const state = getState({ isRolesEditable: false })
      expect(disableRolesDropDown(state)).toEqual(true)
    })

    it('return false if editable is true', () => {
      const state = getState({ isRolesEditable: true })
      expect(disableRolesDropDown(state)).toEqual(false)
    })

    it('return true if editable is null', () => {
      const state = getState({ isRolesEditable: null })
      expect(disableRolesDropDown(state)).toEqual(true)
    })

    it('return true if editable is undefined ', () => {
      const state = getState({ isRolesEditable: undefined })
      expect(disableRolesDropDown(state)).toEqual(true)
    })
  })

  describe('#fetchingStatus', () => {
    it('return the value of the details XHR status', () => {
      expect(fetchingStatus(initialState)).toEqual('ready')
    })
  })

  describe('#selectModifiedDetails', () => {
    describe('compares the updated details with initial details and returns only updated value with remaining details as undefined', () => {
      it('returns undefined when updated values are same as initial values', () => {
        const state = getState({
          permissions: 'permissionOne, permissionTwo',
          roles: 'roleOne',
          email: 'hello@gmail.com',
          enabled: true,
          phoneNumber: '3334445555',
          phoneExtensionNumber: '222',
          notes: 'This is the content of my notes',
          cellPhoneNumber: '2000000000',
        })
        const expectedValue = {
          email: undefined,
          enabled: undefined,
          permissions: undefined,
          roles: undefined,
          phoneNumber: undefined,
          phoneExtensionNumber: undefined,
          notes: undefined,
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated details', () => {
        const state = getState({
          assignedPermissions: 'permissionFour, permissionFive',
          assignedRoles: 'roleThree',
          email: 'hellocwds@gmail.com',
          isEnabled: false,
          isRolesEditable: true,
          phoneNumber: '3334448989',
          phoneExtensionNumber: '225',
          notes: 'This is the content of my updated notes',
        })
        const expectedValue = {
          email: 'hellocwds@gmail.com',
          enabled: false,
          permissions: 'permissionFour, permissionFive',
          roles: 'roleThree',
          phone_number: '3334448989',
          phone_extension_number: '225',
          notes: 'This is the content of my updated notes',
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated email', () => {
        const state = getState({
          email: 'abcdefg@gmail.com',
          assignedRoles: 'roleOne',
          isRolesEditable: true,
          phoneNumber: '3334445555',
          phoneExtensionNumber: '222',
          notes: 'This is the content of my notes',
        })
        const expectedValue = {
          email: 'abcdefg@gmail.com',
          enabled: undefined,
          permissions: undefined,
          roles: undefined,
          notes: undefined,
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated role when only when roles are editable', () => {
        const state = getState({
          assignedRoles: 'roleTwo',
          isRolesEditable: true,
          phoneNumber: '3334445555',
          phoneExtensionNumber: '222',
          notes: 'This is the content of my notes',
        })
        const expectedValue = {
          email: undefined,
          enabled: undefined,
          permissions: undefined,
          roles: 'roleTwo',
          notes: undefined,
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated enabled', () => {
        const state = getState({
          isEnabled: false,
          assignedPermissions: 'permissionOne, permissionTwo',
          phoneNumber: '3334445555',
          phoneExtensionNumber: '222',
          notes: 'This is the content of my notes',
        })
        const expectedValue = {
          email: undefined,
          enabled: false,
          permissions: undefined,
          roles: undefined,
          notes: undefined,
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated permissions', () => {
        const state = getState({
          assignedPermissions: 'permissionThree',
          isEnabled: true,
          phoneNumber: '3334445555',
          phoneExtensionNumber: '222',
          notes: 'This is the content of my notes',
        })
        const expectedValue = {
          email: undefined,
          enabled: undefined,
          permissions: 'permissionThree',
          roles: undefined,
          notes: undefined,
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated phone number', () => {
        const state = getState({
          assignedPermissions: 'permissionOne, permissionTwo',
          isEnabled: true,
          phoneNumber: '3334445656',
          phoneExtensionNumber: '889',
          notes: 'This is the content of my notes',
        })
        const expectedValue = {
          email: undefined,
          enabled: undefined,
          permissions: undefined,
          roles: undefined,
          phone_number: '3334445656',
          phone_extension_number: '889',
          notes: undefined,
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })

      it('returns updated cell phone number', () => {
        const state = getState({
          assignedPermissions: 'permissionOne, permissionTwo',
          isEnabled: true,
          phoneNumber: '3334445555',
          phoneExtensionNumber: '222',
          notes: 'This is the content of my notes',
          cellPhoneNumber: '1000000000',
        })
        const expectedValue = {
          email: undefined,
          enabled: undefined,
          permissions: undefined,
          roles: undefined,
          phone_number: undefined,
          phone_extension_number: undefined,
          notes: undefined,
          cell_phone_number: '1000000000',
        }
        expect(selectModifiedDetails(state)).toEqual(expectedValue)
      })
    })
  })

  describe('isPermissionsEmpty', () => {
    it('returns false when assignedPermissions are not empty', () => {
      const state = getState({
        assignedPermissions: 'permissionThree',
        isEnabled: true,
        phoneNumber: '3334445555',
        phoneExtensionNumber: '222',
        notes: 'This is the content of my notes',
      })
      expect(isPermissionsEmpty(state)).toEqual(false)
    })

    it('returns true when assignedPermissions are empty', () => {
      const state = getState({
        assignedPermissions: [],
        isEnabled: true,
        phoneNumber: '3334445555',
        phoneExtensionNumber: '222',
        notes: 'This is the content of my notes',
      })
      expect(isPermissionsEmpty(state)).toEqual(true)
    })

    it('returns false when assignedPermissions are not available', () => {
      const state = getState({
        isEnabled: true,
        phoneNumber: '3334445555',
        phoneExtensionNumber: '222',
        notes: 'This is the content of my notes',
      })
      expect(isPermissionsEmpty(state)).toEqual(false)
    })

    it('returns false when assignedPermissions is undefined', () => {
      const state = getState({
        assignedPermissions: undefined,
        isEnabled: true,
        phoneNumber: '3334445555',
      })
      expect(isPermissionsEmpty(state)).toEqual(false)
    })

    it('returns false when assignedPermissions is null', () => {
      const state = getState({
        assignedPermissions: null,
      })
      expect(isPermissionsEmpty(state)).toEqual(false)
    })
  })

  describe('#lastLogin', () => {
    describe('When last login DateTime exists ', () => {
      it('returns date in user friendly format', () => {
        const state = getState({ lastLoginDateTime: '2018-12-24 10:20:30' })
        expect(lastLogin(state)).toEqual('December 24, 2018 10:20 AM')
      })
    })

    describe('When last login DateTime is null ', () => {
      it('returns null', () => {
        const state = getState({ lastLoginDateTime: null })
        expect(lastLogin(state)).toEqual('')
      })
    })

    describe('When last login DateTime is undefined ', () => {
      it('returns just empty', () => {
        const state = getState({ lastLoginDateTime: undefined })
        expect(lastLogin(state)).toEqual('')
      })
    })
  })

  describe('#formattedDateTime', () => {
    describe('When  DateTime exists ', () => {
      it('returns date in user friendly format', () => {
        expect(formattedDateTime('2018-12-24 10:20:30')).toEqual('December 24, 2018 10:20 AM')
      })
    })

    describe('When DateTime is null ', () => {
      it('returns just empty', () => {
        expect(formattedDateTime(null)).toEqual('')
      })
    })

    describe('When  DateTime is undefined ', () => {
      it('returns just empty', () => {
        expect(formattedDateTime(undefined)).toEqual('')
      })
    })
  })

  describe('#assignedRoles', () => {
    const rolesList = [{ id: 'role1', name: 'roleOne' }, { id: 'role2', name: 'roleTwo' }, { id: 'role3', name: 'roleThree' }]
    describe('When assigned Roles exists ', () => {
      it('returns description/label with matched value', () => {
        const state = getState({ assignedRoles: ['role1'], rolesList })
        expect(assignedRoles(state)).toEqual('roleOne')
      })
    })

    describe('When assigned Roles is null ', () => {
      it('returns just empty', () => {
        const state = getState({ assignedRoles: null, rolesList })
        expect(assignedRoles(state)).toEqual('')
      })
    })

    describe('When resent assigned Roles is undefined ', () => {
      it('returns just empty', () => {
        const state = getState({ assignedRoles: undefined, rolesList })
        expect(assignedRoles(state)).toEqual('')
      })
    })

    describe('When assigned roles exist and doesnt match with the value ', () => {
      it('returns just value ', () => {
        const state = getState({ assignedRoles: ['role4'], rolesList })
        expect(assignedRoles(state)).toEqual('role4')
      })
    })

    describe('When rolesList is [] ', () => {
      it('returns just value ', () => {
        const state = getState({ assignedRoles: ['role1'], rolseList: [] })
        expect(assignedRoles(state)).toEqual('role1')
      })
    })
  })

  describe('#formattedPhoneNumber', () => {
    describe('When worker & office phone number & extension exists ', () => {
      it('returns phone & Extension with Ext text ', () => {
        const state = getState({
          phoneNumber: '1114445555',
          phoneExtensionNumber: '22',
          officePhoneNumber: '1114445555',
          officePhoneExtensionNumber: '22',
        })
        expect(formattedPhoneNumber(state)).toEqual({
          officePhoneNumber: '(111) 444-5555 Ext 22',
          workerPhoneNumber: '(111) 444-5555 Ext 22',
        })
      })
    })

    describe('When phone_number exists without extension', () => {
      it('returns phone with ext ', () => {
        const state = getState({
          phoneNumber: '1114445555',
          phoneExtensionNumber: undefined,
          officePhoneNumber: '1114445555',
          officePhoneExtensionNumber: undefined,
        })
        expect(formattedPhoneNumber(state)).toEqual({
          officePhoneNumber: '(111) 444-5555 Ext',
          workerPhoneNumber: '(111) 444-5555 Ext',
        })
      })
    })

    describe('When phone_extension_number exists without phone_number ', () => {
      it('returns just empty ', () => {
        const state = getState({
          phoneNumber: '',
          phoneExtensionNumber: '23',
          officePhoneNumber: null,
          officePhoneExtensionNumber: '21',
        })
        expect(formattedPhoneNumber(state)).toEqual({
          officePhoneNumber: '',
          workerPhoneNumber: '',
        })
      })
    })

    describe('when details is null ', () => {
      it('returns just empty ', () => {
        const state = { fetchDetails: null }
        expect(formattedPhoneNumber(state)).toEqual({
          officePhoneNumber: '',
          workerPhoneNumber: '',
        })
      })
    })

    describe('when details is undefined ', () => {
      it('returns just empty ', () => {
        const state = { fetchDetails: undefined }
        expect(formattedPhoneNumber(state)).toEqual({
          officePhoneNumber: '',
          workerPhoneNumber: '',
        })
      })
    })
  })

  describe('#unformattedPhoneNumber', () => {
    it('returns phone number if phone_number is 11 digits ', () => {
      const state = getState({
        phoneNumber: '19164445555',
      })
      expect(unformattedPhoneNumber(state)).toEqual('9164445555')
    })
  })

  describe('When phone_number is 10 digits', () => {
    it('returns phone number without stripping out 1 ', () => {
      const state = getState({
        phoneNumber: '9164445555',
      })
      expect(unformattedPhoneNumber(state)).toEqual('9164445555')
    })
  })

  describe('When phone_extension_number exists without phone_number ', () => {
    it('returns just empty ', () => {
      const state = getState({
        phoneNumber: '',
      })
      expect(unformattedPhoneNumber(state)).toEqual('')
    })
  })

  describe('when details is null ', () => {
    it('returns just empty ', () => {
      const state = { fetchDetails: null }
      expect(unformattedPhoneNumber(state)).toEqual('')
    })
  })

  describe('when details is undefined ', () => {
    it('returns just empty ', () => {
      const state = { fetchDetails: undefined }
      expect(unformattedPhoneNumber(state)).toEqual('')
    })
  })

  describe('#phoneExtension', () => {
    it('returns phone extension when phone extension exists', () => {
      const state = getState({ phoneExtensionNumber: '23' })
      expect(phoneExtension(state)).toEqual('23')
    })

    it('returns empty string when extension is null ', () => {
      const state = getState({ phoneExtensionNumber: null })
      expect(phoneExtension(state)).toEqual('')
    })

    it('returns empty string when extension is undefined ', () => {
      const state = getState({ phoneExtensionNumber: undefined })
      expect(phoneExtension(state)).toEqual('')
    })
  })

  describe('#CellPhoneNumber', () => {
    it('returns cell phone number', () => {
      const state = getState({ cellPhoneNumber: '2001003000' })
      expect(cellPhoneNumber(state)).toEqual('2001003000')
    })

    it('returns empty string when cell phone number is null ', () => {
      const state = getState({ cellPhoneNumber: null })
      expect(cellPhoneNumber(state)).toEqual('')
    })

    it('returns empty string when extension is undefined ', () => {
      const state = getState({ cellPhoneNumber: undefined })
      expect(cellPhoneNumber(state)).toEqual('')
    })
  })

  describe('#userNotes', () => {
    it('returns notes when notes  exists', () => {
      const state = getState({ notes: '23' })
      expect(userNotes(state)).toEqual({ notes: '23', notesLength: 2 })
    })

    it('returns notes and length if notes is emojis', () => {
      const state = getState({ notes: '😁' })
      expect(userNotes(state)).toEqual({ notes: '😁', notesLength: 2 })
    })

    it('returns notes are text and emojis, and length of the text', () => {
      const state = getState({ notes: '😁ABC' })
      expect(userNotes(state)).toEqual({ notes: '😁ABC', notesLength: 5 })
    })

    it('returns empty string when notes is null ', () => {
      const state = getState({ notes: null })
      expect(userNotes(state)).toEqual({ notes: '', notesLength: 0 })
    })

    it('returns empty string when notes is undefined ', () => {
      const state = getState({ notes: undefined })
      expect(userNotes(state)).toEqual({ notes: '', notesLength: 0 })
    })
  })
})
