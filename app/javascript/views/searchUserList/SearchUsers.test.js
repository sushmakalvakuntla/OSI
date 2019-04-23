import React from 'react'
import { shallow } from 'enzyme'
import SearchUsers from './SearchUsers'

describe('SearchUsers', () => {
  const isDisabledSearchBtn = jest.fn()
  const handleInput = jest.fn()
  const handleEmailSearch = jest.fn()
  const isDisabledAddUsrBtn = jest.fn()
  const isDisabledClearBtn = jest.fn()
  let mockHandleOnSearchActions
  let wrapper

  beforeEach(() => {
    mockHandleOnSearchActions = jest.fn()

    wrapper = shallow(
      <SearchUsers
        isDisabledSearchBtn={isDisabledSearchBtn}
        handleInput={handleInput}
        isDisabledAddUsrBtn={isDisabledAddUsrBtn}
        handleEmailSearch={handleEmailSearch}
        handleOnSearch={mockHandleOnSearchActions}
        isDisabledClearBtn={isDisabledClearBtn}
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
      ).toBe('CREATE A NEW USER')

      expect(
        wrapper
          .find('Button')
          .at(1)
          .props().children
      ).toBe('CLEAR')

      expect(
        wrapper
          .find('Button')
          .at(2)
          .props().children
      ).toBe('SEARCH')
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

      it('#Email, handleEmailSearch function is called when onChange event triggered', () => {
        wrapper
          .find('InputComponent')
          .at(2)
          .simulate('change', {
            target: { value: 'someEmail@gmail.com' },
          })
        expect(handleEmailSearch).toHaveBeenCalledWith('email', 'someEmail@gmail.com')
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

      it('#handleOnSearch', () => {
        wrapper.find('#searchForUsers').simulate('click')
        expect(mockHandleOnSearchActions).toHaveBeenCalledWith()
      })

      it('renders form with props', () => {
        expect(wrapper.find('form').props().onSubmit).not.toThrow()
      })
    })
  })
})
