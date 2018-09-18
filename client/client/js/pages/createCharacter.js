import React from 'react';
import Enums from './../enums';
import Utils from '../utils/util';
import SelectOption from './../components/SelectOption';
import GenderSelector from './../components/genderSelector';
import RenderChar from './../components/RenderChar';
import TextField from '@material-ui/core/TextField';

export default class CreateCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'fromweb',
      username: '',
      email: 'from@web.com',
      classP: '',
      race: '',
      head: '',
      body: '',
      gender: '',
      city: '',
      headOffset: Math.floor(Math.random() * 100)
    };
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
    let {password, username, race, gender, classP, email, city, headOffset} = this.state;
    let head = this._getCabezaNum(headOffset);
    // ASCO clase = clase === 11 ? 12 : clase; //swich trabajador - pirata

    this.props.cb(username, password, race, gender, classP, head, email, city);
  };

  _getCabezaNum(offset) {
    let cabezas = this.getPrimerYUltimaCabezaNum();
    let incremento = Utils.modulo(offset, (cabezas.ultima - cabezas.primera));

    return cabezas.primera + incremento;
  }

  updateDados(strength, agility, inteligent, carism, physique) {
    this.setState({strength, agility, inteligent, carism, physique});
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    let {password, email, headOffset, gender, race} = this.state;
    let {assetManager} = this.props;
    return <div id="crearPJ" style={{width: '100%', height: '100%'}}>
      <div className="container">
        <div className="row" style={{display: 'flex', alignItems: 'center', marginTop: '10vh'}}>
          <div>
            <div className="exterior_border_default background_default">
              <div className="inner_border_default horizontal_center">
                <TextField
                  required
                  id="createPJEmail"
                  label="Email"
                  type="email"
                  value={email}
                  maxLength="15"
                  margin="normal"
                  onChange={this.handleChange('email')}
                />
                <TextField
                  required
                  id="createPJPassword"
                  label="Password"
                  value={password}
                  maxLength="15"
                  margin="normal"
                  onChange={this.handleChange('password')}
                />
                <div style={{marginTop: '4px', marginBottom: '14px'}}>
                  <GenderSelector change={(value) => {
                    this.setState({gender: value});
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
                    onChange={(value) => {
                      this.setState({classP: value});
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
                    }}
                    options={Enums.Ciudad}
                    title="City"/>
                </div>
                <RenderChar
                  gender={gender}
                  race={race}
                  headOffset={headOffset}
                  onChange={() => {
                  }}
                  assetManager={assetManager}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '10vh'}}>
          <div >
            <div className="exterior_border_default background_default horizontal_center"
                 style={{display: 'flex', justifyContent: 'space-around'}}>
              <button id="crearBotonVolver" className="btn btn-default margenBoton"
                      onClick={this.setBotonVolverCallback}>
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