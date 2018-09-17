import React from 'react';

export default () => {
  return (<article id="boveda" title="BOVEDA">
    <div className="dialogContent">
      <div className="styledDiv">
        <div className="horizontal_center" style="margin:8px 0;">
          <div>
            <span id="bovedaOroDisponibleLabel" className="secondaryColor">ORO DISPONIBLE</span>
            <span id="bovedaOroDisponibleVal" className="everywhereBoldFont activeColor">834</span>
          </div>
        </div>

        <div className="justifiedContainer" style="margin-bottom: 15px;">
          <button id="bovedaBotonRetirarOro" className="btn btn-default">Retirar oro</button>
          <input id="bovedaInputCantidadOro" className="form-control" type="number" value="1"/>
          <button id="bovedaBotonDepositarOro" className="btn btn-default">Depositar oro</button>
        </div>
      </div>


      <div style="text-align:center; margin: 5px 0;">
        <span id="bovedaNombreLabel" className="secondaryColor">NOMBRE: </span>
        <span id="bovedaNombreVal" className="activeColor">Pollo</span>
      </div>
      <div className="justifiedContainer">
        <div>
          <span id="bovedaMinLabel" className="secondaryColor">MIN</span>
          <span id="bovedaMinVal" className="everywhereBoldFont activeColor">1</span>
        </div>
        <div>
          <span id="bovedaMaxVal" className="everywhereBoldFont activeColor">3</span>
          <span id="bovedaMaxLabel" className="secondaryColor">MAX</span>
        </div>
      </div>

      <div style="margin:10px auto; width:100%; display:flex; flex:1; overflow-y:auto;">
        <ul id="bovedaGridComprar" className="itemgrid"></ul>
        <ul id="bovedaGridVender" className="itemgrid"></ul>
      </div>

      <div className="modal-footer justifiedContainer">
        <button id="bovedaBotonRetirarItem" className="btn btn-default noClickSound">Retirar</button>
        <input id="bovedaInputCantidadItem" className="form-control" type="number" value="1"/>
        <button id="bovedaBotonDepositarItem" className="btn btn-default noClickSound">Depositar</button>
      </div>
    </div>
  </article>
  );
};
