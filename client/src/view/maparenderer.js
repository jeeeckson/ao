/**
 * Created by horacio on 8/21/16.
 */

import Enums from '../enums';
import Utils from '../utils/util';
//import PIXI from '../lib/pixi';
import * as PIXI from 'pixi.js';
import SpriteGrh from './spritegrh';
import RendererUtils from './rendererutils';
import log from '../utils/log';
import _ from 'lodash';

export default class MapaRenderer {
  constructor(camera, assetManager, layer1Container, layer2Container, layer3Container, layer4Container) {

    // posiciones extra que se analizan para ver si lo que hay en ellas es visible o no
    // (si es algo visible pero tan grande que cuando esta lejos no entra en estas posiciones no se ve)
    this.POSICIONES_EXTRA_RENDER = {
      norte: 1,
      sur: 7,
      este: 4,
      oeste: 4
    };

    // posiciones extras que se renderizan del terreno (no deberia ser necesaria mas de 1 por el movimiento)
    this.POSICIONES_EXTRA_TERRENO = 1;

    this.camera = camera;
    this.assetManager = assetManager;
    this.layer1 = layer1Container;
    this.layer2 = layer2Container;
    this.layer3 = layer3Container;
    this.layer4 = layer4Container;

    this.tilesize = 32;
    this.mapa = null;
    this.terreno = null;
    this._lowestRowTerreno = null;
    this._lowestColTerreno = null;
    this._spritesLayer2 = [];
    this._spritesLayer3 = [];
    this._spritesLayer4 = [];

    this._initTerrenoSpriteGrid();
  }

  cambiarMapa(mapa) {
    this.mapa = mapa;
  }

  drawMapaIni(gridX, gridY) { // SOLO USARLO EN CAMBIO DE MAPA, SINO USAR RESETPOS. Limpia vectores, dibuja el terreno del mapa, almacena los tiles animados
    if (!this.mapa.isLoaded) {
      throw new Error('DRAW MAPA INI SIN QUE ESTE CARGADO');
    }
    this._drawSpritesIni();
    this._drawTerrenoIni();
  }

  updateTilesMov(dir) {
    if (!this.mapa.isLoaded) {
      return;
    }
    this._updateTerrenoMov(dir);
    this._updateLayersMov(dir);
  }

  _initTerrenoSpriteGrid() {
    this.terreno = [];
    for (let i = 0; i < this.camera.gridW + this.POSICIONES_EXTRA_TERRENO * 2; i++) {
      this.terreno[i] = [];
      for (let j = 0; j < this.camera.gridH + this.POSICIONES_EXTRA_TERRENO * 2; j++) {

        this.terreno[i][j] = new SpriteGrh(this.assetManager.getTerrenoGrh(1)); // grh null
        this.layer1.addChild(this.terreno[i][j]);
      }
    }
  }

  _drawTerrenoIni() {
    let gridXIni = this.camera.gridX - this.POSICIONES_EXTRA_TERRENO;
    let gridYIni = this.camera.gridY - this.POSICIONES_EXTRA_TERRENO;
    this._lowestRowTerreno = 0; // variable que indica que indice tiene los sprites de pos mas baja, para que al caminar estos sean movidos a las mas altas
    this._lowestColTerreno = 0;

    for (let i = 0; i < this.camera.gridW + this.POSICIONES_EXTRA_TERRENO * 2; i++) {
      for (let j = 0; j < this.camera.gridH + this.POSICIONES_EXTRA_TERRENO * 2; j++) {
        let screenX = (gridXIni + i) * this.tilesize;
        let screenY = (gridYIni + j) * this.tilesize;
        this.terreno[i][j].setPosition(screenX, screenY);

        let grh = this.mapa.getGrh1(gridXIni + i, gridYIni + j);
        if (grh) {
          console.log("maprender", this.assetManager.getTerrenoGrh(grh))
          this.terreno[i][j].cambiarGrh(this.assetManager.getTerrenoGrh(grh));
        }
      }
    }
  }

