let fs = require('fs');

let WebSocketServer = require('ws').Server,
  ws = new WebSocketServer({
    port: 7666,
    binaryType: 'arrayBuffer'
  }),
  util = require('util');
import socket from './socket';
let ByteQueue = require('./bytequeue');
let funct = require('./functions');
let protocol = require('./protocol');
let game = require('./game');
let vars = require('./vars');
let database = require('./database');
let npcs = require('./npcs');
//let loadMaps = require('./createMaps');
let loadMaps = require('./loadMaps');
let loadObjs = require('./loadObjs');
let loadSpells = require('./loadSpells');
let handleProtocol = require('./handleProtocol');
let serialize = require('node-serialize');
let byte = new ByteQueue(ws);
let pkg = require('./package');

console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Iniciando servidor.');
console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Cargando hechizos.');
console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Iniciando WebSockets.');

ws.on('connection', (ws) => {
  ws.on('message', (res) => {
    try {
      if (ws.readyState !== ws.OPEN) {
        return;
      }
      vars.clients[ws.id] = ws;
      pkg.setData(res);
      let packageID = pkg.getPackageID();

      protocol.handleData(ws, packageID);

    } catch (err) {
      funct.dumpError(err);
    }
  });

  ws.on('close', (message) => {
    try {
      socket.closePj(ws);
    } catch (err) {
      funct.dumpError(err);
    }
  });
});

setInterval(() => {
  for (let idNpc in vars.npcs) {
    let npc = vars.npcs[idNpc];

    if (npc.movement === 3 && vars.areaNpc[idNpc].length > 0 && !npc.rute.length) {
      npcs.npcAttackUser(idNpc);
    }
  }
}, 650);

setInterval(() => {
  for (let idUser in vars.personajes) {
    let user = vars.personajes[idUser];

    if (user.meditar && user.mana < user.maxMana) {
      game.meditar(idUser);
    }

    if (user.cooldownFuerza > 0 && +Date.now() - user.cooldownFuerza > vars.cooldownFA) {
      user.attrFuerza = user.bkAttrFuerza;
      user.cooldownFuerza = 0;
      handleProtocol.updateFuerza(user.attrFuerza, vars.clients[idUser]);
    }

    if (user.cooldownAgilidad > 0 && +Date.now() - user.cooldownAgilidad > vars.cooldownFA) {
      user.attrAgilidad = user.bkAttrAgilidad;
      user.cooldownAgilidad = 0;
      handleProtocol.updateAgilidad(user.attrAgilidad, vars.clients[idUser]);
    }
  }
}, 500);

//Limpio los personajes cerrados
setInterval(() => {
  for (let idUser in vars.personajes) {
    if (vars.personajes[idUser].cerrado) {
      delete vars.personajes[idUser];
    }
  }
}, 60000);

//TaskManager 60 ticks por segundo

setInterval(() => {
  game.worldSave((data) => {
    console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] WorldSave');
  });
}, 300000);