import React from 'react'
import { shallow } from 'enzyme'
import Gravatar from '../Gravatar'

jest.mock('md5', () => jest.fn(() => 'md5'))

describe('components/Gravatar', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Gravatar alt="Name" email="cookie@monster.com" size={50} />
    )
  })

  it('renders Gravatar', () => {
    expect(component).toMatchSnapshot()
  })
})
