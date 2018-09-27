import React from 'react';
import './../../resources/css/main.css';
import TextField from '@material-ui/core/TextField';

export default class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      userName: '',
      password: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {onClick, disabledButton, userName, password} = this.state;
    return (<div id="conectar" className="vertical_center_container">
      <div id="logo" className="horizontal_center noselect"/>
      <div id="loginBox" className="exterior_border_default background_default horizontal_center">
        <div className="inner_border_default">
          <div className="form-group">
            <TextField
              required
              id="loginUsername"
              label="Username"
              value={userName}
              maxLength="15"
              margin="normal"
              onChange={this.handleChange('userName')}
            />
            <TextField
              required
              id="loginPassword"
              label="Password"
              value={password}
              maxLength="15"
              margin="normal"
              onChange={this.handleChange('password')}
            />
            <button disabled={disabledButton} id="botonJugar"
                    className="btn btn-primary horizontal_center margenBoton"
                    onClick={() => onClick(userName, password)}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>);
  }
}
