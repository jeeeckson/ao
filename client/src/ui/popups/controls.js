/**
 * Created by horacio on 4/18/17.
 */

import DOMdata from '../../../resources/menus/controls';
import PopUp from './popup'; import React from 'react';

export default class Controls extends PopUp {
  constructor() {
    let options = {
      width: 270,
      height: 380,
      minWidth: 150,
      minHeight: 200
    };
    super(DOMdata, options);
    this.$ok = $('#controlsButtonOk');
    this.initCallbacks();
  }

  initCallbacks() {
    this.$ok.click(() => {
      this.hide();
    });
  }
}