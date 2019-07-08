let mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'aoweb'
    });
    this.connection.on('enqueue', (sequence) => {
      console.log(sequence.sql);

    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      try {
        this.connection.query(sql, args, (err, rows) => {
          if (err)
            return reject(err);
          resolve(rows);
        });
      } catch (e) {
        console.error(e.message);
        reject(e);
      }
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err)
          return reject(err);
        resolve();
      });
    });
  }
}

let database = new Database();

module.exports = database;