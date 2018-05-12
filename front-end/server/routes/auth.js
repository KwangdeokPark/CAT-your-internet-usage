import express from 'express';

let router = express.Router();

router.post('/', (req,res) =>{
  const { identifier, password } = req.body;
});

export default router;
