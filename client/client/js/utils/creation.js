import Enums from "../enums";

let creation = {

  getFirstAndLastHead: ({gender, race}) => {

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

    if (Number(gender) === Enums.Genero.hombre) {
      switch (Number(race)) {
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
          console.log('raza invalida');
      }
    } else if (Number(gender) === Enums.Genero.mujer) {
      switch (Number(race)) {
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
          console.log('raza invalida');
      }
    }
  },

  _getCuerpoNum: ({gender, race}) => {

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

    let male = Number(gender) === Enums.Genero.hombre;
    let raceN = Number(race);
    if (raceN === Enums.Raza.humano) {
      return male ? HUMANO_H_CUERPO_DESNUDO : HUMANO_M_CUERPO_DESNUDO;
    } else if (raceN === Enums.Raza.elfo) {
      return male ? ELFO_H_CUERPO_DESNUDO : ELFO_M_CUERPO_DESNUDO;
    } else if (raceN === Enums.Raza.elfoOscuro) {
      return male ? DROW_H_CUERPO_DESNUDO : DROW_M_CUERPO_DESNUDO;
    } else if (raceN === Enums.Raza.enano) {
      return male ? ENANO_H_CUERPO_DESNUDO : ENANO_M_CUERPO_DESNUDO;
    } else if (raceN === Enums.Raza.gnomo) {
      return male ? GNOMO_H_CUERPO_DESNUDO : GNOMO_M_CUERPO_DESNUDO;
    } else {
      console.log('Raza invalida!');
    }
  }
};

export default creation;