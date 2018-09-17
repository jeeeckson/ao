let fs = require('fs');
let PF = require('pathfinding');
let vars = require('./vars');

let bloqueos = [];

/*for (let index in mapa.bloqueos) {
    bloqueos.push(mapa.bloqueos[index]);
}*/

let pathfinding = new Pathfinding();

function Pathfinding() {

  this.generateRute = function(map, posStart, posEnd) {
    console.log('--------');
    console.log(posStart);
    console.log(posEnd);
    console.log('--------');

    let grid = new PF.Grid(100, 100);

    /*for (let idPj in vars.personajes){
        	grid.setWalkableAt(vars.personajes[idPj].pos.x - 1, vars.personajes[idPj].pos.y - 1, false);
        }

        for (let idNpc in vars.npcs){
        	grid.setWalkableAt(vars.npcs[idNpc].pos.x - 1, vars.npcs[idNpc].pos.y - 1, false);
        }*/

    for (let indexMap in vars.mapData[map]) {
      if (vars.mapData[map][indexMap].id) {
        let pos = indexMap.split('-');

        grid.setWalkableAt(pos[0] - 1, pos[1] - 1, false);
      }
    }

    let finder = new PF.AStarFinder();

    let path = finder.findPath(posStart.x - 1, posStart.y - 1, posEnd.x - 1, posEnd.y - 1, grid);
    path.shift();
    return path;
  };
}

module.exports = pathfinding;