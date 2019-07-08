/**
 * Created by horacio on 8/20/16.
 */

import Font from '../font';
import Enums from '../enums';
import CharacterSprites from './charactersprites';
import CharacterName from './charactername';
import CharacterText from './charactertext';
import SpriteGrh from './spritegrh';
import RendererUtils from './rendererutils';
import log from '../utils/log';

export default class EntityRenderer {
  constructor(escala, entityContainer, entityNamesContainer, entityChatContainer, camera, assetManager) {

    this.CLIPPING_EXTRA_POSITIONS = {
      norte: 0,
      sur: 2,
      este: 1,
      oeste: 1
    };
    this.escala = escala;
    this.entityContainer = entityContainer;
    this.entityNamesContainer = entityNamesContainer;
    this.entityChatContainer = entityChatContainer;
    this.camera = camera;
    this.assetManager = assetManager;

    this.tilesize = 32;

    this.grhs = assetManager.grhs;
    this.indices = assetManager.getIndices();
    this.armas = assetManager.getArmas();
    this.cabezas = assetManager.getCabezas();
    this.cascos = assetManager.getCascos();
    this.cuerpos = assetManager.getCuerpos();
    this.escudos = assetManager.getEscudos();
    this.fxs = assetManager.getFxs();
  }

  rescale(escala) { //TEMPORAL
    this.escala = escala;
  }

  _getHeadingsGrhs(varIndice, num) {
    if (!num) {
      return null;
    }
    if (!varIndice[num]) {
      return null;
    }
    if (!varIndice[num].down) {
      return null;
    }
    let res = [];
    res[Enums.Heading.norte] = this.assetManager.getGrh(varIndice[num].up);
    res[Enums.Heading.este] = this.assetManager.getGrh(varIndice[num].right);
    res[Enums.Heading.sur] = this.assetManager.getGrh(varIndice[num].down);
    res[Enums.Heading.oeste] = this.assetManager.getGrh(varIndice[num].left);
    return res;
  }

  agregarItem(item, numGrh) {
    if (!this.assetManager.getGrh(numGrh)) {
      log.error('grh de item invalido!');
    } else {
      item.sprite = this._crearSprite(this.entityContainer, numGrh, Math.round(item.x), Math.round(item.y), -50);
    }
  }

  sacarItem(item) {
    if (item.sprite) {

      RendererUtils.removePixiChild(this.entityContainer, item.sprite);
      item.sprite = null;
    }
  }

  agregarCharacter(char) {
    let self = this;

    let f = function () {
      let char = this;
      let nombre = char.nombre;
      let clan = char.clan;
      let color = char.nickColor;
      if (char.spriteNombre) {
        RendererUtils.removePixiChild(self.entityNamesContainer, char.spriteNombre);
        char.spriteNombre = null;
      }
      if (!nombre.trim()) {
        return;
      }
      let fontColor = color ? Font.NickColor[Font.NickColorIndex[color]] : Font.NickColor.CIUDADANO;
      let font = Font.NOMBRE_BASE_FONT;
      font.fill = fontColor;
      let nuevoNombre = new CharacterName(nombre, clan, font, self.escala);
      self.entityNamesContainer.addChild(nuevoNombre);
      char.spriteNombre = nuevoNombre;
    };

    char.on('nameChanged', f);

    char.emit('nameChanged');

    let sprite = this._crearCharacterSprites(this.entityContainer, char.x, char.y, -30);
    sprite.setSpeed(char.moveSpeed); // ANIMACIONES char se setean a misma velocidad que su movimiento !!

    char.sprite = sprite;

    // TODO! nombre clippping y textos de chat clipping !
    char.texto = new CharacterText(this.escala);
    this.entityChatContainer.addChild(char.texto);

    char.on('positionChanged', function () {
      let spriteX = this.x;
      let spriteY = this.y;

      this.sprite.setPosition(spriteX, spriteY);
      if (this.spriteNombre) {
        this.spriteNombre.setPosition(spriteX, spriteY);
      }
      if (this.texto) {
        this.texto.setPosition(spriteX, spriteY);
      }
    });

    char.on('gridPositionChanged', function () {
      self._setSpriteClipping(this.sprite);
    });

    char.emit('positionChanged');

    char.on('headingChanged', () => {
      char.sprite.cambiarHeading(char.heading);
    });

    char.emit('headingChanged');

    char.on('bodyChanged', () => {
      let Body = char.body;
      let bodys = self._getHeadingsGrhs(self.cuerpos, Body);
      let headOffX = 0;
      let headOffY = 0;
      if (self.cuerpos[Body]) {
        headOffX = self.cuerpos[Body].offHeadX;
        headOffY = self.cuerpos[Body].offHeadY;
      }
      char.sprite.setBodys(bodys, headOffX, headOffY);
    });

    char.emit('bodyChanged');

    char.on('headChanged', () => {
      let Head = char.head;
      let heads = self._getHeadingsGrhs(self.cabezas, Head);
      char.sprite.setHeads(heads);
    });

    char.emit('headChanged');

    char.on('weaponChanged', () => {
      let Weapon = char.weapon;
      let weapons = self._getHeadingsGrhs(self.armas, Weapon);
      char.sprite.setWeapons(weapons);
    });

    char.emit('weaponChanged');

    char.on('shieldChanged', () => {
      let Shield = char.shield;
      let shields = self._getHeadingsGrhs(self.escudos, Shield);
      char.sprite.setShields(shields);
    });

    char.emit('shieldChanged');

    char.on('helmetChanged', () => {
      let Helmet = char.helmet;
      let helmets = self._getHeadingsGrhs(self.cascos, Helmet);
      char.sprite.setHelmets(helmets);
    });

    char.emit('helmetChanged');

  }

