let fs = require('fs');
let vars = require('./vars');
let npcs = require('./npcs');
let login = require('./login');
let funct = require('./functions');

let npcIndex = 0;

let loadNpcs = new LoadNpcs();

function LoadNpcs() {

  this.load = function() {
    fs.readFile('npcs.dat', 'UTF-8', (err, data) => {
      let responseArr = data.split('\n');

      let nroItems = 0;

      for (let line in responseArr) {
        let response = responseArr[line];

        let responseSplit = response.split('[NPC');
        let npcNum = responseSplit[1];

        if (npcNum) {
          npcIndex = npcNum.trim().split(']')[0];
          vars.datNpc[npcIndex] = {};
        }

        responseSplit = response.split('Name=');
        let name = responseSplit[1];

        if (name) {
          vars.datNpc[npcIndex].name = name.trim();
        }

        responseSplit = response.split('Head=');
        let head = responseSplit[1];

        if (head) {
          vars.datNpc[npcIndex].idHead = parseInt(head.trim());
        }

        responseSplit = response.split('Body=');
        let body = responseSplit[1];

        if (body) {
          vars.datNpc[npcIndex].idBody = parseInt(body.trim());
        }

        responseSplit = response.split('Movement=');
        let movement = responseSplit[1];

        if (movement) {
          vars.datNpc[npcIndex].movement = parseInt(movement.trim());
        }

        responseSplit = response.split('NpcType=');
        let npcType = responseSplit[1];

        if (npcType) {
          vars.datNpc[npcIndex].npcType = parseInt(npcType.trim());
        }

        responseSplit = response.split('GiveEXP=');
        let exp = responseSplit[1];

        if (exp) {
          vars.datNpc[npcIndex].exp = parseInt(exp.trim());
        }

        responseSplit = response.split('GiveGLD=');
        let gold = responseSplit[1];

        if (gold) {
          vars.datNpc[npcIndex].gold = parseInt(gold.trim());
        }

        responseSplit = response.split('MinHP=');
        let hp = responseSplit[1];

        if (hp) {
          vars.datNpc[npcIndex].hp = parseInt(hp.trim());
        }

        responseSplit = response.split('MaxHP=');
        let maxHp = responseSplit[1];

        if (maxHp) {
          vars.datNpc[npcIndex].maxHp = parseInt(maxHp.trim());
        }

        responseSplit = response.split('MinHIT=');
        let minHit = responseSplit[1];

        if (minHit) {
          vars.datNpc[npcIndex].minHit = parseInt(minHit.trim());
        }

        responseSplit = response.split('MaxHIT=');
        let maxHit = responseSplit[1];

        if (maxHit) {
          vars.datNpc[npcIndex].maxHit = parseInt(maxHit.trim());
        }

        responseSplit = response.split('DEF=');
        let def = responseSplit[1];

        if (def) {
          vars.datNpc[npcIndex].def = parseInt(def.trim());
        }

        responseSplit = response.split('PoderAtaque=');
        let poderAtaque = responseSplit[1];

        if (poderAtaque) {
          vars.datNpc[npcIndex].poderAtaque = parseInt(poderAtaque.trim());
        }

        responseSplit = response.split('PoderEvasion=');
        let poderEvasion = responseSplit[1];

        if (poderEvasion) {
          vars.datNpc[npcIndex].poderEvasion = parseInt(poderEvasion.trim());
        }

        responseSplit = response.split('Comercia=');
        let comercia = responseSplit[1];

        if (comercia && parseInt(comercia) === 1) {
          vars.datNpc[npcIndex].npcType = 10; //Comerciante
        }

        responseSplit = response.split('AguaValida=');
        let aguaValida = responseSplit[1];

        if (aguaValida) {
          vars.datNpc[npcIndex].aguaValida = parseInt(aguaValida.trim());
        }

        responseSplit = response.split('Desc=');
        let desc = responseSplit[1];

        if (desc) {
          vars.datNpc[npcIndex].desc = desc.trim();
        }

        responseSplit = response.split('NROITEMS=');
        let tmpNroItems = responseSplit[1];
                
        if (tmpNroItems) {
          nroItems = parseInt(tmpNroItems);
        }

        if (nroItems > 0) {
          let infoItem = '';

          for (let i = 1; i <= nroItems; i++) {
            responseSplit = response.split('Drop' + i + '=');
            let item = responseSplit[1];

            if (item) {

              infoItem = item.split('-');

              if (!vars.datNpc[npcIndex].drop) {
                vars.datNpc[npcIndex].drop = [];
              }

              vars.datNpc[npcIndex].drop.push({
                item: parseInt(infoItem[0]),
                cant: parseInt(infoItem[1])
              });
            }

            responseSplit = response.split('Obj' + i + '=');
            item = responseSplit[1];

            if (typeof item !== 'undefined') {

              infoItem = item.split('-');

              if (!vars.datNpc[npcIndex].objs) {
                vars.datNpc[npcIndex].objs = [];
              }

              vars.datNpc[npcIndex].objs.push({
                item: parseInt(infoItem[0]),
                cant: parseInt(infoItem[1])
              });
            }
          }
        }
      }

      for (let mapNum = 1; mapNum < 291; mapNum++) {
        for (let mapaY in vars.mapa[mapNum]) {
          for (let mapaX in vars.mapa[mapNum]) {
            if (vars.mapa[mapNum][mapaY][mapaX].npcIndex) {
              let tmpNPC = JSON.parse(JSON.stringify(npcs.createNpc()));

              tmpNPC.id = login.createId();
              tmpNPC.map = mapNum;

              let datNpc = vars.datNpc[vars.mapa[mapNum][mapaY][mapaX].npcIndex];

              tmpNPC.pos.x = parseInt(mapaX);
              tmpNPC.pos.y = parseInt(mapaY);
              tmpNPC.nameCharacter = datNpc.name;
              tmpNPC.color = 'white';
              tmpNPC.isNpc = true;
              tmpNPC.idBody = datNpc.idBody;
              tmpNPC.idHead = datNpc.idHead;
              tmpNPC.movement = datNpc.movement;
              tmpNPC.npcType = parseInt(datNpc.npcType);
              tmpNPC.exp = datNpc.exp;
              if (datNpc.gold)
                tmpNPC.gold = datNpc.gold;
              tmpNPC.hp = datNpc.hp;
              tmpNPC.maxHp = datNpc.maxHp;
              tmpNPC.minHit = datNpc.minHit;
              tmpNPC.maxHit = datNpc.maxHit;
              tmpNPC.def = datNpc.def;
              tmpNPC.poderAtaque = datNpc.poderAtaque;
              tmpNPC.poderEvasion = datNpc.poderEvasion;
              if (datNpc.drop)
                tmpNPC.drop = datNpc.drop;
              if (datNpc.objs)
                tmpNPC.objs = datNpc.objs;
              tmpNPC.aguaValida = datNpc.aguaValida;
              if (datNpc.desc)
                tmpNPC.desc = datNpc.desc;

              let clan = vars.clanNpc[tmpNPC.npcType];

              if (clan) {
                tmpNPC.clan = clan;
              }

              vars.npcs[tmpNPC.id] = tmpNPC;
              vars.npcs[tmpNPC.id].cooldownAtaque = +Date.now() + 4000;

              if (tmpNPC.movement === 3) {
                vars.areaNpc[tmpNPC.id] = [];
              }

              vars.mapData[vars.npcs[tmpNPC.id].map][vars.npcs[tmpNPC.id].pos.y][vars.npcs[tmpNPC.id].pos.x].id = tmpNPC.id;
            }
          }
        }
      }

      console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] NPCs cargados.');
    });
  };
}

module.exports = loadNpcs;