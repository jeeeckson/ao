import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Sprite, Stage} from "react-pixi-fiber";
import * as PIXI from 'pixi.js';
import Enums from './../enums';
import Utils from "../utils/util";
import creation from "../utils/creation";

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
  return (
    <Sprite texture={PIXI.Texture.fromImage(props.url)} {...props} />
  );
}

function Body(props) {
  return (
    <Sprite texture={PIXI.Texture.fromImage(props.url)} {...props} />
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

  _getCabezaNum = (offset) => {
    const { race, gender} = this.props;
    let cabezas = creation.getFirstAndLastHead({race, gender});
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

    let urlIzq = 'graficos/' + numGrafIzq + '.png';
    let urlDer = 'graficos/' + numGrafDer + '.png';
    let urlCenter = 'graficos/' + numGrafCentro + '.png';
    this.setState({urlIzq, urlDer, urlCenter});
  }

  _updateCuerpo = () => {
    const {assetManager, race, gender} = this.props;

    let numCuerpo = creation._getCuerpoNum({race, gender});
    let numGraf = assetManager.getBodyGrafFromNum(numCuerpo);
    let url = 'graficos/' + numGraf + '.png';
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