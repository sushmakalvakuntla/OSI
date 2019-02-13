import { permissionsList } from './permissionsListSelector'

describe('#permissionsList', () => {
  const getState = permissionList => {
    return {
      fetchPermissions: {
        permissions: permissionList,
      },
    }
  }
  it('selects the permissions when available', () => {
    const expectedValue = [{ value: 'foo-name', label: 'foo-desc' }, { value: 'bar-name', label: 'bar-desc' }]
    const state = getState([{ name: 'foo-name', description: 'foo-desc' }, { name: 'bar-name', description: 'bar-desc' }])
    expect(permissionsList(state)).toEqual(expectedValue)
  })

  it('returns empty array when permissions are not available', () => {
    const state = getState([])
    expect(permissionsList(state)).toEqual([])
  })

  it('returns empty array when there is no fetchPermssions oject', () => {
    const state = {}
    expect(permissionsList(state)).toEqual([])
  })
})
