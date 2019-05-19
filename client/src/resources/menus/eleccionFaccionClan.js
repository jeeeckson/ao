import React from 'react';
export default () => {
  return;
  <article id="eleccionFaccionClan" title="FACCIÓN CLAN">
    <div className="dialogContent">
      <div style="width:100%;height:100%;display:flex; flex-direction: column;">
        <div className="scrollFlex">
          <div className="styledDiv" style="padding:5px;margin-bottom:5px;">
            <button id="faccionClan_alineacionReal" className="btn btn-default margenBoton horizontal_center">Alineación
              real
            </button>
            <p>
              En los clanes de alineación real solo se admiten miembros del ejercito real de Banderbill.
              Lucharán contra todos los criminales de estas tierras siempre junto al rey y bajo las oredenes del consejo
              de Banderbill.
              Los personajes que no sean ejercito real no podrán pertenecer a un clan de esta alineación.
            </p>
          </div>

          <div className="styledDiv" style="padding:5px;margin-bottom:5px;">
            <button id="faccionClan_alineacionLegal"
              className="btn btn-default margenBoton horizontal_center">Alineación legal
            </button>
            <p>
              En los clanes con orientación legal podrán coexistir miembros de las fuerzas reales de Banderbill con
              ciudadanos.
              Cualquier personaje que se vuelva criminal será expulsado automaticamente del clan.
            </p>
          </div>

          <div className="styledDiv" style="padding:5px;margin-bottom:5px;">
            <button id="faccionClan_alineacionNeutral"
              className="btn btn-default margenBoton horizontal_center">Alineación neutral
            </button>
            <p>
              Los clanes neutrales son aquellos que no tienen ninguna alineación manifesta.
              Solo se aceptarán personajes criminales o ciudadanos que no pertenezcan a ninguna facción.
            </p>
          </div>

          <div className="styledDiv" style="padding:5px;margin-bottom:5px;">
            <button id="faccionClan_alineacionCriminal"
              className="btn btn-default margenBoton horizontal_center">Alineación criminal
            </button>
            <p>
              Los clanes criminales no se guian por las leyes, coexisten criminales junto con miembros de la Legión
              Oscura.
              Cualquier personaje que se convierta en ciudadano, será expulsado del clan inmediatamente.
            </p>
          </div>

          <div className="styledDiv" style="padding:5px;margin-bottom:5px;">
            <button id="faccionClan_alineacionCaos" className="btn btn-default margenBoton horizontal_center">Alineación
              del mal
            </button>
            <p>
              Estos clanes estan formados únicamente por miembros de la Legión Oscura y bajo las ordenes del demonio y
              sus
              subditos.
              Los clanes que le juren lealtad al demonio no podrán tener miembros que no pertenezcan a su ejército.
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="btn-toolbar">
          <button id="faccionClanBotonCancelar" className="btn btn-default pull-right">Cancelar</button>
        </div>
      </div>
    </div>
  </article>;
};