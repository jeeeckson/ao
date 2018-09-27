/**
 * Created by horacio on 5/2/16.
 */

import DOMdata from '../../../resources/menus/opciones';
import PopUp from './popup'; import React from 'react';
import ConfigurarTeclasTab from './tabs/configurarteclas';
import AudioTab from './tabs/audiotab';
import Screenfull from '../../lib/screenfull';

export default class Opciones extends PopUp {
  constructor(game, storage, updateKeysCallback, showMensajeCallback) {
    let options = {
      width: 500,
      height: 600,
      minWidth: 250,
      minHeight: 400
    };
    super(DOMdata, options);
    this.configurarTeclasTab = new ConfigurarTeclasTab(storage, updateKeysCallback, showMensajeCallback);
    this.audioTab = new AudioTab(game, storage);
    this.initCallbacks();
    this._initFullScreenListener();
    let self = this;
    this.configurarTeclasTab.setCerrarCallback(() => {
      self.hide();
    });
  }

  show() {
    super.show();
    this.audioTab.onShow();
    this.configurarTeclasTab.onShow();
  }

  hide() {
    super.hide();
    this.audioTab.onHide();
    this.configurarTeclasTab.onHide();
  }

  _initFullScreenListener() {
    if (Screenfull.enabled) {
      document.addEventListener(Screenfull.raw.fullscreenchange, () => {
        $('#opcionesCheckboxFullscreen').prop('checked', Screenfull.isFullscreen);
      });
    }
  }

  initCallbacks() {
    $('#opcionesCheckboxFullscreen').change(function () {
      if (!Screenfull.enabled) {
        alert('No es posible jugar en pantalla completa');
        this.checked = false;
        return;
      }
      if (this.checked) {
        Screenfull.request();
      } else {
        Screenfull.exit();
      }
    });

    $('#opcionesSliderPantalla').slider({
      range: 'min',
    });
  }

}
