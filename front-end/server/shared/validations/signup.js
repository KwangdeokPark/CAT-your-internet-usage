import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
  let errors ={};

  if(Validator.isNull(data.username)){
    errors.username='This field is required';
  }
  if(Validator.isNull(data.password)){
    errors.password='This field is required';
  }
  if(Validator.isNull(data.passwordConfirmation)){
    errors.passwordConfirmation='This field is required';
  }
  if(!Validator.equals(data.password, data.passwordConfirmation)){
    errors.passwordConfirmation = 'Passwords must match';
  }
  if(Validator.isNull(data.age)){
    errors.age='This field is required';
  }
  if(Validator.isNull(data.alertStartTime)){
    errors.alertStartTime='This field is required';
  }
  if(Validator.isNull(data.alertInterval)){
    errors.alertInterval='This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}