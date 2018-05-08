import express from 'express';
import validationInput from '../shared/validations/signup';

let router = express.Router();


router.post('/', (req, res) =>{
  const { errors, isValid } = validateInput(req.body);

  if(!isValid){
    res.status(400).json(errors);
  }
  //console.log(req.body);
});

export default router;
