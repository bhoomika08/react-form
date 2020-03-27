import React from 'react';
import * as data from 'data.js'
import CustomInputField from 'App/SharedComponents/CustomInputField.js';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: ''
    }
    this.formRef = React.createRef();
    this.submitHandler = this.submitHandler.bind(this);
    this.displayDetailsOnSubmit = this.displayDetailsOnSubmit.bind(this);
    this.getFormFields = this.getFormFields.bind(this);
  }

  canBeSubmitted() {
    let formElements = this.formRef.current.elements;
    let isSubmit = Object.values(data.formFields).every(field => {
      if (field.isRequired) {
        return formElements.namedItem(field.name).value.length > 0 ? true : false
      }
      else {
        return true
      };
    })
    return isSubmit;
  }

  submitHandler(event) {
    event.preventDefault();
    let canSubmit = this.canBeSubmitted();
    if (canSubmit) {
      this.setState({
        isSubmit: true,
      })
    }
    else {
      this.setState({
        isSubmit: false,
      })
    }
  }

  getFormFields() {
    return (
      Object.values(data.formFields).map(field => (
        <div key={field.label} className="mt-10">
          <label htmlFor={field.name}>
            {field.isRequired ? `${field.label}*` : field.label}
          </label>
          <CustomInputField
            inputField={field}
          />
        </div>
      ))
    )
  }

  displayDetailsOnSubmit() {
    let formElements = this.formRef.current.elements
    return (
      <div>
        {Object.values(data.formFields).map(field =>
          <p key={field.name}>{field.name}: {formElements.namedItem(field.name).value}</p>
        )}
      </div>
    )
  }

  render() {
    const { isSubmit } = this.state;
    return (
      <div className="container">
        {isSubmit === false && <p className="red">Please fill required fields</p>}
        <form ref={this.formRef} onSubmit={this.submitHandler}>
          {this.getFormFields()}
          <button type="submit">Submit</button>
        </form>
        {isSubmit && this.displayDetailsOnSubmit()}
      </div>
    );
  }
}

export default RegistrationForm;