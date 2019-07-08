import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      textBox: '',
      show: props.show,
      game: props.game,
      talkingToClan: false,
      commandChat: props.commandChat
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  submit = () => {
    const {textBox, game, talkingToClan, commandChat} = this.state;
    if (game.player) {
      if (talkingToClan) {
        game.client.sendGuildMessage(textBox);
        this.setState({talkingToClan: false});
      } else {
        let res = commandChat.parsearChat(textBox);
        if (res) {
          game.client.sendTalk(res);
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
    const {textBox, game} = this.state;
    return (
      <div id="chatinputContainer" className="inner_border_default" onKeyPress={(ev) => {
        if (game.isPaused || (game.gameUI && game.gameUI.hayPopUpActivo())) {
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