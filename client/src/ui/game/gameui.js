/**
 * Created by horacio on 2/21/16.
 */

import KeyMouseListener from './keymouselistener';
import Interfaz from './interfaz';
import popUpSkills from '../popups/popupskills';
import Comerciar from '../popups/comerciar';
import InGameMensaje from '../popups/ingamemensaje';
import Tirar from '../popups/tirar';
import Boveda from '../popups/boveda';
import GuiaMapa from '../popups/guiamapa';
import Opciones from '../popups/opciones';
import Carpinteria from '../popups/carpinteria';
import Herreria from '../popups/herreria';
import Clanes from '../popups/clanes';
import DetallesClan from '../popups/detallesclan';
import SolicitudClan from '../popups/solicitudclan';
import EleccionFaccionClan from '../popups/eleccionfaccionclan';
import CrearClan from '../popups/crearclan';
import NoticiasClan from '../popups/noticiasclan';
import DetallesPersonaje from '../popups/detallespersonaje';
import Estadisticas from '../popups/estadisticas';
import PartyLider from '../popups/partylider';
import PartyMiembro from '../popups/partymiembro';
import PlayAgain from '../popups/playagain';
import Menu from '../popups/menu';

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
    this._inGameMensaje = this._inGameMensaje || this._initPopUp(new InGameMensaje());
    return this._inGameMensaje;
  }

  get comerciar() {
    this._comerciar = this._comerciar || this._initPopUp(new Comerciar(this.game, this.acciones));
    return this._comerciar;
  }

  get tirar() {
    this._tirar = this._tirar || this._initPopUp(new Tirar(this.game, this.acciones));
    return this._tirar;
  }

  get boveda() {
    this._boveda = this._boveda || this._initPopUp(new Boveda(this.game, this.acciones));
    return this._boveda;
  }

  get guiaMapa() {
    this._guiaMapa = this._guiaMapa || this._initPopUp(new GuiaMapa());
    return this._guiaMapa;
  }

  get opciones() {
    this._opciones = this._opciones || this._initPopUp(new Opciones(this.game, this.settings, this.updateKeysCallback.bind(this), this.showMensajeFunction));
    return this._opciones;
  }

  get skills() {
    this._skills = this._skills || this._initPopUp(new popUpSkills(this.game));
    return this._skills;
  }

  get menu() {
    this._menu = this._menu || this._initPopUp(new Menu(this.game, this.showMapa.bind(this), this.showEstadisticas.bind(this), this.showClanes.bind(this), this.showOpciones.bind(this)));
    return this._menu;
  }

  get detallesClan() {
    this._detallesClan = this._detallesClan || this._initPopUp(new DetallesClan(this.game, this._showSolicitudClan.bind(this)));
    return this._detallesClan;
  }

  get clanes() {
    this._clanes = this._clanes || this._initPopUp(new Clanes(this.game, this.detallesClan, this.showMensajeFunction, this._showSolicitudClan.bind(this)));
    return this._clanes;
  }

  get solicitudClan() {
    this._solicitudClan = this._solicitudClan || this._initPopUp(new SolicitudClan(this.game));
    return this._solicitudClan;
  }

  get eleccionFaccionClan() {
    this._eleccionFaccionClan = this._eleccionFaccionClan || this._initPopUp(new EleccionFaccionClan(this.game));
    return this._eleccionFaccionClan;
  }

  get crearClan() {
    this._crearClan = this._crearClan || this._initPopUp(new CrearClan(this.game, this.showMensajeFunction));
    return this._crearClan;
  }

  get noticiasClan() {
    this._noticiasClan = this._noticiasClan || this._initPopUp(new NoticiasClan());
    return this._noticiasClan;
  }

  get detallesPersonaje() {
    this._detallesPersonaje = this._detallesPersonaje || this._initPopUp(new DetallesPersonaje());
    return this._detallesPersonaje;
  }

  get estadisticas() {
    this._estadisticas = this._estadisticas || this._initPopUp(new Estadisticas(this.game));
    return this._estadisticas;
  }

  get partyLider() {
    this._partyLider = this._partyLider || this._initPopUp(new PartyLider(this.game, this.showMensajeFunction));
    return this._partyLider;
  }

  get partyMiembro() {
    this._partyMiembro = this._partyMiembro || this._initPopUp(new PartyMiembro(this.game, this.showMensajeFunction));
    return this._partyMiembro;
  }

  get carpinteria() {
    this._carpinteria = this._carpinteria || this._initPopUp(new Carpinteria(this.game));
    return this._carpinteria;
  }

  get herreria() {
    this._herreria = this._herreria || this._initPopUp(new Herreria(this.game));
    return this._herreria;
  }

  get playAgain() {
    this._playAgain = this._playAgain || this._initPopUp(new PlayAgain(this.game, this.setCrearPjScreenCb));
    return this._playAgain;
  }
}