import React from 'react'
import { shallow } from 'enzyme'
import Notes from './Notes'

describe('Notes', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Notes isUserEditable={true} userNotes={'Hello'} />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
  })
})
