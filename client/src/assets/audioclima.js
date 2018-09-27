/**
 * Created by horacio on 8/31/16.
 */

import Enums from './../enums';

export default class AudioClima {
  constructor(audio) {
    this.audio = audio;
  }

  finalizarLluvia(bajoTecho) {
    this._stopLluvia();
    let nombre;
    if (bajoTecho) {
      nombre = Enums.SONIDOS.lluvia_end_indoor;
    } else {
      nombre = Enums.SONIDOS.lluvia_end_outdoor;
    }
    this.audio.playSound(nombre, false, null, 0.2);
  }

  iniciarLluvia(bajoTecho) {
    let nombre;
    if (bajoTecho) {
      nombre = Enums.SONIDOS.lluvia_start_indoor;
    } else {
      nombre = Enums.SONIDOS.lluvia_start_outdoor;
    }
    this.audio.playSound(nombre, false, this.playLoopLluvia(bajoTecho), 0.2);
  }

  playLoopLluvia(bajoTecho) {
    this._stopLluvia();
    let nombre, sprite;
    if (bajoTecho) {
      nombre = Enums.SONIDOS.lluvia_indoor;
      sprite = {lluvia: [130, 7900]};
    }
    else {
      nombre = Enums.SONIDOS.lluvia_outdoor;
      sprite = {lluvia: [100, 4200]};
    }

    if (!this.audio.isLoaded(nombre)) { //cargar con sprite para que loopee bien
      this.audio.cargarSonido(nombre, null, sprite);
    }
    this.audio.playSound(nombre, true, null, 0.4, 'lluvia');
  }

  _stopLluvia() {
    this.audio.stopSound(Enums.SONIDOS.lluvia_indoor);
    this.audio.stopSound(Enums.SONIDOS.lluvia_outdoor);
    this.audio.stopSound(Enums.SONIDOS.lluvia_start_outdoor);
    this.audio.stopSound(Enums.SONIDOS.lluvia_start_indoor);
  }
}