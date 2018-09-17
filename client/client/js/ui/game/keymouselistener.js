/**
 * Created by horacio on 4/6/16.
 **/

import KeyMouseInput from './keymouseinput';
import CharcodeMap from '../../utils/charcodemap';

export default class KeyMouseListener {

  constructor(game, acciones, keys, comandosChat) {
    this.game = game; // todo: sacar de aca !?
    this.inputHandler = new KeyMouseInput(game, acciones);
    this.setKeys(keys);
    this.comandosChat = comandosChat;

    this._prevKeyDown = [];
    this.$gameCanvas = $('#gamecanvas');
    this.$chatButton = $('#botonChatInput');
    this.$chatbox = $('#chatbox');
    this.$chatinput = $('#chatinput');

    this.talkingToClan = false;

    this._initChatButtonCallback();
  }

  setKeys(keys) {
    this.keys = keys;
    this.inputHandler.setKeys(keys);
  }

  showChat() {
    this.$chatbox.addClass('active');
    this.$chatinput.focus();
  }

  hideChat() {
    this.$chatbox.removeClass('active');
    this.$chatinput.blur();
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

  upKeyTeclasCaminar() {
    let teclasCaminar = this.inputHandler.getTeclasCaminar();
    let self = this;
    _.each(teclasCaminar, (key) => {
      self._upKey(key);
      self.inputHandler.keyUp(key);
    });
  }

  initListeners() {
    let self = this;
    //this.$chatbox.attr('value', '');
    this._initMouseListeners();
    this._initDocumentKeysListeners();
    this._initChatKeyListener();
  }

  _initDocumentKeysListeners() {
    let self = this;

    $(document).keyup((e) => {
      let key = e.which;
      self._upKey(key);
      self.inputHandler.keyUp(key);
    });

    $(document).keydown((e) => {
      if (!self.game.started) {
        return;
      }

      let key = e.which;

      if (self.inputHandler.ignoredKey(key)) {
        return false;
      }
      if (self.inputHandler.isCaminarKey(key)) {
        if (!self._isKeyDown(key)) {
          self.inputHandler.keyDown(key);
          self._downKey(key);
        }
        // si es una flecha y no hay popUp abierto, no deja que siga al input del chat
        if (!self.game.gameUI.hayPopUpActivo() && self._isArrowKey(key)) {
          return false;
        }
        return;
      }

      if (self.game.isPaused || (self.game.gameUI.hayPopUpActivo())) {
        return;
      }

      // lo de abajo se ejecuta solo si no hay un pop up abierto

      let $chatb = self.$chatbox;

      if (key === self.keys.chat) {
        if ($chatb.hasClass('active')) {
          self._submitChat();
        } else {
          self.showChat();
        }
      }

      if (key === self.keys.chatClan) {
        if ($chatb.hasClass('active')) {
          if (self.talkingToClan) {
            self._submitChat();
          }
        } else {
          self.talkingToClan = true;
          self.showChat();
        }
      }

      if (!$chatb.hasClass('active')) {
        if (self._isKeyDown(key)) {
          return false;
        }
        self._downKey(key);

        return self.inputHandler.keyDown(key); // << return false previene el default y hace que no se propague mas
      }
    });

  }

  _submitChat() {
    this.$chatButton.click();
  }

  _initChatButtonCallback() {
    this.$chatButton.click(() => {
      this._trySendingChat();
      this.hideChat();
    });
  }

  _trySendingChat() {
    let $chat = this.$chatinput;
    if ($chat.attr('value') !== '') {
      if (this.game.player) {
        let chat = $chat.val();

        if (this.talkingToClan) {
          this.game.client.sendGuildMessage(chat);
          this.talkingToClan = false;
        } else {
          let res = this.comandosChat.parsearChat(chat);
          if (res) {
            this.game.client.sendTalk(res);
          }
        }
      }
      $chat.val('');
    }
  }

  _initChatKeyListener() {
    let self = this;

    this.$chatinput.keydown((e) => {

      let key = e.which;

      if (key === self.keys.chat) {
        self._submitChat();
        return false;
      }

      if (key === self.keys.cerrar) {
        self.hideChat();
        return false;
      }

    });
  }

  _initMouseListeners() {

    let self = this;

    self.$gameCanvas.click((event) => {
      // TODO: si haces click afuera del menu pop up que lo cierre?

      if (self.updateGameMouseCoordinates(self.game, event, self.$gameCanvas)) {
        self.inputHandler.click();
      }
    });

    self.$gameCanvas.dblclick((event) => {
      // TODO: si haces click afuera del menu pop up que lo cierre?
      if (self.updateGameMouseCoordinates(self.game, event, self.$gameCanvas)) {
        self.inputHandler.doubleClick();
      }
    });

    self.$gameCanvas.mousemove(_.debounce((event) => {
      self.updateGameMouseCoordinates(self.game, event, self.$gameCanvas);
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
    //  self.game.renderer.stage.scale.x *= escala;
    //  self.game.renderer.stage.scale.y *= escala;
    //  self.game.renderer.stage.x = ((self.game.renderer.stage.width * (1 - self.game.renderer.stage.scale.x)) / 2);
    //  self.game.renderer.stage.y = ((self.game.renderer.stage.height * (1 - self.game.renderer.stage.scale.y)) / 2);
    //  });
    // ----------------------------------- NO SACAR----------------------------------- :

  }

  _isArrowKey(key) {
    return (key === CharcodeMap.keys.indexOf('LEFT') || key === CharcodeMap.keys.indexOf('UP') ||
      key === CharcodeMap.keys.indexOf('DOWN') || key === CharcodeMap.keys.indexOf('RIGHT'));
  }

  _downKey(key) {
    this._prevKeyDown[key] = true;
  }

  _upKey(key) {
    this._prevKeyDown[key] = null;
  }

  _isKeyDown(key) {
    return this._prevKeyDown[key];
  }

}
