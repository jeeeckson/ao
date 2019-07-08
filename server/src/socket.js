let funct = require('./functions');
let database = require('./database');
let vars = require('./vars');
let pkg = require('./package');
let handleProtocol = require('./handleProtocol');

export const send = (ws, from) => {
  try {
    if (!ws) {
      return;
    }
    console.log("from: ", from);
    if (state(ws) === ws.OPEN) {
      ws.send(pkg.dataSend());
    }
  } catch (err) {
    funct.dumpError(err);
  }
};

export const sendAll = (dataSend, callback) => {
  try {
    let clients = vars.clients;

    for (let z in clients) {
      if (clients[z] && !vars.clients[z].bot) {
        if (state(clients[z]) === clients[z].OPEN) {
          let client = clients[z];

          //client.send(dataSend);

          if (callback) {
            callback(z);
          }
        }
      }
    }
  } catch (err) {
    funct.dumpError(err);
  }
};

export const sendAll2 = (clients, callback) => {
  try {
    for (let z in clients) {
      if (clients[z]) {
        if (state(clients[z]) === clients[z].OPEN) {
          let client = clients[z];

          callback(client);
        }
      }
    }
  } catch (err) {
    funct.dumpError(err);
  }
};

export const getIp = (ws) => {
  try {
    console.log("ip: ", ws.client.conn.remoteAddress);
    return ws.client.conn.remoteAddress;
  } catch (err) {
    funct.dumpError(err);
  }
};

export const state = (ws) => {
  try {
    return ws.readyState;
  } catch (err) {
    funct.dumpError(err);
  }
};

export const close = (ws) => {
  try {
    closePj(ws);
    ws.close();
  } catch (err) {
    funct.dumpError(err);
  }
};

export const closePj = (ws) => {
  try {
    if (typeof ws.id === 'undefined') {
      return;
    }

    let personajeWS = vars.personajes[ws.id];

    deleteUserToAllNpcs(ws.id);

    if (vars.clients[ws.id]) {
      delete vars.clients[ws.id];
    }

    if (personajeWS && !personajeWS.cerrado) {
      personajeWS.cerrado = true;

      vars.mapData[personajeWS.map][personajeWS.pos.y][personajeWS.pos.x].id = 0;

      loopArea(ws.id, (target) => {
        if (!target.isNpc && target.id !== ws.id) {
          deleteCharacter(ws.id, vars.clients[target.id]);
        }
      });

      let query = 'UPDATE characters SET ';

      vars.toSave.forEach((save, i) => {

        if (save === 'posX') {
          query += save + '="' + personajeWS.pos.x + '"';
        } else if (save === 'posY') {
          query += save + '="' + personajeWS.pos.y + '"';
        } else if (!personajeWS[save]) {
          query += save + '=0';
        } else {
          query += save + '="' + personajeWS[save] + '"';
        }

        if (vars.toSave.length - 1 !== i) {
          query += ', ';
        }

      });
      if (vars.toSave.length) {
        query += ', connected=0, updated_at=NOW() WHERE idCharacter="' + personajeWS.idCharacter + '"';
        database.query(query).then(res => res).catch(err => console.error(err.message));
      }

      saveItemsUser(ws.id);

      console.log('El usuario ' + personajeWS.nameCharacter + ' se ha desconectado.');

      vars.usuariosOnline--;

      database.query('UPDATE usersOnline SET usersOnline="' + vars.usuariosOnline + '"');

      actOnline(vars.usuariosOnline);
    }
  } catch (err) {
    funct.dumpError(err);
  }
};

export const loopArea = (idUser, callback) => {
  try {
    let user = vars.personajes[idUser];

    if (!user) {
      return;
    }

    let posXStart = user.pos.x - 10;
    let posYStart = user.pos.y - 10;

    let posXEnd = user.pos.x + 10;
    let posYEnd = user.pos.y + 10;

    for (let y = posYStart; y <= posYEnd; y++) {
      for (let x = posXStart; x <= posXEnd; x++) {
        if (x >= 1 && y >= 1 && x <= 100 && y <= 100) {
          let mapData = vars.mapData[user.map][y][x];

          if (mapData.id) {
            let target = vars.npcs[mapData.id];

            if (!target) {
              target = vars.personajes[mapData.id];
            }

            callback(target);
          }
        }
      }
    }
  } catch (err) {
    funct.dumpError(err);
  }
};

