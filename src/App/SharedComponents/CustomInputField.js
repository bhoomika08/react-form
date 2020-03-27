import React from 'react';

class CustomInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: ''
    }
  }

  handleChange = (event, field) => {
    let error = this.validateError(field, event.target.value);
    this.setState({
      value: event.target.value,
      error: error
    });
  }

  handleBlur = (event, field) => {
    let error = this.validateError(field, event.target.value);
    this.setState({
      error: error
    });
  }

  validateError(field, val) {
    if (field.isRequired && val.length === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    const { inputField: { name, label, type, maxLength, placeholder }, inputField } = this.props;
    const { error, value } = this.state;
    return (
      <>
        <input
          id={name}
          type={type}
          value={maxLength ? value.slice(0, maxLength) : value}
          placeholder={placeholder}
          className={error ? "error-input" : ""}
          onChange={(event) => this.handleChange(event, inputField)}
          onBlur={(event) => this.handleBlur(event, inputField)}
        >
        </input>
        {error && <p className="error-message red">{label} is a required field.</p>}
      </>
    )
  }
}

export default CustomInputField;