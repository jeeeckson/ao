let fs = require('fs');

import express from 'express';
import path from 'path';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 4000;
import {closePj} from './socket';

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
let pkg = require('./package');

console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Iniciando servidor.');
console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Cargando hechizos.');
console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Iniciando WebSockets.');

server.listen(port, '0.0.0.0', () => {
  console.log(`App now listening on port ${port}`);
});

io.on('connection', (ws) => {
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

  ws.on('disconnect', (message) => {
    try {
      closePj(ws);
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