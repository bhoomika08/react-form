import React from 'react';

const CustomInputField = (props) => {
  const { field: { name, type, maxLength, placeholder, label }, error, onChange, onBlur, value} = props;
  return (
    <>
      <input
        id={name}
        type={type}
        maxLength={maxLength}
        className={error ? "error-input" : ""}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      >
      </input>
      {error && <p className="error-message">{label} is a required field.</p>}
    </>
  )
}

export default CustomInputField;