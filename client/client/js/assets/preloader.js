/**
 * Created by horacio on 3/22/16.
 */

import PreloadGraficos from '../../preload_config/preload_graficos.json';
import graphics from '../../indices/graficos.json';
import PreloadSounds from '../../preload_config/preload_sounds.json';
import PIXI from './../lib/pixi';

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

  preload(terminar_callback, progress_callback) {

    // fonts: // OJO: si se usan web fonts sacar esto y el script del index
    WebFont.load({
      custom: {
        families: ['Myriad Pro:n4,n7,i4,i7']
      }
    });

    //sounds:
    this._preloadSoundsAsync();

    // graficos:
    this.loader.add('indices', graphics);
    PreloadGraficos.forEach(grafico => {
      this.loader.add('' + grafico, '../../graficos/' + grafico + '.png');
    });

    this.loader.on('progress', (loader, loadedResource) => {
      progress_callback(loader.progress);
    });

    this.loader.load((loader, resources) => {
      PreloadGraficos.forEach(grafico => {
        this.assetManager._setBaseTexture(grafico, PIXI.loader.resources[grafico].texture.baseTexture);
      });
      this.assetManager.indices = resources.indices.data;
      terminar_callback();
    });
  }
}