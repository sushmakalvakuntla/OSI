import React, { Component } from 'react'
import Tile from './Tile'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class CommonTile extends Component {
  componentDidMount() {
    this.props.setSearchForTiles(this.props.type, this.props.query)
  }

  render() {
    return (
      <div className="col-md-4">
        <Tile title={this.props.title}>
          <div>{this.props.count}</div>
          <div className="text-right">
            <Link to="/">View</Link>
          </div>
        </Tile>
      </div>
    )
  }
}

CommonTile.propTypes = {
  gridValue: PropTypes.string,
}

export default CommonTile
