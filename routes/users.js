'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require('../knex');
const humps = require('humps');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/users', (req, res, next)=>{
  let body = humps.decamelizeKeys(req.body);

  bcrypt.hash(body.password, saltRounds, function(err, hash) {
    knex.insert({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      hashed_password: hash
    })
    .into('users')
    .returning('*')
    .then((response)=>{
      delete response[0].hashed_password;
      res.send(humps.camelizeKeys(response[0]));
    });
  });
});

module.exports = router;
