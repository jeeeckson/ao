import React from 'react';
import Enums from './../enums';
import SelectOption from './../components/SelectOption';
import GenderSelector from './../components/genderSelector';
import RenderChar from './../components/RenderChar';

export default class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'fromweb',
      username: '',
      mail: 'from@web.com',
      classP: '',
      race: '',
      head: '',
      body: '',
      gender: '',
      city: ''

    };
    this.offsetSelectedCabeza = Math.floor(Math.random() * 100);

    this.$imgCabezaIzq = $('#crearPjSeleccionCabezaImagenIzq');
    this.$imgCabezaCentro = $('#crearPjSeleccionCabezaImagenCenter');
    this.$imgCabezaDer = $('#crearPjSeleccionCabezaImagenDer');

    this.$imagenCuerpo = $('#crearPjImagenPersonaje');
    this.$imagenCabezaCuerpo = $('#crearPjImagenCabezaPersonaje');

  }

  setBotonTirarDadosCallback(cb) {

    $('#crearBotonTirarDados').click(() => {
      cb();
      this.assetManager.audio.playSound(Enums.SONIDOS.dados);
    });
  }

  setBotonVolverCallback() {
    this.props.cb();
  }

  submit = () => {
    let {password, username, race, gender, classP, head, mail, city} = this.state;
    let cabeza = this._getCabezaNum(this.offsetSelectedCabeza);
    // ASCO clase = clase === 11 ? 12 : clase; //swich trabajador - pirata

    this.props.cb(username, password, race, gender, classP, head, mail, city);
  };

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


  updateDados(strength, agility, inteligent, carism, physique) {
    this.setState({strength, agility, inteligent, carism, physique});
  }


  render() {
    return <div id="crearPJ" style={{width: '100%', height: '100%'}}>
      <div className="container">
        <div className="row" style={{display: 'flex', alignItems: 'center', marginTop: '10vh'}}>
          <div className="col-xs-4">
          </div>
          <div className="col-xs-4">
            <div className="exterior_border_default background_default">
              <div className="inner_border_default horizontal_center">
                <div style={{marginTop: '4px', marginBottom: '14px'}}>
                  <GenderSelector change={(value) => {
                    this.setState({geneder: value});
                    this._updatePJ();
                  }}/>
                </div>
                <div className="styledDiv horizontal_center"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2px 5px',
                    maxWidth: '80%'
                  }}>
                  <SelectOption
                    style={{
                      width: '50%',
                      lineHeight: '30px',
                      textAlign: 'center',
                      userSelect: 'none'
                    }}
                    onChange={(value) => {
                      this.setState({classP: value});
                      this._updatePJ();
                    }}
                    options={Enums.Clase}
                    title="Class"/>
                </div>
                <div className="styledDiv horizontal_center"
                  style={{
                    marginTop: '7px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2px 5px',
                    maxWidth: '80%'
                  }}>
                  <SelectOption
                    style={{
                      width: '50%',
                      lineHeight: '30px',
                      textAlign: 'center',
                      userSelect: 'none'
                    }}
                    onChange={(value) => {
                      this.setState({race: value});
                      this._updatePJ();
                    }}
                    options={Enums.Raza}
                    title="Race"/>
                </div>
                <div className="styledDiv horizontal_center"
                  style={{
                    marginTop: '7px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2px 5px',
                    maxWidth: '80%'
                  }}>
                  <SelectOption
                    style={{
                      width: '50%',
                      lineHeight: '30px',
                      textAlign: 'center',
                      userSelect: 'none'
                    }}
                    onChange={(value) => {
                      this.setState({city: value});
                      this._updatePJ();
                    }}
                    options={Enums.Ciudad}
                    title="City"/>
                </div>
                <RenderChar
                  onChange={this._updatePJ}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '10vh'}}>
          <div className="col-xs-4 col-xs-offset-4">
            <div className="exterior_border_default background_default horizontal_center"
              style={{display: 'flex', justifyContent: 'space-around'}}>
              <button id="crearBotonVolver" className="btn btn-default margenBoton" onClick={this.setBotonVolverCallback}>
                Back
              </button>
              <button id="crearBotonCrear" className="btn btn-primary margenBoton" onClick={this.submit}>
                Create character
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;

  }
}