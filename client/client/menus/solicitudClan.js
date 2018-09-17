import React from 'react';

export default () => {
  return <article id="solicitudClan" title="CLANES">
    <div className="dialogContent">
      <div className="form-group">
        <label for="comment">Comment:</label>
        <textarea className="form-control" rows="5" id="comment"></textarea>
      </div>
      <button id="solicitudClanBotonCancelar" className="btn btn-default">Cancelar</button>
      <button id="solicitudClanBotonEnviar" className="btn btn-primary">Enviar</button>
    </div>
  </article>;
};