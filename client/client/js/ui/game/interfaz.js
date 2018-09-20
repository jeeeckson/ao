/**
 * Created by horacio on 2/28/16.
 */
import React from 'react';
import ItemGrid from './itemgrid';
import SpellList from "../../components/SpellList";
import Bar from "../../components/Bar";

export default class Interfaz extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const {game, acciones} = this.props;
    this.acciones = acciones;
    this.game = game;
    /*this.inventarioGrid.setDobleClickCallback((slot) => {
      this.acciones.usarConDobleClick(slot);
    });*/
  }
/*
  cambiarSlotInventario(numSlot, Amount, numGrafico, equiped) {
    this.inventarioGrid.modificarSlot(numSlot, Amount, numGrafico, equiped);
  }

  borrarSlotInventario(slot) {
    this.inventarioGrid.borrarItem(slot);
  }

  resetSelectedSlotInventario() {
    this.inventarioGrid.deselect();
  }
*/
  getSelectedSlotInventario() {
    /* let slot = this.inventarioGrid.getSelectedSlot();
     if (slot > 0) {
       return slot;
     }*/
  }

  getSelectedSlotHechizo() {
    return 0;
  }

  modificarSlotHechizo(slot, name) {
    const {spells} = this.state;
    let saveSpell = false;
    spells.forEach(spell => {
      if (spell.slot === slot) {
        spell.name = name;
        saveSpell = true;
      }
    });
    if (!saveSpell) {
      this.setState({spells: spells.push({name: name, slot: slot})});
    } else {
      this.setState({spells});
    }
  }

  updateAgilidad = (agility) => {
    this.setState({agility});
  };

  updateFuerza = (strength) => {
    this.setState({strength});
  };

  updateOro = (gold) => {
    this.setState({gold});
  };

  updateBarraEnergia = (qEnergy, mEnergy) => {
    this.setState({qEnergy, mEnergy});
  };

  updateBarraVida = (qHealth, mHealth) => {
    this.setState({qHealth, mHealth});
  };

  updateBarraMana = (qMana, mMana) => {
    this.setState({qMana, mMana});
  };

  updateBarraHambre = (qHungry, mHungry) => {
    this.setState({qHungry, mHungry});
  };

  updateBarraSed = (qThirst, mThirst) => {
    this.setState({qThirst, mThirst});
  };

  updateBarraExp = (qExp, mExp) => {
    this.setState({qExp, mExp});
  };

  updateNivel = (level) => {
    this.setState({level});
  };

  render = () => {
    const {spells, qEnergy, mEnergy, qHealth, mHealth, qMana, mMana, qHungry, mHungry, qThirst, mThirst, qExp, mExp, level, gold, strength, agility} = this.state;
    return (<div>
      <ItemGrid name='itemsGrid' quantity="20" dragAndDropEnable={true}/>
      <SpellList spells={spells} throwSpell={this.acciones.lanzarHechizo}/>
      <button id="botonInventario" className="botonNormal"/>
      <button id="botonHechizos" className="botonNormal"/>
      <button id="botonInfo" className="botonNormal" onClick={() => {
        this.game.escribirMsgConsola('To cast a spell, select from the list, click on cast, and then click on the target');
      }}>?
      </button>
      <button id="botonMoverHechizoArriba" className="botonNormal"/>
      <button id="botonMoverHechizoAbajo" className="botonNormal"/>
      <div id="imagenTabActiva" className="divImagen"/>
      <div id="barras">
        <Bar id="barraExp" qunatity={qExp} maxQuantity={mExp}/>
        <Bar id="barraEnergia" qunatity={qEnergy} maxQuantity={mEnergy}/>
        <Bar id="barraMana" qunatity={qMana} maxQuantity={mMana}/>
        <Bar id="barraSalud" qunatity={qHealth} maxQuantity={mHealth}/>
        <Bar id="barraHambre" qunatity={qHungry} maxQuantity={mHungry}/>
        <Bar id="barraSed" qunatity={qThirst} maxQuantity={mThirst}/>
      </div>
      <button id="botonTirarOro" className="botonImagen" onClick={() => {
        this.game.gameUI.showTirar(true);
      }}/>
      <span id="indicadorNivel">Level: {level}</span>
      <span id="indicadorAgilidad">A: {agility}</span>
      <span id="indicadorFuerza">S: {strength}</span>
      <span id="indicadorOro">Gold: {gold}</span>

      <button id="menuJuegoBotonMenu" className="botonCuadrado" onClick={() => {
        this.game.gameUI.showMenu();
      }}/>
      <button id="botonAsignarSkills" onClick={() => {
        this.game.gameUI.showSkills();
      }}/>
      <button id="botonSeguroResucitar" className="botonCuadrado" onClick={() => {
        this.game.toggleSeguroResucitar();
      }}/>
      <button id="botonSeguroAtacar" className="botonCuadrado" onClick={() => {
        this.game.toggleSeguroAtacar();
      }}/>
      <button id="botonMacroHechizos" className="botonCuadrado" onClick={() => {
        this.acciones.toggleMacroHechizos();
      }}/>
      <button id="botonMacroTrabajo" className="botonCuadrado" onClick={() => {
        this.acciones.toggleMacroTrabajo();
      }}/>
    </div>);

  }

}