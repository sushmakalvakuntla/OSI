import React from 'react'
import { shallow } from 'enzyme'
import NoPermissionsWarning from './NoPermissionsWarning'

describe('NoPermissionsWarning', () => {
  let wrapper

  const props = {
    onSaveDetails: () => {},
    disableButtons: true,
  }

  beforeEach(() => {
    wrapper = shallow(<NoPermissionsWarning {...props} />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Button').exists()).toBe(true)
    expect(wrapper.find('Modal').exists()).toBe(true)
    expect(wrapper.find('ModalHeader').exists()).toBe(true)
    expect(wrapper.find('ModalBody').exists()).toBe(true)
  })

  it('toggles the ModelOpen', () => {
    wrapper.setState({ ModalOpen: false })
    const instance = wrapper.instance()
    instance.toggle({
      ModalOpen: true,
    })
    expect(instance.state.ModalOpen).toEqual(true)
  })

  describe('onConfirm', () => {
    it('should setState the ModalOpen', () => {
      wrapper.setState({ ModalOpen: true })
      const instance = wrapper.instance()
      instance.onConfirm()
      expect(instance.state.ModalOpen).toEqual(false)
    })
  })

  it('renders Button Component with btnName as Save', () => {
    expect(wrapper.find('Button').exists()).toBe(true)
    expect(
      wrapper
        .find('Button')
        .at(0)
        .props().children
    ).toEqual('SAVE')
  })

  it('should contain modal header ', () => {
    expect(wrapper.find('ModalHeader').exists()).toBe(true)
    expect(wrapper.find('ModalHeader').props().children).toEqual(<div className="header">No Permissions Selected</div>)
  })

  it('should contain modal body ', () => {
    expect(wrapper.find('ModalBody').exists()).toBe(true)
    expect(wrapper.find('ModalBody').props().children).toEqual(
      <div className="nopermissionmodal-body-text">
        There are <b> No Permissions </b> selected. Are you sure you would like to Save now?
      </div>
    )
  })

  it('should contain ModalFooter ', () => {
    expect(wrapper.find('ModalFooter').exists()).toBe(true)
    expect(
      wrapper
        .find('Button')
        .at(1)
        .props().children
    ).toEqual('Cancel')
    expect(
      wrapper
        .find('Button')
        .at(2)
        .props().children
    ).toEqual('Confirm')
    expect(
      wrapper
        .find('Button')
        .at(2)
        .props().onClick
    ).not.toThrow()
  })
})
