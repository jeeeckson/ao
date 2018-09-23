let funct = require('./functions');
let database = require('./database');
let vars = require('./vars');
let pkg = require('./package');
let handleProtocol = require('./handleProtocol');

let socket = new Socket();

function Socket() {
  this.send = function (ws) {
    try {
      if (!ws) {
        return;
      }

      if (this.state(ws) === ws.OPEN) {
        ws.send(pkg.dataSend());
      }
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.sendAll = function (dataSend, callback) {
    try {
      let clients = vars.clients;

      for (let z in clients) {
        if (clients[z] && !vars.clients[z].bot) {
          if (this.state(clients[z]) === clients[z].OPEN) {
            client = clients[z];

            client.send(dataSend);

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

  this.sendAll2 = function (clients, callback) {
    try {
      for (let z in clients) {
        if (clients[z]) {
          if (this.state(clients[z]) === clients[z].OPEN) {
            client = clients[z];

            callback(client);
          }
        }
      }
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.getIp = function (ws) {
    try {
      return ws._socket.remoteAddress;
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.state = function (ws) {
    try {
      return ws.readyState;
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.close = function (ws) {
    try {
      socket.closePj(ws);
      ws.close();
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.closePj = function (ws) {
    try {
      if (typeof ws.id === 'undefined') {
        return;
      }

      let personajeWS = vars.personajes[ws.id];

      socket.deleteUserToAllNpcs(ws.id);

      if (vars.clients[ws.id]) {
        delete vars.clients[ws.id];
      }

      if (personajeWS && !personajeWS.cerrado) {
        personajeWS.cerrado = true;

        vars.mapData[personajeWS.map][personajeWS.pos.y][personajeWS.pos.x].id = 0;

        socket.loopArea(ws.id, (target) => {
          if (!target.isNpc && target.id !== ws.id) {
            socket.deleteCharacter(ws.id, vars.clients[target.id]);
          }
        });

        query = 'UPDATE characters SET ';

        for (let save in vars.toSave) {
          if (vars.toSave[save] === 'posX') {
            query += vars.toSave[save] + '="' + personajeWS.pos.x + '"';
          } else if (vars.toSave[save] === 'posY') {
            query += vars.toSave[save] + '="' + personajeWS.pos.y + '"';
          } else if (!personajeWS[vars.toSave[save]]) {
            query += vars.toSave[save] + '=0';
          } else {
            query += vars.toSave[save] + '="' + personajeWS[vars.toSave[save]] + '"';
          }

          if (vars.toSave.length - 1 !== save) {
            query += ', ';
          }
        }

        query += ', connected=0, updated_at=NOW() WHERE idCharacter="' + personajeWS.idCharacter + '"';

        database.query(query);

        socket.saveItemsUser(ws.id);

        console.log('El usuario ' + personajeWS.nameCharacter + ' se ha desconectado.');

        vars.usuariosOnline--;

        database.query('UPDATE usersOnline SET usersOnline="' + vars.usuariosOnline + '"');

        socket.actOnline(vars.usuariosOnline);
      }
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.loopArea = function (idUser, callback) {
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

  this.actOnline = function (usersOnline) {
    try {
      pkg.setPackageID(pkg.clientPacketID.actOnline);
      pkg.writeShort(usersOnline);
      socket.sendAll(pkg.dataSend());
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.deleteCharacter = function (idUser, client) {
    try {
      pkg.setPackageID(pkg.clientPacketID.deleteCharacter);
      pkg.writeDouble(idUser);
      socket.send(client);
    } catch (err) {
      funct.dumpError(err);
    }
  };

  this.deleteUserToAllNpcs = function (idUser) {
    try {
      socket.loopArea(idUser, (target) => {
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

  this.saveItemsUser = function (idUser) {
    try {
      let user = vars.personajes[idUser];

      if (Object.keys(user.inv).length > 0) {

        //Borro todos los items de la base de datos
        let auxQuery = 'DELETE FROM inventary WHERE idCharacter="' + user.idCharacter + '"';
        database.query(auxQuery);

        //Inserto todos los items de nuevo
        query = 'INSERT INTO inventary (idCharacter, idPos, idItem, cant, equipped, created_at, updated_at) VALUES ';

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
  this.createCharacter = (UserAccount, UserName, Password, Race, Gender, Class, Head, Mail, Homeland) => {
    let queryExist = `SELECT * FROM characters c WHERE c.nameCharacter = ?`;
    return database.query(queryExist, [UserName]).then((rows) => {
      if (rows.length > 0) {
        return -1;
      } else {
        return this.saveAccount(UserAccount, Password, Mail).then(idAccount => {

          let query = `INSERT INTO characters (idAccount, nameCharacter, idClase, map, idLastHead, idLastBody,
          idLastHelmet, idLastWeapon, idLastShield, idShield, idItemWeapon,idItemBody,idItemShield,
          idItemHelmet, idRaza, idGenero, attrFuerza, attrAgilidad,attrInteligencia, attrConstitucion) VALUES 
          ('${idAccount}', '${UserName}', '${Class}', '${Homeland}', '${Head}', '${0}',
          '${0}', '${0}', '${0}', '${0}', '${0}','${0}','${0}',
          '${0}', '${Race}', '${Gender}', '${15}', '${15}','${15}', '${15}')`;
          return database.query(query).then(res => {
            console.log('[INFO] User created successful ' + UserName);
            vars.personajes.push(res.insertId);
            return res.insertId;
          });
        });
      }
    });
  };
  //   handleProtocol.console('[INFO] El usuario ' + rows[0].nameCharacter + ' ya existe', '#E69500', 0, 0, ws);
  this.saveAccount = (UserAccount, Password, Email) => {
    let queryExist = `SELECT * FROM accounts c WHERE c.nameAccount = ?`;
    return database.query(queryExist, [UserAccount]).then((rows) => {
      if (rows.length === 0) {
        let query = `INSERT INTO accounts (nameAccount, password, email) VALUES ('${UserAccount}','${Password}','${Email}')`;
        return database.query(query).then(result => {
          console.log("1 record inserted, ID: " + result.insertId);
          return result.insertId;
        })
      } else {
        return rows[0].id;
      }
    });
  };
}

module.exports = socket;