  _updateTerrenoMov(dir) { // al moverse mueve la columna/fila que queda atras al frente de todo
    let gridXIni = this.camera.gridX - this.POSICIONES_EXTRA_TERRENO;
    let gridYIni = this.camera.gridY - this.POSICIONES_EXTRA_TERRENO;
    let cols = this.camera.gridW + this.POSICIONES_EXTRA_TERRENO * 2;
    let rows = this.camera.gridH + this.POSICIONES_EXTRA_TERRENO * 2;
    let i,j;
    switch (dir) {
    case Enums.Heading.norte:
       j = Utils.modulo(this._lowestRowTerreno - 1, rows);
      for ( i = 0; i < this.terreno.length; i++) {
        this.terreno[i][j].setPosition(this.terreno[i][j].x, this.terreno[i][j].y - (rows * this.tilesize));

        let grh = this.mapa.getGrh1(gridXIni + Utils.modulo(i - this._lowestColTerreno, cols), gridYIni - 1);
        if (grh) {
          console.log("maprender2", this.assetManager.getTerrenoGrh(grh))

          this.terreno[i][j].cambiarGrh(this.assetManager.getTerrenoGrh(grh));
        }
      }

      this._lowestRowTerreno = Utils.modulo(this._lowestRowTerreno - 1, rows);
      break;

    case Enums.Heading.oeste:
       i = Utils.modulo(this._lowestColTerreno - 1, cols);
      for ( j = 0; j < this.terreno[i].length; j++) {
        this.terreno[i][j].setPosition(this.terreno[i][j].x - (cols * this.tilesize), this.terreno[i][j].y);

        let grh = this.mapa.getGrh1(gridXIni - 1, gridYIni + Utils.modulo(j - this._lowestRowTerreno, rows));
        if (grh) {
          console.log("maprender3", this.assetManager.getTerrenoGrh(grh))

          this.terreno[i][j].cambiarGrh(this.assetManager.getTerrenoGrh(grh));
        }
      }
      this._lowestColTerreno = Utils.modulo(this._lowestColTerreno - 1, cols);
      break;

    case Enums.Heading.sur:
       j = this._lowestRowTerreno;
      for ( i = 0; i < this.terreno.length; i++) {
        this.terreno[i][j].setPosition(this.terreno[i][j].x, (this.terreno[i][j].y + (rows * this.tilesize)));

        let grh = this.mapa.getGrh1(gridXIni + Utils.modulo(i - this._lowestColTerreno, cols), gridYIni + rows);
        if (grh) {
          console.log("maprender4", this.assetManager.getTerrenoGrh(grh))

          this.terreno[i][j].cambiarGrh(this.assetManager.getTerrenoGrh(grh));
        }

      }
      this._lowestRowTerreno = Utils.modulo(this._lowestRowTerreno + 1, rows);
      break;

    case Enums.Heading.este:
       i = this._lowestColTerreno;
      for ( j = 0; j < this.terreno[i].length; j++) {
        this.terreno[i][j].setPosition((this.terreno[i][j].x + cols * this.tilesize), this.terreno[i][j].y);

        let grh = this.mapa.getGrh1(gridXIni + cols, gridYIni + Utils.modulo(j - this._lowestRowTerreno, rows));
        if (grh) {
          console.log("maprender5", this.assetManager.getTerrenoGrh(grh))

          this.terreno[i][j].cambiarGrh(this.assetManager.getTerrenoGrh(grh));
        }

      }
      this._lowestColTerreno = Utils.modulo(this._lowestColTerreno + 1, cols);
      break;

    default:
      log.error('character heading invalido');
      break;
    }
  }

  _drawSpritesIni() {
    this._removeChilds(this.layer2, this._spritesLayer2);
    this._removeChilds(this.layer3, this._spritesLayer3);
    this._removeChilds(this.layer4, this._spritesLayer4);
    for (let k = 0; k <= 100; k++) {
      this._spritesLayer2[k] = [];
      this._spritesLayer3[k] = [];
      this._spritesLayer4[k] = [];
    }

    let self = this;
    this.camera.forEachVisiblePosition((i, j) => {
      let screenX = i * self.tilesize;
      let screenY = j * self.tilesize;
      let grh2 = self.mapa.getGrh2(i, j);
      let grh3 = self.mapa.getGrh3(i, j);
      let grh4 = self.mapa.getGrh4(i, j);
      if (grh2) {
        self._spritesLayer2[i][j] = self._crearSprite(self.layer2, grh2, screenX, screenY);
      }
      if (grh3) {
        self._spritesLayer3[i][j] = self._crearSprite(self.layer3, grh3, screenX, screenY);
      }
      if (grh4) {
        self._spritesLayer4[i][j] = self._crearSprite(self.layer4, grh4, screenX, screenY);
      }
    }, this.POSICIONES_EXTRA_RENDER);
  }

