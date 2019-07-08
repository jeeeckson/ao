let vars = require('./vars');
let fs = require('fs');
let ByteBuffer = require('bytebuffer');
let bufferRcv = new ByteBuffer(0);

let MapData = {};
let YMinMapSize = 1;
let YMaxMapSize = 100;

let XMinMapSize = 1;
let XMaxMapSize = 100;

let number = 1;

createMap(number);

function createMap(mapNumber) {
  let map = fs.createReadStream('Maps/Mapa' + mapNumber + '.map', {
    end: false
  });

  map.on('error', (e) => {
    console.log('debug -- got file read error: ', e);
  }).on('readable', () => {
    let buffer = map.read();
    let ByFlags;

    if (buffer) {
      bufferRcv = new ByteBuffer.wrap(buffer);
      //Versión del Mapa
      bufferRcv.readUInt16();

      //Cabeceras
      bufferRcv.readUTF8String(255);
      bufferRcv.readUint32();
      bufferRcv.readUint32();

      //Cosas al pedo
      bufferRcv.readUInt16();
      bufferRcv.readUInt16();
      bufferRcv.readUInt16();
      bufferRcv.readUInt16();

      MapData = {};
      MapData[mapNumber] = {};

      for (let y = YMinMapSize; y <= YMaxMapSize; y++) {
        MapData[mapNumber][y] = {};

        for (let x = XMinMapSize; x <= XMaxMapSize; x++) {

          MapData[mapNumber][y][x] = {};

          ByFlags = bufferRcv.readUInt8();

          if (ByFlags & 1) {
            MapData[mapNumber][y][x].blocked = 1;
          }

          MapData[mapNumber][y][x].graphics = {};
          MapData[mapNumber][y][x].graphics[1] = bufferRcv.readUInt16();

          if (ByFlags & 2) {
            MapData[mapNumber][y][x].graphics[2] = bufferRcv.readUInt16();
          }

          if (ByFlags & 4) {
            MapData[mapNumber][y][x].graphics[3] = bufferRcv.readUInt16();
          }

          if (ByFlags & 8) {
            MapData[mapNumber][y][x].graphics[4] = bufferRcv.readUInt16();
          }

          if (ByFlags & 16) {
            MapData[mapNumber][y][x].trigger = bufferRcv.readUInt16();
          }
        }
      }

      let inf = fs.createReadStream('Maps/Mapa' + mapNumber + '.inf', {
        end: false
      });

      inf.on('error', (e) => {
        console.log('debug -- got file read error: ', e);
      }).on('readable', () => {
        let buffer = inf.read();
        let ByFlags;

        if (buffer) {
          bufferRcv = new ByteBuffer.wrap(buffer);

          //Cosas al pedo
          bufferRcv.readUInt16();
          bufferRcv.readUInt16();
          bufferRcv.readUInt16();
          bufferRcv.readUInt16();
          bufferRcv.readUInt16();

          //MapData[mapNumber] = {};
          //vars.infoMapData[mapNumber] = {};

          /*for (let y = YMinMapSize; y <= YMaxMapSize; y++) {
                    vars.infoMapData[mapNumber][y] = {};

                    for (let x = XMinMapSize; x <= XMaxMapSize; x++) {
                        vars.infoMapData[mapNumber][y][x] = {};

                        ByFlags = bufferRcv.readUInt8();

                        if (ByFlags & 1) {
                            vars.infoMapData[mapNumber][y][x].tileExit = {};
                            vars.infoMapData[mapNumber][y][x].tileExit.map = bufferRcv.readUInt16();
                            vars.infoMapData[mapNumber][y][x].tileExit.x = bufferRcv.readUInt16();
                            vars.infoMapData[mapNumber][y][x].tileExit.y = bufferRcv.readUInt16();
                        }

                        if (ByFlags & 2) {
                            vars.infoMapData[mapNumber][y][x].npcIndex = bufferRcv.readUInt16();
                        }

                        if (ByFlags & 4) {
                            vars.infoMapData[mapNumber][y][x].objInfo = {};
                            vars.infoMapData[mapNumber][y][x].objInfo.objIndex = bufferRcv.readUInt16();
                            vars.infoMapData[mapNumber][y][x].objInfo.amount = bufferRcv.readUInt16();
                        }
                    }
                }*/

          for (let y = YMinMapSize; y <= YMaxMapSize; y++) {
            //MapData[mapNumber][y] = {};

            for (let x = XMinMapSize; x <= XMaxMapSize; x++) {
              //MapData[mapNumber][y][x] = {};

              ByFlags = bufferRcv.readUInt8();

              if (ByFlags & 1) {
                MapData[mapNumber][y][x].tileExit = {};
                MapData[mapNumber][y][x].tileExit.map = bufferRcv.readUInt16();
                MapData[mapNumber][y][x].tileExit.x = bufferRcv.readUInt16();
                MapData[mapNumber][y][x].tileExit.y = bufferRcv.readUInt16();
              }

              if (ByFlags & 2) {
                MapData[mapNumber][y][x].npcIndex = bufferRcv.readUInt16();
              }

              if (ByFlags & 4) {
                MapData[mapNumber][y][x].objInfo = {};
                MapData[mapNumber][y][x].objInfo.objIndex = bufferRcv.readUInt16();
                MapData[mapNumber][y][x].objInfo.amount = bufferRcv.readUInt16();
              }
            }
          }

        }
      }).on('end', () => {
        fs.writeFile('mapas/mapa_' + mapNumber + '.map', JSON.stringify(MapData), (err) => {
          if (err) return console.log(err);
          console.log('Mapa' + mapNumber + ' creado.');
        });

        if (number < 290){
          number++;
          createMap(number);
        }
        //process.exit(1);
      });
    }
  }).on('end', () => {
    //process.exit(1);
  });
}