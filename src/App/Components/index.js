import React from 'react';
import CustomInputField from 'App/SharedComponents/CustomInputField.js';

const formFields = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    isRequired: true,
    placeholder: "Enter name",
  },
  email: {
    name: "email",
    label: "Email",
    type: "text",
    isRequired: true,
    placeholder: "Enter email",
  },
  address: {
    name: "address",
    label: "Address",
    type: "text",
    isRequired: false,
    placeholder: "Enter address",
  },
  contact: {
    name: "contact",
    label: "Contact",
    type: "tel",
    maxLength: '9',
    isRequired: false,
    placeholder: "Enter contact number",
  }
}

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: '',
        email: '',
        address: '',
        contact: ''
      },
      error: {},
      isSubmit: false,
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.displayDetailsOnSubmit = this.displayDetailsOnSubmit.bind(this);
    this.getFormFields = this.getFormFields.bind(this);
  }

  handleChange = (event, field) => {
    let error = this.validateError(field, event.target.value);
    this.setState({
      isSubmit: false,
      fields: { ...this.state.fields, [field.name]: event.target.value },
      error: { ...this.state.error, ...error }
    });
  }

  handleBlur = (event, field) => {
    let error = this.validateError(field, event.target.value);
    this.setState({
      error: { ...this.state.error, ...error }
    });
  };

  validateError(field, val) {
    if (field.isRequired && val.length === 0) {
      return {
        [field.name]: true
      }
    }
    else {
      return {
        [field.name]: false
      }
    }
  }

  canBeSubmitted(event) {
    event.preventDefault();
    let isSubmit = Object.values(formFields).every(field => {
      if (field.isRequired) {
        return this.state.fields[field.name].length > 0 ? true : false
      }
      else {
        return true
      };
    })
    return isSubmit;
  }

  submitHandler(event) {
    let canSubmit = this.canBeSubmitted(event);
    if (canSubmit) {
      this.setState({
        isSubmit: true,
      })
    }
    else {
      let error = {};
      Object.values(formFields).forEach(field => {
        let submitErrors = this.validateError(field, this.state.fields[field.name]);
        error = { ...error, ...submitErrors }
      })
      this.setState({
        isSubmit: false,
        error: { ...this.state.error, ...error }
      })
    }
  }

  getFormFields() {
    const { error, fields } = this.state;
    return (
      Object.values(formFields).map(field => (
        <div key={field.label} className="mt-10">
          <label htmlFor={field.name}>
            {field.isRequired ? `${field.label}*` : field.label}
          </label>
          <CustomInputField
            field={field}
            value={fields[field.name]}
            onChange={(event) => this.handleChange(event, field)}
            onBlur={(event) => this.handleBlur(event, field)}
            error={error[field.name]} />
        </div>
      ))
    )
  }

  displayDetailsOnSubmit() {
    return (
      <div>
        {Object.entries(this.state.fields).map(([key, value]) => <p key={key}>{key}: {value}</p>)}
      </div>
    )
  }

  render() {
    const { isSubmit } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.submitHandler}>
          {this.getFormFields()}
          <button type="submit">Submit</button>
        </form>
        {isSubmit && this.displayDetailsOnSubmit()}
      </div>
    );
  }
}

export default RegistrationForm;