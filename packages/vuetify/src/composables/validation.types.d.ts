export type ValidationResult = string | boolean

export type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

type ValidateOnValue = 'blur' | 'input' | 'submit' | 'invalid-input'

export type ValidateOn =
  | ValidateOnValue
  | `${ValidateOnValue} lazy`
  | `${ValidateOnValue} eager`
  | `lazy ${ValidateOnValue}`
  | `eager ${ValidateOnValue}`
  | 'lazy'
  | 'eager'
