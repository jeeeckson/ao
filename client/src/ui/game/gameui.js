/**
 * Created by horacio on 2/21/16.
 */

import KeyMouseListener from './keymouselistener';
import Interfaz from './interfaz';

export default class GameUI {

  constructor(gameManager, settings, playSonidoClickCb, setCrearPjScreenCallback) {

    this.setCrearPjScreenCb = setCrearPjScreenCallback;

    let game = gameManager.game;
    let acciones = gameManager.acciones;
    let comandosChat = gameManager.comandosChat;
    this.popUps = [];

    this.acciones = acciones;
    this.game = game;
    this.settings = settings;

    this.showMensajeFunction = this.showMensaje.bind(this);

    this.interfaz = new Interfaz(game, acciones);
    this.keyMouseListener = new KeyMouseListener(game, acciones, settings ? settings.getKeys() : [], comandosChat);
    this.initDOM();
  }

  initDOM =()=> {
    this.keyMouseListener.initListeners();
    window.addEventListener("onblur",() => {
      this.keyMouseListener.upKeyTeclasCaminar();
    });
  };

  resize(escala) {
    this.game.resize(escala); // todo <- este resize del renderer deberia ir fuera de game
  }

  updateKeysCallback(keys) { // todo: en otro lado esto y que a gameui solo le llegue keys
    this.keyMouseListener.setKeys(keys);
  }

  showComerciar() {
    this.comerciar.show();
  }

  hideComerciar(incomingFromServer) {
    this.comerciar.hide(incomingFromServer);
  }

  showMensaje(msj) {
    this.inGameMensaje.show(msj);
  }

  showBoveda() {
    this.boveda.show();
  }

  hideBoveda(incomingFromServer) {
    this.boveda.hide(incomingFromServer);
  }

  showTirar(tirandoOro) {
    this.tirar.show(tirandoOro);
  }

  showSkills() {
    this.skills.show();
  }

  showOpciones() {
    this.opciones.show();
  }

  hideTirar() {
    this.tirar.hide();
  }

  showMapa() {
    this.guiaMapa.show();
  }

  showCarpinteria(items) {
    this.carpinteria.show(items);
  }

  showHerreria() {
    this.herreria.show();
  }

  showClanes() {
    this.clanes.show();
  }

  _showSolicitudClan(clan) {
    this.solicitudClan.show(clan);
  }

  setNombresClanes(nombres) {
    this.clanes.setNombresClanes(nombres);
  }

  showEleccionFaccionClan() {
    this.eleccionFaccionClan.show();
  }

  showCrearClan() {
    this.crearClan.show();
  }

  showNoticiasClan(noticias, enemigos, aliados) {
    this.noticiasClan.show(noticias, enemigos, aliados);
  }

  showDetallesPersonaje(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados) {
    this.detallesPersonaje.show(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados);
  }

  showEstadisticas() {
    this.estadisticas.show();
  }

  showParty(esLider, data, exp) {
    if (esLider) {
      this.partyLider.show(data, exp);
    } else {
      this.partyMiembro.show(data, exp);
    }
  }

  showPlayAgain() {
    this.playAgain.show();
  }

  showMenu(fromEscapeKey) {
    this.menu.show(fromEscapeKey);
  }

  setAtributosInfo(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion) {
    this.estadisticas.setAtributosInfo(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion);
  }

  setFameInfo(Asesino, Bandido, Burgues, Ladron, Noble, Plebe, Promedio) {
    this.estadisticas.setFameInfo(Asesino, Bandido, Burgues, Ladron, Noble, Plebe, Promedio);
  }

  setMiniStats(CiudadanosMatados, CriminalesMatados, UsuariosMatados, NpcsMuertos, Clase, Pena) {
    this.estadisticas.setMiniStats(CiudadanosMatados, CriminalesMatados, UsuariosMatados, NpcsMuertos, Clase, Pena);

  }

  updateSlotUser(numSlot, slot) { //todo: feo todo esto!
    if (slot) {
      let numGrafico = this.game.assetManager.getNumGraficoFromGrh(slot.grh);
      this.interfaz.cambiarSlotInventario(numSlot, slot.cantidad, numGrafico, slot.equipado);
      if (this.comerciar.visible) {
        this.comerciar.cambiarSlotVenta(numSlot, slot.cantidad, numGrafico);
      }
      if (this.boveda.visible) {
        this.boveda.cambiarSlotDepositar(numSlot, slot.cantidad, numGrafico);
      }
    } else {
      this.interfaz.borrarSlotInventario(numSlot);
      if (this.comerciar.visible) {
        this.comerciar.borrarSlotVenta(numSlot);
      }
      if (this.boveda.visible) {
        this.boveda.borrarSlotDepositar(numSlot);
      }
    }
  }

  updateSlotShop(numSlot, slot) {
    if (slot) {
      let numGrafico = this.game.assetManager.getNumGraficoFromGrh(slot.grh);
      this.comerciar.cambiarSlotCompra(numSlot, slot.cantidad, numGrafico);
    }
    else {
      this.comerciar.borrarSlotCompra(numSlot);
    }
  }

  updateSlotBank(numSlot, slot) {
    if (slot) {
      let numGrafico = this.game.assetManager.getNumGraficoFromGrh(slot.grh);
      this.boveda.cambiarSlotRetirar(numSlot, slot.cantidad, numGrafico);
    } else {
      this.boveda.borrarSlotRetirar(numSlot);
    }
  }

  updateSkillsData(skills) {
    if (this.skills.visible) {
      this.skills.updateSkillsData(skills);
    }
    if (this.estadisticas.visible) {
      this.estadisticas.updateSkillsData(skills);
    }
  }

  _initPopUp(popUp) {
    this.popUps.push(popUp);

    /* inicializa sonido de los botones , sacarlo de aca?*/
    //popUp.initButtonsSound(this.playSonidoClickCb);

    return popUp;
  }

  get inGameMensaje() {
    return null
  }

  get comerciar() {
    return null
  }

  get tirar() {
    return null
  }

  get boveda() {
    return null
  }

  get guiaMapa() {
    return null
  }

  get opciones() {
    return null
  }

  get skills() {
    return null
  }

  get menu() {
    return null
  }

  get detallesClan() {
    return null
  }

  get clanes() {
    return null
  }

  get solicitudClan() {
    return null
  }

  get eleccionFaccionClan() {
    return null
  }

  get crearClan() {
    return null
  }

  get noticiasClan() {
    return null
  }

  get detallesPersonaje() {
    return null
  }

  get estadisticas() {
    return null
  }

  get partyLider() {
    return null
  }

  get partyMiembro() {
    return null
  }

  get carpinteria() {
    return null
  }

  get herreria() {
    return null
  }

  get playAgain() {
    return null
  }
}
