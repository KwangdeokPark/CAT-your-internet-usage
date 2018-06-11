import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.name)) {
    errors.name = 'This field is required';
  }

  if (Validator.isNull(data.description)) {
    errors.description = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
