import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Enums from './../enums';
import style from 'styled-components';
import {AssetManager} from './../assets/assetmanager';

const Image = style.div`
  width: auto;
  height: auto;
  background: Transparent;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${props => props.url ? url : 'none' };
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

class RenderChar extends React.Component {
  state = {
    value: 'female'
  };

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
        console.log('raza invalida');
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
        console.log('raza invalida');
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
        console.log('raza invalida');
      }
    } else {
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
        console.log('raza invalida');
      }
    }
  }

  _updateCabezas() {
    let cabezaIzq = this._getCabezaNum(this.offsetSelectedCabeza - 1);
    let cabezaCentro = this._getCabezaNum(this.offsetSelectedCabeza);
    let cabezaDer = this._getCabezaNum(this.offsetSelectedCabeza + 1);
    let numGrafIzq = AssetManager.getFaceGrafFromNum(cabezaIzq);
    let numGrafCentro = AssetManager.getFaceGrafFromNum(cabezaCentro);
    let numGrafDer = AssetManager.getFaceGrafFromNum(cabezaDer);

    let urlIzq = 'url(../../graficos/' + numGrafIzq + '.png)';
    let urlDer = 'url(../../graficos/' + numGrafDer + '.png)';
    let urlCenter = 'url(../../graficos/' + numGrafCentro + '.png)';
    this.setState({urlIzq, urlDer, urlCenter});
  }

  _updateCuerpo() {
    let raza = this._getRaza();
    let genero = this._getGenero();

    let numCuerpo = this._getCuerpoNum(genero, raza);
    let numGraf = this.assetManager.getBodyGrafFromNum(numCuerpo);
    let url = 'url(../../graficos/' + numGraf + '.png)';
    this.$imagenCuerpo.css('background-image', url);
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    this.props.change(event.target.value);
  };

  render() {
    const {classes, race} = this.props;
    const {imageHeadURL, imageBodyURL, urlIzq, urlDer, urlCenter} = this.state;

    return (
      <div className={classes.root}>
        <button id="crearPjSeleccionCabezaBotonIzq" className="botonFlechaIzq botonImagen"
          style={{marginTop: '5px'}}/>
        {urlIzq && <Image url={urlIzq}/>}
        {urlCenter && <Image url={urlCenter}/>}
        {urlDer && <Image url={urlDer}/>}
        <button id="crearPjSeleccionCabezaBotonDer" className="botonFlechaDer botonImagen"
          style={{marginTop: '5px'}}/>
        <br/>
        <div className="styledDiv"
          style={{display: 'inline-block', marginTop: '10px', padding: '5px 5px 0px 5px'}}>
          <div style={{position: 'relative'}}>
            {imageHeadURL && <Image url={imageHeadURL}/>}
            {imageBodyURL && <Image url={imageBodyURL} shortBody={race === Enums.Raza.gnomo || race === Enums.Raza.enano}/>}
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