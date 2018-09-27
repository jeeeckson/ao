import React from 'react';

export default () => {
  return <article id="popUpSkills" title="SKILLS">
    <div className="dialogContent">
      <div id="popUpSkillsContenedorPuntosLibres" className="activeColor h4"></div>
      <div className="scrollFlex">
        <table id="popUpSkillsContenedorSkills">
          {/*<!-- Ejemplo de llenado
          <tr>
              <td className="secondaryColor">LANZAR SUPER HECHIZOS</td>
              <td className="everywhereBoldFont activeColor">28</td>
              <td><button className="botonMenosSkill"></button></td>
              <td><button className="botonMasSkill"></button></td>
          </tr>
          -->*/}
        </table>
      </div>
      <div className="modal-footer">
        <button id="skillsBotonCancelar" className="btn btn-default">Cancelar</button>
        <button id="skillsBotonAceptar" className="btn btn-primary">Aceptar</button>
      </div>
    </div>
  </article>;
};