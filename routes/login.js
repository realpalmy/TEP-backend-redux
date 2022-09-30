const express = require('express');
const user = require('../data/userToken');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(user);
});

router.post('/user', (req, res) => {
  const { username, password } = req.body;
  const credentials = {
    username,
    password
  };
  user.push(credentials);
  res.json(credentials);
  //res.sendStatus(201);
});

router.get('/:id', (req, res) => {
  const userId = Number.parseInt(req.params.id);
  const product = data.find((product) => user.id == userId);
  res.json(product);
});



/*
async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
*/

module.exports = router;