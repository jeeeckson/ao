/**
 * Created by horacio on 2/27/16.
 */

import ControlsHelper from './popups/controlshelper';
import DialogCrearPersonaje from './popups/crearpersonaje';
import Utils from '../utils/util';
import Enums from '../enums';

export default class CrearPjUI {
  constructor(assetManager, showMensajeCb) {
    this.assetManager = assetManager;
    this.showMensajeCb = showMensajeCb;

    this._inicializado = false;
    this.offsetSelectedCabeza = Math.floor(Math.random() * 100);
    this.offsetSelectedClase = 0;
    this.offsetSelectedRaza = 0;

    this.$spanClase = $('#crearPjSpanClase');
    this.$spanRaza = $('#crearPjSpanRaza');

    this.$imgCabezaIzq = $('#crearPjSeleccionCabezaImagenIzq');
    this.$imgCabezaCentro = $('#crearPjSeleccionCabezaImagenCenter');
    this.$imgCabezaDer = $('#crearPjSeleccionCabezaImagenDer');

    this.$imagenCuerpo = $('#crearPjImagenPersonaje');
    this.$imagenCabezaCuerpo = $('#crearPjImagenCabezaPersonaje');

    this._dialogCrearPersonaje = null;
    this.username = null;
  }

  get dialogCrearPersonaje() {
    this._dialogCrearPersonaje = this._dialogCrearPersonaje || new DialogCrearPersonaje(this.showMensajeCb);
    return this._dialogCrearPersonaje;
  }

  inicializar() {
    if (this._inicializado) {
      return;
    } else {
      this._inicializado = true;
    }

    let id = 'crearSelectCiudad';
    let $sel = $('#' + id);
    this.modificarSlotInput($sel, id, Enums.Ciudad.Ullathorpe, 'Ullathorpe');
    this.modificarSlotInput($sel, id, Enums.Ciudad.Nix, 'Nix');
    this.modificarSlotInput($sel, id, Enums.Ciudad.Banderbill, 'Banderbill');
    this.modificarSlotInput($sel, id, Enums.Ciudad.Lindos, 'Lindos');
    this.modificarSlotInput($sel, id, Enums.Ciudad.Arghal, 'Arghal');

    $('#crearBotonGeneroMasculino').addClass('selected');
    $('#crearBotonGeneroFemenino').removeClass('selected');

    $('#crearBotonGeneroMasculino').click(() => {
      $('#crearBotonGeneroMasculino').toggleClass('selected');
      $('#crearBotonGeneroFemenino').toggleClass('selected');
      this._updatePJ();
    });

    $('#crearBotonGeneroFemenino').click(() => {
      $('#crearBotonGeneroMasculino').toggleClass('selected');
      $('#crearBotonGeneroFemenino').toggleClass('selected');
      this._updatePJ();
    });

    $('#crearPjSeleccionCabezaBotonIzq').click(() => {
      this.offsetSelectedCabeza--;
      this._updatePJ();
    });
    $('#crearPjSeleccionCabezaBotonDer').click(() => {
      this.offsetSelectedCabeza++;
      this._updatePJ();
    });

    $('#crearPjSeleccionRazaBotonIzq').click(() => {
      this.offsetSelectedRaza--;
      this._updatePJ();
    });

    $('#crearPjSeleccionRazaBotonDer').click(() => {
      this.offsetSelectedRaza++;
      this._updatePJ();
    });

    $('#crearPjSeleccionClaseBotonIzq').click(() => {
      this.offsetSelectedClase--;
      this._updatePJ();
    });

    $('#crearPjSeleccionClaseBotonDer').click(() => {
      this.offsetSelectedClase++;
      this._updatePJ();
    });

    this._updatePJ();
  }

  _getGenero() {
    return $('#crearBotonGeneroMasculino').hasClass('selected') ? Enums.Genero.hombre : Enums.Genero.mujer;
  }

  _getRaza() {
    let cantRazas = Object.keys(Enums.Raza).length;
    return Utils.modulo(this.offsetSelectedRaza, cantRazas) + 1;
  }

  _getClase() {
    let cantClases = Object.keys(Enums.Clase).length;
    return Utils.modulo(this.offsetSelectedClase, cantClases) + 1;
  }

  modificarSlotInput($sel, id, slot, texto) {
    let elemento = $('#' + id + ' option[value=' + slot + ']');
    if (!elemento.length) { // nuevo elemento
      $sel.append($('<option>').attr('value', slot).text(texto));
    }
    else {
      $(elemento).text(texto);
    }
  }

  setBotonTirarDadosCallback(cb) {

    $('#crearBotonTirarDados').click(() => {
      cb();
      this.assetManager.audio.playSound(Enums.SONIDOS.dados);
    });
  }

