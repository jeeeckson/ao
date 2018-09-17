/**
 * Created by horacio on 6/16/16.
 */
import DOMdata from '../../../menus/clanes';
import PopUp from './popup'; import React from 'react';
import ClanesSearchTab from './tabs/clanesSearch';
import MiembrosClanTab from './tabs/miembrosclan';
import SolicitudesClanTab from './tabs/solicitudesclan';
import SettingsClanTab from './tabs/settingsclan';

export default class Clanes extends PopUp {

  constructor(game, detallesClan, showMensajeCb, solicitudClanCb) {

    let options = {
      width: 550,
      height: 500,
      minWidth: 250,
      minHeight: 150
    };
    super(DOMdata, options);


    this.game = game;
    this.detallesClan = detallesClan;
    this.showMensajeCb = showMensajeCb;

    this.searchTab = new ClanesSearchTab(game, detallesClan, showMensajeCb, solicitudClanCb);
    this.miembrosTab = new MiembrosClanTab(game, showMensajeCb);
    this.solicitudesTab = new SolicitudesClanTab(game, showMensajeCb);
    this.settingsTab = new SettingsClanTab();

    this.$miembrosTabButton = $('#clanesMiembrosTabButton');
    this.$solicitudesTabButton = $('#clanesSolicitudesTabButton');
    this.$settingsTabButton = $('#clanesSettingsTabButton');

    this._initTabs();
    this.initCallbacks();

  }

  show() {
    super.show();
    this.game.client.sendRequestGuildLeaderInfo();
  }

  setNombresClanes(nombresClanes) {
    this.searchTab.setNombresClanes(nombresClanes);
  }

  setNombresMiembros(nombresMiembros) {
    this._activarTab(this.$miembrosTabButton);
    this.miembrosTab.setNombresMiembros(nombresMiembros);
  }

  setNombresSolicitantes(nombresSolicitantes) {
    this._activarTab(this.$solicitudesTabButton);
    this._activarTab(this.$settingsTabButton);
    this.solicitudesTab.setNombresSolicitantes(nombresSolicitantes);
  }

  hide(incomingFromServer) {
    super.hide();
    this._desactivarTab(this.$solicitudesTabButton);
    this._desactivarTab(this.$miembrosTabButton);
    this._desactivarTab(this.$settingsTabButton);
  }

  initCallbacks() {
    let self = this;

  }

  _initTabs() {
    this._inicializarTabDesactivable(this.$solicitudesTabButton);
    this._inicializarTabDesactivable(this.$miembrosTabButton);
    this._inicializarTabDesactivable(this.$settingsTabButton);
  }

  clearDom() {
    super.clearDom();
  }
}
