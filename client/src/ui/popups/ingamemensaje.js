/**
 * Created by horacio on 4/19/16.
 */

import DOMdata from '../../../resources/menus/inGameMensaje';
import PopUp from './popup'; import React from 'react';

export default class InGameMensaje extends PopUp {
  constructor() {
    let options = {
      width: 300,
      height: 280,
      minWidth: 200,
      minHeight: 150
    };
    super(DOMdata, options);
    this.initCallbacks();
  }

  show(mensaje) {
    super.show();
    $('#inGameMensajeContenido').text(mensaje);
    $('#inGameMensajeBotonOk').focus();
  }

  initCallbacks() {
    let self = this;
    $('#inGameMensajeBotonOk').click(() => {
      self.hide();
    });
  }
}
