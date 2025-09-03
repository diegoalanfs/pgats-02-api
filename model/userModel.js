const bcrypt = require('bcryptjs');

// In-memory user database
const users = [
  {
    username: 'diego',
    password: bcrypt.hashSync('123456', 8),
    favorecidos: [ 'bruno' ], 
    saldo: 1000
  },
  {
    username: 'bruno', 
    password: bcrypt.hashSync('123456', 8), 
    favorecidos: [ 'diego' ], 
    saldo: 10000
  }
];

module.exports = {
  users
};
