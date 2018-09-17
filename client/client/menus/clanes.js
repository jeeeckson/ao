import React from 'react';
export default () => {
  return <article id="clanes" title="CLANES">
    <div style="height:100%; display: flex;  flex-direction: row;">

      <div className="tabsContainer" style="display: flex; flex-direction: column;">
        <ul className="nav nav-pills nav-stacked">
          <li id="clanesMainTabButton" className="icon-menu active" href="#clanesSearchTab" data-toggle="tab"></li>
          <li id="clanesMiembrosTabButton" className="icon-menu disabled" href="#clanesMiembrosTab"
            data-toggle="tab"></li>
          <li id="clanesSolicitudesTabButton" className="icon-menu disabled" href="#clanesSolicitudesTab"
            data-toggle="tab"></li>
          <li id="clanesSettingsTabButton" className="icon-menu disabled" href="#clanesSettingsTab"
            data-toggle="tab"></li>
        </ul>
        <div className="tabsFiller"></div>
      </div>


      <div className="tab-content dialogContent" style="flex: 1;">
        <div id="clanesSearchTab" className="tab-pane active">
          <h4>Clanes</h4>
          <div className="form-group">
            <div className="input-group">
              <input type="Search" placeholder="Nombre" className="form-control" id="clanesSearchTabInputNombre"
                aria-describedby="clanesSearchTabClanSearchIcon"/>
              <span className="input-group-addon glyphicon glyphicon-search"
                id="clanesSearchTabClanSearchIcon"></span>
            </div>
          </div>
          <select multiple id="clanesSearchListaClanes" className="form-control">
            {/**<!-- <option>CLAN UNO</option> -->*/}
          </select>
          <div className="btn-toolbar margenBoton">
            <button id="clanesSearchBotonCrear" className="btn btn-primary">Crear</button>
            <button id="clanesSearchBotonDetalles" className="btn btn-default">Detalles</button>
            <button id="clanesSearchBotonIngresar" className="btn btn-primary">Aplicarse</button>
          </div>

        </div>

        <div id="clanesMiembrosTab" className="tab-pane">
          <h4>Noticias</h4>
          <button id="clanesMiembrosBotonNoticias" className="btn btn-default">Ver noticias</button>
          <h4>Miembros</h4>
          <div className="form-group">
            <div className="input-group">
              <input type="Search" placeholder="Nombre" className="form-control" id="clanesMiembrosTabInputNombre"/>
              <span className="input-group-addon glyphicon glyphicon-search"></span>
            </div>
          </div>

          <select multiple id="clanesMembersList" className="form-control">
          </select>

          <div className="btn-toolbar margenBoton">
            <button id="clanesMiembrosBotonDetalles" className="btn btn-default">Detalles</button>
            <button id="clanesMiembrosBotonHechar" className="btn btn-primary">Hechar</button>
          </div>
        </div>

        <div id="clanesSolicitudesTab" className="tab-pane">
          <h4>Solicitudes de ingreso</h4>
          <select id="clanesMembershipRequestList" className="form-control" size="4"></select>

          <div className="btn-toolbar margenBoton">
            <button id="clanesLiderBotonVerPeticion" className="btn btn-default pull-left">Ver mensaje</button>
            <button id="clanesLiderBotonDetalles" className="btn btn-default pull-left">Mas detalles</button>
            <button id="clanesLiderBotonAceptar" className="btn btn-primary pull-right">Aceptar</button>
            <button id="clanesLiderBotonRechazar" className="btn btn-primary pull-right">Rechazar</button>
          </div>
        </div>

        <div id="clanesSettingsTab" className="tab-pane">
          <p>NO IMPLEMENTADO!</p>
          TODO: hacerlo igual al menu que se muestra al crear y que lo edites directamente de ahi, no con botones
          <button id="TBD_1" className="btn btn-default">Editar codex</button>
          <button id="TBD_2" className="btn btn-default">Editar noticias</button>
          <button id="TBD_3" className="btn btn-default">Editar descripcion</button>
          <button id="TBD_4" className="btn btn-default">Editar website</button>
          <button id="TBD_5" className="btn btn-default">Propuestas de paz</button>
        </div>
      </div>

    </div>
  </article>;
};