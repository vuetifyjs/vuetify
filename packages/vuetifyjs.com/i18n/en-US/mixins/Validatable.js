export default {
  props: {
    error: 'Puts the input in a manual error state',
    errorMessages: 'Puts the input in an error state and passes through custom error messsages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
    rules: 'Array of functions that return either True or a String with an error message',
    validateOnBlur: 'Delays validation until blur event'
  }
}
