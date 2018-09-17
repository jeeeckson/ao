import React from 'react';
import style from 'styled-components';
import ItemGrid from "../ui/game/itemgrid";

const MenuGame = style.div`
 
  @extend .exterior_border_default;
  background-size: 100% 100%;
  background-image: ${props => props.url}
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  flex: 1;
  display: inline-block;
  position: relative;

  font-size:1.5vh;
  .span {
    cursor: default;
    font-weight: bold;
  }

`;
export default class Game extends React.Component {
  render() {
    return (
      <div id="juego" style={{position: 'relative'}} className="exterior_border_default background_default">
        <div id="gamecanvas" className="clickable" onClick={(event) => {
          event.stopPropagation();
        }}/>
        <ChatBox id="chatbox" className="exterior_border_default background_default">
          <div id="chatinputContainer" className="inner_border_default">
            <div style={{width: '100%', display: 'flex'}}>
              <input id="chatinput" type="text" className="form-control" maxLength="160" autoComplete="off">
              </input>
              <button id="botonChatInput" className="botonImagen noClickSound"/>
            </div>
          </div>
        </ChatBox>

        <MenuGame id="menuJuego" url="url('../imagenes/menuJuego_background.png');">
          <ItemGrid id="itemsGrid" className="itemgrid"/>
          <select id="hechizos" size="2"/>

          <button id="botonInventario" className="botonNormal"/>
          <button id="botonHechizos" className="botonNormal"/>
          <button id="botonLanzar" className="botonNormal">Cast</button>
          <button id="botonInfo" className="botonNormal">?</button>
          <button id="botonMoverHechizoArriba" className="botonNormal"/>
          <button id="botonMoverHechizoAbajo" className="botonNormal"/>
          <div id="imagenTabActiva" className="divImagen"/>
          <div id="barras">
            <div id="barraExp">
              <div id="barraExpUsada"/>
              <span id="barraExpTexto"/>
            </div>
            <div id="barraEnergia">
              <span id="labelEnergia">ENERGY</span>
              <div id="barraEnergiaUsada"/>
              <span id="barraEnergiaTexto"/>
            </div>
            <div id="barraMana">
              <span id="labelMana">MANA</span>
              <div id="barraManaUsada"/>
              <span id="barraManaTexto"/>
            </div>
            <div id="barraSalud">
              <span id="labelSalud">HEALTH</span>
              <div id="barraSaludUsada"/>
              <span id="barraSaludTexto"/>
            </div>
            <div id="barraHambre">
              <span id="labelHambre">HUNGER</span>
              <div id="barraHambreUsada"/>
              <span id="barraHambreTexto"/>
            </div>
            <div id="barraSed">
              <span id="labelSed">THIRST</span>
              <div id="barraSedUsada"/>
              <span id="barraSedTexto"/>
            </div>
          </div>
          <button id="botonTirarOro" className="botonImagen"/>
          <span id="indicadorNivel"/>
          <span id="indicadorAgilidad"/>
          <span id="indicadorFuerza"/>
          <span id="indicadorOro"/>

          <button id="menuJuegoBotonMenu" className="botonCuadrado"/>
          <button id="botonSeguroResucitar" className="botonCuadrado"/>
          <button id="botonSeguroAtacar" className="botonCuadrado"/>
          <button id="botonMacroHechizos" className="botonCuadrado"/>
          <button id="botonMacroTrabajo" className="botonCuadrado"/>
        </MenuGame>
      </div>
    );
  }
}