import React from 'react'
import { shallow } from 'enzyme'
import PageHeaderButtons from './DetailsPageHeaderButtons'

describe('PageHeaderButtons Component', () => {
  let wrapper
  beforeEach(() => {
    const props = {
      isUserEditable: true,
      disableActionBtn: false,
      isPermissionsEmpty: true,
      onSaveDetails: () => {},
      onReset: () => {},
    }
    wrapper = shallow(<PageHeaderButtons {...props} />)
  })

  describe('when user is editable', () => {
    it('renders reset Button', () => {
      expect(
        wrapper
          .find('Button')
          .at(0)
          .props().disabled
      ).toBe(false)
      expect(
        wrapper
          .find('Button')
          .at(0)
          .props().onClick
      ).not.toThrow()
      expect(
        wrapper
          .find('Button')
          .at(0)
          .props().children
      ).toBe('RESET')
    })

    it('renders NoPermissionsWarning when isPermissionsEmpty is true', () => {
      expect(wrapper.find('NoPermissionsWarning').length).toBe(1)
    })

    it('renders Save button when isPermissionsEmpty is false', () => {
      wrapper.setProps({ isPermissionsEmpty: false })
      expect(
        wrapper
          .find('Button')
          .at(1)
          .props().disabled
      ).toBe(false)
      expect(
        wrapper
          .find('Button')
          .at(1)
          .props().children
      ).toBe('SAVE')
      expect(
        wrapper
          .find('Button')
          .at(1)
          .props().onClick
      ).not.toThrow()
    })
  })

  it('renders only one Button when user is not editable', () => {
    wrapper.setProps({ isUserEditable: false })
    expect(wrapper.find('Button').props().disabled).toBe(true)
    expect(wrapper.find('Button').props().children).toBe('SAVE')
  })
})
