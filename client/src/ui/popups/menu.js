/**
 * Created by horacio on 07/08/2016.
 */

import DOMdata from '../../../resources/menus/menu';
import PopUp from './popup'; import React from 'react';
import Controls from './controls';

export default class Menu extends PopUp {
  constructor(game, showMapaCb, showEstadisticasCb, showClanesCb, showOpcionesCb) {
    let options = {
      width: 220,
      height: 185,
      minWidth: 150,
      minHeight: 280
    };
    super(DOMdata, options);
    this.game = game;
    this.showMapaCb = showMapaCb;
    this.showEstadisticasCb = showEstadisticasCb;
    this.showClanesCb = showClanesCb;
    this.showOpcionesCb = showOpcionesCb;
    this.controls = new Controls();

    this._lastClosedTime = 0;
    this.initCallbacks();
  }

  hide() {
    super.hide();
    this._lastClosedTime = Date.now();
  }

  show(fromEscapeKey) {
    // fromEscapeKey: fix feo para poder mostrar y ocultar con la tecla esc
    if (fromEscapeKey) {
      if (this._lastClosedTime > Date.now() - 20) {
        return;
      }
    }
    super.show();
  }

  initCallbacks() {
    let self = this;

    $('#botonMapa1').click(() => {
      self.showMapaCb();
    });

    $('#botonEstadisticas1').click(() => {
      self.showEstadisticasCb();
    });

    $('#botonParty1').click(() => {
      self.game.client.sendRequestPartyForm();
    });

    $('#botonOpciones1').click(() => {
      self.showOpcionesCb();
    });

    $('#botonControles').click(() => {
      this.controls.show();
    });
  }
}

