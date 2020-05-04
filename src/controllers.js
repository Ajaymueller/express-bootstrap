const axios = require('axios');
const regeneratorRuntime = require('regenerator-runtime');

exports.jokesController = async (req, res) => {
  try {
    const response = await axios.get('https://api.icndb.com/jokes');
    return res.send({ jokes: response.data.value });
  } catch (error) {
    return res.status(error.statusCode).send({ error: error.message });
  }
};

exports.personalJokeController = async (req, res) => {
  const { first, last } = req.params;
  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );

    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    return res.status(error.statusCode).send({ error: error.message });
  }
};

exports.randomJokeController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => res.send({ randomJoke: response.data.value }))
    .catch(error => res.status(error.statusCode).send({ error: error.message }));