  setBotonVolverCallback(cb) {
    let self = this;
    $('#crearBotonVolver').click(() => {
      self.dialogCrearPersonaje.hide();
      cb();
    });
  }

  setBotonCrearCallback(cb) {
    let self = this;
    $('#crearBotonCrear').click(() => {
      let exec = () => {
        let raza = self._getRaza();
        let genero = self._getGenero();
        let clase = self._getClase();
        let ciudad = $('#crearSelectCiudad').val();
        let cabeza = self._getCabezaNum(self.offsetSelectedCabeza);

        clase = clase === 11 ? 12 : clase; //swich trabajador - pirata

        let password = 'fromweb';
        let mail = 'from@web.com';
        cb(self.username, password, raza, genero, clase, cabeza, mail, ciudad);
      };
      if (!localStorage['controlsShown']) {
        localStorage.setItem('controlsShown', 'yes');
        let controlesHelper = new ControlsHelper();
        controlesHelper.show(exec);
      } else {
        exec();
      }
    });
  }

  _getCabezaNum(offset) {
    let cabezas = this.getPrimerYUltimaCabezaNum();
    let incremento = Utils.modulo(offset, (cabezas.ultima - cabezas.primera));

    return cabezas.primera + incremento;
  }

  _updatePJ() {
    this._actualizarAlturaPJ();
    this._updateCabezas();
    this._updateCuerpo();
    this._updateRaza();
    this._updateClase();
  }

  _actualizarAlturaPJ() {
    let raza = this._getRaza();
    let petizo = (raza === Enums.Raza.gnomo || raza === Enums.Raza.enano);
    if (petizo) {
      this.$imagenCabezaCuerpo.addClass('petizo');
    } else {
      this.$imagenCabezaCuerpo.removeClass('petizo');
    }
  }

  _updateCabezas() {
    let cabezaIzq = this._getCabezaNum(this.offsetSelectedCabeza - 1);
    let cabezaCentro = this._getCabezaNum(this.offsetSelectedCabeza);
    let cabezaDer = this._getCabezaNum(this.offsetSelectedCabeza + 1);
    let numGrafIzq = this.assetManager.getFaceGrafFromNum(cabezaIzq);
    let numGrafCentro = this.assetManager.getFaceGrafFromNum(cabezaCentro);
    let numGrafDer = this.assetManager.getFaceGrafFromNum(cabezaDer);

    let url = 'url(../../graficos/' + numGrafIzq + '.png)';
    this.$imgCabezaIzq.css('background-image', url);
    url = 'url(../../graficos/' + numGrafDer + '.png)';
    this.$imgCabezaDer.css('background-image', url);
    url = 'url(../../graficos/' + numGrafCentro + '.png)';
    this.$imgCabezaCentro.css('background-image', url);
    this.$imagenCabezaCuerpo.css('background-image', url);
  }

  _updateCuerpo() {
    let raza = this._getRaza();
    let genero = this._getGenero();

    let numCuerpo = this._getCuerpoNum(genero, raza);
    let numGraf = this.assetManager.getBodyGrafFromNum(numCuerpo);
    let url = 'url(../../graficos/' + numGraf + '.png)';
    this.$imagenCuerpo.css('background-image', url);
  }

  updateDados(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion) {
    $('#crearDadoFuerza').text('Fuerza: ' + Fuerza);
    $('#crearDadoAgilidad').text('Agilidad: ' + Agilidad);
    $('#crearDadoInteligencia').text('Inteligencia: ' + Inteligencia);
    $('#crearDadoCarisma').text('Carisma: ' + Carisma);
    $('#crearDadoConstitucion').text('Constitucion: ' + Constitucion);
  }

  _updateRaza() {
    let selectedRaza = this._getRaza();
    let nombreRaza = Enums.NombreRaza[selectedRaza];
    this.$spanRaza.text(nombreRaza);
  }

  _updateClase() {
    let selectedClase = this._getClase();
    let nombreClase = Enums.NombreClase[selectedClase];
    this.$spanClase.text(nombreClase);
  }

