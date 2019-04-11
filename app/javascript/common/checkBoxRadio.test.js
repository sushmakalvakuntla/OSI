import React from 'react'
import CheckBoxRadio from './CheckBoxRadio.js'
import { shallow } from 'enzyme'

describe('CheckboxRadio', () => {
  const props = {
    label: 'Confidentiality',
    type: 'checkbox',
    name: 'CheckboxRadio',
    checked: false,
    disabled: false,
    value: 'Confidentiality',
  }
  const wrapper = shallow(<CheckBoxRadio {...props} />)

  it('renders', () => {
    expect(() => shallow(<CheckBoxRadio />)).not.toThrow()
  })

  it('has passed props', () => {
    const instance = wrapper.instance()
    expect(instance.props.label).toBe('Confidentiality')
    expect(instance.props.type).toBe('checkbox')
    expect(instance.props.checked).toBe(false)
    expect(instance.props.name).toBe('CheckboxRadio')
    expect(instance.props.disabled).toBe(false)
    expect(instance.props.value).toEqual('Confidentiality')
  })

  it('returns the Input and Label tags', () => {
    expect(wrapper.find('input').length).toBe(1)
    expect(wrapper.find('label').length).toBe(1)
  })
})
