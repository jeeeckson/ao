import React from 'react';

export default () => {
  return <article id="popUpPlayAgain" title="YOU HAVE DIED">
    <div className="dialogContent">
      <button id="playAgain" style="margin: 15px 0;" className="btn btn-primary btn-block">Play again</button>
      <button id="changeCharacter" style="margin-bottom: 15px;" className="btn btn-default btn-block">Change character
      </button>
      <button id="playAgainBack" className="btn btn-default btn-block">Quit</button>
    </div>
  </article>;
};