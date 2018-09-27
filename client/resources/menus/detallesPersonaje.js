import React from 'react';
export default () => {
  return;
  <article id="detallesPersonaje" title="DETALLES PERSONAJE">
    <div className="dialogContent">
      <div className="panel panel-default">
        <div className="panel-heading">Informacion</div>
        <div className="panel-body">
          Nombre:<span id="detallesPersonaje_nombre"></span><br/>
          Raza:<span id="detallesPersonaje_raza"></span><br/>
          Clase:<span id="detallesPersonaje_clase"></span><br/>
          Genero:<span id="detallesPersonaje_genero"></span><br/>
          Nivel:<span id="detallesPersonaje_nivel"></span><br/>
          Oro:<span id="detallesPersonaje_oro"></span><br/>
          Banco:<span id="detallesPersonaje_banco"></span><br/>
          Clan:<span id="detallesPersonaje_clan"></span><br/>
          Facción:<span id="detallesPersonaje_faccion"></span><br/>
          Ciudadanos asesinados:<span id="detallesPersonaje_ciudadanosAsesinados"></span><br/>
          Criminales asesinados:<span id="detallesPersonaje_criminalesAsesinados"></span><br/>
          Reputación:<span id="detallesPersonaje_reputacion"></span><br/>
          Alineación:<span id="detallesPersonaje_alineacion"></span><br/>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">Ultimas solicitudes de ingreso</div>
        <div id="detallesPersonaje_SolicitudesIngreso" className="panel-body"></div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">Ultimos clanes que integró</div>
        <div id="detallesPersonaje_clanesIntegrados" className="panel-body"></div>
      </div>
      <button id="detallesPersonaje_botonCerrar" className="btn btn-default">Cerrar</button>
    </div>
  </article>;
};