  _updateLayersMov(dir) {
    let self = this;
    this.camera.forEachVisibleNextLinea(dir, (i, j) => {
      let screenX = i * self.tilesize;
      let screenY = j * self.tilesize;
      let grh2 = self.mapa.getGrh2(i, j);
      let grh3 = self.mapa.getGrh3(i, j);
      let grh4 = self.mapa.getGrh4(i, j);
      if (grh2) {
        if (self._spritesLayer2[i][j]) {
          return;
        }
        self._spritesLayer2[i][j] = self._crearSprite(self.layer2, grh2, screenX, screenY);
      }
      if (grh3) {
        if (self._spritesLayer3[i][j]) {
          return;
        }
        self._spritesLayer3[i][j] = self._crearSprite(self.layer3, grh3, screenX, screenY);
      }
      if (grh4) {
        if (self._spritesLayer4[i][j]) {
          return;
        }
        self._spritesLayer4[i][j] = self._crearSprite(self.layer4, grh4, screenX, screenY);
      }
    }, this.POSICIONES_EXTRA_RENDER);

    this.camera.forEachVisibleLastLinea(dir, (i, j) => {

      if (self._spritesLayer2[i][j]) {
        RendererUtils.removePixiChild(self.layer2, self._spritesLayer2[i][j]);
        self._spritesLayer2[i][j] = null;
      }
      if (self._spritesLayer3[i][j]) {
        RendererUtils.removePixiChild(self.layer3, self._spritesLayer3[i][j]);
        self._spritesLayer3[i][j] = null;
      }
      if (self._spritesLayer4[i][j]) {
        RendererUtils.removePixiChild(self.layer4, self._spritesLayer4[i][j]);
        self._spritesLayer4[i][j] = null;
      }
    }, this.POSICIONES_EXTRA_RENDER);

    this.camera.forEachVisiblePosition((i, j) => {
      if (self._spritesLayer2[i][j]) {
        self._setSpriteClipping(self._spritesLayer2[i][j]);
      }
      if (self._spritesLayer3[i][j]) {
        self._setSpriteClipping(self._spritesLayer3[i][j]);
      }

      if (self._spritesLayer4[i][j]) {
        self._setSpriteClipping(self._spritesLayer4[i][j]);
      }

    }, this.POSICIONES_EXTRA_RENDER);

  }

  _crearSprite(parentLayer, grh, x, y) {
    console.log("_crearSprite", this.assetManager.getGrh(grh))
    let nuevoSprite = new SpriteGrh(this.assetManager.getGrh(grh));
    parentLayer.addChild(nuevoSprite); // ojo tiene que estar en este orden sino no anda el z-index(TODO)
    nuevoSprite.setPosition(x, y);
    this._setSpriteClipping(nuevoSprite);
    return nuevoSprite;
  }

  _setSpriteClipping(sprite) {
    let spriteRect = {};

    spriteRect.x = sprite.x;
    spriteRect.y = sprite.y;
    spriteRect.width = sprite.width;
    spriteRect.height = sprite.height;

    RendererUtils.posicionarRectEnTile(spriteRect);
    sprite.visible = this.camera.rectVisible(spriteRect);
  }

  _removeChilds(padre, gridHijos) {
    _.each(gridHijos, (fila) => {
      _.each(fila, (hijo) => {
        if (hijo) {
          RendererUtils.removePixiChild(padre, hijo);
        }
      });
    });
  }

  _drawDebugTile(x, y) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(x, y, this.tilesize, this.tilesize);
    this.layer4.addChild(graphics);
  }

}
