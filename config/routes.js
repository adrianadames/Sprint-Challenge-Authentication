const axios = require('axios');

const knex = require('knex');
const knexConfig = require('../knexfile');
const bcrypt = require('bcryptjs');

const db = knex(knexConfig.development);

const { authenticate } = require('./middlewares');
const generateToken= require('./middlewares').generateToken;

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
  // const token = generateToken(user);

    db('users')
      .insert(user)
      .then(ids => {
        db('users')
          .where({id:ids[0]})
          .first()
          .then(user => {
            console.log('check1')
            const generateToken= require('./middlewares').generateToken;
            console.log('check2')
            const token = generateToken(user); // Q: Why didn't this const assignment work when placed here?
            console.log('check3')
            console.log(token)
            res.status(200).json(token);
            console.log('check4')
          })
          .catch(err => res.status(500).json({'hello':"john"}));
      })
}

function login(req, res) {
  // implement user login
  const credentials = req.body;

    db('users')
      .where({username:credentials.username})
      .first()
      .then(user => {
        console.log('login_check1')
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          const token = generateToken(user);
          res.send(token)
        }
        else {
          return res.status(401).json({error: 'Incorrect credentials'})
        }
      })
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
