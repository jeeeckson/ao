import * as PIXI from 'pixi.js';
import React from 'react';
import Camera from './camera';
import Consola from './consola';
import ContainerOrdenado from './containerordenado';
import IndicadorMapa from './indicadormapa';
import EntityRenderer from './entityrenderer';
import ClimaRenderer from './climarenderer';
import MapaRenderer from './maparenderer';
import RendererUtils from './rendererutils';
import style from 'styled-components';
import ItemGrid from "../ui/game/itemgrid";
import GameManager from "../model/gamemanager";
import GameClient from "../network/gameclient";
import GameUI from "../ui/game/gameui";
import ChatBox from "../components/ChatBox";
import objLogin from "../objLogin";

const MenuGame = style.div`
 
  @extend .exterior_border_default;
  background-size: 100% 100%;
  background-image: ${props => props.url}
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  flex: 1;
  display: inline-block;
  position: relative;

  font-size:1.5vh;
  .span {
    cursor: default;
    font-weight: bold;
  }
`;

export default class Renderer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const {assetManager, uiManager} = this.props;
    this.pixi_cnt = null;
    this.MAPA_WIDTH = 100; // todo: usarlo desde mapa
    this.assetManager = assetManager;
    this.grhs = assetManager.grhs;
    this.indices = assetManager.getIndices();
    this.armas = assetManager.getArmas();
    this.cabezas = assetManager.getCabezas();
    this.cascos = assetManager.getCascos();
    this.cuerpos = assetManager.getCuerpos();
    this.escudos = assetManager.getEscudos();
    this.fxs = assetManager.getFxs();
    this.gameManager = new GameManager(assetManager, this);
    this.gameUI = new GameUI(this.gameManager, null, () => {
    });
    this.client = new GameClient(this.gameManager.game, uiManager, this.gameUI);
    this._initClientCallbacks(this.client);
    this.canvasRef = React.createRef();
    this.state = {
      gameCanvas: null
    }

  }

  updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element;
    //now we are adding the application to the DOM element which we got from the Ref.
    if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
      this.pixi_cnt.appendChild(this.state.app.view);
      //The setup function is a custom function that we created to add the sprites. We will this below
      this.setup();
    }
  };

  _initClientCallbacks = (client) => {
    client.intentarCrearPersonaje(this.initiateAfterLogin);
    client.setDisconnectCallback((goToLoginScreen) => {
      if (goToLoginScreen) {
        //this.setLoginScreen();
      }
      this.assetManager.audio.stopMusic();
      this.gameManager.resetGame(this.escala);
      this.starting = false;
    });

    client.setLogeadoCallback(() => {
      this.gameManager.game.start();
      this.setGameScreen();
      this.starting = false;
    });

  };

  initiateAfterLogin = () => {
    //const {escala, objLogin} = this.props;
    const {escala} = this.props;
    this.gameManager.setup(this.client, this.gameUI);
    this.ready = true;
    const {username, password, race, gender, classP, head, email, city} = objLogin;
    this.gameManager.game.inicializar(username);
    console.log(gender, race,classP)
    if (gender && race && classP) {
      this.client.sendLoginNewChar(username, password, race, gender, classP, head, email, city);
    } else {
      this.client.intentarLogear(username, password);
    }

    this.tilesize = 32;
    this.camera = new Camera(this.tilesize);

    this.entityRenderer = null;
    this.mapaRenderer = null;
    this.climaRenderer = null;
    this.canvasRef = this._inicializarPixi();

    this.rescale(escala);
  };

  _inicializarPixi() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    // noinspection JSAnnotator
    PIXI.settings.MIPMAP_TEXTURES = false;
    PIXI.settings.GC_MODES = PIXI.GC_MODES.MANUAL;

    this.pixiRenderer = new PIXI.autoDetectRenderer(this.camera.gridW * this.tilesize, this.camera.gridH * this.tilesize);
    this._initStage();
    return this.pixiRenderer.view;
  }

  _initStage() {
    const {app} = this.props;
    this.gameStage = new PIXI.Container();
    this.climaContainer = new PIXI.Container();
    this.layer1 = new PIXI.Container();
    this.layer2 = new PIXI.Container();
    this.gameNames = new PIXI.Container();
    this.layer3 = new ContainerOrdenado(this.MAPA_WIDTH);
    this.layer3.ordenado = true;
    this.layer4 = new PIXI.Container();
    this.gameChat = new PIXI.Container();
    this.consola = new Consola(this.escala);
    this.indicadorMapa = new IndicadorMapa(this.escala);
    app.stage.addChild(this.gameStage);
    app.stage.addChild(this.climaContainer);
    app.stage.addChild(this.consola);
    app.stage.addChild(this.indicadorMapa);
    this.gameStage.addChild(this.layer1);
    this.gameStage.addChild(this.layer2);
    this.gameStage.addChild(this.gameNames);
    this.gameStage.addChild(this.layer3);
    this.gameStage.addChild(this.layer4);
    this.gameStage.addChild(this.gameChat);

    this.entityRenderer = new EntityRenderer(this.escala, this.layer3, this.gameNames, this.gameChat, this.camera, this.assetManager, this.gameStage);
    this.climaRenderer = new ClimaRenderer(this.escala, this.climaContainer, this.assetManager, this.pixiRenderer);
    this.mapaRenderer = new MapaRenderer(this.camera, this.assetManager, this.layer1, this.layer2, this.layer3, this.layer4);
  }

  update(delta) {
    //this.entityRenderer.update(delta);
    this.climaRenderer.update(delta);
    //this.mapaRenderer.update(delta);
    this.consola.update(delta);
  }


  agregarTextoConsola(texto, font) {
    this.consola.agregarTexto(texto, font);
  }

  actualizarIndicadorMapa(numMap, x, y) {
    //return;
    this.indicadorMapa.actualizar(numMap, x, y);
  }

  agregarItem(item, numGrh) {
    this.entityRenderer.agregarItem(item, numGrh);
  }

  sacarItem(item) {
    this.entityRenderer.sacarItem(item);
  }

  agregarCharacter(char) {
    this.entityRenderer.agregarCharacter(char);
  }

  sacarCharacter(char) {
    this.entityRenderer.sacarCharacter(char);
  }

  setCharacterChat(char, chat, r, g, b) {
    this.entityRenderer.setCharacterChat(char, chat, r, g, b);
  }

  removerChat(char) {
    this.entityRenderer.removerChat(char);
  }

  setCharVisible(char, visible) {
    this.entityRenderer.setCharVisible(char, visible);
  }

  agregarCharacterHoveringInfo(char, valor, font) {
    this.entityRenderer.agregarCharacterHoveringInfo(char, valor, font);
  }

  setCharacterFX(char, FX, FXLoops) {
    this.entityRenderer.setCharacterFX(char, FX, FXLoops);
  }

  entityVisiblePorCamara(entity, extraPositions) {
    return this.entityRenderer.entityVisiblePorCamara(entity, extraPositions);
  }

  entityEnTileVisible(entity) { // puede que no este en un tile visible pero si sea visible la entidad (para eso usar el de arriba)
    return this.entityRenderer.entityEnTileVisible(entity);
  }

  rescale(escala) {
    // calcular escala que no haga quedar a los tiles en posiciones no enteras:
    let newTilesize = Math.floor(escala * this.tilesize);
    escala = newTilesize / this.tilesize;

    this.escala = escala;

    this.pixiRenderer.resize(Math.round(this.camera.gridW * this.tilesize * escala), Math.round(this.camera.gridH * this.tilesize * escala));
    this.gameStage.scale.x = escala;
    this.gameStage.scale.y = escala;

    this.gameChat.scale.x = 1 / escala;
    this.gameChat.scale.y = 1 / escala;

    this.gameNames.scale.x = 1 / escala;
    this.gameNames.scale.y = 1 / escala;

    this._syncGamePosition();

    for (let i = 0; i < this.gameChat.children.length; i++) {
      this.gameChat.children[i].setEscala(escala);
    }
    for (let name of this.gameNames.children) {
      name.setEscala(escala);
    }
    this.consola.setEscala(escala);

    this.indicadorMapa.x = Math.floor((17 * 32 - 75) * escala);
    this.indicadorMapa.y = Math.floor((13 * 32 - 12) * escala);
    this.indicadorMapa.setEscala(escala);

    /* TEMPORAL */
    if (this.entityRenderer) {
      this.entityRenderer.rescale(escala);
    }
    if (this.climaRenderer) {
      this.climaRenderer.escala = escala;
    }
    /* TEMPORAL */
  }

  clean(escala) {
    const {app} = this.props;
    while (app.stage.children.length > 0) {
      let child = app.stage.getChildAt(0);
      RendererUtils.removePixiChild(app.stage, child);
    }

    this._initStage();
    this.rescale(escala);
  }

  setBajoTecho(bajoT) {
    this.layer4.visible = !bajoT;
  }

  updateBeforeMovementBegins(dir, entities) {
    this.mapaRenderer.updateTilesMov(dir);
    this.entityRenderer.updateEntitiesMov(dir, entities);
  }

  cambiarMapa(mapa) {
    this.mapaRenderer.cambiarMapa(mapa);
  }

  drawMapaIni(gridX, gridY, entities) {
    this.resetCameraPosition(gridX, gridY, entities);
    this._syncGamePosition();
    this.mapaRenderer.drawMapaIni(gridX, gridY);
  }

  resetCameraPosition(gridX, gridY, entities) {
    this.camera.lookAtGridPos(gridX, gridY);
    this.entityRenderer.updateEntitiesClipping(entities);
  }

  _syncGamePosition() {
    this.gameStage.x = -Math.round(this.camera.x * this.escala);
    this.gameStage.y = -Math.round(this.camera.y * this.escala);
  }

  moverPosition(x, y) {
    this.camera.mover(x, y);
    this._syncGamePosition();
  }

  resetPos(gridX, gridY, entities) {
    this.drawMapaIni(gridX, gridY, entities);
  }

  removeLluvia() {
    this.climaRenderer.removeLluvia();
  }

  createLluvia() {
    this.climaRenderer.createLluvia();
  }

  renderFrame() {
    const {app} = this.props;
    this.pixiRenderer.render(app.stage);
  }

  setDeadState(dead) {
    const {app} = this.props;
    if (dead) {
      let matrixFilter = new PIXI.filters.ColorMatrixFilter();
      matrixFilter.desaturate();
      app.stage.filters = [matrixFilter];
    } else {
      app.stage.filters = [];
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef;
    this.setState({canvas});

  }

  setTextInputRef = async (element) => {
 /*   this.gameRoot = element;
    await this.gameManager.createGame(this.gameRoot && this.gameRoot.context);
    this.gameManager.startScene();*/
  };

  render = () => {
    return (
      <div id="juego" style={{position: 'relative'}} className="exterior_border_default background_default">

        {/*<div ref={this.setTextInputRef}/>*/}
        <canvas ref={this.canvasRef} width={640} height={425}/>
        <ChatBox
          id="chatbox"
          game={this.gameManager.game}
          commandChat={this.gameManager.comandosChat}
          className="exterior_border_default background_default"
        />

        <MenuGame id="menuJuego" url="url('../imagenes/menuJuego_background.png');">
          <ItemGrid id="itemsGrid" className="itemgrid"/>

        </MenuGame>
      </div>)
  }
}
