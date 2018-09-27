import React from 'react';
export default () => {
  return;
  <article id="detallesClan" title="CLANES">
    <div className="dialogContent">
      <div className="panel-group scrollFlex">
        <div className="panel panel-default">
          <div className="panel-heading">Informacion</div>
          <div className="panel-body">
            Nombre:<span id="detallesClan_nombre"></span><br/>
            Miembros:<span id="detallesClan_miembros"></span><br/>
            Lider:<span id="detallesClan_lider"></span><br/>
            Fundador:<span id="detallesClan_fundador"></span><br/>
            Web site:<span id="detallesClan_web"></span><br/>
            Clanes enemigos:<span id="detallesClan_enemigos"></span><br/>
            Clanes aliados:<span id="detallesClan_aliados"></span><br/>
            Puntos de antifaccion:<span id="detallesClan_puntosAntifaccion"></span><br/>
            Fecha de creación:<span id="detallesClan_fechaCreacion"></span><br/>
            Elecciones:<span id="detallesClan_elecciones"></span><br/>
            Alineacion:<span id="detallesClan_alineacion"></span><br/>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Codex</div>
          <div id="detallesClan_codex" className="panel-body"></div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Descripcion</div>
          <div id="detallesClan_descripcion" className="panel-body"></div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="btn-toolbar">
          <button id="detallesClan_botonAplicarse" className="btn btn-primary pull-right">Aplicarse</button>
          <button id="detallesClan_botonCerrar" className="btn btn-default pull-right">Cerrar</button>
        </div>
      </div>
    </div>
  </article>;
};