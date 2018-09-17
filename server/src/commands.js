let forever = require('forever');
let socket = require('./socket');
let game = require('./game');
let database = require('./database');
let vars = require('./vars');
let pkg = require('./package');
let npcs = require('./npcs');
let funct = require('./functions');
let handleProtocol = require('./handleProtocol');

let command = new Command();

function Command() {
  this.msg = function(msg, ws) {
    try {
      let searchSpace = msg.indexOf(' ');
      let commandText = msg.slice(0, searchSpace);
      let nextText = msg.slice(searchSpace + 1);

      if (searchSpace < 0) {
        commandText = msg;
      }

      if (!game.existPjOrClose(ws)) {
        return;
      }

      switch (commandText) {
      case '/darexp':
        if (vars.personajes[ws.id].privileges === 1) {
          vars.personajes[ws.id].exp += 9999999999;
          game.checkUserLevel(ws.id);
        }
        break;
      case '/daroro':
        if (vars.personajes[ws.id].privileges === 1) {
          vars.personajes[ws.id].gold += 9999999;
          handleProtocol.actGold(vars.personajes[ws.id].gold, vars.clients[ws.id]);
        }
        break;
      case '/meditar':
        game.accionMeditar(ws.id);
        break;
      case '/dobleexp':
        if (vars.personajes[ws.id].privileges === 1) {
          if (vars.dobleExp) {
            vars.dobleExp = false;
            handleProtocol.consoleToAll('[Servidor] El evento de experiencia doble ha finalizado.', '#E69500', 0, 0);
          } else {
            vars.dobleExp = true;
            handleProtocol.consoleToAll('[Servidor] El evento de experiencia doble ha comenzado.', '#E69500', 0, 0);
          }
        }
        break;
      case '/dobleoro':
        if (vars.personajes[ws.id].privileges === 1) {
          if (vars.dobleGold) {
            vars.dobleGold = false;
            handleProtocol.consoleToAll('[Servidor] El evento de oro doble ha finalizado.', '#E69500', 0, 0);
          } else {
            vars.dobleGold = true;
            handleProtocol.consoleToAll('[Servidor] El evento de oro doble ha comenzado.', '#E69500', 0, 0);
          }
        }
        break;
      case '/telepme':
        if (vars.personajes[ws.id].privileges === 1) {
          //mapa@x@y
          let splitText = nextText.split('@');
          //let name = splitText[0];
          let numMap = parseInt(splitText[0]);
          let posX = parseInt(splitText[1]);
          let posY = parseInt(splitText[2]);

          if (!posX) {
            posX = 50;
          }

          if (!posY) {
            posY = 50;
          }

          game.telep(ws, numMap, posX, posY);
        }
        break;
      case '/reset':
        if (vars.personajes[ws.id].privileges === 1 && vars.personajes[ws.id].nameCharacter === 'Midraks') {
          handleProtocol.consoleToAll('[Servidor] Guardando personajes.', '#E69500', 0, 0);

          game.worldSave((data) => {
            console.log('[COMANDO] Reset');
            forever.restart('server.js');
          });
        }
        break;
      case '/worldsave':
        if (vars.personajes[ws.id].privileges === 1) {
          handleProtocol.consoleToAll('[Servidor] Guardando personajes.', '#E69500', 0, 0);

          game.worldSave((data) => {
            console.log('[COMANDO] WorldSave');
          });
        }
        break;
      case '/verip':
        if (vars.personajes[ws.id].privileges === 1) {
          let name = nextText;

          database.query('SELECT * FROM characters WHERE nameCharacter = ? LIMIT 1', [name], (err, rows, fields) => {
            if (rows.length > 0) {
              handleProtocol.console('[INFO] La ip de ' + rows[0].nameCharacter + ' es ' + rows[0].ip, '#E69500', 0, 0, ws);
            } else {
              handleProtocol.console('[INFO] No existe ningun usuario con el nombre ' + name, '#E69500', 0, 0, ws);
            }
          });
        }
        break;

      case '/kick':
        if (!game.existPjOrClose(ws)) {
          return;
        }

        if (vars.personajes[ws.id].privileges === 1 || vars.personajes[ws.id].privileges === 2) {
          let name = nextText;

          for (let i in vars.personajes) {
            if (vars.personajes[i].nameCharacter.toLowerCase() === name.toLowerCase()) {
              wsKick = vars.clients[i];
              handleProtocol.error('Has sido expulsado del servidor.', wsKick);
              break;
            }
          }
        }
        break;
      case '/mute':
        if (!game.existPjOrClose(ws)) {
          return;
        }

        if (vars.personajes[ws.id].privileges === 1 || vars.personajes[ws.id].privileges === 2) {
          let splitText = nextText.split('@');
          let name = splitText[0];
          let time = splitText[1];

          if (!name || !time) {
            return;
          }

          database.query('SELECT * FROM characters WHERE nameCharacter = ? LIMIT 1', [name], (err, rows, fields) => {
            if (rows.length > 0) {
              database.query('UPDATE characters SET updated_at=NOW(), muted=NOW() + INTERVAL ' + time + ' MINUTE WHERE idCharacter="' + rows[0].idCharacter + '"');

              handleProtocol.console('[INFO] Has silenciado a ' + name + ' por ' + time + ' minutos.', '#E69500', 0, 0, ws);

              for (let i in vars.personajes) {
                if (vars.personajes[i].nameCharacter.toLowerCase() === name.toLowerCase()) {
                  let date = new Date();
                  let minutos = date.getMinutes();
                  let setDate = date.setMinutes(parseInt(minutos) + parseInt(time));

                  handleProtocol.console('[INFO] Has sido silenciado por ' + time + ' minutos.', '#E69500', 0, 0, vars.clients[i]);

                  vars.personajes[i].muted = date;
                  break;
                }
              }
            } else {
              handleProtocol.console('[INFO] No existe ningun usuario con el nombre ' + name, '#E69500', 0, 0, ws);
            }
          });
        }
        break;

      case '/resetaciertos':
        if (!game.existPjOrClose(ws)) {
          return;
        }

        if (vars.personajes[ws.id].privileges === 1) {

          let name = nextText;

          database.query('SELECT * FROM characters WHERE nameCharacter = ? LIMIT 1', [name], (err, rows, fields) => {
            if (rows.length > 0) {
              database.query('UPDATE characters SET updated_at=NOW(), spellsAcertados=0, spellsErrados=0 WHERE idCharacter="' + rows[0].idCharacter + '"');

              handleProtocol.console('[INFO] Has reiniciado los aciertos de ' + name, '#E69500', 0, 0, ws);

              for (let i in vars.personajes) {
                if (vars.personajes[i].nameCharacter.toLowerCase() === name.toLowerCase()) {
                  vars.personajes[i].spellsAcertados = 0;
                  vars.personajes[i].spellsErrados = 0;
                  break;
                }
              }
            } else {
              handleProtocol.console('[INFO] No existe ningun usuario con el nombre ' + name, '#E69500', 0, 0, ws);
            }
          });
        }
        break;
      case '/global':
        if (vars.personajes[ws.id].privileges === 1 || vars.personajes[ws.id].privileges === 2) {
          let msg = nextText;

          handleProtocol.consoleToAll('[Servidor] ' + msg, '#E69500', 0, 0);
        }
        break;
      case '/ban':
        if (!game.existPjOrClose(ws)) {
          return;
        }

        if (vars.personajes[ws.id].privileges === 1) {
          let splitText = nextText.split('@');

          let name = splitText[0];
          let time = splitText[1];

          if (!name || !time) {
            return;
          }

          database.query('SELECT * FROM characters WHERE nameCharacter = ? LIMIT 1', [name], (err, rows, fields) => {
            if (rows.length > 0) {
              database.query('UPDATE characters SET updated_at=NOW(), banned=NOW() + INTERVAL ' + time + ' MINUTE WHERE idCharacter="' + rows[0].idCharacter + '"');

              handleProtocol.console('[INFO] Has baneado a ' + name + ' por ' + time + ' minutos.', '#E69500', 0, 0, ws);

              for (let i in vars.personajes) {
                if (vars.personajes[i].nameCharacter.toLowerCase() === name.toLowerCase()) {

                  wsBan = vars.clients[i];

                  let date = new Date();
                  let minutos = date.getMinutes();
                  let setDate = date.setMinutes(parseInt(minutos) + parseInt(time));

                  handleProtocol.console('[INFO] Has sido baneado por ' + time + ' minutos.', '#E69500', 0, 0, wsBan);

                  vars.personajes[i].banned = date;
                  socket.close(wsBan);
                  break;
                }
              }
            } else {
              handleProtocol.console('[INFO] No existe ningun usuario con el nombre ' + name, '#E69500', 0, 0, ws);
            }
          });
        }
        break;
      case '/unban':
        if (!game.existPjOrClose(ws)) {
          return;
        }

        if (vars.personajes[ws.id].privileges === 1) {
          let name = nextText;
          database.query('SELECT * FROM characters WHERE nameCharacter = ? LIMIT 1', [name], (err, rows, fields) => {
            if (rows.length > 0) {
              database.query('UPDATE characters SET updated_at=NOW(), banned=null WHERE idCharacter="' + rows[0].idCharacter + '"');

              handleProtocol.console('[INFO] Has desbaneado a ' + name, '#E69500', 0, 0, ws);
            } else {
              handleProtocol.console('[INFO] No existe ningun usuario con el nombre ' + name, '#E69500', 0, 0, ws);
            }
          });
        }
        break;
      case '/banip':
        if (!game.existPjOrClose(ws)) {
          return;
        }

        if (vars.personajes[ws.id].privileges === 1) {
          let name = nextText;

          for (let i in vars.personajes) {
            if (vars.personajes[i].nameCharacter.toLowerCase() === name.toLowerCase()) {
              let ip = vars.clients[i]._socket.remoteAddress;

              database.query('INSERT INTO blacklist (ip) VALUES (\'' + ip + '\')');

              handleProtocol.console('[INFO] Has baneado de IP al usuario ' + name + ' | IP: ' + ip, '#E69500', 0, 0, ws);

              handleProtocol.error('Has sido baneado del servidor.', vars.clients[i]);
              break;
            } else {
              database.query('SELECT * FROM characters WHERE nameCharacter = ? LIMIT 1', [name], (err, rows, fields) => {
                if (rows.length > 0) {
                  database.query('INSERT INTO blacklist (ip) VALUES (\'' + rows[0].ip + '\')');

                  handleProtocol.console('[INFO] Has baneado de IP al usuario ' + name + ' | IP: ' + rows[0].ip, '#E69500', 0, 0, ws);
                } else {
                  handleProtocol.console('[INFO] No existe ningun usuario con el nombre ' + name, '#E69500', 0, 0, ws);
                }
              });
            }
          }
        }
        break;
      }
    } catch (err) {
      funct.dumpError(err);
    }
  };
}

module.exports = command;