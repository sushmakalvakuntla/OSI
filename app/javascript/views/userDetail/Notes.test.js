import React from 'react'
import { shallow } from 'enzyme'
import Notes, { allowUserInput } from './Notes'

describe('Notes', () => {
  let wrapper
  const onChangeSpy = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Notes isUserEditable={true} userNotes={'Hello'} onChange={onChangeSpy} />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
    expect(wrapper.find('Input').length).toBe(1)
  })

  it('when the user is editable renders the input field to edit notes', () => {
    wrapper.setProps({ isUserEditable: true })
    expect(wrapper.find('Input').length).toBe(1)
  })

  it('when the user is not editable renders just existing notes', () => {
    wrapper.setProps({ isUserEditable: false })
    expect(wrapper.find('Input').length).toBe(0)
    expect(wrapper.find('div').length).toBe(1)
    expect(wrapper.find('CardBody').props().children).toEqual(
      <div>
        <br />Hello
      </div>
    )
  })

  it('#onChange  handleInputChange function is called when onChange event triggered', () => {
    wrapper.find('Input').simulate('change', {
      target: { value: 'Use this text as content' },
    })
    expect(onChangeSpy).toHaveBeenCalledWith('notes', 'Use this text as content')
  })

  describe('allowUserInput', () => {
    it('allows user input if length is less than 250', () => {
      expect(allowUserInput({ target: { value: 'ABCDEFGH' } })).toEqual('ABCDEFGH')
    })

    it('doesnt allows input characters if length is more than 250, strips off extra characters', () => {
      expect(
        allowUserInput({
          target: {
            value:
              'ABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHAB-moreThan250',
          },
        })
      ).toEqual(
        'ABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHABCDEFGHAB'
      )
    })
  })
})
