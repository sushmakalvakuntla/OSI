import React from 'react'
import { shallow } from 'enzyme'
import CWSPrivileges from './CWSPrivileges'

describe('CWSPrivileges', () => {
  let wrapper
  let cwsPrivileges = [
    { category: 'Access Authority', privilege: 'Adoptions' },
    { category: 'Access Authority', privilege: 'Resource Mgmnt Placement Facility Maint' },
    { category: 'Access Authority', privilege: 'Resource Mgmnt Placement Facility Maint' },
    { category: 'Interface Authority', privilege: 'CSS Client Index' },
    { category: 'Interface Authority', privilege: 'CSS Client Index' },
    { category: 'Limited Access Authority', privilege: 'MEDS' },
    { category: 'Limited Access Authority', privilege: 'MEDS' },
  ]
  beforeEach(() => {
    wrapper = shallow(<CWSPrivileges CWSPrivileges={cwsPrivileges} />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
    expect(wrapper.find('DataGrid').exists()).toBe(true)
  })

  describe('render CWS Privileges table', () => {
    it('with records', () => {
      wrapper = shallow(<CWSPrivileges CWSPrivileges={cwsPrivileges} />)
      expect(wrapper.find('DataGrid').props().data.length).toBe(7)
    })

    it('without records', () => {
      cwsPrivileges = []
      wrapper = shallow(<CWSPrivileges CWSPrivileges={cwsPrivileges} />)
      expect(wrapper.find('DataGrid').props().data.length).toBe(0)
    })
  })
})
