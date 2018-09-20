/**
 * Created by horacio on 4/6/16.
 **/
import _ from 'lodash';
import KeyMouseInput from './keymouseinput';
import CharcodeMap from '../../utils/charcodemap';

export default class KeyMouseListener {

  constructor(game, acciones, keys, comandosChat) {
    this.game = game; // todo: sacar de aca !?
    this.inputHandler = new KeyMouseInput(game, acciones);
    this.setKeys(keys);
    this.comandosChat = comandosChat;

    this._prevKeyDown = [];

    this.talkingToClan = false;
  }

  setKeys(keys) {
    if (keys && keys.length) {
      this.keys = keys;
      this.inputHandler.setKeys(keys);
    }
  }

  updateGameMouseCoordinates(game, event, $gameCanvas) {

    let gamePos = $gameCanvas.offset(),
      width = game.renderer.pixiRenderer.width,
      height = game.renderer.pixiRenderer.height,
      mouse = game.mouse;

    mouse.x = event.pageX - gamePos.left;
    mouse.y = event.pageY - gamePos.top;

    let posEnGameCanvas = true;
    if (mouse.x <= 0) {
      mouse.x = 0;
      posEnGameCanvas = false;
    } else if (mouse.x >= width) {
      mouse.x = width - 1;
      posEnGameCanvas = false;
    }

    if (mouse.y <= 0) {
      mouse.y = 0;
      posEnGameCanvas = false;
    } else if (mouse.y >= height) {
      mouse.y = height - 1;
      posEnGameCanvas = false;
    }
    return posEnGameCanvas;
  }

  upKeyTeclasCaminar=()=> {
    let teclasCaminar = this.inputHandler.getTeclasCaminar();
    _.each(teclasCaminar, (key) => {
      this._upKey(key);
      this.inputHandler.keyUp(key);
    });
  }

  initListeners =()=> {

    //this._initMouseListeners();
    this._initDocumentKeysListeners();
    //this._initChatKeyListener();
  };

  _initDocumentKeysListeners =() =>{

    document.addEventListener("keyup",(e) => {
      let key = e.which;
      this._upKey(key);
      this.inputHandler.keyUp(key);
    });

    document.addEventListener("keydown", (e) => {
      if (!this.game.started) {
        return;
      }

      let key = e.which;

      if (this.inputHandler.ignoredKey(key)) {
        return false;
      }
      if (this.inputHandler.isCaminarKey(key)) {
        if (!this._isKeyDown(key)) {
          this.inputHandler.keyDown(key);
          this._downKey(key);
        }
        // si es una flecha y no hay popUp abierto, no deja que siga al input del chat
        if (!this.game.gameUI.hayPopUpActivo() && this._isArrowKey(key)) {
          return false;
        }
      }
    });
  };

  /**
   _initMouseListeners() {

    let this = this;

    this.$gameCanvas.click((event) => {
      // TODO: si haces click afuera del menu pop up que lo cierre?

      if (this.updateGameMouseCoordinates(this.game, event, this.$gameCanvas)) {
        this.inputHandler.click();
      }
    });

    this.$gameCanvas.dblclick((event) => {
      // TODO: si haces click afuera del menu pop up que lo cierre?
      if (this.updateGameMouseCoordinates(this.game, event, this.$gameCanvas)) {
        this.inputHandler.doubleClick();
      }
    });

    this.$gameCanvas.mousemove(_.debounce((event) => {
      this.updateGameMouseCoordinates(this.game, event, this.$gameCanvas);
    }, 50));
    // DEBUG------------------------------ NO SACAR----------------------------------- :
    //  $(window).bind('mousewheel DOMMouseScroll', function (event) {
    //  var escala;
    //  if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
    //  //scroll up
    //  escala = 1.1;
    //  }
    //  else {
    //  // scroll down
    //  escala = 0.9;
    //  }
    //  this.game.renderer.stage.scale.x *= escala;
    //  this.game.renderer.stage.scale.y *= escala;
    //  this.game.renderer.stage.x = ((this.game.renderer.stage.width * (1 - this.game.renderer.stage.scale.x)) / 2);
    //  this.game.renderer.stage.y = ((this.game.renderer.stage.height * (1 - this.game.renderer.stage.scale.y)) / 2);
    //  });
    // ----------------------------------- NO SACAR----------------------------------- :

  }
   */

  _isArrowKey=(key)=> {
    return (key === CharcodeMap.keys.indexOf('LEFT') || key === CharcodeMap.keys.indexOf('UP') ||
      key === CharcodeMap.keys.indexOf('DOWN') || key === CharcodeMap.keys.indexOf('RIGHT'));
  }

  _downKey=(key)=> {
    this._prevKeyDown[key] = true;
  }

  _upKey =(key)=> {
    this._prevKeyDown[key] = null;
  }

  _isKeyDown=(key)=> {
    return this._prevKeyDown[key];
  }

}
