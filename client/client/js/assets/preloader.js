/**
 * Created by horacio on 3/22/16.
 */

import PreloadGraficos from '../../preload_config/preload_graficos.json';
import PreloadSounds from '../../preload_config/preload_sounds.json';
//import PIXI from './../lib/pixi';
import * as PIXI from 'pixi.js';

export default class Preloader {
  constructor(assetManager) {
    this.assetManager = assetManager;
    this.loader = PIXI.loader;
  }

  _preloadSoundsAsync() {
    //preload async, no necesariamente los termina de cargar antes de  empezar
    PreloadSounds.forEach(sound => {
      this.assetManager.audio.cargarSonido(sound);
    });
  }

  loadGraphics = () => {
    PreloadGraficos.forEach(grafico => {
      this.assetManager._setBaseTexture(grafico, this.loader.resources[grafico].texture.baseTexture);
    });
  };

  preload(progress_callback) {

    if (this.loader.resources.indices) {
      this.loadGraphics();
      this.assetManager.indices = this.loader.resources.indices.data;
      return true;
    }
    // fonts: // OJO: si se usan web fonts sacar esto y el script del index
    WebFont.load({
      custom: {
        families: ['Myriad Pro:n4,n7,i4,i7']
      }
    });

    //sounds:
    this._preloadSoundsAsync();

    // graficos:
    this.loader.add('indices', 'indices/graficos.json');
    PreloadGraficos.forEach(grafico => {
      this.loader.add('' + grafico, 'graficos/' + grafico + '.png');
    });

    this.loader.on('progress', (loader, loadedResource) => {
      progress_callback(loader.progress - 1);
    });
    this.loader.on('complete', () => {
    });

    this.loader.load((loader, resources) => {
      this.loadGraphics();
      this.assetManager.indices = resources.indices.data;
    });
    return false;
  }
}