export const isRequiredValidator = (value) => {
  return (!value || value == null || value === '') ? 'is required' : null
}

export const fieldsValidator = (...items) => (data) =>
  items.reduce((errors, item) => {
    for (let i = 0; i < item.validators.length; i++) {
      let validator = item.validators[i]
      let error = validator(data[item.key])
      if (error != null) {
        errors[item.key] = `${item.name} ${error}`
      }
    }
    return errors
  }, {})
