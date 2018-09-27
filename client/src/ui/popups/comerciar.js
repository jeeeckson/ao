/**
 * Created by horacio on 2/22/16.
 */

import DOMdata from '../../../resources/menus/comerciar';
import PopUp from './popup'; import React from 'react';
import ItemGrid from '../game/itemgrid';

export default class Comerciar extends PopUp {
  constructor(game, acciones) {

    let options = {
      width: 615,
      height: 445,
      minWidth: 250,
      minHeight: 200
    };
    super(DOMdata, options);

    this.game = game;
    this.acciones = acciones;

    this.shopGrid = new ItemGrid('comerciarGridComprar', 20);
    this.userGrid = new ItemGrid('comerciarGridVender', 20);

    this.initCallbacks();
  }

  show() {
    super.show();
    let self = this;
    this.userGrid.clear();
    this.game.inventario.forEachSlot(
      (slot) => {
        let numGraf = self.game.assetManager.getNumGraficoFromGrh(slot.grh);
        self.userGrid.modificarSlot(slot.numero, slot.cantidad, numGraf);
      });
    this.shopGrid.deselect();
    this.userGrid.deselect();
    this.completarLabels('', '', '', '', '', '');
  }

  hide(incomingFromServer) {
    if (this.visible && !incomingFromServer) {
      this.acciones.cerrarComerciar();
    }
    super.hide();
  }

  cambiarSlotCompra(Slot, Amount, numGrafico) {
    this.shopGrid.modificarSlot(Slot, Amount, numGrafico);
  }

  cambiarSlotVenta(Slot, Amount, numGrafico) {
    this.userGrid.modificarSlot(Slot, Amount, numGrafico);
  }

  borrarSlotCompra(slot) {
    this.shopGrid.borrarItem(slot);
  }

  borrarSlotVenta(slot) {
    this.userGrid.borrarItem(slot);
  }

  initCallbacks() {
    let self = this;

    $('#comerciarBotonComprar').click(() => {
      let slot = self.shopGrid.getSelectedSlot();
      if (slot) {
        let inputCantidad = $('#comerciarInputCantidad').val();
        if (!isNaN(inputCantidad)) {
          if (inputCantidad > 0) {
            self.acciones.comprar(slot, inputCantidad);
          }
        }
      }
    });

    $('#comerciarBotonVender').click(() => {
      let slot = self.userGrid.getSelectedSlot();
      if (slot) {
        let inputCantidad = $('#comerciarInputCantidad').val();
        if (!isNaN(inputCantidad)) {
          if (inputCantidad > 0) {
            self.acciones.vender(slot, inputCantidad);
          }
        }
      }
    });

    this.shopGrid.setSelectionCallback(
      (slot) => {
        let item = self.game.inventarioShop.getSlot(slot);
        self.displayItemData(item);
      });

    this.userGrid.setSelectionCallback(
      (slot) => {
        let item = self.game.inventario.getSlot(slot);
        self.displayItemData(item);
      });
  }

  clearDom() {
    super.clearDom();
    $('#comerciarInputCantidad').val(1);
  }

  displayItemData(item) {
    let minLabel = '';
    let maxLabel = '';

    if (item.minDef) {
      minLabel = 'MIN DEFENSA';
    }
    if (item.minHit) {
      minLabel = 'MIN GOLPE';
    }

    if (item.maxDef) {
      maxLabel = 'MAX DEFENSA';
    }
    if (item.maxHit) {
      maxLabel = 'MAX GOLPE';
    }

    let minVal = item.minDef || item.minHit;
    let maxVal = item.maxDef || item.maxHit;

    this.completarLabels(item.objName.toUpperCase(), item.precio, minLabel, minVal, maxLabel, maxVal);
  }

  completarLabels(nombreVal, precioVal, minLabel, minVal, maxLabel, maxVal) {
    if (!minLabel) {
      minVal = '';
    }
    if (!maxLabel) {
      maxVal = '';
    }

    $('#comerciarPrecio').text('PRECIO');
    $('#comerciarNombre').text('NOMBRE');
    $('#comerciarPrecioValor').text(precioVal);
    $('#comerciarNombreValor').text(nombreVal);
    $('#comerciarMin').text(minLabel);
    $('#comerciarMinValor').text(minVal);
    $('#comerciarMax').text(maxLabel);
    $('#comerciarMaxValor').text(maxVal);
  }
}
