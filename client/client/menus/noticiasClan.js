import React from 'react';

export default () => {
  return <article id="noticiasClan" title="NOTICIAS CLAN">
    <div className="dialogContent">
      <div style="width:100%;height:100%;display:flex; flex-direction: column;">
        <h1>Noticias</h1>
        <div id="noticiasClanNoticias"></div>
        <h1>Clanes enemigos</h1>
        <div id="noticiasClanEnemigos"></div>
        <h1>Clanes aliados</h1>
        <div id="noticiasClanAliados"></div>
      </div>
      <div className="modal-footer">
        <button id="noticiasClanBotonAceptar" className="btn btn-default">Cerrar</button>
      </div>
    </div>
  </article>;
};