/**
 * Created by horacio on 3/24/16.
 */

import PopUp from './popup';
import React from 'react';
import ItemGrid from '../game/itemgrid';
import TextField from '@material-ui/core/TextField';

export default class Boveda extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    let options = {
      width: 630,
      height: 510,
      minWidth: 250,
      minHeight: 200
    };

    this.shopGrid = new ItemGrid('bovedaGridComprar', 40);
    this.userGrid = new ItemGrid('bovedaGridVender', 40);
    this.initCallbacks();
    this.completarLabels('', '', '', '', '', '');
  }

  show() {
    super.show();
    let self = this;
    this.userGrid.clear();

    this.game.inventario.forEachSlot(
      (slot) => {
        let numGraf = self.game.assetManager.getNumGraficoFromGrh(slot.grh);
        self.userGrid.modificarSlot(slot.numero, slot.cantidad, numGraf);
      });

    this.shopGrid.deselect();
    this.userGrid.deselect();
  }

  hide(incomingFromServer) {
    if (this.visible && !incomingFromServer) {
      this.acciones.cerrarBoveda();
    }
    super.hide();
  }

  cambiarSlotRetirar(Slot, Amount, numGrafico) {
    this.shopGrid.modificarSlot(Slot, Amount, numGrafico);
  }

  cambiarSlotDepositar(Slot, Amount, numGrafico) {
    this.userGrid.modificarSlot(Slot, Amount, numGrafico);
  }

  borrarSlotRetirar(slot) {
    this.shopGrid.borrarItem(slot);
  }

  borrarSlotDepositar(slot) {
    this.userGrid.borrarItem(slot);
  }

  setOroDisponible(oro) {
    $('#bovedaOroDisponibleLabel').text('ORO DISPONIBLE');
    $('#bovedaOroDisponibleVal').text(oro);
  }

  initCallbacks() {

    this.shopGrid.setSelectionCallback(
      (slot) => {
        let item = game.inventarioShop.getSlot(slot);
        this.displayItemData(item);
      });

    this.userGrid.setSelectionCallback(
      (slot) => {
        let item = game.inventario.getSlot(slot);
        this.displayItemData(item);
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  displayItemData(item) {
    let minLabel = '';
    let maxLabel = '';

    if (item.minDef) {
      minLabel = 'MIN DEFENSA';
    }
    if (item.minHit) {
      minLabel = 'MIN GOLPE';
    }

    if (item.maxDef) {
      maxLabel = 'MAX DEFENSA';
    }
    if (item.maxHit) {
      maxLabel = 'MAX GOLPE';
    }

    let minVal = item.minDef || item.minHit;
    let maxVal = item.maxDef || item.maxHit;

    this.completarLabels(item.objName.toUpperCase(), minLabel, minVal, maxLabel, maxVal);
  }

  completarLabels(nombreVal, minLabel, minVal, maxLabel, maxVal) {
    if (!minLabel) {
      minVal = '';
    }
    if (!maxLabel) {
      maxVal = '';
    }
    this.setState({nombreVal, minLabel, minVal, maxLabel, maxVal})
    $('#bovedaNombreVal').text(nombreVal);
    $('#bovedaMinLabel').text(minLabel);
    $('#bovedaMinVal').text(minVal);
    $('#bovedaMaxLabel').text(maxLabel);
    $('#bovedaMaxVal').text(maxVal);
  }

  render = () => {
    const {goldCount, itemCount, nombreVal, minLabel, minVal, maxLabel, maxVal} = this.state;
    const {acciones, game} = this.props;
    let actions = [{color: 'primary', label: 'Got it, lets play!', onClick: this.playCb, close: true}];
    return (<PopUp options={this.state.options} actions={actions}>
      <article id="boveda" title="BOVEDA">
        <div className="dialogContent">
          <div className="styledDiv">
            <div className="horizontal_center" style="margin:8px 0;">
              <div>
                <span id="bovedaOroDisponibleLabel" className="secondaryColor">ORO DISPONIBLE</span>
                <span id="bovedaOroDisponibleVal" className="everywhereBoldFont activeColor">834</span>
              </div>
            </div>

            <div className="justifiedContainer" style="margin-bottom: 15px;">
              <button id="bovedaBotonRetirarOro" className="btn btn-default" onClick={() => {
                if (!isNaN(goldCount)) {
                  if (goldCount > 0) {
                    acciones.retirarOro(goldCount);
                  }
                }
              }}
              >Retirar oro
              </button>
              <TextField
                required
                id="bovedaInputCantidadOro"
                label="Cantidad de oro"
                type="number"
                value={goldCount}
                defaultValue={1}
                className="form-control"
                margin="normal"
                onChange={this.handleChange('goldCount')}
              />
              <button id="bovedaBotonDepositarOro" className="btn btn-default" onClick={() => {
                if (!isNaN(goldCount)) {
                  if (goldCount > 0) {
                    acciones.depositarOro(goldCount);
                  }
                }
              }}>Depositar oro
              </button>
            </div>
          </div>

          <div style="text-align:center; margin: 5px 0;">
            <span id="bovedaNombreLabel" className="secondaryColor">NOMBRE: </span>
            <span id="bovedaNombreVal" className="activeColor">{nombreVal}</span>
          </div>
          <div className="justifiedContainer">
            <div>
              <span id="bovedaMinLabel" className="secondaryColor">{minLabel}</span>
              <span id="bovedaMinVal" className="everywhereBoldFont activeColor">{minVal}</span>
            </div>
            <div>
              <span id="bovedaMaxVal" className="everywhereBoldFont activeColor">{maxVal}</span>
              <span id="bovedaMaxLabel" className="secondaryColor">{maxLabel}</span>
            </div>
          </div>

          <div style="margin:10px auto; width:100%; display:flex; flex:1; overflow-y:auto;">
            <ul id="bovedaGridComprar" className="itemgrid"/>
            <ul id="bovedaGridVender" className="itemgrid"/>
          </div>

          <div className="modal-footer justifiedContainer">
            <button id="bovedaBotonRetirarItem" className="btn btn-default noClickSound" onClick={() => {
              let slot = this.shopGrid.getSelectedSlot();
              if (slot) {
                acciones.retirarItem(slot, itemCount);
              }
            }
            }>Retirar
            </button>
            <input id="bovedaInputCantidadItem" className="form-control" type="number" value="1"/>
            <TextField
              required
              id="bovedaInputCantidadItem"
              label="Cantidad de items"
              type="number"
              value={itemCount}
              onChange={this.handleChange('itemCount')}
              defaultValue={1}
              className="form-control"
              margin="normal"
            />
            <button id="bovedaBotonDepositarItem" className="btn btn-default noClickSound" onClick={() => {
              let slot = this.shopGrid.getSelectedSlot();
              if (slot) {
                acciones.depositarItem(slot, itemCount);
              }
            }}>Depositar
            </button>
          </div>
        </div>
      </article>
    </PopUp>)
  }
}
