import React from 'react'
import { shallow } from 'enzyme'
import SearchResultList from './SearchResultList'

describe('SearchResultList', () => {
  let wrapper
  const resultList = [{ first_name: 'firstName', last_name: 'lastName' }, { first_name: 'firstName1', last_name: 'lastName1' }]
  const officesList = [{ label: 'OFFICE ONE', value: 'office1' }, { label: 'OFFICE TWO', value: 'office2' }]
  const rolesList = [{ label: ' ROLE ONE', value: 'role1' }, { label: 'ROLE TWO', value: 'role2' }]
  beforeEach(() => {
    wrapper = shallow(<SearchResultList value={resultList} officeList={officesList} rolesList={rolesList} />)
  })

  describe('renders the components', () => {
    it('renders the label inside the grid wrapper', () => {
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toBe('First Name')

      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toBe('Middle Name')

      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toBe('Last Name')

      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toBe('CWS Login')

      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toBe('Email')
    })
  })
})
