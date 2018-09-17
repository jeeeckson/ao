/**
 * Created by horacio on 7/6/16.
 */

import DOMdata from '../../../menus/solicitudClan';
import PopUp from './popup'; import React from 'react';

export default class SolictudClan extends PopUp {
  constructor(game) {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.game = game;
    this.clan = '';

    this.$botonCancelar = $('#solicitudClanBotonCancelar');
    this.$botonEnviar = $('#solicitudClanBotonEnviar');

    this.initCallbacks();
  }

  show(targetClan) {
    super.show();
    this.clan = targetClan;
  }

  initCallbacks() {
    let self = this;

    this.$botonCancelar.click(() => {
      self.hide();
    });

    this.$botonEnviar.click(() => {
      let textoSolicitud = $('#detallesClanInputSolicitud').val();
      self.game.client.sendGuildRequestMembership(self.clan, textoSolicitud);
      self.hide();
    });

  }

}