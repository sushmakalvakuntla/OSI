import { toFullName, accountStatusFormat, lastLoginDate, getOfficeTranslator } from './constants'

describe('helpers', () => {
  describe('toFullName', () => {
    it('renders a full name', () => {
      expect(toFullName({ first_name: 'First', last_name: 'Last' })).toEqual('Last, First')
    })
  })

  describe('AccountStatusFormat', () => {
    it('renders Active  for enabled', () => {
      expect(accountStatusFormat({ enabled: true })).toEqual('Active')
    })

    it('renders Activefor disabled', () => {
      expect(accountStatusFormat({ enabled: false })).toEqual('Inactive')
    })
  })

  describe('#lastLoginDate', () => {
    it('renders date & time in required format', () => {
      expect(lastLoginDate({ last_login_date_time: '2013-03-05 08:23:18' })).toEqual('March 5, 2013 08:23 AM')
    })

    it('renders empty when date does not exists', () => {
      expect(lastLoginDate({ last_login_date_time: undefined })).toEqual('')
    })
  })

  describe('#getOfficeTranslator', () => {
    const translate = getOfficeTranslator([{ value: 'north', label: 'North Office' }, { value: 'south', label: 'South Office' }])

    it('returns a translator function which can translate office_ids', () => {
      expect(translate({ office_id: 'north' })).toEqual('North Office')
      expect(translate({ office_id: 'south' })).toEqual('South Office')
    })

    it('returns a translator which returns the office_id itself when not found', () => {
      expect(translate({ office_id: 'west' })).toEqual('west')
    })

    it('returns a translator which returns empty-string when no office id is supplied', () => {
      expect(translate({})).toEqual('')
    })
  })
})
