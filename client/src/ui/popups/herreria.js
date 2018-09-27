/**
 * Created by horacio on 6/20/16.
 */

import DOMdata from '../../../resources/menus/herreria';
import PopUp from './popup'; import React from 'react';

export default class Herreria extends PopUp {
  constructor(game) {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.game = game;
    //this.initCallbacks();
    this.$itemsContainer = $('#herreriaContenedorItems');
  }

  /*Item contiene:
       Name: Name,
       GrhIndex: GrhIndex,
       LingH: LingH,
       LingP: LingP,
       LingO: LingO,
       ArmasHerreroIndex: ArmasHerreroIndex,
       ObjUpgrade: ObjUpgrade,
       */
  setItems(items) {
    //TODO objUpgrade

    let self = this;
    for (let item of items) {
      let $row = $('<tr></tr>');

      let numGraf = this.game.assetManager.getNumGraficoFromGrh(item.GrhIndex);
      let url = 'url(../../graficos/' + numGraf + '.png)';

      let $cell = $('<td></td>');
      let $imagenItem = $('<div class="divImagen" style="width: 50px; height:50px;"></div>');
      $imagenItem.css('background-image', url);
      $cell.append($imagenItem);

      $row.append($cell);

      let $cellRequerimientos = $('<td></td>');
      $cellRequerimientos.text('Require lingote hierro: ' + item.LingH + ' , lingote plata ' + item.LingP + ' y lingote de oro: ' + item.LingO);
      // TODO: graficos madera y madera elfica
      $row.append($cellRequerimientos);

      let $cellConstruir = $('<td></td>');
      let $botonConstruir = $('<button class="btn btn-default" >Construir</button>');

      $botonConstruir.data('itemIndex', item.ArmasHerreroIndex);
      $botonConstruir.click(function () {
        let cantidadAConstruir = $('#herreriaCantidadAConstruir').val();
        self.game.client.sendInitCrafting(cantidadAConstruir, 1);//TODO: horrible esto, que se haga de 1 (cambiar sv)
        let itemIndex = $(this).data('itemIndex');
        self.game.client.sendCraftBlacksmith(itemIndex);
      });
      $cellConstruir.append($botonConstruir);
      $row.append($cellConstruir);
      this.$itemsContainer.append($row);
    }
  }

  setWeapons(items) {
    /*Item contiene:
           Name: Name,
           GrhIndex: GrhIndex,
           LingH: LingH,
           LingP: LingP,
           LingO: LingO,
           ArmasHerreroIndex: ArmasHerreroIndex,
           ObjUpgrade: ObjUpgrade,
           */
    this.setItems(items);
  }

  setArmors(items) {
    /* Item contiene
           Name: Name,
           GrhIndex: GrhIndex,
           LingH: LingH,
           LingP: LingP,
           LingO: LingO,
           ArmasHerreroIndex: ArmasHerreroIndex,
           ObjUpgrade: ObjUpgrade,
           */
    this.setItems(items);
  }
}

