

let mysql = require('mysql');

let database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'aoweb'
});

module.exports = database;
