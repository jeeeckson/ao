/**
 * Created by horacio on 7/9/16.
 */

import DOMdata from '../../../resources/menus/noticiasClan';
import PopUp from './popup'; import React from 'react';

export default class NoticiasClan extends PopUp {
  constructor() {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.$noticias = $('#noticiasClanNoticias');
    this.$enemigos = $('#noticiasClanEnemigos');
    this.$aliados = $('#noticiasClanAliados');
    this.$botonAceptar = $('#noticiasClanBotonAceptar');

    this.initCallbacks();
  }

  show(noticias, enemigos, aliados) {
    super.show();
    this.$noticias.text(noticias);
    this.$enemigos.text(enemigos.join('\n'));
    this.$aliados.text(aliados.join('\n'));
  }

  initCallbacks() {
    let self = this;

    this.$botonAceptar.click(() => {
      self.hide();
    });
  }

}