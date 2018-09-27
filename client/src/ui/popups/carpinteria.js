/**
 * Created by horacio on 6/17/16.
 */

import PopUp from './popup'; import React from 'react';
import DOMdata from '../../../resources/menus/carpinteria';

export default class Carpinteria extends PopUp {
  constructor(game) {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.game = game;
    this.initCallbacks();
    this.$itemsContainer = $('#carpinteriaContenedorItems');
    this.$carpinteriaTexto = $('#carpinteriaTexto');
  }

  /* Items contiene
       Name: Name,
       GrhIndex: GrhIndex,
       Madera: Madera,
       MaderaElfica: MaderaElfica,
       ObjCarpinteroIndex: ObjCarpinteroIndex,
       ObjUpgrade: ObjUpgrade,
       */

  show(items) {
    super.show();
    this.setItems(items);
  }

  setItems(items) {
    //TODO objUpgrade
    if (items.length < 1) {
      this.$carpinteriaTexto.text('No puedes construir ningun objeto porque no tienes suficientes puntos en carpinteria');
      // TODO: decir que no peude construir items pq le falta skills
    } else {
      this.$carpinteriaTexto.text('');
    }

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
      $cellRequerimientos.text('Require madera: ' + item.Madera + ' y madera elfica ' + item.MaderaElfica);
      // TODO: graficos madera y madera elfica
      $row.append($cellRequerimientos);

      let $cellConstruir = $('<td></td>');
      let $botonConstruir = $('<button class="btn btn-default" >Construir</button>');

      $botonConstruir.data('itemIndex', item.ObjCarpinteroIndex);
      $botonConstruir.click(function () {
        let cantidadAConstruir = $('#carpinteriaCantidadAConstruir').val();
        self.game.client.sendInitCrafting(cantidadAConstruir, 1);//TODO: horrible esto, que se haga de 1 (cambiar sv)
        let itemIndex = $(this).data('itemIndex');
        self.game.client.sendCraftCarpenter(itemIndex);
      });
      $cellConstruir.append($botonConstruir);
      $row.append($cellConstruir);
      this.$itemsContainer.append($row);
    }
  }

  initCallbacks() {

  }
}
