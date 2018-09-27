import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      textBox: '',
      show: props.show
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  submit = () => {
    const {textBox} = this.state;
    if (this.game.player) {
      if (this.talkingToClan) {
        this.game.client.sendGuildMessage(textBox);
        this.talkingToClan = false;
      } else {
        let res = this.comandosChat.parsearChat(textBox);
        if (res) {
          this.game.client.sendTalk(res);
        }
      }
    }
  };
  show = () => {
    this.setState({show: true})
  };
  hide = () => {
    this.setState({show: false})
  };
  render = () => {
    const {textBox} = this.state;
    return (
      <div id="chatinputContainer" className="inner_border_default" onKeyPress={(ev) => {
        if (this.game.isPaused || (this.game.gameUI.hayPopUpActivo())) {
          return;
        }
        if (ev.key === 'Enter') {
          // Do code here
          ev.preventDefault();
          this.show();
        } else if (ev.key === 'Escape'){
          ev.preventDefault();
          this.hide();
        }
      }}>
        <div style={{width: '100%', display: 'flex'}}>
          <TextField
            id="chatinput"
            className="form-control"
            onChange={this.handleChange('textBox')}
            maxLength="160" autoComplete="off"
            value={textBox}
            margin="normal"
            variant="outlined"
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                // Do code here
                ev.preventDefault();
                this.submit();
              } else if (ev.key === 'Escape'){
                ev.preventDefault();
                this.hide();
              }
            }}
          />
          <Button id="botonChatInput" className="botonImagen noClickSound" onClick={this.submit}>
            Send
          </Button>
        </div>
      </div>)
  }
}