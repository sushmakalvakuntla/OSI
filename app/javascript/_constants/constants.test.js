import { toFullName, accountStatusFormat, lastLoginDate } from './constants'

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
})
