/**
 * Created by horacio on 2/28/16.
 */
import ItemGrid from './itemgrid';
import CharCodeMap from '../../utils/charcodemap';

export default class Interfaz {
  constructor(game, acciones) {
    this.acciones = acciones;
    this.game = game;
    this.inventarioGrid = new ItemGrid('itemsGrid', 20, true);
    let self = this;
    this.inventarioGrid.setDobleClickCallback((slot) => {
      self.acciones.usarConDobleClick(slot);
    });
  }

  inicializar() {
    let self = this;

    $('#botonInventario').click(() => {
      $('body').addClass('inventarioActivo');
    });

    $('#botonHechizos').click(() => {
      $('body').removeClass('inventarioActivo');
      //temp fix scroll hechizos
      if (!self.scrollHechizosFixed) {
        self.setSelectedSlotHechizo(35);
        self.scrollHechizosFixed = true;
      }
    });

    $('#botonLanzar').click(() => {
      self.acciones.lanzarHechizo();
    });

    $('#botonInfo').click(() => {
      self.game.escribirMsgConsola('To cast a spell, select from the list, click on cast, and then click on the target');
    });

    $('#botonTirarOro').click(() => {
      self.game.gameUI.showTirar(true);
    });

    $('#botonAsignarSkills').click(() => {
      self.game.gameUI.showSkills();
    });

    $('#botonSeguroResucitar').click(() => {
      self.game.toggleSeguroResucitar();
    });

    $('#botonSeguroAtacar').click(() => {
      self.game.toggleSeguroAtacar();
    });

    $('#botonMacroHechizos').click(() => {
      self.acciones.toggleMacroHechizos();
    });

    $('#botonMacroTrabajo').click(() => {
      self.acciones.toggleMacroTrabajo();
    });

    $('#menuJuegoBotonMenu').click(() => {
      self.game.gameUI.showMenu();
    });

    $('#botonMoverHechizoArriba').click(() => {
      let slot = self.game.gameUI.interfaz.getSelectedSlotHechizo();
      if (!slot || slot === 1) {
        return;
      }
      self.game.client.sendMoveSpell(true, slot);
      self.game.swapSlotHechizos(slot, slot - 1);
      self.setSelectedSlotHechizo(slot - 1);
    });

    $('#botonMoverHechizoAbajo').click(() => {
      let slot = self.game.gameUI.interfaz.getSelectedSlotHechizo();
      if (!slot) {
        return;
      }
      self.game.client.sendMoveSpell(false, slot);
      self.game.swapSlotHechizos(slot, slot + 1);
      self.setSelectedSlotHechizo(slot + 1);
    });

    //FIX bug firefox que no previene movimiento scroll hehcizos
    if (Detect.isFirefox()) {
      self.setHechizosScrollFirefoxFix(self);
    }
  }

  cambiarSlotInventario(numSlot, Amount, numGrafico, equiped) {
    this.inventarioGrid.modificarSlot(numSlot, Amount, numGrafico, equiped);
  }

  borrarSlotInventario(slot) {
    this.inventarioGrid.borrarItem(slot);
  }

  resetSelectedSlotInventario() {
    this.inventarioGrid.deselect();
  }

  getSelectedSlotInventario() {
    let slot = this.inventarioGrid.getSelectedSlot();
    if (slot > 0) {
      return slot;
    }
  }

  getSelectedSlotHechizo() {
    let res = parseInt($('#hechizos').val());
    if (res) {
      return res;
    }
    else {
      return 0;
    }
  }

  setSelectedSlotHechizo(slot) {
    $('#hechizos').val(parseInt(slot));
  }

  modificarSlotHechizo(slot, texto) {
    let elemento = $('#hechizos option[value=' + slot + ']');
    if (!elemento.length) { // nuevo elemento
      let $nuevoHechizo = $('<option>').attr('value', slot).text(texto);
      $('#hechizos').append($nuevoHechizo);
    }
    else {
      $(elemento).text(texto);
    }
  }

  updateAgilidad(agi) {
    $('#indicadorAgilidad').text('A: ' + agi);
  }

  updateFuerza(fuerza) {
    $('#indicadorFuerza').text('F: ' + fuerza);
  }

  updateOro(oro) {
    $('#indicadorOro').text(oro);
  }

  _updateBarra(cant, max, $barra, $label, noInvertida) {
    let porcentaje = 100;
    if (max) {
      if (noInvertida) {
        porcentaje = Math.floor((cant / max) * 100);
      } else {
        porcentaje = 100 - Math.floor((cant / max) * 100);
      }
    }
    $barra.css('width', porcentaje + '%');
    $label.text(cant + '/' + max);
  }

  updateBarraEnergia(cant, max) {
    this._updateBarra(cant, max, $('#barraEnergiaUsada'), $('#barraEnergiaTexto'));
  }

  updateBarraVida(cant, max) {
    this._updateBarra(cant, max, $('#barraSaludUsada'), $('#barraSaludTexto'));
  }

  updateBarraMana(cant, max) {
    this._updateBarra(cant, max, $('#barraManaUsada'), $('#barraManaTexto'));
  }

  updateBarraHambre(cant, max) {
    this._updateBarra(cant, max, $('#barraHambreUsada'), $('#barraHambreTexto'));
  }

  updateBarraSed(cant, max) {
    this._updateBarra(cant, max, $('#barraSedUsada'), $('#barraSedTexto'));
  }

  updateBarraExp(cant, max) {
    this._updateBarra(cant, max, $('#barraExpUsada'), $('#barraExpTexto'));
  }

  updateNivel(nivel) {
    $('#indicadorNivel').text('Level ' + nivel);
  }

  setMouseCrosshair(visible) {
    if (visible) {
      $('#gamecanvas').addClass('crosshair');
    }
    else {
      $('#gamecanvas').removeClass('crosshair');
    }
  }

  setSeguroResucitacion(activado) {
    if (!activado) {
      $('#botonSeguroResucitar').addClass('seguroOff');
    } else {
      $('#botonSeguroResucitar').removeClass('seguroOff');
    }
  }

  setSeguroAtacar(activado) {
    if (!activado) {
      $('#botonSeguroAtacar').addClass('seguroOff');
    } else {
      $('#botonSeguroAtacar').removeClass('seguroOff');
    }
  }

  setMacroTrabajo(activado) {
    if (activado) {
      $('#botonMacroTrabajo').addClass('macroActivado');
    } else {
      $('#botonMacroTrabajo').removeClass('macroActivado');
    }
  }

  setMacroHechizos(activado) {
    if (activado) {
      $('#botonMacroHechizos').addClass('macroActivado');
    } else {
      $('#botonMacroHechizos').removeClass('macroActivado');
    }
  }

  setHechizosScrollFirefoxFix(self) {
    let $hechizos = $('#hechizos');
    self.hechizos_realSelectedSlot = 1;

    $hechizos.click(() => {
      self.hechizos_realSelectedSlot = $hechizos.val();
      $hechizos.blur();
    });

    let up = CharCodeMap.keys.indexOf('UP');
    let down = CharCodeMap.keys.indexOf('DOWN');
    let left = CharCodeMap.keys.indexOf('LEFT');
    let right = CharCodeMap.keys.indexOf('RIGHT');

    $hechizos.change(() => {
      $hechizos.blur();
    });

  }

}