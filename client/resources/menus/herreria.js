import React from 'react';

export default () => {
  return;
  <article id="herreria" title="HERRERIA">
    <div className="dialogContent">
      <h4>Construccion</h4>
      <p>Items disponibles para construir:</p>

      <div className="scrollFlex">
        <table id="herreriaContenedorItems" className="table table-striped table-hover">
          {/*<!-- Ejemplo de llenado
          <tr>
              <td>[imagen] objeto</td>
              <td>requerimientos</td>
              <td>botons construir</td>
          </tr>
-->*/}
        </table>
      </div>

      <div className="form-inline modal-footer">
        <label for="herreriaCantidadAConstruir">Cantidad:</label>
        <div className="form-group">
          <input id="herreriaCantidadAConstruir" type="number" className="form-control" min="1"/>
        </div>
      </div>
    </div>
  </article>;
};