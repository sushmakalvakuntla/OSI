import React from 'react'
import { shallow } from 'enzyme'
import SearchUsers from './SearchUsers'

describe('SearchUsers', () => {
  const isDisabledSearchBtn = jest.fn()
  const handleInput = jest.fn()
  const isDisabledAddUsrBtn = jest.fn()
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <SearchUsers
        isDisabledSearchBtn={isDisabledSearchBtn}
        handleInput={handleInput}
        isDisabledAddUsrBtn={isDisabledAddUsrBtn}
      />
    )
  })

  describe('renders the components', () => {
    it('renders the label inside the grid wrapper', () => {
      expect(
        wrapper
          .find('InputComponent')
          .at(0)
          .props().label
      ).toBe('First Name')

      expect(
        wrapper
          .find('InputComponent')
          .at(1)
          .props().label
      ).toBe('Last Name')

      expect(
        wrapper
          .find('InputComponent')
          .at(2)
          .props().label
      ).toBe('Email')

      expect(
        wrapper
          .find('InputComponent')
          .at(3)
          .props().label
      ).toBe('CWS Login')

      expect(
        wrapper
          .find('Button')
          .at(0)
          .props().children
      ).toBe('SEARCH')

      expect(
        wrapper
          .find('Button')
          .at(1)
          .props().children
      ).toBe('CREATE A NEW USER')
    })

    describe('#handleInput', () => {
      it('#FirstName, handleInputChange function is called when onChange event triggered', () => {
        wrapper
          .find('InputComponent')
          .at(0)
          .simulate('change', {
            target: { value: 'Some First Name' },
          })
        expect(handleInput).toHaveBeenCalledWith('firstName', 'Some First Name')
      })

      it('#LastName, handleInputChange function is called when onChange event triggered', () => {
        wrapper
          .find('InputComponent')
          .at(1)
          .simulate('change', {
            target: { value: 'Some Last Name' },
          })
        expect(handleInput).toHaveBeenCalledWith('lastName', 'Some Last Name')
      })

      it('#Email, handleInputChange function is called when onChange event triggered', () => {
        wrapper
          .find('InputComponent')
          .at(2)
          .simulate('change', {
            target: { value: 'someEmail@gmail.com' },
          })
        expect(handleInput).toHaveBeenCalledWith('email', 'someEmail@gmail.com')
      })

      it('#CWSLogin, handleInputChange function is called when onChange event triggered', () => {
        wrapper
          .find('InputComponent')
          .at(3)
          .simulate('change', {
            target: { value: 'ABCDE' },
          })
        expect(handleInput).toHaveBeenCalledWith('CWSLogin', 'ABCDE')
      })
    })
  })
})
