/**
 * Created by horacio on 4/19/16.
 */

import PopUp from './popup';
import React from 'react';

export default class InGameMensaje extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  show(message) {
    this.setState(message)
  }


  render() {
    return <PopUp
      size={{
        width: 300,
        height: 280,
        minWidth: 200,
        minHeight: 150
      }}
      title={this.state.message}/>
  }
}
