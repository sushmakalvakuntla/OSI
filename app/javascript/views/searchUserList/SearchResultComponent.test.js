import React from 'react'
import { shallow } from 'enzyme'
import SearchResultComponent from './SearchResultComponent'

describe('SearchResultComponent', () => {
  let wrapper
  const resultList = { id: '12345ABCD', first_name: 'firstName', last_name: 'lastName', locked: true }

  const officesList = [{ label: 'OFFICE ONE', value: 'office1' }, { label: 'OFFICE TWO', value: 'office2' }]
  const rolesList = [{ label: ' ROLE ONE', value: 'role1' }, { label: 'ROLE TWO', value: 'role2' }]
  const mockHandleUnlockClick = jest.fn()
  const mockHandleAlert = jest.fn()
  beforeEach(() => {
    wrapper = shallow(
      <SearchResultComponent
        value={resultList}
        officeList={officesList}
        rolesList={rolesList}
        unlockHandler={mockHandleUnlockClick}
        alertHandler={mockHandleAlert}
        lockMessage={{ message: 'some message' }}
      />
    )
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

      expect(wrapper.find('Link').props().children).toBe('View Profile')
      expect(wrapper.find('Link').props().to).toEqual({ fromGroupUserList: false, pathname: '/user_details/12345ABCD' })
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toBe('Last Log in')

      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toBe('Status')

      expect(
        wrapper
          .find('ShowField')
          .at(7)
          .props().label
      ).toBe('Office Name')

      expect(
        wrapper
          .find('ShowField')
          .at(8)
          .props().label
      ).toBe('Role')
      expect(wrapper.find('Card').length).toBe(1)
      expect(
        wrapper
          .find('Card')
          .dive()
          .text()
      ).toMatch('some message')
      expect(
        wrapper
          .find('IconButton')
          .dive()
          .dive()
          .text()
      ).toMatch('Unlock')
    })

    it('handles unlocking', () => {
      wrapper.find('IconButton').simulate('click')
      expect(mockHandleUnlockClick).toHaveBeenCalledWith('12345ABCD')
    })
  })
})
