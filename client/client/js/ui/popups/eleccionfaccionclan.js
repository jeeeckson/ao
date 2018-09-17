/**
 * Created by horacio on 7/7/16.
 */

import DOMdata from '../../../menus/eleccionFaccionClan';
import PopUp from './popup'; import React from 'react';
import Enums from '../../enums';

export default class EleccionFaccionClan extends PopUp {
  constructor(game) {

    let options = {
      width: 550,
      height: 500,
      minWidth: 50,
      minHeight: 200
    };
    super(DOMdata, options, true);

    this.game = game;
    this.initCallbacks();
  }

  _seleccionarAlineacion(alineacion) {
    this.game.client.sendGuildFundation(alineacion);
    this.hide();
  }

  initCallbacks() {
    let self = this;

    $('#faccionClan_alineacionReal').click(() => {
      self._seleccionarAlineacion(Enums.ClanType.ROYAL_ARMY);
    });
    $('#faccionClan_alineacionLegal').click(() => {
      self._seleccionarAlineacion(Enums.ClanType.LEGAL);
    });
    $('#faccionClan_alineacionNeutral').click(() => {
      self._seleccionarAlineacion(Enums.ClanType.NEUTRAL);
    });
    $('#faccionClan_alineacionCriminal').click(() => {
      self._seleccionarAlineacion(Enums.ClanType.CRIMINAL);
    });
    $('#faccionClan_alineacionCaos').click(() => {
      self._seleccionarAlineacion(Enums.ClanType.EVIL);
    });
    $('#faccionClanBotonCancelar').click(() => {
      self.hide();
    });
  }
}
