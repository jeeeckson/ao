let vars = require('./vars');
let database = require('./database');

let query = 'SELECT * FROM characters';

database.query(query, (err, rows, fields) => {
  for (let index in rows) {
    let user = rows[index];

    let maxHp = user.attrConstitucion;

    for (let i = 1; i < user.level; i++) {
      maxHp += vars.modVida[user.attrConstitucion][user.idClase];
    }

    console.log('Nombre: ' + user.nameCharacter + ' | Vida Anterior: ' + user.maxHp + ' | Vida Final: ' + maxHp);

    let hp = maxHp;

    if (user.dead) {
      hp = 0;
    }

    database.query('UPDATE characters SET hp="' + hp + '", maxHp="' + maxHp + '" WHERE idCharacter="' + user.idCharacter + '"', (err, result) => {
      if (err) {
        console.log(err);
      }

      console.log('changed ' + result.changedRows + ' rows');
    });
  }
});