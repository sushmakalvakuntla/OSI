import React from 'react'
import UserMessage from './UserMessage'
import { shallow } from 'enzyme'

describe('User Message', () => {
  it('renders null', () => {
    const errorComp = shallow(<UserMessage errorMsg={null} successMsg={null} />)
    expect(errorComp.find('AlertUncontrolled').length).toEqual(0)
  })

  it('verify error block when errorMsg is object', () => {
    const props = { user_message: 'Cognito user validation is failed' }
    const errorComp = shallow(<UserMessage errorMsg={props} />)
    expect(errorComp.find('AlertUncontrolled').length).toEqual(1)
    expect(errorComp.contains(props.user_message)).toBe(true)
  })

  it('verify error block when errorMsg is string', () => {
    const props = 'Cognito user validation is failed'
    const errorComp = shallow(<UserMessage errorMsg={props} />)
    expect(errorComp.find('AlertUncontrolled').length).toEqual(1)
    expect(errorComp.contains(props)).toBe(true)
  })

  it('verify success block with successMsg', () => {
    const props = 'Successful'
    const errorComp = shallow(<UserMessage successMsg={props} />)
    expect(errorComp.find('AlertUncontrolled').length).toEqual(1)
    expect(errorComp.contains(props)).toBe(true)
  })

  it('verify success block with successMsg when email is edited', () => {
    const props = ['Successful', 'Please notify to someone']
    const errorComp = shallow(<UserMessage successMsg={props} />)
    expect(errorComp.contains('Successful', <b>Please notify someone</b>)).toBe(true)
  })
})
