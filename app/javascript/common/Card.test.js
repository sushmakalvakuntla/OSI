import React from 'react'
import Cards from './Card'
import { mount, shallow } from 'enzyme'

describe('Cards', () => {
  const wrapper = shallow(<Cards />)
  const card = {
    editClass: '',
    cardHeaderText: 'some-text',
    children: 'primary',
  }
  const component = mount(<Cards />)
  component.setProps(card)

  it('has props', () => {
    expect(wrapper.children.length).toEqual(1)
    expect(component.prop('cardbgcolor')).toEqual('transparent')
    expect(component.prop('wrapContainer')).toEqual('container-fluid')
    expect(component.prop('columnXsmallWidth')).toEqual(12)
    expect(component.prop('columnMediumWidth')).toEqual(12)
    expect(component.prop('columnLargeWidth')).toEqual(12)
    expect(component.prop('offsetMediumValue')).toEqual(0)
    expect(component.prop('cardHeaderButton')).toEqual(false)
    expect(component.prop('cardActionButtons')).toEqual(false)
    expect(
      component
        .find('div')
        .at(1)
        .props().className
    ).toEqual(`card ${card.editClass} double-gap-top`)

    expect(
      component
        .find('div')
        .at(2)
        .props().className
    ).toEqual('card-header')
    expect(
      component
        .find('div')
        .at(3)
        .props().className
    ).toEqual('card-body')
    expect(
      component
        .find('div')
        .at(4)
        .props().className
    ).toEqual('pull-right')
    expect(
      component
        .find('div')
        .at(5)
        .props().className
    ).toEqual('clearfix')
    expect(
      component
        .find('span')
        .at(0)
        .props().children
    ).toEqual(card.cardHeaderText)
    expect(component.props().children).toEqual(card.children)
  })

  it('when cardHeaderButton is true edit button displays', () => {
    const post = {
      cardHeaderButton: true,
      cardActionButtons: false,
    }
    const wrapper = shallow(<Cards {...post} />)
    expect(wrapper.find('Button').length).toBe(1)
  })

  it('when cardActionButtons is true save and cancel buttons displays', () => {
    const post = {
      cardHeaderButton: false,
      cardActionButtons: true,
      cardActionButton1: true,
      cardActionButton2: true,
    }
    const wrapper = shallow(<Cards {...post} />)
    expect(wrapper.find('Button').length).toBe(2)
  })
})
