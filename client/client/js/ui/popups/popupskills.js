/**
 * Created by horacio on 4/20/16.
 */

import DOMdata from '../../../menus/skills';
import PopUp from './popup'; import React from 'react';

export default class popUpSkills extends PopUp {
  constructor(game) {
    let options = {
      width: 300,
      height: 600,
      minWidth: 150,
      minHeight: 250
    };
    super(DOMdata, options);
    this.game = game;
    this.initCallbacks();
    this.skills = null;
    this.skillsInicializados = false;
  }

  show() {
    super.show();
    this.game.client.sendRequestSkills(); // todo: << sacaR?
  }

  initCallbacks() {
    let self = this;
    $('#skillsBotonCerrar').click(() => {
      self.hide();
    });

    $('#skillsBotonCancelar').click(() => {
      self.hide();
    });

    $('#skillsBotonAceptar').click(() => {
      let puntos = self._getPuntosAdicionalesSerialized();
      if (puntos) {
        self.game.client.sendModifySkills(puntos);
        self.game.skills = self.skills;
      }
      self.hide();
    });
  }

  _getSkillDOMid(numSkill) {
    return 'popUpSkills_skill_' + numSkill;
  }

  _getSkillTextDOMid(numSkill) {
    return 'popUpSkills_textoSkill_' + numSkill;
  }

  _getSkillPointsDOMid(numSkill) {
    return 'popUpSkills_puntosSkill_' + numSkill;
  }

  _createSkill(numSkill, nombre, puntos, porcentaje) {
    let self = this;
    //var id = this._getSkillDOMid(numSkill);
    let textoId = this._getSkillTextDOMid(numSkill);
    let puntosId = this._getSkillPointsDOMid(numSkill);
    let botonMasId = 'popUpSkills_botonMasSkill_' + numSkill;
    let botonMenosId = 'popUpSkills_botonMenosSkill_' + numSkill;

    $('#popUpSkillsContenedorSkills').append('<tr>'
      + '<td class="secondaryColor" id=' + textoId + '></td>'
      + '<td class="everywhereBoldFont activeColor" id=' + puntosId + '></td>'
      + '<td><button id=' + botonMenosId + ' class="botonMenosSkill"></button></td>'
      + '<td><button id=' + botonMasId + ' class="botonMasSkill"></button></td>'
      + '</tr>');

    let $botonMas = $('#' + botonMasId);
    $botonMas.data('numSkill', numSkill);
    $botonMas.on('click', function () {
      let numSkill = $(this).data('numSkill');
      if (self.skills.asignarSkill(numSkill)) {
        self._updateSkill(numSkill);
        self._updatePuntosLibres();
      }
    });

    let $botonMenos = $('#' + botonMenosId);
    $botonMenos.data('numSkill', numSkill);
    $botonMenos.on('click', function () {
      let numSkill = $(this).data('numSkill');
      if (self.skills.getPuntosSkill(numSkill) <= self.game.skills.getPuntosSkill(numSkill)) {
        return;
      }
      self.skills.desAsignarSkill(numSkill);
      self._updateSkill(numSkill);
      self._updatePuntosLibres();
    });
  }

  _updatePuntosLibres() {
    $('#popUpSkillsContenedorPuntosLibres').text('Puntos libres: ' + this.skills.puntosLibres);
  }

  _updateSkill(numSkill, nombre, puntos) {
    nombre = nombre || this.skills.getNombreSkill(numSkill);
    puntos = puntos || this.skills.getPuntosSkill(numSkill);
    let id = this._getSkillTextDOMid(numSkill);
    let puntosid = this._getSkillPointsDOMid(numSkill);
    $('#' + id).text(nombre.toUpperCase());
    $('#' + puntosid).text(puntos);
  }

  _updateSkillsPoints() {
    let self = this;
    this.skills.forEachSkill((numSkill, puntos, porcentaje, nombre) => {
      self._updateSkill(numSkill, nombre.puntos);
    });
  }

  updateSkillsData() {
    let self = this;
    //this.skills = $.extend(true, {}, this.game.skills);
    this.skills = $.extend(true, Object.create(Object.getPrototypeOf(this.game.skills)), this.game.skills); // clonar
    if (!this.skillsInicializados) {
      this.skills.forEachSkill((numSkill, puntos, porcentaje, nombre) => {
        self._createSkill(numSkill, nombre, puntos, porcentaje);
      });
      this.skillsInicializados = true;
    }
    this._updateSkillsPoints();
    this._updatePuntosLibres();
  }

  _getPuntosAdicionalesSerialized() {
    let modificados = false;
    let res = [];
    let self = this;
    this.skills.forEachSkill((numSkill, puntos, porcentaje, nombre) => {
      let puntosAdicionales = puntos - self.game.skills.getPuntosSkill(numSkill);
      res.push(puntosAdicionales);
      if (puntosAdicionales) {
        modificados = true;
      }
    });
    if (!modificados) {
      return null;
    }
    return res;
  }
}