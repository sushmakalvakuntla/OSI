import { selectNewUserRecords, officeName, formattedPhoneNumber } from './validateNewUserSelector'

describe('selectors', () => {
  describe('#selectNewUserRecords', () => {
    it('selects the New User detail records ', () => {
      const state = {
        validateNewUser: {
          county_name: 'first',
          last_name: 'third',
          roles: [],
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when validateNewUser object is empty ', () => {
      const state = {
        validateNewUser: {},
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when user object is available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            user: {},
          },
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        user: {
          roles: ['CWS-worker'],
        },
      })
    })

    it('roles set to default value when user object not available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {},
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when verifiedUserDetails object is available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            county_name: 'MY COUNTY',
          },
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        county_name: 'MY COUNTY',
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when verifiedUserDetails object is not available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {},
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when roles is available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            user: {
              roles: 'CWDS_WORKER',
              county_name: 'MY COUNTY',
            },
          },
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        user: {
          county_name: 'MY COUNTY',
          roles: ['CWS-worker'],
        },
      })
    })

    it('selects no details', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })
  })

  describe('#officeName', () => {
    const getState = officeId => {
      return {
        validateNewUser: {
          verifyUserDetails: {
            user: {
              office_id: officeId,
            },
          },
        },
        fetchOffices: {
          offices: [{ office_id: 'north', office_name: 'North Office' }, { office_id: 'south', office_name: 'South Office' }],
        },
      }
    }
    describe('When officeId exists ', () => {
      it('returns officeName', () => {
        const state = getState('north')
        expect(officeName(state)).toEqual('North Office')
      })
    })

    describe('When officeId is an empty string', () => {
      it('returns empty string ', () => {
        const state = getState('')
        expect(officeName(state)).toEqual('')
      })
    })
  })

  describe('#formattedPhoneNumber', () => {
    const getState = ({ phoneNumber, phoneExtensionNumber, officePhoneNumber, officePhoneExtensionNumber }) => {
      return {
        validateNewUser: {
          verifyUserDetails: {
            user: {
              phone_number: phoneNumber,
              phone_extension_number: phoneExtensionNumber,
              office_phone_number: officePhoneNumber,
              office_phone_extension_number: officePhoneExtensionNumber,
            },
          },
        },
        fetchOffices: {
          offices: [{ office_id: 'north', office_name: 'North Office' }, { office_id: 'south', office_name: 'South Office' }],
        },
      }
    }
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
          phoneNumber: null,
          phoneExtensionNumber: '23',
          officePhoneNumber: null,
          officePhoneExtensionNumber: '21',
        })
        expect(formattedPhoneNumber(state)).toEqual({ officePhoneNumber: '', workerPhoneNumber: '' })
      })
    })

    describe('when details is null ', () => {
      it('returns just empty ', () => {
        const state = { verifyUserDetails: null }
        expect(formattedPhoneNumber(state)).toEqual({ officePhoneNumber: '', workerPhoneNumber: '' })
      })
    })

    describe('when details is undefined ', () => {
      it('returns just empty ', () => {
        const state = { verifyUserDetails: undefined }
        expect(formattedPhoneNumber(state)).toEqual({ officePhoneNumber: '', workerPhoneNumber: '' })
      })
    })
  })
})
