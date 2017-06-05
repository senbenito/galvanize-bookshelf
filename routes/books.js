'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require('../knex');
const humps = require('humps');

router.get('/books', (req, res, next)=>{
  knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url', 'created_at', 'updated_at').orderBy('title')
  .then((result)=>{
    res.send(humps.camelizeKeys(result));
  });
});

router.get('/books/:id', (req, res, next)=>{
  let id = Number.parseInt(req.params.id);
  knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url', 'created_at', 'updated_at').where('id', id).orderBy('title')
  .then((result)=>{
    res.send(humps.camelizeKeys(result[0]));
  });
});

router.post('/books', (req, res, next)=>{
  let body = humps.decamelizeKeys(req.body);

  knex.insert(body)
  .into('books')
  .returning('*')
  .then((response)=>{
    res.send(humps.camelizeKeys(response[0]));
  });
});

router.patch('/books/:id', (req, res, next)=>{
  let id = Number.parseInt(req.params.id);
  let body = humps.decamelizeKeys(req.body);

  knex('books')
  .where('id', id)
  .update(body)
  .returning('*')
  .then((response)=>{
    res.send(humps.camelizeKeys(response[0]));
  });
});

router.delete('/books/:id', (req, res, next)=>{
  let id = Number.parseInt(req.params.id);
  let body = humps.decamelizeKeys(req.body);

  knex('books')
  .where('id', id)
  .del()
  .returning('*')
  .then((response)=>{
    delete response[0].id;
    res.send(humps.camelizeKeys(response[0]));
  });
});

module.exports = router;
