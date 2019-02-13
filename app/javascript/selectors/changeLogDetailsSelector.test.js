import {
  selectChangeLogAdminDetails,
  selectChangeLogAdminRecords,
  selectChangeLogAdminOfficeName,
} from './changeLogDetailsSelector'

const expectedState = ({ countyName, officeId, email }) => {
  return {
    fetchChangeLogDetails: {
      changeLogDetails: {
        records: {
          user: {
            county_name: countyName,
            office_id: officeId,
            email: email,
          },
        },
      },
    },
    fetchOffices: {
      offices: [{ office_id: 'north', office_name: 'North Office' }, { office_id: 'south', office_name: 'South Office' }],
    },
  }
}
describe('#selectChangeLogAdminRecords', () => {
  it('selects the changeLog detail object when records exists', () => {
    const expectedResult = {
      user: {
        county_name: 'someCounty',
        office_id: 'north',
        email: 'some@email.com',
      },
    }
    const state = expectedState({
      countyName: 'someCounty',
      officeId: 'north',
      email: 'some@email.com',
    })
    expect(selectChangeLogAdminRecords(state)).toEqual(expectedResult)
  })

  it('selects the changeLog details object when fetchChangeLogDetails does not exist', () => {
    const state = {}
    expect(selectChangeLogAdminRecords(state)).toEqual(null)
  })

  it('selects the changeLog detail object when fetchChangeLogDetails exist', () => {
    const state = {
      fetchChangeLogDetails: {},
    }
    expect(selectChangeLogAdminRecords(state)).toEqual(null)
  })

  it('selects the changeLog detail object when changeLogDetails are empty', () => {
    const state = {
      fetchChangeLogDetails: {
        changeLogDetails: {},
      },
    }
    expect(selectChangeLogAdminRecords(state)).toEqual(undefined)
  })
})

describe('#selectChangeLogAdminDetails', () => {
  it('selects the user changeLog detail records ', () => {
    const state = expectedState({
      countyName: 'first',
    })
    expect(selectChangeLogAdminDetails(state)).toEqual({
      county_name: 'first',
    })
  })

  it('returns empty when fetchChangeLogDetails does not exit', () => {
    const state = {}
    expect(selectChangeLogAdminDetails(state)).toEqual({})
  })

  it('returns empty when fetchChangeLogDetails returns unknown user', () => {
    const state = { fetchChangeLogDetails: { changeLogDetails: { records: {} } } }
    expect(selectChangeLogAdminDetails(state)).toEqual({})
  })
})

describe('#selectChangeLogAdminOfficeName', () => {
  describe('When officeId exists ', () => {
    it('returns officeName', () => {
      const state = expectedState({ officeId: 'north' })
      expect(selectChangeLogAdminOfficeName(state)).toEqual('North Office')
    })
  })

  describe('When officeId is an empty string', () => {
    it('returns empty string ', () => {
      const state = expectedState({ officeId: '' })
      expect(selectChangeLogAdminOfficeName(state)).toEqual('')
    })
  })

  describe('When officeId is null', () => {
    it('returns empty string ', () => {
      const state = expectedState({ officeId: null })
      expect(selectChangeLogAdminOfficeName(state)).toEqual('')
    })
  })

  describe('When officeId undefined', () => {
    it('returns empty string ', () => {
      const state = expectedState({})
      expect(selectChangeLogAdminOfficeName(state)).toEqual('')
    })
  })
})
