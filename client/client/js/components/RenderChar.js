import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Sprite, Stage} from "react-pixi-fiber";
import * as PIXI from 'pixi.js';
import Enums from './../enums';
import style from 'styled-components';
import Utils from "../utils/util";

const Image = style.div`
  width: 40px;
  height: 40px;
  background: Transparent;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${props => props.url ? props.url : 'none' };
  border: none;
  outline: none;
`;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

function Head(props) {
  console.log(props.url)
  console.log(PIXI.loader.resources[props.url])
  return (
    <Sprite texture={PIXI.Sprite(PIXI.loader.resources[props.url].texture)} {...props} />
  );
}

function Body(props) {
  console.log(props.url)
  return (
    <Sprite texture={PIXI.Sprite(PIXI.loader.resources[props.url].texture)} {...props} />
  );
}

class RenderChar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      headOffset: this.props.headOffset
    };
  }

  getFirstAndLastHead() {
    const {gender, race} = this.props;

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
  }

  _getCuerpoNum() {
    const {gender, race} = this.props;

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

  _getCabezaNum = (offset) => {
    let cabezas = this.getFirstAndLastHead();
    let incremento = Utils.modulo(offset, (cabezas.ultima - cabezas.primera));

    return cabezas.primera + incremento;
  };

  _updateCabezas = () => {
    const {assetManager} = this.props;
    const {headOffset} = this.state;
    let cabezaIzq = this._getCabezaNum(headOffset - 1);
    let cabezaCentro = this._getCabezaNum(headOffset);
    let cabezaDer = this._getCabezaNum(headOffset + 1);
    let numGrafIzq = assetManager.getFaceGrafFromNum(cabezaIzq);
    let numGrafCentro = assetManager.getFaceGrafFromNum(cabezaCentro);
    let numGrafDer = assetManager.getFaceGrafFromNum(cabezaDer);

    let urlIzq = ''+ numGrafIzq;
    let urlDer = '' + numGrafDer;
    let urlCenter = '' + numGrafCentro ;
    console.log(urlIzq)
    this.setState({urlIzq, urlDer, urlCenter});
  }

  _updateCuerpo = () => {
    const {assetManager} = this.props;

    let numCuerpo = this._getCuerpoNum();
    let numGraf = assetManager.getBodyGrafFromNum(numCuerpo);
    let url = '' + numGraf;
    this.setState({imageBodyURL: url});
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    this.props.change(event.target.value);
  };

  update = (value) => {
    this._updateCabezas();
    this._updateCuerpo();
    this.setState({headOffset: value});
  };

  render() {
    const {classes, race, gender} = this.props;
    const {imageHeadURL, imageBodyURL, urlIzq, urlDer, urlCenter, headOffset} = this.state;

    return (
      <div className={classes.root}>
        <button id="crearPjSeleccionCabezaBotonIzq" className="botonFlechaIzq botonImagen"
                style={{marginTop: '5px'}} disabled={!race || !gender} onClick={() => this.update(headOffset - 1)}/>
        {urlIzq && urlCenter && urlDer && (
          <Stage>
            <Head url={urlIzq}/>
            <Head url={urlCenter}/>
            <Head url={urlDer}/>
          </Stage>
        )}

        <button id="crearPjSeleccionCabezaBotonDer" className="botonFlechaDer botonImagen"
                style={{marginTop: '5px'}} disabled={!race || !gender} onClick={() => this.update(headOffset + 1)}/>
        <br/>
        <div className="styledDiv"
             style={{display: 'inline-block', marginTop: '10px', padding: '5px 5px 0px 5px'}}>
          <div style={{position: 'relative'}}>
            {imageHeadURL && <Head url={imageHeadURL}/>}
            {imageBodyURL &&
            <Body url={imageBodyURL} shortBody={race === Enums.Raza.gnomo || race === Enums.Raza.enano}/>}
          </div>
        </div>
      </div>
    );
  }
}

RenderChar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderChar);