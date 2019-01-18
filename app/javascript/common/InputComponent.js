import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeValue } from './FieldUtils'

const extractErrorMessage = props => {
  let errorMessage = ''
  if (props.required || props.validationError) {
    errorMessage = props.validationErrorMessage
  }

  if (props.serverError) {
    errorMessage = props.serverErrorMessage
  }
  return errorMessage
}

const onChangeWrapper = (event, props) => {
  if (event.target.value && props.allowCharacters) {
    event.target.value = sanitizeValue(event.target.value, props.allowCharacters)
  }
  props.onChange(event)
}

const InputComponent = props => {
  const errorMessage = extractErrorMessage(props)
  return (
    <div className="form-group">
      <div className={`${props.gridClassName}${errorMessage !== '' ? ' has-error' : ''}`}>
        <label className={props.labelClassName} htmlFor={props.id}>
          {props.label}
          <input
            className={props.fieldClassName}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={event => onChangeWrapper(event, props)}
            disabled={props.disabled}
            maxLength={props.maxLength}
          />
        </label>
        {errorMessage !== '' ? (
          <span className="error text-danger">
            <i className="fa fa-exclamation-triangle" />
            {errorMessage}
          </span>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

InputComponent.propTypes = {
  id: PropTypes.string,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  validationError: PropTypes.bool,
  validationErrorMessage: PropTypes.string,
  gridClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  serverError: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.any,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  allowCharacters: PropTypes.instanceOf(RegExp),
}
export default InputComponent
