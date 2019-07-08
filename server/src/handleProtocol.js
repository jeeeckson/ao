let vars = require('./vars');
let pkg = require('./package');
import {send, sendAll} from './socket';

let handleServer = new HandleServer();

function HandleServer() {
  this.changeHeading = function (idUser, heading, client) {
    pkg.setPackageID(pkg.clientPacketID.changeHeading);
    pkg.writeDouble(idUser);
    pkg.writeByte(heading);
    send(client, 'changeHeading');
  };

  this.console = function (msg, color, bold, italica, client) {
    pkg.setPackageID(pkg.clientPacketID.console);
    pkg.writeString(msg);

    if (color) {
      pkg.writeByte(1);
      pkg.writeString(color);
    } else {
      pkg.writeByte(0);
    }

    pkg.writeByte(bold);
    pkg.writeByte(italica);
    send(client, 'console');
  };

  this.consoleToAll = function (msg, color, bold, italica) {
    pkg.setPackageID(pkg.clientPacketID.console);
    pkg.writeString(msg);

    if (color) {
      pkg.writeByte(1);
      pkg.writeString(color);
    } else {
      pkg.writeByte(0);
    }

    pkg.writeByte(bold);
    pkg.writeByte(italica);
    sendAll(pkg.dataSend());
  };

  this.changeHelmet = function (idUser, idHelmet, idPos, client) {
    pkg.setPackageID(pkg.clientPacketID.changeHelmet);
    pkg.writeDouble(idUser);
    pkg.writeShort(idHelmet);
    pkg.writeByte(idPos);
    send(client);
  };

  this.changeRopa = function (idUser, idBody, idPos, client) {
    pkg.setPackageID(pkg.clientPacketID.changeRopa);
    pkg.writeDouble(idUser);
    pkg.writeShort(idBody);
    pkg.writeByte(idPos);
    send(client);
  };

  this.changeWeapon = function (idUser, idWeapon, idPos, client) {
    pkg.setPackageID(pkg.clientPacketID.changeWeapon);
    pkg.writeDouble(idUser);
    pkg.writeShort(idWeapon);
    pkg.writeByte(idPos);
    send(client);
  };

  this.changeArrow = function (idUser, idPos, client) {
    pkg.setPackageID(pkg.clientPacketID.changeArrow);
    pkg.writeDouble(idUser);
    pkg.writeByte(idPos);
    send(client, 'changeArrow');
  };

  this.changeShield = function (idUser, idShield, idPos, client) {
    pkg.setPackageID(pkg.clientPacketID.changeShield);
    pkg.writeDouble(idUser);
    pkg.writeShort(idShield);
    pkg.writeByte(idPos);
    send(client, 'changeShield');
  };

  this.inmo = function (idUser, inmo, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.inmo);
    pkg.writeByte(inmo);
    pkg.writeByte(user.pos.x);
    pkg.writeByte(user.pos.y);
    send(client, 'inmo');
  };

  this.walkServer = function (pos, heading, client) {
    pkg.setPackageID(pkg.clientPacketID.walkServer);
    pkg.writeByte(pos.x);
    pkg.writeByte(pos.y);
    pkg.writeByte(heading);
    send(client, 'walk server');
  };

  this.walk = function (idUser, pos, client) {
    pkg.setPackageID(pkg.clientPacketID.walk);
    pkg.writeDouble(idUser);
    pkg.writeByte(pos.x);
    pkg.writeByte(pos.y);
    send(client, 'walk');
  };

  this.deleteCharacter = function (idUser, client) {
    pkg.setPackageID(pkg.clientPacketID.deleteCharacter);
    pkg.writeDouble(idUser);
    send(client, 'deleteCharacter');
  };

  this.talk = function (idUser, msg, name, color, console, client) {
    pkg.setPackageID(pkg.clientPacketID.talk);
    pkg.writeDouble(idUser);
    pkg.writeString(msg);
    if (name) {
      pkg.writeByte(1);
      pkg.writeString(name);
    } else {
      pkg.writeByte(0);
    }
    pkg.writeString(color);
    pkg.writeByte(console);
    send(client, 'talk');
  };

  this.pong = function (client) {
    pkg.setPackageID(pkg.clientPacketID.pong);
    send(client);
  };

  this.animFX = function (idUser, fxGrh, client) {
    pkg.setPackageID(pkg.clientPacketID.animFX);
    pkg.writeDouble(idUser);
    pkg.writeShort(fxGrh);
    send(client, 'animFX');
  };

  this.updateMana = function (mana, client) {
    pkg.setPackageID(pkg.clientPacketID.updateMana);
    pkg.writeShort(mana);
    send(client);
  };

  this.updateAgilidad = function (agilidad, client) {
    pkg.setPackageID(pkg.clientPacketID.updateAgilidad);
    pkg.writeByte(agilidad);
    send(client);
  };

  this.updateFuerza = function (fuerza, client) {
    pkg.setPackageID(pkg.clientPacketID.updateFuerza);
    pkg.writeByte(fuerza);
    send(client);
  };

  this.updateHP = function (hp, client) {
    pkg.setPackageID(pkg.clientPacketID.updateHP);
    pkg.writeShort(hp);
    send(client, 'updateHp');
  };

  this.updateMaxHP = function (idUser, hp, maxHP, client) {
    pkg.setPackageID(pkg.clientPacketID.updateMaxHP);
    pkg.writeShort(hp);
    pkg.writeShort(maxHP);
    send(client, 'updateMaxHp');
  };

  this.telepMe = function (idUser, idMap, pos, client) {
    pkg.setPackageID(pkg.clientPacketID.telepMe);
    pkg.writeDouble(idUser);
    pkg.writeShort(idMap);
    pkg.writeByte(pos.x);
    pkg.writeByte(pos.y);
    send(client, 'telepMe');
  };

  this.writeUserIndexInServer = (idUser) => {
    pkg.setPackageID(pkg.clientPacketID.writeUserIndexInServer);
    pkg.writeInt(idUser);
    send(vars.clients[idUser], 'userIndexInServer');
  };

  this.writeChangeMap = (idUser, character) => {
    pkg.setPackageID(pkg.clientPacketID.writeChangeMap);
    pkg.writeInt(idUser);
    pkg.writeInt(character.map);
    send(vars.clients[idUser], 'changemap');
  };

  this.sendMyCharacter = (character, ws) => {
    pkg.setPackageID(pkg.clientPacketID.getMyCharacter);
    pkg.writeInt(character.idCharacter);
    pkg.writeString(character.nameCharacter);
    pkg.writeInt(character.idBody);
    pkg.writeInt(character.idHead);
    pkg.writeByte(4);
    //heading
    pkg.writeByte(character.pos.x);
    pkg.writeByte(character.pos.y);
    pkg.writeInt(character.idWeapon);
    pkg.writeInt(character.idShield);
    pkg.writeInt(character.idHelmet);
    pkg.writeString(character.color);

    /*
    pkg.writeByte(character.idClase);
    pkg.writeShort(character.map);
    pkg.writeShort(character.idHead);
    pkg.writeShort(character.hp);
    pkg.writeShort(character.maxHp);
    pkg.writeShort(character.mana);
    pkg.writeShort(character.maxMana);
    pkg.writeDouble(character.exp);
    pkg.writeDouble(character.expNextLevel);
    pkg.writeByte(character.level);
    pkg.writeInt(character.gold);
    pkg.writeByte(character.heading);
    pkg.writeByte(character.inmovilizado);
    pkg.writeByte(character.zonaSegura);
    pkg.writeString(character.clan);
    pkg.writeByte(character.navegando);
    pkg.writeByte(character.attrAgilidad);
    pkg.writeByte(character.attrFuerza);
    pkg.writeByte(0);
    /*
    pkg.writeByte(Object.keys(character.inv).length);
    character.inv.forEach((item, index) => {
      let idItem = item.idItem;

      pkg.writeByte(index);
      pkg.writeInt(idItem);
      pkg.writeString(vars.datObj[idItem].name);
      pkg.writeByte(item.equipped);
      pkg.writeShort(vars.datObj[idItem].grhIndex);
      pkg.writeShort(item.cant);
      pkg.writeInt(vars.datObj[idItem].valor);
      pkg.writeByte(vars.datObj[idItem].objType);
      pkg.writeByte(itemValidUser(character.id, idItem));
      pkg.writeString(dataObj(idItem));
    });
    */
    /*
    if (character.maxMana > 0) {
      pkg.writeByte(Object.keys(character.spells).length);
      character.spells.forEach((spell, index) => {

        let idSpell = spell.idSpell;

        let datSpell = vars.datSpell[idSpell];

        pkg.writeByte(index);
        pkg.writeShort(idSpell);
        pkg.writeString(datSpell.name);
        pkg.writeShort(datSpell.manaRequired);
      })
    }
    */
    send(ws, 'sendMy');
  };

  this.sendNpc = function (npc, ws) {
    pkg.setPackageID(pkg.clientPacketID.getNpc);
    pkg.writeDouble(npc.id);
    pkg.writeString(npc.nameCharacter);
    pkg.writeByte(npc.idClase);
    pkg.writeShort(npc.map);
    pkg.writeByte(npc.pos.x);
    pkg.writeByte(npc.pos.y);
    pkg.writeShort(npc.idHead);
    pkg.writeShort(npc.idHelmet);
    pkg.writeShort(npc.idWeapon);
    pkg.writeShort(npc.idShield);
    pkg.writeShort(npc.idBody);
    pkg.writeByte(npc.heading);
    pkg.writeString(npc.color);
    pkg.writeString(npc.clan);
    send(ws, 'sendNPC');
  };

  this.sendCharacter = function (character, ws) {
    pkg.setPackageID(pkg.clientPacketID.getCharacter);
    pkg.writeDouble(character.id);
    pkg.writeString(character.nameCharacter);
    pkg.writeByte(character.idClase);
    pkg.writeShort(character.map);
    pkg.writeByte(character.pos.x);
    pkg.writeByte(character.pos.y);
    pkg.writeShort(character.idHead);
    pkg.writeShort(character.idHelmet);
    pkg.writeShort(character.idWeapon);
    pkg.writeShort(character.idShield);
    pkg.writeShort(character.idBody);
    pkg.writeByte(character.heading);
    pkg.writeString(character.color);
    pkg.writeString(character.clan);
    send(ws, 'sendCharacter');
  };

  this.actMyLevel = function (idUser, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.actMyLevel);
    pkg.writeDouble(user.exp);
    pkg.writeDouble(user.expNextLevel);
    pkg.writeByte(user.level);
    pkg.writeShort(user.maxHp);
    pkg.writeShort(user.maxMana);
    send(client);
  };

  this.actExp = function (exp, client) {
    pkg.setPackageID(pkg.clientPacketID.actExp);
    pkg.writeDouble(exp);
    send(client);
  };

  this.actGold = function (gold, client) {
    pkg.setPackageID(pkg.clientPacketID.actGold);
    pkg.writeInt(gold);
    send(client);
  };

  this.actOnline = function (usersOnline) {
    pkg.setPackageID(pkg.clientPacketID.actOnline);
    pkg.writeShort(usersOnline);
    sendAll(pkg.dataSend());
  };

  this.error = function (msg, client) {
    pkg.setPackageID(pkg.clientPacketID.error);
    pkg.writeString(msg);
    send(client, 'error');
    close(client);
  };

  this.putBodyAndHeadDead = function (idUser, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.putBodyAndHeadDead);
    pkg.writeDouble(idUser);
    pkg.writeShort(user.idHead);
    pkg.writeShort(user.idHelmet);
    pkg.writeShort(user.idWeapon);
    pkg.writeShort(user.idShield);
    pkg.writeShort(user.idBody);

    send(client, 'putBody and head');
  };

  this.revivirUsuario = function (idUser, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.revivirUsuario);
    pkg.writeDouble(idUser);
    pkg.writeShort(user.idHead);
    pkg.writeShort(user.idBody);

    send(client, 'resurrection');
  };

  this.quitarUserInvItem = function (idUser, idPos, cant, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.quitarUserInvItem);
    pkg.writeDouble(idUser);
    pkg.writeByte(idPos);
    pkg.writeShort(cant);

    send(client, 'give up inv item user');
  };

  this.renderItem = function (idItem, idMap, pos, client) {
    pkg.setPackageID(pkg.clientPacketID.renderItem);
    pkg.writeByte(pos.x);
    pkg.writeByte(pos.y);
    pkg.writeInt(idItem);

    send(client, 'renderItem'+idItem);
  };

  this.deleteItem = function (idMap, pos, client) {
    pkg.setPackageID(pkg.clientPacketID.deleteItem);
    pkg.writeShort(idMap);
    pkg.writeByte(pos.x);
    pkg.writeByte(pos.y);

    send(client, 'deleteItem');
  };

  this.agregarUserInvItem = function (idUser, idPos, client) {
    pkg.setPackageID(pkg.clientPacketID.agregarUserInvItem);

    let user = vars.personajes[idUser];
    let item = user.inv[idPos];
    let idItem = item.idItem;

    pkg.writeByte(idPos);
    pkg.writeInt(idItem);
    pkg.writeString(vars.datObj[idItem].name);
    pkg.writeByte(item.equipped);
    pkg.writeShort(vars.datObj[idItem].grhIndex);
    pkg.writeShort(item.cant);
    pkg.writeInt(parseInt(vars.datObj[idItem].valor / 3));
    pkg.writeByte(vars.datObj[idItem].objType);
    pkg.writeByte(itemValidUser(idUser, idItem));
    pkg.writeString(dataObj(idItem));

    send(client, 'AgregarUserInvItem');
  };

  this.blockMap = function (idMap, pos, block, client) {
    pkg.setPackageID(pkg.clientPacketID.blockMap);

    pkg.writeShort(idMap);
    pkg.writeByte(pos.x);
    pkg.writeByte(pos.y);
    pkg.writeByte(block);

    send(client, 'blockMap');
  };

  this.openTrade = function (idUser, idNpc, client) {
    let user = vars.personajes[idUser],
      npc = vars.npcs[idNpc];

    pkg.setPackageID(pkg.clientPacketID.openTrade);

    pkg.writeByte(Object.keys(npc.objs).length);

    for (let indexObj in npc.objs) {
      let item = npc.objs[indexObj];
      let objItem = vars.datObj[item.item];

      pkg.writeShort(objItem.grhIndex);
      pkg.writeString(objItem.name);
      pkg.writeShort(item.cant);
      pkg.writeInt(objItem.valor);
      pkg.writeByte(itemValidUser(idUser, item.item));
      pkg.writeString(dataObj(item.item));
    }

    pkg.writeByte(Object.keys(user.inv).length);

    for (let idPos in user.inv) {
      let itemUser = user.inv[idPos];
      let idItem = itemUser.idItem;

      pkg.writeShort(vars.datObj[idItem].grhIndex);
      pkg.writeString(vars.datObj[idItem].name);
      pkg.writeShort(itemUser.cant);
      pkg.writeInt(parseInt(vars.datObj[idItem].valor / 3));
      pkg.writeByte(itemUser.equipped);

      pkg.writeByte(idPos);
      pkg.writeByte(itemValidUser(idUser, idItem));
      pkg.writeString(dataObj(idItem));
    }

    send(client, 'openTrade');
  };

  this.aprenderSpell = function (idUser, idPosSpell) {
    let user = vars.personajes[idUser];

    let spell = user.spells[idPosSpell];
    let idSpell = spell.idSpell;

    let datSpell = vars.datSpell[idSpell];

    pkg.setPackageID(pkg.clientPacketID.aprenderSpell);

    pkg.writeByte(idPosSpell);
    pkg.writeShort(idSpell);
    pkg.writeString(datSpell.name);
    pkg.writeShort(datSpell.manaRequired);

    send(vars.clients[idUser], 'aprenderSpell');
  };

  this.closeForce = function (idUser) {
    pkg.setPackageID(pkg.clientPacketID.closeForce);
    send(vars.clients[idUser], 'closeForce');
  };

  this.nameMap = function (idUser) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.nameMap);
    pkg.writeString(vars.mapData[user.map].name);
    send(vars.clients[idUser], 'nameMap');
  };

  this.changeBody = function (idUser, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.changeBody);
    pkg.writeDouble(idUser);
    pkg.writeShort(user.idHead);
    pkg.writeShort(user.idBody);
    pkg.writeShort(user.idHelmet);
    pkg.writeShort(user.idWeapon);
    pkg.writeShort(user.idShield);
    send(client, 'changeBody');
  };

  this.navegando = function (idUser, client) {
    let user = vars.personajes[idUser];

    pkg.setPackageID(pkg.clientPacketID.navegando);
    pkg.writeByte(user.navegando);
    send(client, 'navegando');
  };

  this.actColorName = function (idUser, color, client) {
    pkg.setPackageID(pkg.clientPacketID.actColorName);
    pkg.writeDouble(idUser);
    pkg.writeString(color);
    send(client, 'actColorName');
  };

  function isRazaEnana(idRaza) {
    return idRaza === vars.razas.gnomo || idRaza === vars.razas.enano;
  }

  function itemValidUser(idUser, idItem) {
    let user = vars.personajes[idUser];
    let obj = vars.datObj[idItem];

    if ((obj.clasesPermitidas && obj.clasesPermitidas.indexOf(user.idClase) >= 0) || (obj.razaEnana && !isRazaEnana(user.idRaza) && obj.objType === vars.objType.armaduras) || (!obj.razaEnana && isRazaEnana(user.idRaza) && obj.objType === vars.objType.armaduras)) {
      return 0;
    } else {
      return 1;
    }
  }

  function dataObj(idItem) {
    try {
      let obj = vars.datObj[idItem];

      let data = '';

      switch (obj.objType) {
        case vars.objType.armas:
          data = 'Daño: ' + obj.minHit + '/' + obj.maxHit;

          if (obj.apu) {
            data += ' | Apuñala';
          }

          if (obj.staffDamageBonus) {
            data += ' | Daño mágico: ' + obj.staffDamageBonus;
          }
          break;

        case vars.objType.armaduras:
          data = 'Defensa: ' + obj.minDef + '/' + obj.maxDef;
          break;

        case vars.objType.escudos:
          data = 'Defensa: ' + obj.minDef + '/' + obj.maxDef;
          break;

        case vars.objType.cascos:
          data = 'Defensa: ' + obj.minDef + '/' + obj.maxDef;

          if (obj.minDefMag && obj.maxDefMag) {
            data += ' | Defensa Mágica: ' + obj.minDefMag + '/' + obj.maxDefMag;
          }
          break;

        case vars.objType.flechas:
          data = 'Daño: ' + obj.minHit + '/' + obj.maxHit;
          break;


        case vars.objType.pergaminos:
          let spell = vars.datSpell[obj.spellIndex];

          if (spell.minHp && spell.maxHp) {
            if (spell.subeHp === 1) {
              data = 'Curación: ' + spell.minHp + '/' + spell.maxHp + ' | ';
            } else if (spell.subeHp === 2) {
              data = 'Daño: ' + spell.minHp + '/' + spell.maxHp + ' | ';
            }
          }

          data += 'Maná requerida: ' + spell.manaRequired;
          break;
      }

      return data;
    } catch (err) {
      funct.dumpError(err);
    }
  }
}

module.exports = handleServer;