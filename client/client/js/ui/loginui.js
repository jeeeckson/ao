/**
 * Created by horacio on 4/6/16.
 */

import CharcodeMap from '../utils/charcodemap';

export default class LoginUI {
  constructor() {
    this.enableLoginPressingEnter();
  }

  setBotonJugarCallback(cb) {
    $('#botonJugar').click(() => {
      cb();
    });
  }

  enableLoginPressingEnter() {

    let loginKeyPressFunc = (keyNumber) => {

      if (keyNumber === CharcodeMap.keys.indexOf('ENTER')) {
        let $playButton = $('#botonJugar');
        if (!$playButton.prop('disabled')) {
          $playButton.click();
        }
        return false;
      }
    };

    $('#loginNombre').keypress((e) => {
      loginKeyPressFunc(e.which);
    });
  }

  setPlayButtonState(enabled) {
    let $playButton = $('#botonJugar');

    if (enabled) {
      $playButton.prop('disabled', false);
    } else {
      $playButton.prop('disabled', true);
    }
  }

  getUsername() {
    return $('#loginNombre').val();
  }
}