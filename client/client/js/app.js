import GameManager from './model/gamemanager';
import Renderer from './view/renderer';
import GameClient from './network/gameclient';

export default class App {
  constructor(assetManager, uiManager, settings) {
    this.assetManager = assetManager;
    this.uiManager = uiManager;
    this.client = null;
    this.ready = false;
    this.settings = settings;
  }



  start = () => {
    this._initLoginCallbacks();
    this._initCrearPjCallbacks();
    this.uiManager.hideIntro();
    this.inicializarGame();

    console.log('App initialized.');
  };

}