  getPrimerYUltimaCabezaNum() {
    let genero = this._getGenero();
    let raza = this._getRaza();

    let HUMANO_H_PRIMER_CABEZA = 1;
    let HUMANO_H_ULTIMA_CABEZA = 40;//TODO: deberia ser 51 pero el sv las toma como invalidas
    let ELFO_H_PRIMER_CABEZA = 101;
    let ELFO_H_ULTIMA_CABEZA = 122;
    let DROW_H_PRIMER_CABEZA = 201;
    let DROW_H_ULTIMA_CABEZA = 221;
    let ENANO_H_PRIMER_CABEZA = 301;
    let ENANO_H_ULTIMA_CABEZA = 319;
    let GNOMO_H_PRIMER_CABEZA = 401;
    let GNOMO_H_ULTIMA_CABEZA = 416;
    //**************************************************
    let HUMANO_M_PRIMER_CABEZA = 70;
    let HUMANO_M_ULTIMA_CABEZA = 89;
    let ELFO_M_PRIMER_CABEZA = 170;
    let ELFO_M_ULTIMA_CABEZA = 188;
    let DROW_M_PRIMER_CABEZA = 270;
    let DROW_M_ULTIMA_CABEZA = 288;
    let ENANO_M_PRIMER_CABEZA = 370;
    let ENANO_M_ULTIMA_CABEZA = 384;
    let GNOMO_M_PRIMER_CABEZA = 470;
    let GNOMO_M_ULTIMA_CABEZA = 484;

    if (genero === Enums.Genero.hombre) {
      switch (raza) {
      case Enums.Raza.humano:
        return {primera: HUMANO_H_PRIMER_CABEZA, ultima: HUMANO_H_ULTIMA_CABEZA};

      case Enums.Raza.elfo:
        return {primera: ELFO_H_PRIMER_CABEZA, ultima: ELFO_H_ULTIMA_CABEZA};

      case Enums.Raza.elfoOscuro:
        return {primera: DROW_H_PRIMER_CABEZA, ultima: DROW_H_ULTIMA_CABEZA};

      case Enums.Raza.enano:
        return {primera: ENANO_H_PRIMER_CABEZA, ultima: ENANO_H_ULTIMA_CABEZA};

      case Enums.Raza.gnomo:
        return {primera: GNOMO_H_PRIMER_CABEZA, ultima: GNOMO_H_ULTIMA_CABEZA};
      default:
        log.error('raza invalida');
      }
    }
    if (genero === Enums.Genero.mujer) {
      switch (raza) {
      case Enums.Raza.humano:
        return {primera: HUMANO_M_PRIMER_CABEZA, ultima: HUMANO_M_ULTIMA_CABEZA};
      case Enums.Raza.elfo:
        return {primera: ELFO_M_PRIMER_CABEZA, ultima: ELFO_M_ULTIMA_CABEZA};

      case Enums.Raza.elfoOscuro:
        return {primera: DROW_M_PRIMER_CABEZA, ultima: DROW_M_ULTIMA_CABEZA};

      case Enums.Raza.enano:
        return {primera: ENANO_M_PRIMER_CABEZA, ultima: ENANO_M_ULTIMA_CABEZA};

      case Enums.Raza.gnomo:
        return {primera: GNOMO_M_PRIMER_CABEZA, ultima: GNOMO_M_ULTIMA_CABEZA};

      default:
        log.error('raza invalida');
      }
    }
  }

  _getCuerpoNum() {
    let genero = this._getGenero();
    let raza = this._getRaza();

    let HUMANO_H_CUERPO_DESNUDO = 21;
    let ELFO_H_CUERPO_DESNUDO = 210;
    let DROW_H_CUERPO_DESNUDO = 32;
    let ENANO_H_CUERPO_DESNUDO = 53;
    let GNOMO_H_CUERPO_DESNUDO = 222;
    //**************************************************
    let HUMANO_M_CUERPO_DESNUDO = 39;
    let ELFO_M_CUERPO_DESNUDO = 259;
    let DROW_M_CUERPO_DESNUDO = 40;
    let ENANO_M_CUERPO_DESNUDO = 60;
    let GNOMO_M_CUERPO_DESNUDO = 260;
    if (genero === Enums.Genero.hombre) {
      switch (raza) {
      case Enums.Raza.humano:
        return HUMANO_H_CUERPO_DESNUDO;
      case Enums.Raza.elfo:
        return ELFO_H_CUERPO_DESNUDO;
      case Enums.Raza.elfoOscuro:
        return DROW_H_CUERPO_DESNUDO;
      case Enums.Raza.enano:
        return ENANO_H_CUERPO_DESNUDO;
      case Enums.Raza.gnomo:
        return GNOMO_H_CUERPO_DESNUDO;
      default:
        log.error('raza invalida');
      }
    }
    if (genero === Enums.Genero.mujer) {
      switch (raza) {
      case Enums.Raza.humano:
        return HUMANO_M_CUERPO_DESNUDO;

      case Enums.Raza.elfo:
        return ELFO_M_CUERPO_DESNUDO;

      case Enums.Raza.elfoOscuro:
        return DROW_M_CUERPO_DESNUDO;

      case Enums.Raza.enano:
        return ENANO_M_CUERPO_DESNUDO;

      case Enums.Raza.gnomo:
        return GNOMO_M_CUERPO_DESNUDO;

      default:
        log.error('raza invalida');
      }
    }

  }
}


