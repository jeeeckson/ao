import React from 'react';
export default () => {
  return;
  <article id="crearPersonaje" title="CREAR PERSONAJE">
    <div className="dialogContent">
      <div className="horizontal_center">
        <div className="form-group">
          <label for="crearNombreInput">Nombre</label>
          <input id="crearNombreInput" className="form-control" type="text" autocomplete="off" maxlength="15"/>
        </div>

        <div className="form-group">
          <label for="crearPasswordInput">Contraseña</label>
          <input id="crearPasswordInput" className="form-control" type="password" autocomplete="off" maxlength="15"/>
        </div>

        <div className="form-group">
          <label for="crearRepetirPasswordInput">Repetir Contraseña</label>
          <input id="crearRepetirPasswordInput" className="form-control" type="password" autocomplete="off"
            maxlength="15"/>
        </div>

        <div className="form-group">
          <label for="crearMailInput">E-Mail</label>
          <input id="crearMailInput" className="form-control" type="email"/>
        </div>

        <button id="botonCrearPersonajeCrear" className="btn btn-primary horizontal_center margenBoton"
          style="margin-top:25px;">Crear personaje
        </button>
      </div>
    </div>
  </article>;
};