import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
  let errors ={};

  if(Validator.isNull(data.username)){
    errors.username='This field is required';
  }
  if(Validator.isNull(data.password1)){
    errors.password1='This field is required';
  }
  if(Validator.isNull(data.password2)){
    errors.password2='This field is required';
  }
  if(!Validator.equals(data.password1, data.password2)){
    errors.password2 = 'Passwords must match';
  }
  if(Validator.isNull(data.age)){
    errors.age='This field is required';
  }
  if(Validator.isNull(data.alert_start_time)){
    errors.alert_start_time='This field is required';
  }
  if(Validator.isNull(data.alert_interval)){
    errors.alert_interval='This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
