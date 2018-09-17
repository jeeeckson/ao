/**
 * Created by horacio on 7/9/16.
 */

import DOMdata from '../../../menus/detallesPersonaje';
import PopUp from './popup'; import React from 'react';

export default class DetallesPersonaje extends PopUp {
  constructor(game) {

    let options = {
      width: 500,
      height: 400,
      minWidth: 250,
      minHeight: 300
    };
    super(DOMdata, options);

    this.game = game;
    this.clan = '';
    this.$botonCerrar = $('#detallesPersonaje_botonCerrar');

    this.initCallbacks();
  }

  show(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados) {
    this.setPersonajeInfo(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados);
    super.show();
  }

  setPersonajeInfo(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados) {

    $('#detallesPersonaje_nombre').text(CharName);
    $('#detallesPersonaje_raza').text(Race);
    $('#detallesPersonaje_clase').text(Class);
    $('#detallesPersonaje_genero').text(Gender);
    $('#detallesPersonaje_nivel').text(Level);
    $('#detallesPersonaje_oro').text(Gold);
    $('#detallesPersonaje_banco').text(Bank);
    $('#detallesPersonaje_clan').text(CurrentGuild);
    $('#detallesPersonaje_faccion').text(RoyalArmy);
    $('#detallesPersonaje_ciudadanosAsesinados').text(CiudadanosMatados);
    $('#detallesPersonaje_criminalesAsesinados').text(CriminalesMatados);
    $('#detallesPersonaje_reputacion').text(Reputation);
    $('#detallesPersonaje_alineacion').text(ChaosLegion);
    $('#detallesPersonaje_SolicitudesIngreso').text(PreviousPetitions);
    $('#detallesPersonaje_clanesIntegrados').text(PreviousGuilds);
  }

  initCallbacks() {
    let self = this;

    this.$botonCerrar.click(() => {
      self.hide();
    });
  }

}
