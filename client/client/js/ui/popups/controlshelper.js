/**
 * Created by horacio on 4/18/17.
 */
import DOMdata from '../../../menus/controlsHelper';
import PopUp from './popup';
import React from 'react';

export default class ControlsHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        width: 270,
        height: 380,
        minWidth: 150,
        minHeight: 200
      }
    };
    this.initCallbacks();
  }

  show(playCb) {
    this.playCb = playCb;
    super.show();
  }

  initCallbacks() {
    this.$ok.click(() => {
      this.playCb();
      this.hide();
    });
  }

  render = () => {
    let actions = {color:'primary', label: 'Got it, lets play!', onClick: this.playCb, close: true};
    return (<PopUp options={this.state.options} actions={actions}>
      <article id="controlsHelper" title="BEFORE WE START...">
        <div className="dialogContent">
          <h3>Controls:</h3>
          <p><b>Movement: </b>W, A, S, D</p>
          <p><b>Attack: </b>Spacebar</p>
          <p><b>Use item: </b>Q</p>
          <p><b>Equip item: </b>E</p>
          <p><b>Hide: </b>R</p>
          <p><b>Chat: </b>Enter</p>
          <p/>
        </div>
      </article>
    </PopUp>);
  };
}
