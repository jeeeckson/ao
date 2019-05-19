import React from 'react';

export default () => {
  return <article id="popUpMapa" title="MAPA">
    <div style="height:100%; display: flex;  flex-direction: row;">

      <div className="tabsContainer" style="display: flex; flex-direction: column;">
        <ul className="nav nav-pills nav-stacked">
          <li className="icon-menu active" id="mapaIconoMapaGlobal" href="#mapaTabMapaGlobal"
            data-toggle="tab"></li>
          <li className="icon-menu" id="mapaIconoDungeons" href="#mapaTabMapaDungeons" data-toggle="tab"></li>
        </ul>
        <div className="tabsFiller"></div>
      </div>

      <div className="tab-content dialogContent" style="flex: 1;">
        <div id="mapaTabMapaGlobal" className="tab-pane active" style="width:100%; height:100%;">
          <div id="imagenMapa" className="divImagen"></div>
        </div>
        <div id="mapaTabMapaDungeons" className="tab-pane" style="width:100%; height:100%;">
          <div id="imagenMapaDungeons" className="divImagen"></div>
        </div>
      </div>
    </div>

  </article>;
};