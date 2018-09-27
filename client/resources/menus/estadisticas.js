import React from 'react';
export default () => {
  return;
  <article id="estadisticas" title="ESTADISTICAS">
    <div className="dialogContent">
      <div className="panel-group scrollFlex">
        <div className="panel panel-default">
          <div className="panel-heading">Atributos</div>
          <div className="panel-body">
            Fuerza:<span id="estadisticas_fuerza"></span><br/>
            Agilidad:<span id="estadisticas_agilidad"></span><br/>
            Inteligencia:<span id="estadisticas_inteligencia"></span><br/>
            Carisma:<span id="estadisticas_carisma"></span><br/>
            Constitucion:<span id="estadisticas_constitucion"></span><br/>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Reputacion</div>
          <div className="panel-body">
            Asesino:<span id="estadisticas_asesino"></span><br/>
            Bandido:<span id="estadisticas_bandido"></span><br/>
            Ladron:<span id="estadisticas_ladron"></span><br/>
            Burgues:<span id="estadisticas_burgues"></span><br/>
            Noble:<span id="estadisticas_noble"></span><br/>
            Plebe:<span id="estadisticas_plebe"></span><br/>
            Status:<span id="estadisticas_status"></span><br/>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Estadisticas</div>
          <div className="panel-body">
            Criminales matados:<span id="estadisticas_criminalesMatados"></span><br/>
            Ciudadanos matados:<span id="estadisticas_ciudadanosMatados"></span><br/>
            Usuarios matados:<span id="estadisticas_usuariosMatados"></span><br/>
            Criaturas matadas:<span id="estadisticas_criaturasMatadas"></span><br/>
            Clase:<span id="estadisticas_clase"></span><br/>
            Tiempo restante en carcel:<span id="estadisticas_tiempoRestanteCarcel"></span><br/>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Skills</div>
          <div className="panel-body">
            <table id="estadisticasContenedorSkills">
            </table>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button id="estadisticas_botonCerrar" className="btn btn-default">Cerrar</button>
      </div>
    </div>
  </article>;
};