export const actOnline = (usersOnline) => {
  try {
    pkg.setPackageID(pkg.clientPacketID.actOnline);
    pkg.writeShort(usersOnline);
    sendAll(pkg.dataSend());
  } catch (err) {
    funct.dumpError(err);
  }
};

export const deleteCharacter = (idUser, client) => {
  try {
    pkg.setPackageID(pkg.clientPacketID.deleteCharacter);
    pkg.writeDouble(idUser);
    send(client);
  } catch (err) {
    funct.dumpError(err);
  }
};

export const deleteUserToAllNpcs = (idUser) => {
  try {
    loopArea(idUser, (target) => {
      if (target.isNpc && target.movement === 3) {
        let index = vars.areaNpc[target.id].indexOf(idUser);

        if (index > -1) {
          vars.areaNpc[target.id].splice(index, 1);
        }
      }
    });
  } catch (err) {
    funct.dumpError(err);
  }
};

export const saveItemsUser = (idUser) => {
  try {
    let user = vars.personajes[idUser];

    if (user.inv && Object.keys(user.inv).length > 0) {

      //Borro todos los items de la base de datos
      let auxQuery = 'DELETE FROM inventary WHERE idCharacter="' + user.idCharacter + '"';
      database.query(auxQuery);

      //Inserto todos los items de nuevo
      let query = 'INSERT INTO inventary (idCharacter, idPos, idItem, cant, equipped, created_at, updated_at) VALUES ';

      let count = 0;

      for (let idPos in user.inv) {
        count++;

        let item = user.inv[idPos];
        let idItem = item.idItem;

        query += '(' + user.idCharacter + ', ' + idPos + ', ' + idItem + ', ' + item.cant + ', ' + item.equipped + ', NOW(), NOW())';

        if (Object.keys(user.inv).length > count) {
          query += ', ';
        }
      }

      database.query(query);
    } else {
      let query = 'DELETE FROM inventary WHERE idCharacter="' + user.idCharacter + '"';

      database.query(query);
    }
  } catch (err) {
    funct.dumpError(err);
  }
};

//This function save the account and the user if this not exist
export const createCharacter = (UserAccount, UserName, Password, Race, Gender, Class, Head, Mail, Homeland, ws) => {
  const update = (id) => {
    vars.clients[id] = ws;
  };
  let queryExist = 'SELECT * FROM characters c WHERE c.nameCharacter = ?';
  return database.query(queryExist, [UserName]).then((rows) => {
    if (rows.length > 0) {
      vars.personajes[rows[0].idCharacter] = rows[0];
      return rows[0].idCharacter;
    } else {
      return saveAccount(UserAccount, Password, Mail).then(idAccount => {

        let query = `INSERT INTO characters (idAccount, nameCharacter, idClase, map, idLastHead, idLastBody,
          idLastHelmet, idLastWeapon, idLastShield, idShield, idItemWeapon,idItemBody,idItemShield,
          idItemHelmet, idRaza, idGenero, attrFuerza, attrAgilidad,attrInteligencia, attrConstitucion) VALUES 
          ('${idAccount}', '${UserName}', '${Class}', '${Homeland}', '${Head}', '${0}',
          '${0}', '${0}', '${0}', '${0}', '${0}','${0}','${0}',
          '${0}', '${Race}', '${Gender}', '${15}', '${15}','${15}', '${15}')`;
        return database.query(query).then(res => {
          console.log('[INFO] User created successful ' + UserName);
          vars.personajes[res.idCharacter] = res;
          return res.insertId;
        });
      });
    }
  }).then(index => {
    update(index);
    handleProtocol.sendMyCharacter(vars.personajes[index], ws);
    return index;
  });
};
//   handleProtocol.console('[INFO] El usuario ' + rows[0].nameCharacter + ' ya existe', '#E69500', 0, 0, ws);
export const saveAccount = (UserAccount, Password, Email) => {
  let queryExist = 'SELECT * FROM accounts c WHERE c.nameAccount = ?';
  return database.query(queryExist, [UserAccount]).then((rows) => {
    if (rows.length === 0) {
      let query = `INSERT INTO accounts (nameAccount, password, email) VALUES ('${UserAccount}','${Password}','${Email}')`;
      return database.query(query).then(result => {
        return result.insertId;
      })
    } else {
      return rows[0].id;
    }
  });
};

