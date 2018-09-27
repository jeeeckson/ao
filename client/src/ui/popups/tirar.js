/**
 * Created by horacio on 3/21/16.
 */
import DOMdata from '../../../resources/menus/tirar';
import PopUp from './popup'; import React from 'react';

export default class Tirar extends PopUp {
  constructor(game, acciones) {
    let options = {
      width: 250,
      height: 160,
      minWidth: 100,
      minHeight: 200
    };
    super(DOMdata, options);
    this.game = game;
    this.acciones = acciones;
    this.initCallbacks();
  }

  show(tirandoOro) {
    super.show();
    this.tirandoOro = tirandoOro;
  }

  initCallbacks() {
    let self = this;
    $('#tirarBotonTirar').click(() => {
      let cantidad = $('#tirarInputCantidad').val();
      if (!isNaN(cantidad)) {
        if (cantidad > 0) {
          if (self.tirandoOro) {
            self.acciones.tirarOro(cantidad);
          } else {
            self.acciones.tirarSelectedItem(cantidad);
          }
        }
      }
      self.hide();
    });

    $('#tirarBotonTirarTodo').click(() => {
      if (self.tirandoOro) {
        self.acciones.tirarTodoOro();
      } else {
        self.acciones.tirarTodoSelectedItem();
      }
      self.hide();
    });
  }
}