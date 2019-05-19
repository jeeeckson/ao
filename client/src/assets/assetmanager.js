import jsonArmas from '../resources/indices/armas';
import jsonCabezas from '../resources/indices/cabezas';
import jsonCascos from '../resources/indices/cascos';
import jsonCuerpos from '../resources/indices/cuerpos';
import jsonEscudos from '../resources/indices/escudos';
import jsonFxs from '../resources/indices/fxs';
//import PIXI from './../lib/pixi';
import * as PIXI from 'pixi.js';
import Preloader from './preloader';
import Audio from './audio';
import axios from 'axios';

export default class AssetManager {
  constructor() {
    this.audio = new Audio();

    this.indices = null; // cargados por el preloader
    this.armas = jsonArmas;
    this.cabezas = jsonCabezas;
    this.cascos = jsonCascos;
    this.cuerpos = jsonCuerpos;
    this.escudos = jsonEscudos;
    this.fxs = jsonFxs;
    this._baseTextures = [];
    this.grhs = [];
    this.dataMapas = [];
    this.preloader = new Preloader(this);

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.MIPMAP_TEXTURES = false;
    PIXI.settings.GC_MODES = PIXI.GC_MODES.MANUAL;
  }

  getNumGraficoFromGrh = (grh) => {
    if (!this.indices[grh]) {
      return null;
    }
    if (this.indices[grh].grafico) {
      return this.indices[grh].grafico;
    }
    // animacion, devuelvo grafico del primer frame
    return this.getNumGraficoFromGrh(this.indices[grh].frames[0]);
  }

  getFaceGrafFromNum = (numHead) => {
    if (this.cabezas[numHead]) {
      let grh = this.cabezas[numHead].down;
      return this.getNumGraficoFromGrh(grh);
    }
    return null;
  }

  getBodyGrafFromNum = (numCuerpo) => {
    if (this.cuerpos[numCuerpo]) {
      let grh = this.cuerpos[numCuerpo].down;
      return this.getNumGraficoFromGrh(grh);
    }
    return null;
  }

  getGrh = (grh) => {
    if (!this.grhs[grh]) {
      this.loadGrh(grh);
    }
    return this.grhs[grh];
  }

  getTerrenoGrh = (grh) => {
    if (!this.grhs[grh]) {
      this.loadGrh(grh);
    }
    return this.grhs[grh];
  }

  loadGrh = (grh) => {
    if (!this.indices[grh] || this.grhs[grh]) {
      return;
    }
    if (this.indices[grh].frames) {// animacion
      let frameNumbers = this.indices[grh].frames;
      let vecgrhs = [];
      for (let j = 0; j < frameNumbers.length; j++) {
        if (!this.grhs[frameNumbers[j]]) {
          this._loadGrhGrafico(frameNumbers[j]);
        }
        vecgrhs.push(this.grhs[frameNumbers[j]]);
      }
      this.grhs[grh] = {frames: vecgrhs, velocidad: this.indices[grh].velocidad};
    }
    else { // no animacion
      this._loadGrhGrafico(grh);
    }
  }

  _loadGrhGrafico = (grh) => {
    let nombreGrafico = this.indices[grh].grafico;
    if (!this._baseTextures[nombreGrafico]) { // cargar basetexture
      this._setBaseTexture(nombreGrafico, new PIXI.BaseTexture.fromImage('../../graficos/' + nombreGrafico + '.png'));
    }
    this.grhs[grh] = new PIXI.Texture(this._baseTextures[nombreGrafico], new PIXI.Rectangle(this.indices[grh].offX, this.indices[grh].offY, this.indices[grh].width, this.indices[grh].height));
  }

  _setBaseTexture = (nombreGrafico, baseTexture) => {
    this._baseTextures[nombreGrafico] = baseTexture;
  }

  getMapaASync = (numMapa, completeCallback) => {
    if (!this.dataMapas[numMapa]) {
      axios.get('mapas/mapa' + numMapa + '.json').then((data) => {
        this.dataMapas[numMapa] = data.data;
        completeCallback(this.dataMapas[numMapa]);
      }).catch((err) => {
        alert('Error cargando mapa: ' + numMapa + ' - ' + err.message);
        this.getMapaASync(numMapa, completeCallback);
      });
    } else {
      completeCallback(this.dataMapas[numMapa]);
    }
  }

  preload = (terminar_callback, progress_callback) => {
    this.preloader.preload(terminar_callback, progress_callback);
  }

  getIndices = () => {
    return this.indices;
  }

  getArmas = () => {
    return this.armas;
  }

  getCabezas = () => {
    return this.cabezas;
  }

  getCascos = () => {
    return this.cascos;
  }

  getCuerpos = () => {
    return this.cuerpos;
  }

  getEscudos = () => {
    return this.escudos;
  }

  getFxs = () => {
    return this.fxs;
  }
}
