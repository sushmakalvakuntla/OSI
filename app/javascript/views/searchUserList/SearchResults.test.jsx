import React from 'react'
import { shallow } from 'enzyme'
import SearchResults from './SearchResults.jsx'

describe('SearchResults', () => {
  let wrapper
  let mockUnlockUserAction = jest.fn()
  let mockAlertHandler = jest.fn()
  const exactMatches = [
    {
      first_name: 'first name',
      last_name: 'last name',
      county_name: 'county',
      email: 'email@email.com',
      locked: false,
    },
    {
      id: 1,
      first_name: 'first name',
      last_name: 'last name',
      county_name: 'county',
      email: 'email@email.com',
      locked: true,
    },
  ]

  describe('#unlockAlertAcknowledgement', () => {
    beforeEach(() => {
      mockUnlockUserAction = jest.fn()
      mockAlertHandler = jest.fn()
      wrapper = shallow(
        <SearchResults
          matchedUsers={exactMatches}
          officesList={['office1', 'office2']}
          actions={{
            unlockUser: mockUnlockUserAction,
            unlockHandler: mockAlertHandler,
          }}
          unlockedUsers={[0, 1]}
        />
      )
    })

    it('resets errorMessage to empty string', () => {
      wrapper.instance().setState({ unlockAcknowledgements: [] })
      wrapper.instance().unlockAlertAcknowledgement(0)
      wrapper.instance().unlockAlertAcknowledgement(1)
      expect(wrapper.instance().state.unlockAcknowledgements).toEqual([0, 1])
    })

    it('acknowledges unlocked users', () => {
      const wrapperLocal = shallow(
        <SearchResults
          matchedUsers={exactMatches}
          officesList={['office1', 'office2']}
          actions={{
            unlockUser: mockUnlockUserAction,
            unlockHandler: mockAlertHandler,
          }}
          unlockedUsers={['user1']}
        />
      )
      expect(wrapperLocal.instance().state.unlockAcknowledgements).toEqual([])
    })
  })
})
