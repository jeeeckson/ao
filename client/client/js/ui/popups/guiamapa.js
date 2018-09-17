/**
 * Created by horacio on 4/12/16.
 */

import DOMdata from '../../../menus/mapa';
import PopUp from './popup'; import React from 'react';

export default class GuiaMapa extends PopUp {
  constructor(game, acciones) {
    let options = {
      width: 610,
      height: 550,
    };
    super(DOMdata, options);
    this.initCallbacks();
  }

  initCallbacks() {
    let self = this;
    $('#mapaBotonCerrar').click(() => {
      self.hide();
    });
    // $("#mapaBotonToggle").click(function () {
    //     $("#popUpMapa").toggleClass("mapaSeccionB");
    // });

  }
}
