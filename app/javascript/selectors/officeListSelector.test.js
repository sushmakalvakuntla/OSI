import { translateOfficeName, officesList } from './officeListSelector'

describe('#officesList', () => {
  it('selects the offices when available', () => {
    const expectedValue = [{ label: 'foo-name', value: 'foo' }, { label: 'bar-name', value: 'bar' }]
    const state = {
      fetchOffices: {
        offices: [{ office_id: 'foo', office_name: 'foo-name' }, { office_id: 'bar', office_name: 'bar-name' }],
      },
    }
    expect(officesList(state)).toEqual(expectedValue)
  })

  it('returns empty array when offices are not available', () => {
    const state = {
      fetchOffices: {},
    }
    expect(officesList(state)).toEqual([])
  })

  it('returns empty array when fetchOffice is not available', () => {
    const state = {}
    expect(officesList(state)).toEqual([])
  })
})

describe('#translateOfficeName', () => {
  const state = {
    fetchOffices: {
      offices: [{ office_id: 'north', office_name: 'North Office' }, { office_id: 'south', office_name: 'South Office' }],
    },
  }
  it('renders the name of an office given a record containing office_id', () => {
    expect(translateOfficeName(state, 'north')).toEqual('North Office')
  })

  it('renders the id if no office was found', () => {
    expect(translateOfficeName(state, 'wrong')).toEqual('wrong')
  })

  it('renders empty if no office was assigned', () => {
    expect(translateOfficeName(state)).toEqual('')
  })
})
