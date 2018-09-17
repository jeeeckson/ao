/**
 * Created by horacio on 7/8/16.
 */

import DOMdata from '../../../menus/crearClan';
import PopUp from './popup'; import React from 'react';
import Utils from '../../utils/util';

export default class CrearClan extends PopUp {
  constructor(game, showMensajeCb) {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.game = game;
    this.showMensajeCb = showMensajeCb;

    this.$botonCrear = $('#crearClanBotonCrear');
    this.$botonCancelar = $('#crearClanBotonCancelar');

    this.$inputNombre = $('#crearClanNombre');
    this.$inputWebsite = $('#crearClanWebsite');
    this.$inputDescripcion = $('#crearClanDescripcion');
    this.prefixCodex = 'crearClanCodex_';

    this.initCallbacks();
  }

  _getCodexText() {
    let NUMBER_OF_LINES = 8;
    let result = [];
    let completedLines = 0;
    for (let i = 0; i < NUMBER_OF_LINES; i++) {
      let $inputLine = $('#' + this.prefixCodex + i);
      let text = $inputLine.val();
      if (text) {
        completedLines++;
        result.push(text);
      }
    }
    if (completedLines < 4) {
      return false;
    }
    return Utils.joinNullArray(result);
  }

  _verificarCampos() {
    return !(!this.$inputNombre.val() || !this.$inputWebsite.val() || !this.$inputDescripcion.val() || !this._getCodexText());
  }

  initCallbacks() {
    let self = this;

    this.$botonCancelar.click(() => {
      self.hide();
    });

    this.$botonCrear.click(() => {
      if (!self._verificarCampos()) {
        self.showMensajeCb('Debes completar todos los campos');
        return;
      }
      self.game.client.sendCreateNewGuild(self.$inputDescripcion.val(), self.$inputNombre.val(),
        self.$inputWebsite.val(), self._getCodexText());
      self.hide();
    });
  }
}
