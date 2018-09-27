import React from 'react';

export default () => {
  return <article id="partyMiembro" title="PARTY">
    <div className="dialogContent">
      <label for="partyMiembroMensaje">Mensaje</label><input id="partyMiembroMensaje"/>
      <label for="partyMiembroMembersList">Miembros</label><select id="partyMiembroMembersList" className="form-control"
        size="4"></select>
      Experiencia Total:<span id="partyMiembroExperienciaTotal"></span>
      <button id="partyMiembroBotonCerrar" className="btn btn-default">Cerrar</button>
      <button id="partyMiembroBotonAbandonar" className="btn btn-primary">Abandonar party</button>
    </div>
  </article>;
};