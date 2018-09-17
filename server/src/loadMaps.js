let vars = require('./vars');
let fs = require('fs');
let loadNpcs = require('./loadNpcs');
let funct = require('./functions');

console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Cargando Mapas...');

for (let i = 1; i < 291; i++) {
  readMap(i);
}

console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Mapas Cargados.');

loadNpcs.load();

function readMap(mapNum) {
  let tmpMap = JSON.parse(fs.readFileSync('mapas/mapa_' + mapNum + '.map', 'utf8'));
  vars.mapa[mapNum] = {};
  vars.mapa[mapNum] = tmpMap[mapNum];

  vars.mapData[mapNum] = [];

  for (let y = 1; y <= 100; y++) {
    vars.mapData[mapNum][y] = [];

    for (let x = 1; x <= 100; x++) {
      vars.mapData[mapNum][y][x] = {
        id: 0
      };
    }
  }

  vars.mapData[mapNum].name = '';
  vars.mapData[mapNum].musicNum = 0;
  vars.mapData[mapNum].magiaSinEfecto = 0;
  vars.mapData[mapNum].noEncriptarMp = 0;
  vars.mapData[mapNum].terreno = '';
  vars.mapData[mapNum].zona = '';
  vars.mapData[mapNum].restringir = 0;
  vars.mapData[mapNum].backup = 0;
  vars.mapData[mapNum].pk = 0;

  fs.readFile('Maps/Mapa' + mapNum + '.dat', 'UTF-8', (err, data) => {
    let responseArr = data.split('\n');

    for (let line in responseArr) {
      let response = responseArr[line];
 
      let responseSplit = response.split('Name=');
      let name = responseSplit[1];

      if (name) {
        vars.mapData[mapNum].name = name.trim();
      }

      responseSplit = response.split('MusicNum=');
      let musicNum = responseSplit[1];

      if (musicNum) {
        vars.mapData[mapNum].musicNum = parseInt(musicNum.trim());
      }

      responseSplit = response.split('MagiaSinefecto=');
      let magiaSinEfecto = responseSplit[1];

      if (magiaSinEfecto) {
        vars.mapData[mapNum].magiaSinEfecto = parseInt(magiaSinEfecto.trim());
      }

      responseSplit = response.split('NoEncriptarMP=');
      let noEncriptarMp = responseSplit[1];

      if (noEncriptarMp) {
        vars.mapData[mapNum].noEncriptarMp = parseInt(noEncriptarMp.trim());
      }

      responseSplit = response.split('Terreno=');
      let terreno = responseSplit[1];

      if (terreno) {
        vars.mapData[mapNum].terreno = terreno.trim();
      }

      responseSplit = response.split('Zona=');
      let zona = responseSplit[1];

      if (zona) {
        vars.mapData[mapNum].zona = zona.trim();
      }

      responseSplit = response.split('Restringir=');
      let restringir = responseSplit[1];

      if (restringir) {
        vars.mapData[mapNum].restringir = restringir.trim();
      }

      responseSplit = response.split('BackUp=');
      let backup = responseSplit[1];

      if (backup) {
        vars.mapData[mapNum].backup = parseInt(backup.trim());
      }

      responseSplit = response.split('Pk=');
      let pk = responseSplit[1];

      if (pk) {
        vars.mapData[mapNum].pk = parseInt(pk.trim());
      }
    }
  });
}
