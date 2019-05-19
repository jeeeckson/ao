import React from 'react';
export default () => {
  return <article id="comerciar" title="COMERCIAR">
    <div className="dialogContent">
      <div className="styledDiv">
        <div style="margin: 5px 25px;">
          <span id="comerciarNombre" className="secondaryColor">NOMBRE</span>
          <span id="comerciarNombreValor" className="activeColor">Pollo</span>
          <span id="comerciarPrecioValor" className="everywhereBoldFont activeColor">343</span>
          <span id="comerciarPrecio" className="secondaryColor">PRECIO</span>
        </div>
        <div style="margin: 5px 25px;">
          <span id="comerciarMin" className="secondaryColor">MIN</span>
          <span id="comerciarMinValor" className="everywhereBoldFont activeColor">1</span>
          <span id="comerciarMaxValor" className="everywhereBoldFont activeColor">3</span>
          <span id="comerciarMax" className="secondaryColor">MAX</span>
        </div>
      </div>
      <div style="margin:10px auto; width:100%; display:flex; flex:1; overflow-y:auto;">
        <ul id="comerciarGridComprar" className="itemgrid"></ul>
        <ul id="comerciarGridVender" className="itemgrid"></ul>
      </div>

      <div className="modal-footer justifiedContainer">
        <button id="comerciarBotonComprar" className="btn btn-default">Comprar</button>
        <input id="comerciarInputCantidad" className="form-control" type="number" value="1"/>
        <button id="comerciarBotonVender" className="btn btn-default">Vender</button>
      </div>

    </div>
  </article>;
};