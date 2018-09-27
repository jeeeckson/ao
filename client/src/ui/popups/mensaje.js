/**
 * Created by horacio on 4/3/16.
 */

import PopUp from './popup';
import React from 'react';

export default class Mensaje extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        width: 300,
        height: 280,
        minWidth: 200,
        minHeight: 150
      }
    };
  }

  show(message) {
    this.setState({open: true, message: message});
  }

  render = () => {
    const {message, open, options} = this.state;
    let actions = [{
      color: 'primary', label: 'Ok', onClick: () => {
      }, close: true, className: "btn btn-default btn-block"
    }];
    return (<PopUp options={options} actions={actions} open={open}>
      <article id="mensajeGlobal" title="MESSAGE">
        <div className="dialogContent">
          <div id="mensajeContenido" className="activeColor everywhereFont">{message}</div>
        </div>
      </article>
    </PopUp>)
  };
}
