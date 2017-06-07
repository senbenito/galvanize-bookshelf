'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const bodyParser = require('body-parser');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const humps = require('humps');
const saltRounds = 10;

router.use(cookieParser());

router.get('/token', (req, res, next)=>{
  if(req.cookies.token){
    return res.send(true);
  }
  res.send(false);
});

router.post('/token', (req, res, next)=>{
  let body = req.body;
  let email = body.email;
  let password = body.password;

  knex.select('email')
  .from('users')
  .then((data2) => {
    if(data2[0].email !== email){
      res.setHeader('content-type', 'text/plain');
      res.status(400).send('Bad email or password');
    } else {
      knex.select('*')
      .from('users')
      .where('email', email)
      .then((data) => {
        let hash = data[0].hashed_password;
          bcrypt.compare(password, hash, (err, response)=>{
            if(response){
              var token = jwt.sign({id: data[0].id}, 'secret');
              res.cookie('token', token, {httpOnly: true});
              delete data[0].created_at;
              delete data[0].hashed_password;
              res.send(humps.camelizeKeys(data[0]));
            } else {
              res.setHeader('content-type', 'text/plain');
              res.status(400).send('Bad email or password');
            }
          });
      });//closes then()
    }
  });
});

router.delete('/token', (req, res, next)=>{
  res.cookie('token', '');
  res.send(true);
});

module.exports = router;
