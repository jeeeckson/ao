import React from 'react';
export default () => {
  return <article id="controls" title="CONTROLS">
    <div className="dialogContent">
      <h3>Controls:</h3>
      <p><b>Movement: </b>W, A, S, D</p>
      <p><b>Attack: </b>Spacebar</p>
      <p><b>Use item: </b>Q</p>
      <p><b>Equip item: </b>E</p>
      <p><b>Hide: </b>R</p>
      <p><b>Chat: </b>Enter</p>
      <p></p>
      <button id="controlsButtonOk" className="btn btn-default btn-block">OK</button>
    </div>
  </article>;
};