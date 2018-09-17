/**
 * Created by horacio on 7/11/16.
 */

import DOMdata from '../../../menus/partyLider';
import PopUp from './popup'; import React from 'react';

export default class PartyLider extends PopUp {
  constructor(game, showMensajeCb) {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.game = game;
    this.showMensajeCb = showMensajeCb;

    this.$inputMensaje = $('#partyLiderMensaje');
    this.$miembrosList = $('#partyLiderMembersList');
    this.$experienciaTotal = $('#partyLiderExperienciaTotal');
    this.$botonExpulsar = $('#partyLiderBotonExpulsar');
    this.$botonHacerLider = $('#partyLiderBotonHacerLider');
    this.$inputAgregarPersonaje = $('#partyLiderAgregarInput');
    this.$botonAgregarMiembro = $('#partyLiderBotonAgregar');
    this.$botonDisolver = $('#partyLiderBotonDisolver');
    this.$botonCerrar = $('#partyLiderBotonCerrar');
    this.initCallbacks();
  }

  show(miembros, exp) {
    super.show();

    this.$miembrosList.empty();
    for (let nombre of miembros) {
      let $nuevoMiembro = $('<option>').text(nombre);
      this.$miembrosList.append($nuevoMiembro);
    }
    this.$experienciaTotal.text(exp);
  }

  _getMiembroSeleccionado() {
    return this.$miembrosList.find('option:selected').text().split(' ')[0];
  }

  _ejecutarConMiembro(cbFunc) {
    let pj = this._getMiembroSeleccionado();
    if (pj) {
      cbFunc(pj);
    } else {
      this.showMensajeCb('Debes seleccionar un miembro de la party');
    }
  }

  initCallbacks() {
    this.$botonExpulsar.click(() => {
      this._ejecutarConMiembro(
        (pj) => {
          this.game.client.sendPartyKick(pj);
        });
    });

    this.$botonHacerLider.click(() => {
      this._ejecutarConMiembro(
        (pj) => {
          this.game.client.sendPartySetLeader(pj);
        });
    });

    this.$botonAgregarMiembro.click(() => {
      let pj = this.$inputAgregarPersonaje.val();
      if (pj) {
        this.game.client.sendPartyAcceptMember(pj);
        this.$inputAgregarPersonaje.val('');
      }
    });

    this.$botonDisolver.click(() => {
      this.game.client.sendPartyLeave();
      this.hide();
    });

    this.$botonCerrar.click(() => {
      this.game.client.sendPartyLeave();
      this.hide();
    });

    this.$inputMensaje.keypress((event) => {
      if (event.keyCode === 13 || event.which === 13) {
        this.game.client.sendPartyMessage(this.$inputMensaje.val());
        this.$inputMensaje.val('');
        event.preventDefault();
      }
    });
  }

}

