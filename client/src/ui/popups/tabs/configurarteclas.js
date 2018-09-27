/**
 * Created by horacio on 4/14/16.
 */

export default class ConfigurarTeclas {
  constructor(settings, updateKeysCb, showMensajeCb) {
    this.settings = settings;
    this.nuevasKeys = null;
    this.updateKeysCb = updateKeysCb;
    this.showMensajeCb = showMensajeCb;
    this.initCallbacks();
  }

  onShow() {
    this.nuevasKeys = $.extend(true, {}, this.settings.getKeys()); // clonar
    this.displayKeys();
  }

  onHide() {

  }

  setCerrarCallback(cerrarCallback) {
    this._cerrarCallback = cerrarCallback;
  }

  displayKeys() {
    let self = this;
    $('#configurarTeclas').find('input').each(function () {
      let id = ($(this).attr('id'));
      let accion = id.split('_')[1];
      if (!accion || !(self.nuevasKeys[accion])) {
        log.error('Error con input element!');
        return;
      }
      $(this).val(CharCodeMap.keys[self.nuevasKeys[accion]]);
    });
  }

  keyRepetida(c) {
    for (let prop in this.nuevasKeys) {
      if (this.nuevasKeys.hasOwnProperty(prop)) {
        if (this.nuevasKeys[prop] === c) {
          return prop;
        }
      }
    }
    return false;
  }

  initCallbacks() {
    let self = this;

    $('#configurarTeclasBotonCerrar').click(() => {
      self._cerrarCallback();
    });

    $('#configurarTeclasCancelar').click(() => {
      self._cerrarCallback();
    });

    $('#configurarTeclasRestaurarDefault').click(() => {
      self.nuevasKeys = self.settings.getDefaultKeys();
      self.displayKeys();
    });

    $('#configurarTeclasGuardarYSalir').click(() => {
      self.settings.setKeys(self.nuevasKeys);
      self.updateKeysCb(self.nuevasKeys);
      self._cerrarCallback();
    });

    $('#configurarTeclas').on('keydown', 'input', function (event) {
      let id = ($(this).attr('id'));
      let accion = id.split('_')[1];
      if (!accion || !(self.nuevasKeys[accion])) {
        log.error('Error con input element!');
        return;
      }
      let nuevaKey = event.which;
      let oldAction = self.keyRepetida(nuevaKey);
      if (oldAction) {
        self.nuevasKeys[oldAction] = 1;
      }
      self.nuevasKeys[accion] = nuevaKey;
      self.displayKeys();
      return false;
    });

  }
}

