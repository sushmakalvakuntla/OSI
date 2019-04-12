import React from 'react'
import { shallow } from 'enzyme'
import Pagination from './Pagination'

describe('Pagination', () => {
  const props = {
    pages: 50,
    page: 1,
    showPageSizeOptions: true,
    pageSizeOptions: [5, 10, 25, 50, 100],
    pageSize: 50,
    showPageJump: true,
    canPrevious: false,
    canNext: false,
    onPageSizeChange: () => {},
    className: 'glyphicon glyphicon-chevron-right',
    PreviousComponent: () => {},
    NextComponent: () => {},
    onPageChange: () => {},
  }
  const wrapper = shallow(<Pagination {...props} />)
  it('PreviousComponent and NextComponent', () => {
    expect(wrapper.find('PreviousComponent').length).toEqual(1)
    expect(wrapper.find('PreviousComponent').props().onClick).not.toThrow()
    wrapper.setProps({ canPrevious: true })
    wrapper
      .find('PreviousComponent')
      .props()
      .onClick()
    expect(wrapper.find('PreviousComponent').props().disabled).toEqual(false)
    expect(wrapper.find('PreviousComponent').props().onClick).not.toThrow()

    expect(wrapper.find('NextComponent').length).toEqual(1)
    expect(wrapper.find('NextComponent').props().onClick).not.toThrow()
    wrapper.setProps({ canNext: true })
    wrapper
      .find('NextComponent')
      .props()
      .onClick()
    expect(wrapper.find('NextComponent').props().disabled).toEqual(false)
    expect(wrapper.find('NextComponent').props().onClick).not.toThrow()
  })

  describe('select, span and input', () => {
    it('handle events', () => {
      expect(wrapper.find('select').props().onBlur).not.toThrow()
      expect(wrapper.find('span').length).toEqual(3)
      expect(wrapper.find('select').props().value).toEqual(50)
      expect(wrapper.find('input').props().value).toEqual(2)
      wrapper
        .find('input')
        .props()
        .onChange({ target: { value: 44 } })
      wrapper
        .find('input')
        .props()
        .onChange({ target: { value: '' } })
      expect(wrapper.instance().state.page).toEqual('')
      wrapper
        .find('input')
        .props()
        .onChange({ target: { value: undefined } })
      expect(wrapper.instance().state.page).toEqual(1)
      wrapper.setProps({ showPageJump: false })
      expect(wrapper.find('input').length).toEqual(0)
    })
  })
})
