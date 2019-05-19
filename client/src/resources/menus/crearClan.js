import React from 'react';
export default () => {
  return;
  <article id="crearClan" title="CLANES">
    <div className="dialogContent">
      <div className="scrollFlex">
        <label for="crearClanNombre">Nombre clan:</label><input id="crearClanNombre" className="form-control"/>
        <label for="crearClanWebsite">Website:</label><input id="crearClanWebsite" className="form-control"/>
        <label for="crearClanDescripcion">Descripcion:</label><input id="crearClanDescripcion"
          className="form-control"/>
        <h1>Codex</h1>
        El codex de un clan define el código de conducta al cual deben someterse sus integrantes.
        Todo miembro de un clan debe defender los principios del mismo, los cuales quedan establecidos en el codex del
        clan.
        Al definir el código de conducta del clan se deberá dar al menos 4 sentencias a modo de mandamientos
        <input id="crearClanCodex_0" className="form-control"/>
        <input id="crearClanCodex_1" className="form-control"/>
        <input id="crearClanCodex_2" className="form-control"/>
        <input id="crearClanCodex_3" className="form-control"/>
        <input id="crearClanCodex_4" className="form-control"/>
        <input id="crearClanCodex_5" className="form-control"/>
        <input id="crearClanCodex_6" className="form-control"/>
        <input id="crearClanCodex_7" className="form-control"/>
        <div className="button-toolbar margenBoton">
          <button id="crearClanBotonCancelar" className="btn btn-default pull-right">Cancelar</button>
          <button id="crearClanBotonCrear" className="btn btn-primary pull-right">Crear</button>
        </div>
      </div>
    </div>
  </article>;
};