/**
 * Created by horacio on 2/21/16.
 */
import React from 'react';
//const MAX_DELAY_DOUBLE_CLICK = 400;

export default class ItemGrid extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.crearSlots();
  }

  setSelectionCallback(f) {
    this.setState({selectionCallback: f});
  }

  setDobleClickCallback(cb) { // params: slot
    this.setState({doubleClickCallback: cb});
  }

  getSelectedSlot() {
    const {listItems} = this.state;
    let slot = listItems.filter(item => item.selected === true).map(v => v);
    return slot && slot.length && slot[0];
  }

  crearSlots() {
    return this.cantidadSlots.map((slot, index) => {
      let data = {slotNumber: index + 1};
      if (this.dragAndDropable) {
        /**$slot.droppable({
        hoverClass: 'ui-state-highlight', //TODO !!!
        drop: function (event, ui) {
          let targetSlot = $(this),
            draggedItem = $(ui.draggable),
            originalSlot = draggedItem.parent(),
            targetSlotItem = targetSlot.children();

          // swap items
          if (targetSlotItem.length > 0) {
            targetSlotItem.appendTo(originalSlot);
          }
          draggedItem.appendTo(targetSlot);

          //swap slot numbers TODO: tener cuidado en dropear del inventario a un grid de comerciar (o viceversa) !!
          let targetSlotNumber = targetSlot.data('slotNumber'),
            originalSlotNumber = originalSlot.data('slotNumber');
          targetSlot.data('slotNumber', originalSlotNumber);
          originalSlot.data('slotNumber', targetSlotNumber);

        }
      });*/
      }
      return <li key={index}/>
    });
  }

  modificarSlot(numSlot, cantidad, numGraf, equiped) {
    const {listItems} = this.state;
    const {cantidadSlots} = this.props;
    if (numSlot > cantidadSlots) throw new Error('Numero de slot invalido: ' + numSlot);
    //TODO ver si lo modifica realmente
    listItems.forEach(item => {
      if (item.slotNumber === numSlot) {
        item.equipped = equiped;
        item.quantity = cantidad;
        item.label = '';
        item.image = 'url(../../graficos/' + numGraf + '.png)';
      }
    });
  }

  deselect() {
    const {listItems} = this.state;
    listItems.forEach(item => item.selected = false);
  }

  _getSlot(numSlot) {
    const {listItems} = this.state;
    const {cantidadSlots} = this.props;
    if (numSlot > cantidadSlots) throw new Error('Numero de slot invalido: ' + numSlot);

    let slot = listItems.filter(item => item.slotNumber === numSlot).map(v => v);

    if (slot && slot.length) {
      return slot[0];
    } else {
      return null;
    }
  }

  _getItem(numSlot) {
    return this._getSlot(numSlot).children();
  }

  _crearItem(numSlot) {
    const {listItems, selectionCallback, doubleClickCallback} = this.state;
    const newList = [...listItems, {
      slotNumber: numSlot, selected: false, quantity: 1, equipped: false, image: '', onClick: () => {
        this.deselect();
        this.select(numSlot);
        if (selectionCallback) {
          selectionCallback(numSlot);
        }
      }, doubleClick: () => {
        doubleClickCallback && doubleClickCallback(numSlot);
      }
    }];
    this.setState({listItems: newList});

    /*if (this.dragAndDropable) {
      $item.draggable({
        distance: 15,
        //cursor: "move", // TODO <-- (anda bugeado)
        helper: 'clone',
        revert: 'invalid',
        start: function (event, ui) { //cambio tamaño helper asi no se expande
          let $itemHelper = $(ui.helper);
          $itemHelper.width($parentSlot.width());
          $itemHelper.height($parentSlot.height());
        }
      });
    }*/
  }

  borrarItem(numSlot) {
    let $item = this._getItem(numSlot);
    if ($item) {
      $item.remove();
    }
  }

  clear() {
    this.setState({listItems: []})
  }

  render = () => {
    const {gridID, cantidadSlots, dragAndDropable, listItems} = props;
    return (<ul id={gridID}>
      {this.crearSlots()}
    </ul>);
  }
}
