const axios = require('axios');

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;

  //hash password
  const hash = bcrypt.hashSync(user.password, 10); //10 rounds for development speed (i.e. in the interest of time)
  user.password = hash;

    db('users')
      .insert(user)
      .then(ids => {
        db('users')
          .where({id:ids[0]})
          .first()
          .then(user => {
            req.status(200).json(user);
          })
          .catch(err => res.status(500).json({err}));
      })

}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
