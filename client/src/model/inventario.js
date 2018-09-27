/**
 * Created by horacio on 4/10/16.
 */

export default class Inventario {
  constructor() {
    this._slots = [];
  }

  cambiarSlot(numSlot, ObjName, Amount, Price, GrhIndex, ObjIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, Equiped) {
    let nuevoSlot;
    if (this.isValidSlot(Amount, GrhIndex)) {
      nuevoSlot = {
        numero: numSlot,
        objIndex: ObjIndex,
        objName: ObjName,
        cantidad: Amount,
        grh: GrhIndex,
        objType: ObjType,
        maxHit: MaxHit,
        minHit: MinHit,
        maxDef: MaxDef,
        minDef: MinDef,
        precio: Price,
        equipado: Equiped
      };
    } else {
      nuevoSlot = null;
    }

    this._slots[numSlot] = nuevoSlot;
  }

  getSlot(numSlot) {
    return this._slots[numSlot];
  }

  forEachSlot(callback) {
    _.each(this._slots, (slot) => {
      if (slot) {
        callback(slot);
      }
    });
  }

  isValidSlot(cantidad, grh) {
    return ((cantidad > 0) && (grh > 0));
  }

}