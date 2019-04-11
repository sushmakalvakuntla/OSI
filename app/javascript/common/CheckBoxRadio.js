import React from 'react'
import PropTypes from 'prop-types'

class CheckBoxRadio extends React.Component {
  render() {
    const { type, label, id, value, checked, disabled, onChange, labelId } = this.props
    return (
      <div>
        <input type={type} id={id} value={value} label={label} checked={checked} disabled={disabled} onChange={onChange} />
        <label htmlFor={id} id={labelId}>
          {label}
        </label>
      </div>
    )
  }
}

CheckBoxRadio.propTypes = {
  type: PropTypes.oneOf(['checkbox', 'radio']),
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  labelId: PropTypes.string,
}

export default CheckBoxRadio
