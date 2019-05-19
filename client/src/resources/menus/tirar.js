import React from 'react';

export default () => {
  return <article id="tirar" title="TIRAR">
    <div className="dialogContent">
      <div style="text-align: center; margin:11px auto">
        <input id="tirarInputCantidad" className="form-control" type="number" max="10000"/>
      </div>
      <div>
        <button id="tirarBotonTirar" className="btn btn-default">Tirar</button>
        <button id="tirarBotonTirarTodo" className="btn btn-primary">Tirar todo</button>
      </div>
    </div>
  </article>;
};