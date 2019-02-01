import React from 'react'
import { shallow, mount } from 'enzyme'
import ChangeLog from './ChangeLog'

describe('ChangeLog', () => {
  let wrapper
  const events = [
    {
      event: { admin_name: 'Dorfler, Marvin', admin_role: 'Office Admin' },
      event_type: 'B',
      admin_name: 'wrong2',
      timestamp: '2019-01-03 14:22:22',
    },
    {
      event: { admin_name: 'Mosely, Alonso', admin_role: 'State Admin' },
      event_type: 'C',
      admin_name: 'wrong1',
      timestamp: '2019-01-04 14:22:22',
    },
    {
      event: { admin_name: 'Walsh, Jack', admin_role: 'County Admin' },
      event_type: 'A',
      admin_name: 'wrong3',
      timestamp: '2019-01-02 14:22:22',
    },
  ]
  beforeEach(() => {
    wrapper = shallow(
      <ChangeLog auditEvents={events} userDetails={''} adminDetails={''} userOfficeName="" adminOfficeName="" />
    )
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
    expect(wrapper.find('CardBody').exists()).toBe(true)
  })

  it('renders the header and 3 fake changelog rows', () => {
    expect(
      wrapper
        .find('CardBody')
        .dive()
        .find('DataGrid')
        .dive()
        .find('ReactTable')
        .dive()
        .find('TableComponent')
        .dive()
        .find('TrComponent').length
    ).toEqual(4)
  })

  it('renders the date field correctly sorted by latest first', () => {
    const mounted = mount(
      <ChangeLog auditEvents={events} userDetails={''} adminDetails={''} userOfficeName="" adminOfficeName="" />
    )
    const trs = mounted.find('TrComponent')
    expect(
      trs
        .at(1)
        .children()
        .first()
        .children()
        .first()
        .text()
    ).toEqual('January 4, 2019 02:22 PM')
  })

  it('renders the admin name field with formatted display of admin role', () => {
    const mounted = mount(
      <ChangeLog auditEvents={events} userDetails={''} adminDetails={''} userOfficeName="" adminOfficeName="" />
    )
    const trs = mounted.find('TrComponent')
    expect(
      trs
        .at(1)
        .childAt(0)
        .childAt(2)
        .text()
    ).toEqual('Mosely, Alonso (State Admin)')
  })
})