  sacarCharacter(char) {
    RendererUtils.removePixiChild(this.entityContainer, char.sprite);
    char.sprite = null;
    RendererUtils.removePixiChild(this.entityChatContainer, char.texto);
    char.texto = null;

    if (char.spriteNombre) {
      RendererUtils.removePixiChild(this.entityNamesContainer, char.spriteNombre);
      char.spriteNombre = null;
    }
  }

  _crearSprite(parentLayer, grh, x, y, zIndex) {
    console.log("_crearSprite2", this.assetManager.getGrh(grh))
    let nuevoSprite = new SpriteGrh(this.assetManager.getGrh(grh));
    nuevoSprite.zOffset = zIndex || 0;
    parentLayer.addChild(nuevoSprite); // ojo tiene que estar en este orden sino no anda el z-index(TODO)
    nuevoSprite.setPosition(x, y);
    this._setSpriteClipping(nuevoSprite);
    return nuevoSprite;
  }

  _crearCharacterSprites(parentLayer, x, y, zIndex) {
    let sprite = new CharacterSprites();
    //sprite.setSombraSprite(this.assetManager.getGrh(23651));
    parentLayer.addChild(sprite);
    sprite.setPosition(x, y);
    this._setSpriteClipping(sprite);
    sprite.zOffset = zIndex;
    return sprite;
  }

  updateEntitiesMov(direccion, entities) {
    this.updateEntitiesClipping(entities);
  }

  updateEntitiesClipping(entities) {
    for (let i = 0; i < entities.length; i++) {
      this._setSpriteClipping(entities[i].sprite);
    }
  }

  _setSpriteClipping(sprite) {
    sprite.visible = this._spriteVisiblePorCamara(sprite, this.CLIPPING_EXTRA_POSITIONS);
  }

  entityVisiblePorCamara(entity, extraPositions) {
    if (!entity.sprite) {
      return false;
    }
    let finalExtraPositions;
    if (extraPositions) {
      finalExtraPositions = {};
      finalExtraPositions.norte = extraPositions.norte + this.CLIPPING_EXTRA_POSITIONS.norte;
      finalExtraPositions.sur = extraPositions.sur + this.CLIPPING_EXTRA_POSITIONS.sur;
      finalExtraPositions.este = extraPositions.este + this.CLIPPING_EXTRA_POSITIONS.este;
      finalExtraPositions.oeste = extraPositions.oeste + this.CLIPPING_EXTRA_POSITIONS.oeste;
    } else {
      finalExtraPositions = this.CLIPPING_EXTRA_POSITIONS;
    }
    return this._spriteVisiblePorCamara(entity.sprite, finalExtraPositions);
  }

  _spriteVisiblePorCamara(sprite, extraPositions) {
    let entityRect = {};

    entityRect.x = sprite.x;
    entityRect.y = sprite.y;
    entityRect.width = sprite.width;
    entityRect.height = sprite.height;

    RendererUtils.posicionarRectEnTile(entityRect);
    return this.camera.rectVisible(entityRect, extraPositions);
  }

  setCharacterChat(char, chat, r, g, b) {
    let color = 'rgb(' + r + ',' + g + ',' + b + ')';
    char.texto.setChat(chat, color);
  }

  removerChat(char) {
    char.texto.removerChat();
  }

  setCharVisible(char, visible) {
    char.sprite.setCharVisible(visible);
    if (char.spriteNombre) {
      char.spriteNombre.visible = visible;
    }
  }

  agregarCharacterHoveringInfo(char, valor, font) {
    char.texto.addHoveringInfo(valor, font);
  }

  setCharacterFX(char, FX, FXLoops) {
    let grh = this.assetManager.getGrh(this.fxs[FX].animacion);

    //TODO:WARN
    char.sprite.setFX(grh, this.fxs[FX].offX, this.fxs[FX].offY, FXLoops);
  }

  entityEnTileVisible(entity) { // puede que no este en un tile visible pero si sea visible la entidad (para eso usar el de arriba)
    return this.camera.isVisiblePosition(entity.gridX, entity.gridY);
  }

}