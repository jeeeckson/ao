import React from 'react';
export default () => {
  return (
    <article id="carpinteria" title="CARPINTERIA">
      <div className="dialogContent">
        <h4>Construccion</h4>
        <span id="carpinteriaTexto"></span>

        <div className="scrollFlex">
          <table id="carpinteriaContenedorItems" className="table table-striped">
            {/*<!-- Ejemplo de llenado
            <tr>
                <td>[imagen] objeto</td>
                <td>requerimientos</td>
                <td>botons construir</td>
            </tr>-->*/}
          </table>
        </div>
        <div className="form-inline modal-footer">
          <label for="carpinteriaCantidadAConstruir">Cantidad:</label>
          <div className="form-group">
            <input id="carpinteriaCantidadAConstruir" style="width:100px;" type="number" className="form-control"
              min="1"/>
          </div>
        </div>
      </div>
    </article>
  );
};