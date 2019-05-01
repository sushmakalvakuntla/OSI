import React from 'react'
import { shallow } from 'enzyme'
import CommonTile from './CommonTile'

describe('CommonTile', () => {
  let wrapper
  let mockSetSearchForTiles

  beforeEach(() => {
    mockSetSearchForTiles = jest.fn()

    wrapper = shallow(
      <CommonTile
        type="GET_ACTIVE_USERS_REQUEST"
        tilesQuery={[
          {
            field: 'enabled',
            value: true,
          },
          {
            field: 'status',
            value: 'CONFIRMED',
          },
        ]}
        count={22}
        setSearchForTiles={mockSetSearchForTiles}
      />
    )
  })

  describe('#ComponentDidMount', () => {
    it('ComponentDidMount is called', () => {
      expect(mockSetSearchForTiles).toHaveBeenCalledWith('GET_ACTIVE_USERS_REQUEST', [
        {
          field: 'enabled',
          value: true,
        },
        {
          field: 'status',
          value: 'CONFIRMED',
        },
      ])
    })
  })

  describe('#Component is rendered', () => {
    it('Tile is rendered without breaking', () => {
      expect(wrapper.find('Tile').length).toBe(1)
    })

    it('Count is rendered without breaking', () => {
      expect(wrapper.find('.tilesContent').length).toBe(1)
    })

    it('View link is rendered only when the count is not equal to 0', () => {
      expect(wrapper.find('Link').length).toBe(1)
    })

    it('View link is not rendered when the count is equal to 0', () => {
      wrapper.setProps({ count: 0 })
      expect(wrapper.find('Link').length).toBe(0)
    })
  })
})
