import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, CardTitle } from '@cwds/components'

const Tile = ({ children, title }) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  )
}

Tile.propTypes = {
  children: PropTypes.node,
  /** Pass a Menu react node or component. Use the `MenuItems` when possible. */
  title: PropTypes.string,
  /** Longform notation for Title declaration */
  Title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}
Tile.defaultProps = {}

export default Tile
