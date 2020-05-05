/* eslint-disable no-template-curly-in-string */
const axios = require('axios');

// controllers using promises - for reference only!

exports.jokesController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes')
    .then(response => res.send({ jokes: response.data.value }))
    .catch(error => res.status(error.statusCode).send({ error: error.message }));

exports.randomJokeController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => res.send({ randomJoke: response.data.value }))
    .catch(error => res.status(error.statusCode).send({ error: error.message }));

exports.personalJokeController = (req, res) =>
  axios
    .get(
      'https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]',
    )
    .then(response => res.send({ personalJoke: response.data.value }))
    .catch(error => res.status(error.statusCode).send({ error: error.message }));
