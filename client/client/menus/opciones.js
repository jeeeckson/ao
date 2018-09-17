import React from 'react';

export default () => {
  return <article id="popUpOpciones" title="SETTINGS">

    <div style="height:100%; display: flex;  flex-direction: row;">

      <div className="tabsContainer" style="display: flex; flex-direction: column;">
        <ul className="nav nav-pills nav-stacked">
          <li className="icon-menu active" id="opcionesIconoMenuWrench" href="#popUpOpcionesOpcionesGenerales"
            data-toggle="tab"></li>
          <li className="icon-menu" id="opcionesIconoMenuAudio" href="#popUpOpcionesTabsAudio" data-toggle="tab"></li>
          <li className="icon-menu" id="opcionesIconoMenuTeclado" href="#configurarTeclas" data-toggle="tab"></li>
        </ul>
        <div className="tabsFiller"></div>
      </div>


      <div className="tab-content dialogContent" style="flex: 1;">

        <div id="popUpOpcionesOpcionesGenerales" className="tab-pane active">
          <div className="form-horizontal">
            <div className="checkbox">
              <label><input id="opcionesCheckboxFullscreen" type="checkbox" value=""/>Fullscreen</label>
            </div>
            <div className="checkbox">
              <label><input type="checkbox" value=""/>Disable closing menus with ESC key</label>
            </div>
            <button className="btn btn-default">Restore defaults</button>
          </div>
        </div>

        <div id="popUpOpcionesTabsAudio" className="tab-pane">
          <div className="form-horizontal">
            <div className="checkbox">
              <label><input id="checkboxMusica" type="checkbox" value=""/>Music enabled</label>
            </div>
            <div className="checkbox">
              <label><input id="checkboxSonido" type="checkbox" value=""/>Sound enabled</label>
            </div>

            <div className="form-group">
              <p></p>
              <label for="sliderMusica" className="col-sm-6 control-label">Music volume:</label>
              <div className="col-sm-6">
                <div id="sliderMusica"></div>
              </div>
            </div>

            <div className="form-group">
              <label for="sliderSonido" className="col-sm-6 control-label">Sound volume:</label>
              <div className="col-sm-6">
                <div id="sliderSonido"></div>
              </div>
            </div>

            <button className="btn btn-default">Restore defaults</button>
          </div>
        </div>

        <div id="configurarTeclas" className="tab-pane" style="width:100%;height:100%;">
          <div style="width:100%;height:100%;display:flex; flex-direction: column;">
            <div className="scrollFlex">
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading-collapse" data-toggle="collapse"
                    href="#opcinesTeclasPanelMovimiento">
                    <h4 className="panel-title">
                      Movement
                    </h4>
                  </div>
                  <div id="opcinesTeclasPanelMovimiento" className="panel-collapse collapse">
                    <table className="table">
                      <tr>
                        <td>Walk north</td>
                        <td><input id="configurarTecla_caminarNorte" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Walk south</td>
                        <td><input id="configurarTecla_caminarSur" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Walk west</td>
                        <td><input id="configurarTecla_caminarOeste" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Walk east</td>
                        <td><input id="configurarTecla_caminarEste" className="form-control"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading-collapse" data-toggle="collapse"
                    href="#opcinesTeclasPanelAcciones">
                    <h4 className="panel-title">
                      Actions
                    </h4>
                  </div>
                  <div id="opcinesTeclasPanelAcciones" className="panel-collapse collapse">
                    <table className="table">
                      <tr>
                        <td>Attack</td>
                        <td><input id="configurarTecla_atacar" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Equip</td>
                        <td><input id="configurarTecla_equipar" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Use</td>
                        <td><input id="configurarTecla_usar" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Hide</td>
                        <td><input id="configurarTecla_ocultarse" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Correct position</td>
                        <td><input id="configurarTecla_deslagear" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Meditate</td>
                        <td><input id="configurarTecla_meditar" className="form-control"/></td>
                      </tr>
                      <tr>
                        <td>Steal</td>
                        <td><input id="configurarTecla_robar" className="form-control"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading-collapse" data-toggle="collapse"
                    href="#opcinesTeclasPanelChat">
                    <h4 className="panel-title">
                      Chat
                    </h4>
                  </div>
                  <div id="opcinesTeclasPanelChat" className="panel-collapse collapse">
                    <table className="table">
                      <tr>
                        <td>Chat</td>
                        <td><input id="configurarTecla_chat" className="form-control"/></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="btn-toolbar">
                <button id="configurarTeclasRestaurarDefault" className="btn btn-default pull-left">Restore Defaults
                </button>
                <button id="configurarTeclasGuardarYSalir" className="btn btn-primary pull-right">Save and exit
                </button>
                <button id="configurarTeclasCancelar" className="btn btn-default pull-right">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>;
};