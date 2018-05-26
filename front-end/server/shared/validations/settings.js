import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
  let errors ={};

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
