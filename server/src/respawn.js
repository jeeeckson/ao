let game = require('./game');
let login = require('./login');
let socket = require('./socket');
let database = require('./database');
let funct = require('./functions');
let vars = require('./vars');
let command = require('./commands');
let pkg = require('./package');
let npcs = require('./npcs');
let handleProtocol = require('./handleProtocol');

let respawn = new Respawn();

function Respawn() {

  this.validaciones = function(ws, recibe, callback) {
    let user = vars.personajes[ws.id];
    let x = user.pos.x;
    let y = user.pos.y;
    let valido;

    let pjSelected = vars.personajes[recibe];

    if (!pjSelected) {
      pjSelected = vars.npcs[recibe];
    }

    if (ws.id === recibe) {
      return;
    }

    /*if (game.puedePegar(pjSelected.pos.x, pjSelected.pos.y)) {
            pkg.setPackageID(pkg.clientPacketID.console);
            pkg.writeString("[Servidor] No puedes atacar a un personaje que se encuentra en zona segura.");
            pkg.writeByte(1);
            pkg.writeString('#E69500');
            pkg.writeByte(0);
            pkg.writeByte(0);
            socket.send(ws);
            valido = false;

            return callback(valido);
        }

        if (game.puedePegar(user.pos.x, user.pos.y)) {
            pkg.setPackageID(pkg.clientPacketID.console);
            pkg.writeString("[Servidor] No puedes atacar estando en zona segura.");
            pkg.writeByte(1);
            pkg.writeString('#E69500');
            pkg.writeByte(0);
            pkg.writeByte(0);
            socket.send(ws);
            valido = false;

            return callback(valido);
        }
        if (pjSelected.privileges && !user.privileges) {
            pkg.setPackageID(pkg.clientPacketID.console);
            pkg.writeString("[Servidor] No puedes atacar a un Administrador.");
            pkg.writeByte(1);
            pkg.writeString('#E69500');
            pkg.writeByte(0);
            pkg.writeByte(0);
            socket.send(ws);
            valido = false;

            return callback(valido);
        }*/

    callback(true);
  };

  this.muere = function(ws, idPersonaje) {
    let nameWs = game.getName(ws.id);
    let recibeName = game.getName(idPersonaje);

    let pjSelected = vars.personajes[idPersonaje];

    let user = vars.personajes[ws.id];
    let clientPersonaje = vars.clients[idPersonaje];

    if (!pjSelected) {
      pjSelected = vars.npcs[idPersonaje];
    }

    //Compruebo si el personaje muere
    if (pjSelected.hp <= 0) {

      if (!pjSelected.isNpc) {
        game.putBodyAndHeadDead(idPersonaje);
        npcs.deleteUserToAllNpcs(idPersonaje);
        pjSelected.hp = 0;
        if (!pjSelected.navegando && vars.mapa[pjSelected.map][pjSelected.pos.y][pjSelected.pos.x].trigger !== 6) {
          game.tirarItemsUser(idPersonaje);
        }
      }

      let expGanada = 0;
      let goldGanado = 0;

      if (pjSelected.isNpc) {
        goldGanado = pjSelected.gold * vars.multiplicadorGold;
      } else {
        if (vars.mapa[pjSelected.map][pjSelected.pos.y][pjSelected.pos.x].trigger !== 6) {
          if (pjSelected.criminal) {
            user.criminalesMatados++;
          } else {
            user.ciudadanosMatados++;
            user.fianza++;
          }

          expGanada = vars.exp * vars.multiplicadorExp;
          goldGanado = vars.gold * vars.multiplicadorGold;

          if (vars.dobleExp) {
            expGanada *= 2;
          }

          if (vars.dobleGold) {
            goldGanado *= 2;
          }
        }
      }

      if (expGanada > 0) {
        user.exp += expGanada;
        handleProtocol.console('¡Has ganado ' + expGanada + ' puntos de experiencia!', 'red', 1, 0, ws);
      }

      if (goldGanado > 0) {
        user.gold += goldGanado;

        handleProtocol.console('¡Has ganado ' + goldGanado + ' monedas de oro!', 'red', 1, 0, ws);

        handleProtocol.actGold(user.gold, ws);
      }

      game.checkUserLevel(ws.id);

      if (pjSelected.isNpc) {
        handleProtocol.console('¡Has matado a ' + vars.npcs[idPersonaje].nameCharacter + '!', 'red', 1, 0, ws);
        user.npcMatados++;
        npcs.tirarItems(idPersonaje, ws);
        npcs.muereNpc(idPersonaje);
        return;
      }

      if (pjSelected.inmovilizado || pjSelected.paralizado) {
        handleProtocol.inmo(idPersonaje, 0, clientPersonaje);
      }

      pjSelected.inmovilizado = 0;
      pjSelected.paralizado = 0;
      pjSelected.cooldownParalizado = 0;

      handleProtocol.console(nameWs + ' te ha matado!', 'red', 1, 0, clientPersonaje);

      handleProtocol.console('¡Has matado a ' + recibeName + '!', 'red', 1, 0, ws);
    }

    if (!pjSelected.isNpc) {
      if (user.meditar) {
        user.meditar = false;

        handleProtocol.console('Terminas de meditar.', 'gray', 0, 0, ws);

        game.loopArea(ws, (client) => {
          if (!client.isNpc) {
            handleProtocol.animFX(ws.id, 0, vars.clients[client.id]);
          }
        });
      }

      handleProtocol.updateHP(pjSelected.hp, clientPersonaje);
    }
  };
}

module.exports = respawn;