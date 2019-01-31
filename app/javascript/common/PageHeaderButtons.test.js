import React from 'react'
import { shallow } from 'enzyme'
import PageHeaderButtons from './PageHeaderButtons'

describe('PageHeaderButtons Component', () => {
  let wrapper
  beforeEach(() => {
    const props = {
      isUserEditable: true,
      disableButtons: false,
      onSaveDetails: () => {},
      onReset: () => {},
    }
    wrapper = shallow(<PageHeaderButtons {...props} />)
  })

  it('renders two Buttons when user is editable ', () => {
    expect(wrapper.find('Button').length).toBe(2)
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

  it('renders only one Button when user is not editable', () => {
    wrapper.setProps({ isUserEditable: false })
    expect(wrapper.find('Button').props().disabled).toBe(true)
    expect(wrapper.find('Button').props().children).toBe('SAVE')
  })
})
