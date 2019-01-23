import React from 'react'
import { Circle } from './faIcons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle)

describe('Return custom error messages comparing default error messages from the amazon cognito', () => {
  it('displays custom message when both email is empty', () => {
    const output = <FontAwesomeIcon icon="times-circle" />
    expect(Circle()).toEqual(output)
  })
})
