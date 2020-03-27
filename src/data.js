export const formFields = {
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
    type: "email",
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
    type: "number",
    maxLength: '9',
    isRequired: false,
    placeholder: "Enter contact number",
  }
}