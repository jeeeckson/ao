import React from 'react';

export default () => {
  return <article id="partyLider" title="PARTY">
    <div className="dialogContent">
      <label for="partyLiderMensaje">Mensaje</label><input id="partyLiderMensaje"/>
      <label for="partyLiderMembersList">Miembros</label>
      <select id="partyLiderMembersList" className="form-control"
        size="4"></select>
      Experiencia Total:<span id="partyLiderExperienciaTotal"></span>
      <button id="partyLiderBotonExpulsar" className="btn btn-primary">Expulsar</button>
      <button id="partyLiderBotonHacerLider" className="btn btn-primary">Transferir liderazgo</button>
      <label for="partyLiderAgregarInput">Agregar personaje</label><input id="partyLiderAgregarInput"/>
      <button id="partyLiderBotonAgregar" className="btn btn-primary">Agregar</button>
      <button id="partyLiderBotonCerrar" className="btn btn-default">Cerrar</button>
      <button id="partyLiderBotonDisolver" className="btn btn-primary">Disolver</button>
    </div>
  </article>;
};