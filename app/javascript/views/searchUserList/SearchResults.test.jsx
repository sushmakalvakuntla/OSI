import React from 'react'
import { shallow } from 'enzyme'
import SearchResults from './SearchResults.jsx'

describe('SearchResults', () => {
  let wrapper
  let mockUnlockUserAction
  let componentSet
  const exactMatches = [
    {
      id: 0,
      first_name: 'first name',
      last_name: 'last name',
      county_name: 'county',
      email: 'email@email.com',
      locked: false,
    },
    {
      id: 1,
      first_name: 'Locked User',
      last_name: 'last name',
      county_name: 'county',
      email: 'email2@email.com',
      locked: true,
    },
    {
      id: 2,
      first_name: 'UnLocked User',
      last_name: 'last name',
      county_name: 'county',
      email: 'email2@email.com',
      locked: true,
    },
  ]

  describe('#unlockAlertAcknowledgement', () => {
    beforeEach(() => {
      mockUnlockUserAction = jest.fn()

      wrapper = shallow(
        <SearchResults
          fetching={false}
          matchedUsers={exactMatches}
          officesList={['office1', 'office2']}
          actions={{
            unlockUser: mockUnlockUserAction,
          }}
          unlockedUsers={{ 0: { unlocked: false, message: 'SUCCESS' }, 1: { unlocked: true, message: 'NOT-ALLOWED' } }}
        />
      )
      componentSet = wrapper.at(0).find('SearchResultComponent')
    })

    it('shows the set of users', () => {
      expect(componentSet.length).toEqual(3)
    })

    it('shows the normal user', () => {
      expect(
        componentSet
          .at(0)
          .dive()
          .find('UserMessage').length
      ).toEqual(0)
    })

    it('shows the locked user message', () => {
      expect(
        componentSet
          .at(1)
          .dive()
          .find('UserMessage')
          .render()
          .text()
      ).toEqual('NOT-ALLOWED')
    })
  })
})
