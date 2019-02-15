import { getAdminOfficeIDs, isRolesAvailable } from './checkAdminRoles'

describe('#getAdminOfficeIDs', () => {
  it('returns admin office ID, when Office-admin is in roles ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['Office-admin'],
    }
    expect(getAdminOfficeIDs(account)).toEqual(['1234'])
  })

  it('returns empty array when roles have Super-admin ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['Super-admin'],
    }
    expect(getAdminOfficeIDs(account)).toEqual([])
  })

  it('returns empty array when roles have State-admin ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['State-admin'],
    }
    expect(getAdminOfficeIDs(account)).toEqual([])
  })

  it('returns empty array when roles have County-admin ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['County-admin'],
    }
    expect(getAdminOfficeIDs(account)).toEqual([])
  })

  it('returns empty array when account is undefined ', () => {
    expect(getAdminOfficeIDs(undefined)).toEqual([])
  })

  it('returns empty array when account.admin_office_ids is undefined ', () => {
    const account = {
      admin_office_ids: undefined,
      roles: ['State-admin'],
    }
    expect(getAdminOfficeIDs(account)).toEqual([])
  })
})

describe('#isRolesAvailable', () => {
  it('returns false when user role is Office-admin', () => {
    const useraccount = {
      admin_office_ids: ['1234'],
      roles: ['Office-admin'],
    }
    const roles = ['Super-admin', 'State-admin', 'County-admin']
    expect(isRolesAvailable(useraccount, roles)).toBe(false)
  })

  it('returns true when user role is not Office-admin', () => {
    const useraccount = {
      admin_office_ids: ['1234'],
      roles: ['Super-admin'],
    }
    const roles = ['Super-admin', 'State-admin', 'County-admin']
    expect(isRolesAvailable(useraccount, roles)).toBe(true)
  })

  it('returns false when user role is not provided', () => {
    const useraccount = {
      admin_office_ids: ['1234'],
      roles: [],
    }
    const roles = ['Super-admin', 'State-admin', 'County-admin']
    expect(isRolesAvailable(useraccount, roles)).toBe(false)
  })
})
