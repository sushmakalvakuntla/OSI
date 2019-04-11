import React, { Component } from 'react'
import { Tile } from '@cwds/components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class CommonTile extends Component {
  componentDidMount() {
    this.props.setSearchForTiles(this.props.type, this.props.query)
  }

  render() {
    return (
      <Tile title={this.props.title}>
        <div className="tilesContent">{this.props.count}</div>
        <div className="text-right">
          <Link to="/">View</Link>
        </div>
      </Tile>
    )
  }
}

CommonTile.propTypes = {
  gridValue: PropTypes.string,
}

export default CommonTile
