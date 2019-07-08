import Utils from '../utils/util';
import Enums from './../enums';
import Font from './../font';
import Protocolo from './protocol';
import Package from './Package';
import config from '../config.json';
import log from '../utils/log';
import serverCallsHandler from './serverCallsHandler';
import io from 'socket.io-client';

export default class GameClient {
  constructor(game, uiManager, gameUI) {
    this.VER_A = config.version.split('.')[0];
    this.VER_B = config.version.split('.')[1];
    this.VER_C = config.version.split('.')[2];

    this.game = game;

    this.uiManager = uiManager;
    this.gameUI = gameUI;
    this.ws = io('http://localhost:4000');
    this.pkg = new Package(this.ws);
    this.protocolo = new Protocolo(this.pkg);
    this.onDisconnect = null;
  }

  _connect(conectarse_callback) {
    conectarse_callback();
    //to receive the message from server
    console.log("connect");
    this.ws.on('message', (e) => {
      this.pkg.setData(e);
      let packageID = this.pkg.getPackageID();
      console.log("receives a package: ", packageID);
      while (this.pkg) {
        serverCallsHandler(packageID, this.pkg, this);
      }
    });
  }

  _desconectar() {
    this.ws.close();
  }

  intentarLogear(nombre, pw) {
    this._connect(() => {
      this.sendLoginExistingChar(nombre, pw);
    });
  }

  intentarCrearPersonaje(callback) {
    console.log("crear")
    this._connect(() => {
      callback();
      //this.sendThrowDices();
    });

  }

  setDisconnectCallback(disconnect_callback) {
    this.disconnect_callback = disconnect_callback;
  }

  setLogeadoCallback(logeado_callback) {
    this.logeado_callback = logeado_callback;
  }

  setDadosCallback(dadosCallback) {
    this.dados_callback = dadosCallback;
  }

  handleLogged(Clase) {
    this.game.actualizarBajoTecho();

    this.logeado_callback();
  }

  handleRemoveDialogs() {
    this.game.sacarAllCharacterChats();
  }

  handleRemoveCharDialog(CharIndex) {
    this.game.sacarChatCharacterByID(CharIndex);
  }

  handleNavigateToggle() {
    this.game.playerState.navegando = !this.game.playerState.navegando;
  }

  handleDisconnect() {
    this._desconectar();
  }

  handleCommerceEnd() {
    this.gameUI.hideComerciar(true);
  }

  handleBankEnd() {
    this.gameUI.hideBoveda(true);
  }

  handleCommerceInit() {
    this.gameUI.showComerciar();
  }

  handleBankInit(Banco) {
    this.gameUI.showBoveda();
    this.gameUI.boveda.setOroDisponible(Banco);
  }

  handleUserCommerceInit(DestUserName) {
    log.network('TODO: handleUserCommerceInit ');
  }

  handleUserCommerceEnd() {
    log.network('TODO: handleUserCommerceEnd ');
  }

  handleUserOfferConfirm() {
    log.network('TODO: handleUserOfferConfirm ');
  }

  handleCommerceChat(Chat, FontIndex) {
    log.network('TODO: handleCommerceChat ');
  }

  handleShowBlacksmithForm() {
    log.network('TODO: handleShowBlacksmithForm ');
  }

  handleShowCarpenterForm() {
    log.network('TODO: handleShowCarpenterForm ');
  }

  handleUpdateSta(Value) {
    this.game.atributos.setStamina(Value);
  }

  handleUpdateMana(Value) {
    this.game.atributos.setMana(Value);
  }

  handleUpdateHP(Value) {
    this.game.atributos.setVida(Value);
  }

  handleUpdateGold(Value) {
    this.game.atributos.setOro(Value);
  }

  handleUpdateBankGold(Value) {
    this.gameUI.boveda.setOroDisponible(Value);
  }

  handleUpdateExp(Value) {
    this.game.atributos.setExp(Value);
  }

  handleChangeMap(Map, Version) {
    this.game.cambiarMapa(Map);
  }

  handlePosUpdate(X, Y) {
    this.game.resetPosCharacter(this.game.player.id, X, Y);
  }

  handleChatOverHead(Chat, CharIndex, R, G, B) {
    this.game.escribirChat(Chat, CharIndex, R, G, B);
  }

  handleConsoleMsg(Chat, FontIndex) {
    this.game.escribirMsgConsola(Chat, Font[Font.Index[FontIndex]]);
  }

  handleGuildChat(Chat) {
    this.game.escribirMsgConsola(Chat, Font.CLAN_CHAT);
  }

  handleShowMessageBox(Chat) {
    this.uiManager.showMensaje(Chat);
  }

  handleUserIndexInServer(UserIndex) {
    return;
  }

  handleUserCharIndexInServer(CharIndex) {
    this.game.changePlayerIndex(CharIndex);
  }

  handleCharacterCreate(CharIndex, Body, Head, Heading, X, Y, Weapon, Shield, Helmet, FX, FXLoops, Name, NickColor) {
    this.game.agregarCharacter(CharIndex, Body, Head, Heading, X, Y, Weapon, Shield, Helmet, FX, FXLoops, Name, NickColor);
  }

  handleCharacterRemove(CharIndex) {
    let c = this.game.world.getCharacter(CharIndex);
    if (!c) {
      //log.error("trato de sacar character inexistente");
    } else {
      this.game.sacarEntity(c);
    }
  }

  handleCharacterChangeNick(CharIndex, NewName) {
    log.network('TODO: handleCharacterChangeNick ');
  }

  handleCharacterMove(CharIndex, X, Y) {
    this.game.moverCharacter(CharIndex, X, Y);
  }

  handleForceCharMove(Direction) {
    this.game.forceCaminar(Direction);
  }

  handleCharacterChange(CharIndex, Body, Head, Heading, Weapon, Shield, Helmet, FX, FXLoops) {
    this.game.cambiarCharacter(CharIndex, Body, Head, Heading, Weapon, Shield, Helmet, FX, FXLoops);
  }

  handleObjectCreate(X, Y, GrhIndex) {
    this.game.agregarItem(GrhIndex, X, Y);
  }

  handleObjectDelete(X, Y) {
    this.game.sacarItem(X, Y);
  }

  handleBlockPosition(X, Y, Blocked) {
    this.game.map.setBlockPosition(X, Y, Blocked);
  }

  handlePlayMidi(MidiID, Loops) {
    this.game.assetManager.audio.setMusic(MidiID);
  }

  handlePlayWave(WaveID, X, Y) {
    if ((X < 0) || (Y < 0) || this.game.renderer.camera.isVisiblePosition(X, Y, this.game.POSICIONES_EXTRA_SONIDO)) {
      this.game.assetManager.audio.playSound(WaveID);
    }
  }

  handleGuildList(Data) {
    let nombres = Utils.splitNullArray(Data);
    this.game.gameUI.setNombresClanes(nombres);
  }

  handleAreaChanged(X, Y) {
    this.game.cambiarArea(X, Y);
  }

  handlePauseToggle() {
    this.game.togglePausa();
  }

  handleRainToggle() {
    this.game.worldState.lloviendo = !this.game.worldState.lloviendo;
  }

  handleCreateFX(CharIndex, FX, FXLoops) {
    this.game.setCharacterFX(CharIndex, FX, FXLoops);
  }

  handleUpdateUserStats(MaxHp, MinHp, MaxMan, MinMan, MaxSta, MinSta, Gld, Elv, Elu, Exp) {
    this.game.atributos.setVida(MinHp, MaxHp);
    this.game.atributos.setMana(MinMan, MaxMan);
    this.game.atributos.setStamina(MinSta, MaxSta);
    this.game.atributos.setExp(Exp, Elu);
    this.game.atributos.setOro(Gld);
    this.game.atributos.setNivel(Elv);
  }

  handleChangeInventorySlot(Slot, ObjIndex, ObjName, Amount, Equiped, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, ObjSalePrice) {
    this.game.cambiarSlotInventario(Slot, ObjIndex, ObjName, Amount, Equiped, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, ObjSalePrice);
  }

  handleChangeBankSlot(Slot, ObjIndex, ObjName, Amount, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, ObjSalePrice) {
    this.game.cambiarSlotRetirar(Slot, ObjIndex, ObjName, Amount, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, ObjSalePrice);
  }

  handleChangeSpellSlot(Slot, SpellID, Name) {
    this.game.cambiarSlotHechizos(Slot, SpellID, Name);
  }

  handleAtributes(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion) {
    this.game.gameUI.setAtributosInfo(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion);
  }

  handleBlacksmithWeapons(Items) {
    /*Item contiene:
           Name: Name,
           GrhIndex: GrhIndex,
           LingH: LingH,
           LingP: LingP,
           LingO: LingO,
           ArmasHerreroIndex: ArmasHerreroIndex,
           ObjUpgrade: ObjUpgrade,
           */
    this.game.gameUI.herreria.setWeapons(Items);
    this.game.gameUI.showHerreria();
  }

  handleBlacksmithArmors(Items) {
    /* Item contiene
           Name: Name,
           GrhIndex: GrhIndex,
           LingH: LingH,
           LingP: LingP,
           LingO: LingO,
           ArmasHerreroIndex: ArmasHerreroIndex,
           ObjUpgrade: ObjUpgrade,
           */
    this.game.gameUI.herreria.setArmors(Items);
    this.game.gameUI.showHerreria();
  }

  handleCarpenterObjects(Items) {
    /* Items contiene
           Name: Name,
           GrhIndex: GrhIndex,
           Madera: Madera,
           MaderaElfica: MaderaElfica,
           ObjCarpinteroIndex: ObjCarpinteroIndex,
           ObjUpgrade: ObjUpgrade,
           */
    this.game.gameUI.showCarpinteria(Items);
  }

  handleRestOK() {
    log.network('TODO: handleRestOK ');
  }

  handleErrorMsg(Message) {
    this._desconectar();
    this.uiManager.showMensaje(Message);
  }

  handleBlind() {
    log.network('TODO: handleBlind ');
  }

  handleDumb() {
    log.network('TODO: handleDumb ');
  }

  handleShowSignal(Texto, Grh) {
    log.network('TODO: handleShowSignal ');
  }

  handleChangeNPCInventorySlot(Slot, ObjName, Amount, Price, GrhIndex, ObjIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef) {
    this.game.cambiarSlotCompra(Slot, ObjName, Amount, Price, GrhIndex, ObjIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef);
  }

  handleUpdateHungerAndThirst(MaxAgu, MinAgu, MaxHam, MinHam) {
    this.game.atributos.setAgua(MinAgu, MaxAgu);
    this.game.atributos.setHambre(MinHam, MaxHam);
  }

  handleFame(Asesino, Bandido, Burgues, Ladron, Noble, Plebe, Promedio) {
    this.game.gameUI.setFameInfo(Asesino, Bandido, Burgues, Ladron, Noble, Plebe, Promedio);
  }

  handleMiniStats(CiudadanosMatados, CriminalesMatados, UsuariosMatados, NpcsMuertos, Clase, Pena) {
    this.game.gameUI.setMiniStats(CiudadanosMatados, CriminalesMatados, UsuariosMatados, NpcsMuertos, Clase, Pena);
  }

  handleLevelUp(SkillPoints) {
    this.game.skills.agregarSkillsLibres(SkillPoints);
  }

  handleAddForumMsg(ForumType, Title, Author, Message) {
    log.network('TODO: handleAddForumMsg ');
  }

  handleShowForumForm(Visibilidad, CanMakeSticky) {
    log.network('TODO: handleShowForumForm ');
  }

  handleSetInvisible(charIndex, invisible) {
    let char = this.game.world.getCharacter(charIndex);
    if (char) {
      this.game.renderer.setCharVisible(char, !invisible);
    }
  }

  handleDiceRoll(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion) {
    this.dados_callback(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion);
  }

  handleMeditateToggle() {
    this.game.playerState.meditando = !this.game.playerState.meditando;
  }

  handleBlindNoMore() {
    log.network('TODO: handleBlindNoMore ');
  }

  handleDumbNoMore() {
    log.network('TODO: handleDumbNoMore ');
  }

  handleSendSkills(Skills) {
    this.game.skills.setSkills(Skills);
    this.uiManager.gameUI.updateSkillsData();
  }

  handleTrainerCreatureList(Data) {
    log.network('TODO: handleTrainerCreatureList ');
  }

  handleGuildNews(News, EnemiesList, AlliesList) {
    let enemigos = Utils.splitNullArray(EnemiesList);
    let aliados = Utils.splitNullArray(AlliesList);
    this.game.gameUI.showNoticiasClan(News, enemigos, aliados);
  }

  handleOfferDetails(Details) {
    log.network('TODO: handleOfferDetails ');
  }

  handleAlianceProposalsList(Data) {
    log.network('TODO: handleAlianceProposalsList ');
  }

  handlePeaceProposalsList(Data) {
    log.network('TODO: handlePeaceProposalsList ');
  }

  handleCharacterInfo(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados) {
    let previousGuilds = /*Utils.joinNullArray*/(PreviousGuilds);
    let previousPetitions = /*Utils.joinNullArray*/(PreviousPetitions);
    this.game.gameUI.showDetallesPersonaje(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, previousPetitions, CurrentGuild, previousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados);
  }

  handleGuildLeaderInfo(GuildList, MemberList, GuildNews, JoinRequests) {
    //TODO: usar GuildNews
    this.handleGuildMemberInfo(GuildList, MemberList);
    let aspirantes = Utils.splitNullArray(JoinRequests);
    log.error(aspirantes);
    if (aspirantes[0]) {
      this.game.gameUI.clanes.setNombresSolicitantes(aspirantes);
    } else {
      this.game.gameUI.clanes.setNombresSolicitantes([]);
    }
  }

  handleGuildMemberInfo(GuildList, MemberList) {
    this.handleGuildList(GuildList);
    let nombresMiembros = Utils.splitNullArray(MemberList);
    this.game.gameUI.clanes.setNombresMiembros(nombresMiembros);
  }

  handleGuildDetails(GuildName, Founder, FoundationDate, Leader, URL, MemberCount, ElectionsOpen, Aligment, EnemiesCount, AlliesCount, AntifactionPoints, Codex, GuildDesc) {
    this.game.gameUI.detallesClan.setClanInfo(GuildName, Founder, FoundationDate, Leader, URL, MemberCount, ElectionsOpen, Aligment, EnemiesCount, AlliesCount, AntifactionPoints, Codex, GuildDesc);
  }

  handleShowGuildFundationForm() {
    this.game.gameUI.showCrearClan();
  }

  handleParalizeOK() {
    this.game.playerState.paralizado = !this.game.playerState.paralizado;
  }

  handleShowUserRequest(Details) {
    log.network('TODO: handleShowUserRequest ');
  }

  handleTradeOK() {
    //this.game.assetManager.audio.playSound(Enums.SONIDOS.comprar_vender);
    log.network('TODO: handleTradeOK ');
  }

  handleBankOK() {
    this.game.assetManager.audio.playSound(Enums.SONIDOS.retirar_depositar);
  }

  handleChangeUserTradeSlot(OfferSlot, ObjIndex, Amount, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, Price, ObjName) {
    log.network('TODO: handleChangeUserTradeSlot ');
  }

  handleSendNight(Night) {
    log.network('TODO: handleSendNight ');
  }

  handlePong() {
    log.network('TODO: handlePong ');
  }

  handleUpdateTagAndStatus(CharIndex, NickColor, Tag) {
    // TODO: arreglar en el server, siempre manda charIndex = 1
    let char = this.game.world.getCharacter(CharIndex);
    if (!char) {
      return;
    }

    let nombre, clan;
    if (Tag.indexOf('<') > 0) {
      nombre = Tag.slice(Tag, Tag.indexOf('<') - 1);
      clan = Tag.slice(Tag.indexOf('<'), Tag.length);
    } else {
      nombre = Tag;
      clan = null;
    }
    char.setName(nombre, clan, NickColor);

  }

  handleSpawnList(Data) {
    log.network('TODO: handleSpawnList ');
  }

  handleShowSOSForm(Data) {
    log.network('TODO: handleShowSOSForm ');
  }

  handleShowMOTDEditionForm(Data) {
    log.network('TODO: handleShowMOTDEditionForm ');
  }

  handleShowGMPanelForm() {
    log.network('TODO: handleShowGMPanelForm ');
  }

  handleUserNameList(Data) {
    log.network('TODO: handleUserNameList ');
  }

  handleShowDenounces(Data) {
    log.network('TODO: handleShowDenounces ');
  }

  handleRecordList(Items) {
    log.network('TODO: handleRecordList ');
  }

  handleRecordDetails(Creador, Motivo, Online, IP, OnlineTime, Obs) {
    log.network('TODO: handleRecordDetails ');
  }

  handleShowGuildAlign() {
    this.game.gameUI.showEleccionFaccionClan();
  }

  handleShowPartyForm(EsLider, Data, Exp) {
    Data = Utils.splitNullArray(Data);
    this.game.gameUI.showParty(EsLider, Data, Exp);
  }

  handleUpdateStrenghtAndDexterity(Fuerza, Agilidad) {
    this.gameUI.interfaz.updateAgilidad(Agilidad);
    this.gameUI.interfaz.updateFuerza(Fuerza);
  }

  handleUpdateStrenght(Fuerza) {
    this.gameUI.interfaz.updateFuerza(Fuerza);
  }

  handleUpdateDexterity(Agilidad) {
    this.gameUI.interfaz.updateAgilidad(Agilidad);
  }

  handleAddSlots(Mochila) {
    log.network('TODO: handleAddSlots ');
  }

  handleNPCHitUser(parteCuerpo, danio) {
    this.game.recibirDanioCriatura(parteCuerpo, danio);
  }

  handleUserHitNPC(danio) {
    this.game.realizarDanioCriatura(danio);
  }

  handleUserAttackedSwing(attackerIndex) {
    let attackerName = this.game.world.getCharacter(attackerIndex).nombre;
    let text = Enums.MensajeConsola.MENSAJE_1 + attackerName + Enums.MensajeConsola.ATAQUE_FALLO;
    this.game.escribirMsgConsola(text, Font.FIGHT);
  }

  handleUserHittedByUser(attackerIndex, bodyPart, danio) {
    this.game.recibirDanioUser(bodyPart, danio, attackerIndex);
  }

  handleUserHittedUser(victimIndex, bodyPart, danio) {
    this.game.realizarDanioPlayer(danio, bodyPart, victimIndex);
  }

  handleWorkRequestTarget(skill) {
    switch (skill) {
      case Enums.Skill.magia:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_MAGIA, Font.SKILLINFO);
        break;
      case Enums.Skill.pesca:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_PESCA, Font.SKILLINFO);
        break;
      case Enums.Skill.talar:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_TALAR, Font.SKILLINFO);
        break;
      case Enums.Skill.mineria:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_MINERIA, Font.SKILLINFO);
        break;
      case Enums.Skill.fundirmetal:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_FUNDIRMETAL, Font.SKILLINFO);
        break;
      case Enums.Skill.proyectiles:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_PROYECTILES, Font.SKILLINFO);
        break;
      case Enums.Skill.robar:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_ROBAR, Font.SKILLINFO);
        break;
      case Enums.Skill.domar:
        this.game.escribirMsgConsola(Enums.MensajeConsola.TRABAJO_DOMAR, Font.SKILLINFO);
        break;
      default:
        log.error('Numero de skill invalido: ' + skill);
    }
    this.game.setTrabajoPendiente(skill);
  }

  handleHaveKilledUser(victimIndex, exp) {
    let victimName = this.game.world.getCharacter(victimIndex).nombre;
    this.game.escribirMsgConsola(Enums.MensajeConsola.HAS_MATADO_A + victimName + Enums.MensajeConsola.MENSAJE_22, Font.FIGHT);
    this.game.escribirMsgConsola(Enums.MensajeConsola.HAS_GANADO_EXPE_1 + exp + Enums.MensajeConsola.HAS_GANADO_EXPE_2, Font.FIGHT);

  }

  handleHome(distancia, tiempoEnSegundos, hogar) {
    let minutes = Math.floor(tiempoEnSegundos / 60);
    let seconds = tiempoEnSegundos - minutes * 60;
    let msg;
    if (minutes) {
      msg = minutes + ' minutos y ' + seconds + ' segundos.';
    } else {
      msg = seconds + ' segundos.';
    }

    this.game.escribirMsgConsola('Te encuentras a ' + distancia + ' mapas de la ' + hogar + ', este viaje durará ' + msg, Font.INFO);
    this.game.playerMovement.disable();
  }

  handleDontSeeAnything() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.NO_VES_NADA_INTERESANTE, Font.INFO);
  }

  handleUserKill(attackerIndex) {
    let attackerName = this.game.world.getCharacter(attackerIndex).nombre;
    this.game.escribirMsgConsola(attackerName + Enums.MensajeConsola.TE_HA_MATADO, Font.FIGHT);
  }

  handleNPCSwing() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.CRIATURA_FALLA_GOLPE, Font.FIGHT);
  }

  handleNPCKillUser() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.CRIATURA_MATADO, Font.FIGHT);
  }

  handleBlockedWithShieldUser() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.RECHAZO_ATAQUE_ESCUDO, Font.FIGHT);
  }

  handleBlockedWithShieldOther() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.USUARIO_RECHAZO_ATAQUE_ESCUDO, Font.FIGHT);
  }

  handleUserSwing() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.FALLADO_GOLPE, Font.FIGHT);
  }

  handleSafeModeOn() {
    this.game.seguroAtacarActivado = true;
    this.gameUI.interfaz.setSeguroAtacar(true);
    this.game.escribirMsgConsola(Enums.MensajeConsola.SEGURO_ACTIVADO, Font.WARNING);
  }

  handleSafeModeOff() {
    this.game.seguroAtacarActivado = false;
    this.gameUI.interfaz.setSeguroAtacar(false);
    this.game.escribirMsgConsola(Enums.MensajeConsola.SEGURO_DESACTIVADO, Font.WARNING);
  }

  handleResuscitationSafeOff() {
    this.game.seguroResucitacionActivado = false;
    this.gameUI.interfaz.setSeguroResucitacion(false);
    this.game.escribirMsgConsola(Enums.MensajeConsola.SEGURO_RESU_OFF, Font.WARNING);
  }

  handleResuscitationSafeOn() {
    this.game.seguroResucitacionActivado = true;
    this.gameUI.interfaz.setSeguroResucitacion(true);
    this.game.escribirMsgConsola(Enums.MensajeConsola.SEGURO_RESU_ON, Font.WARNING);
  }

  handleNobilityLost() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.PIERDE_NOBLEZA, Font.FIGHT);
  }

  handleCantUseWhileMeditating() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.USAR_MEDITANDO, Font.NOTIFICATION);
  }

  handleEarnExp() {
    log.network('TODO: handleEarnExp');
  }

  handleFinishHome() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.MENSAJE_HOGAR, Font.INFO);
    this.game.playerMovement.enable();
  }

  handleCancelHome() {
    this.game.escribirMsgConsola(Enums.MensajeConsola.MENSAJE_HOGAR_CANCEL, Font.INFO);
    this.game.playerMovement.enable();
  }

  handleStopWorking() {
    log.network('TODO: handleStopWorking ');
  }

  handleCancelOfferItem(Slot) {
    log.network('TODO: handleCancelOfferItem ');
  }

  sendLoginExistingChar(UserName, Password) {
    let p = this.protocolo.BuildLoginExistingChar(UserName, Password);
    p.serialize(this.pkg);
  }

  sendThrowDices() {
    let p = this.protocolo.BuildThrowDices();
    p.serialize(this.pkg);
  }

  sendLoginNewChar(UserName, Password, Race, Gender, Class, Head, Mail, Homeland) {
    let p = this.protocolo.BuildLoginNewChar(UserName, Password, Race, Gender, Class, Head, Mail, Homeland);
    p.serialize(this.pkg);
  }

  sendTalk(Chat) {
    let p = this.protocolo.BuildTalk(Chat);
    p.serialize(this.pkg);
  }

  sendYell(Chat) {
    let p = this.protocolo.BuildYell(Chat);
    p.serialize(this.pkg);
  }

  sendWhisper(TargetName, Chat) {
    let p = this.protocolo.BuildWhisper(TargetName, Chat);
    p.serialize(this.pkg);
  }

  sendWalk(Heading) {
    let p = this.protocolo.BuildWalk(Heading);
    p.serialize(this.pkg);
  }

  sendRequestPositionUpdate() {
    let p = this.protocolo.BuildRequestPositionUpdate();
    p.serialize(this.pkg);
  }

  sendAttack() {
    let p = this.protocolo.BuildAttack();
    p.serialize(this.pkg);
  }

  sendPickUp() {
    let p = this.protocolo.BuildPickUp();
    p.serialize(this.pkg);
  }

  sendSafeToggle() {
    let p = this.protocolo.BuildSafeToggle();
    p.serialize(this.pkg);
  }

  sendResuscitationSafeToggle() {
    let p = this.protocolo.BuildResuscitationSafeToggle();
    p.serialize(this.pkg);
  }

  sendRequestGuildLeaderInfo() {
    let p = this.protocolo.BuildRequestGuildLeaderInfo();
    p.serialize(this.pkg);
  }

  sendRequestAtributes() {
    let p = this.protocolo.BuildRequestAtributes();
    p.serialize(this.pkg);
  }

  sendRequestFame() {
    let p = this.protocolo.BuildRequestFame();
    p.serialize(this.pkg);
  }

  sendRequestSkills() {
    let p = this.protocolo.BuildRequestSkills();
    p.serialize(this.pkg);
  }

  sendRequestMiniStats() {
    let p = this.protocolo.BuildRequestMiniStats();
    p.serialize(this.pkg);
  }

  sendCommerceEnd() {
    let p = this.protocolo.BuildCommerceEnd();
    p.serialize(this.pkg);
  }

  sendUserCommerceEnd() {
    let p = this.protocolo.BuildUserCommerceEnd();
    p.serialize(this.pkg);
  }

  sendUserCommerceConfirm() {
    let p = this.protocolo.BuildUserCommerceConfirm();
    p.serialize(this.pkg);
  }

  sendCommerceChat(Chat) {
    let p = this.protocolo.BuildCommerceChat(Chat);
    p.serialize(this.pkg);
  }

  sendBankEnd() {
    let p = this.protocolo.BuildBankEnd();
    p.serialize(this.pkg);
  }

  sendUserCommerceOk() {
    let p = this.protocolo.BuildUserCommerceOk();
    p.serialize(this.pkg);
  }

  sendUserCommerceReject() {
    let p = this.protocolo.BuildUserCommerceReject();
    p.serialize(this.pkg);
  }

  sendDrop(Slot, Amount) {
    let p = this.protocolo.BuildDrop(Slot, Amount);
    p.serialize(this.pkg);
  }

  sendCastSpell(Spell) {
    let p = this.protocolo.BuildCastSpell(Spell);
    p.serialize(this.pkg);
  }

  sendLeftClick(X, Y) {
    let p = this.protocolo.BuildLeftClick(X, Y);
    p.serialize(this.pkg);
  }

  sendDoubleClick(X, Y) {
    let p = this.protocolo.BuildDoubleClick(X, Y);
    p.serialize(this.pkg);
  }

  sendWork(Skill) {
    let p = this.protocolo.BuildWork(Skill);
    p.serialize(this.pkg);
  }

  sendUseSpellMacro() {
    let p = this.protocolo.BuildUseSpellMacro();
    p.serialize(this.pkg);
  }

  sendUseItem(Slot) {
    let p = this.protocolo.BuildUseItem(Slot);
    p.serialize(this.pkg);
  }

  sendCraftBlacksmith(Item) {
    let p = this.protocolo.BuildCraftBlacksmith(Item);
    p.serialize(this.pkg);
  }

  sendCraftCarpenter(Item) {
    let p = this.protocolo.BuildCraftCarpenter(Item);
    p.serialize(this.pkg);
  }

  sendWorkLeftClick(X, Y, Skill) {
    let p = this.protocolo.BuildWorkLeftClick(X, Y, Skill);
    p.serialize(this.pkg);
  }

  sendCreateNewGuild(Desc, GuildName, Site, Codex) {
    let p = this.protocolo.BuildCreateNewGuild(Desc, GuildName, Site, Codex);
    p.serialize(this.pkg);
  }

  sendSpellInfo(Slot) {
    let p = this.protocolo.BuildSpellInfo(Slot);
    p.serialize(this.pkg);
  }

  sendEquipItem(Slot) {
    let p = this.protocolo.BuildEquipItem(Slot);
    p.serialize(this.pkg);
  }

  sendChangeHeading(Heading) {
    let p = this.protocolo.BuildChangeHeading(Heading);
    p.serialize(this.pkg);
  }

  sendModifySkills(Skills) { // Skills : vector de 20 pos conteniendo los puntos a adicionar a cada skill
    let p = this.protocolo.BuildModifySkills(Skills);
    p.serialize(this.pkg);
  }

  sendTrain(PetIndex) {
    let p = this.protocolo.BuildTrain(PetIndex);
    p.serialize(this.pkg);
  }

  sendCommerceBuy(Slot, Amount) {
    let p = this.protocolo.BuildCommerceBuy(Slot, Amount);
    p.serialize(this.pkg);
  }

  sendBankExtractItem(Slot, Amount) {
    let p = this.protocolo.BuildBankExtractItem(Slot, Amount);
    p.serialize(this.pkg);
  }

  sendCommerceSell(Slot, Amount) {
    let p = this.protocolo.BuildCommerceSell(Slot, Amount);
    p.serialize(this.pkg);
  }

  sendBankDeposit(Slot, Amount) {
    let p = this.protocolo.BuildBankDeposit(Slot, Amount);
    p.serialize(this.pkg);
  }

  sendForumPost(MsgType, Title, Post) {
    let p = this.protocolo.BuildForumPost(MsgType, Title, Post);
    p.serialize(this.pkg);
  }

  sendMoveSpell(Direction, Slot) {
    let p = this.protocolo.BuildMoveSpell(Direction, Slot);
    p.serialize(this.pkg);
  }

  sendMoveBank(Direction, Slot) {
    let p = this.protocolo.BuildMoveBank(Direction, Slot);
    p.serialize(this.pkg);
  }

  sendClanCodexUpdate(Desc, Codex) {
    let p = this.protocolo.BuildClanCodexUpdate(Desc, Codex);
    p.serialize(this.pkg);
  }

  sendUserCommerceOffer(Slot, Amount, OfferSlot) {
    let p = this.protocolo.BuildUserCommerceOffer(Slot, Amount, OfferSlot);
    p.serialize(this.pkg);
  }

  sendGuildAcceptPeace(Guild) {
    let p = this.protocolo.BuildGuildAcceptPeace(Guild);
    p.serialize(this.pkg);
  }

  sendGuildRejectAlliance(Guild) {
    let p = this.protocolo.BuildGuildRejectAlliance(Guild);
    p.serialize(this.pkg);
  }

  sendGuildRejectPeace(Guild) {
    let p = this.protocolo.BuildGuildRejectPeace(Guild);
    p.serialize(this.pkg);
  }

  sendGuildAcceptAlliance(Guild) {
    let p = this.protocolo.BuildGuildAcceptAlliance(Guild);
    p.serialize(this.pkg);
  }

  sendGuildOfferPeace(Guild, Proposal) {
    let p = this.protocolo.BuildGuildOfferPeace(Guild, Proposal);
    p.serialize(this.pkg);
  }

  sendGuildOfferAlliance(Guild, Proposal) {
    let p = this.protocolo.BuildGuildOfferAlliance(Guild, Proposal);
    p.serialize(this.pkg);
  }

  sendGuildAllianceDetails(Guild) {
    let p = this.protocolo.BuildGuildAllianceDetails(Guild);
    p.serialize(this.pkg);
  }

  sendGuildPeaceDetails(Guild) {
    let p = this.protocolo.BuildGuildPeaceDetails(Guild);
    p.serialize(this.pkg);
  }

  sendGuildRequestJoinerInfo(User) {
    let p = this.protocolo.BuildGuildRequestJoinerInfo(User);
    p.serialize(this.pkg);
  }

  sendGuildAlliancePropList() {
    let p = this.protocolo.BuildGuildAlliancePropList();
    p.serialize(this.pkg);
  }

  sendGuildPeacePropList() {
    let p = this.protocolo.BuildGuildPeacePropList();
    p.serialize(this.pkg);
  }

  sendGuildDeclareWar(Guild) {
    let p = this.protocolo.BuildGuildDeclareWar(Guild);
    p.serialize(this.pkg);
  }

  sendGuildNewWebsite(Website) {
    let p = this.protocolo.BuildGuildNewWebsite(Website);
    p.serialize(this.pkg);
  }

  sendGuildAcceptNewMember(UserName) {
    let p = this.protocolo.BuildGuildAcceptNewMember(UserName);
    p.serialize(this.pkg);
  }

  sendGuildRejectNewMember(UserName, Reason) {
    let p = this.protocolo.BuildGuildRejectNewMember(UserName, Reason);
    p.serialize(this.pkg);
  }

  sendGuildKickMember(UserName) {
    let p = this.protocolo.BuildGuildKickMember(UserName);
    p.serialize(this.pkg);
  }

  sendGuildUpdateNews(News) {
    let p = this.protocolo.BuildGuildUpdateNews(News);
    p.serialize(this.pkg);
  }

  sendGuildMemberInfo(UserName) {
    let p = this.protocolo.BuildGuildMemberInfo(UserName);
    p.serialize(this.pkg);
  }

  sendGuildOpenElections() {
    let p = this.protocolo.BuildGuildOpenElections();
    p.serialize(this.pkg);
  }

  sendGuildRequestMembership(Guild, Application) {
    let p = this.protocolo.BuildGuildRequestMembership(Guild, Application);
    p.serialize(this.pkg);
  }

  sendGuildRequestDetails(Guild) {
    let p = this.protocolo.BuildGuildRequestDetails(Guild);
    p.serialize(this.pkg);
  }

  sendOnline() {
    let p = this.protocolo.BuildOnline();
    p.serialize(this.pkg);
  }

  sendQuit() {
    let p = this.protocolo.BuildQuit();
    p.serialize(this.pkg);
  }

  sendGuildLeave() {
    let p = this.protocolo.BuildGuildLeave();
    p.serialize(this.pkg);
  }

  sendRequestAccountState() {
    let p = this.protocolo.BuildRequestAccountState();
    p.serialize(this.pkg);
  }

  sendPetStand() {
    let p = this.protocolo.BuildPetStand();
    p.serialize(this.pkg);
  }

  sendPetFollow() {
    let p = this.protocolo.BuildPetFollow();
    p.serialize(this.pkg);
  }

  sendReleasePet() {
    let p = this.protocolo.BuildReleasePet();
    p.serialize(this.pkg);
  }

  sendTrainList() {
    let p = this.protocolo.BuildTrainList();
    p.serialize(this.pkg);
  }

  sendRest() {
    let p = this.protocolo.BuildRest();
    p.serialize(this.pkg);
  }

  sendMeditate() {
    let p = this.protocolo.BuildMeditate();
    p.serialize(this.pkg);
  }

  sendResucitate() {
    let p = this.protocolo.BuildResucitate();
    p.serialize(this.pkg);
  }

  sendHeal() {
    let p = this.protocolo.BuildHeal();
    p.serialize(this.pkg);
  }

  sendHelp() {
    let p = this.protocolo.BuildHelp();
    p.serialize(this.pkg);
  }

  sendRequestStats() {
    let p = this.protocolo.BuildRequestStats();
    p.serialize(this.pkg);
  }

  sendCommerceStart() {
    let p = this.protocolo.BuildCommerceStart();
    p.serialize(this.pkg);
  }

  sendBankStart() {
    let p = this.protocolo.BuildBankStart();
    p.serialize(this.pkg);
  }

  sendEnlist() {
    let p = this.protocolo.BuildEnlist();
    p.serialize(this.pkg);
  }

  sendInformation() {
    let p = this.protocolo.BuildInformation();
    p.serialize(this.pkg);
  }

  sendReward() {
    let p = this.protocolo.BuildReward();
    p.serialize(this.pkg);
  }

  sendRequestMOTD() {
    let p = this.protocolo.BuildRequestMOTD();
    p.serialize(this.pkg);
  }

  sendUpTime() {
    let p = this.protocolo.BuildUpTime();
    p.serialize(this.pkg);
  }

  sendPartyLeave() {
    let p = this.protocolo.BuildPartyLeave();
    p.serialize(this.pkg);
  }

  sendPartyCreate() {
    let p = this.protocolo.BuildPartyCreate();
    p.serialize(this.pkg);
  }

  sendPartyJoin() {
    let p = this.protocolo.BuildPartyJoin();
    p.serialize(this.pkg);
  }

  sendInquiry() {
    let p = this.protocolo.BuildInquiry();
    p.serialize(this.pkg);
  }

  sendGuildMessage(Chat) {
    let p = this.protocolo.BuildGuildMessage(Chat);
    p.serialize(this.pkg);
  }

  sendPartyMessage(Chat) {
    let p = this.protocolo.BuildPartyMessage(Chat);
    p.serialize(this.pkg);
  }

  sendCentinelReport(Code) {
    let p = this.protocolo.BuildCentinelReport(Code);
    p.serialize(this.pkg);
  }

  sendGuildOnline() {
    let p = this.protocolo.BuildGuildOnline();
    p.serialize(this.pkg);
  }

  sendPartyOnline() {
    let p = this.protocolo.BuildPartyOnline();
    p.serialize(this.pkg);
  }

  sendCouncilMessage(Chat) {
    let p = this.protocolo.BuildCouncilMessage(Chat);
    p.serialize(this.pkg);
  }

  sendRoleMasterRequest(Request) {
    let p = this.protocolo.BuildRoleMasterRequest(Request);
    p.serialize(this.pkg);
  }

  sendGMRequest() {
    let p = this.protocolo.BuildGMRequest();
    p.serialize(this.pkg);
  }

  sendBugReport(Report) {
    let p = this.protocolo.BuildBugReport(Report);
    p.serialize(this.pkg);
  }

  sendChangeDescription(Description) {
    let p = this.protocolo.BuildChangeDescription(Description);
    p.serialize(this.pkg);
  }

  sendGuildVote(Vote) {
    let p = this.protocolo.BuildGuildVote(Vote);
    p.serialize(this.pkg);
  }

  sendPunishments(Name) {
    let p = this.protocolo.BuildPunishments(Name);
    p.serialize(this.pkg);
  }

  sendChangePassword(OldPass, NewPass) {
    let p = this.protocolo.BuildChangePassword(OldPass, NewPass);
    p.serialize(this.pkg);
  }

  sendGamble(Amount) {
    let p = this.protocolo.BuildGamble(Amount);
    p.serialize(this.pkg);
  }

  sendInquiryVote(Opt) {
    let p = this.protocolo.BuildInquiryVote(Opt);
    p.serialize(this.pkg);
  }

  sendLeaveFaction() {
    let p = this.protocolo.BuildLeaveFaction();
    p.serialize(this.pkg);
  }

  sendBankExtractGold(Amount) {
    let p = this.protocolo.BuildBankExtractGold(Amount);
    p.serialize(this.pkg);
  }

  sendBankDepositGold(Amount) {
    let p = this.protocolo.BuildBankDepositGold(Amount);
    p.serialize(this.pkg);
  }

  sendDenounce(Text) {
    let p = this.protocolo.BuildDenounce(Text);
    p.serialize(this.pkg);
  }

  sendGuildFundate() {
    let p = this.protocolo.BuildGuildFundate();
    p.serialize(this.pkg);
  }

  sendGuildFundation(ClanType) {
    let p = this.protocolo.BuildGuildFundation(ClanType);
    p.serialize(this.pkg);
  }

  sendPartyKick(UserName) {
    let p = this.protocolo.BuildPartyKick(UserName);
    p.serialize(this.pkg);
  }

  sendPartySetLeader(UserName) {
    let p = this.protocolo.BuildPartySetLeader(UserName);
    p.serialize(this.pkg);
  }

  sendPartyAcceptMember(UserName) {
    let p = this.protocolo.BuildPartyAcceptMember(UserName);
    p.serialize(this.pkg);
  }

  sendPing() {
    let p = this.protocolo.BuildPing();
    p.serialize(this.pkg);
  }

  sendRequestPartyForm() {
    let p = this.protocolo.BuildRequestPartyForm();
    p.serialize(this.pkg);
  }

  sendItemUpgrade(ItemIndex) {
    let p = this.protocolo.BuildItemUpgrade(ItemIndex);
    p.serialize(this.pkg);
  }

  sendGMCommands() {
    let p = this.protocolo.BuildGMCommands();
    p.serialize(this.pkg);
  }

  sendInitCrafting(TotalItems, ItemsPorCiclo) {
    let p = this.protocolo.BuildInitCrafting(TotalItems, ItemsPorCiclo);
    p.serialize(this.pkg);
  }

  sendHome() {
    let p = this.protocolo.BuildHome();
    p.serialize(this.pkg);
  }

  sendShowGuildNews() {
    let p = this.protocolo.BuildShowGuildNews();
    p.serialize(this.pkg);
  }

  sendShareNpc() {
    let p = this.protocolo.BuildShareNpc();
    p.serialize(this.pkg);
  }

  sendStopSharingNpc() {
    let p = this.protocolo.BuildStopSharingNpc();
    p.serialize(this.pkg);
  }

  sendConsultation() {
    let p = this.protocolo.BuildConsultation();
    p.serialize(this.pkg);
  }

  sendMoveItem(OldSlot, NewSlot) {
    let p = this.protocolo.BuildMoveItem(OldSlot, NewSlot);
    p.serialize(this.pkg);
  }

  sendGMMessage(Chat) {
    let p = this.protocolo.BuildGMMessage(Chat);
    p.serialize(this.pkg);
  }

  sendShowName() {
    let p = this.protocolo.BuildShowName();
    p.serialize(this.pkg);
  }

  sendOnlineRoyalArmy() {
    let p = this.protocolo.BuildOnlineRoyalArmy();
    p.serialize(this.pkg);
  }

  sendOnlineChaosLegion() {
    let p = this.protocolo.BuildOnlineChaosLegion();
    p.serialize(this.pkg);
  }

  sendGoNearby(UserName) {
    let p = this.protocolo.BuildGoNearby(UserName);
    p.serialize(this.pkg);
  }

  sendComment(Data) {
    let p = this.protocolo.BuildComment(Data);
    p.serialize(this.pkg);
  }

  sendServerTime() {
    let p = this.protocolo.BuildServerTime();
    p.serialize(this.pkg);
  }

  sendWhere(UserName) {
    let p = this.protocolo.BuildWhere(UserName);
    p.serialize(this.pkg);
  }

  sendCreaturesInMap(Map) {
    let p = this.protocolo.BuildCreaturesInMap(Map);
    p.serialize(this.pkg);
  }

  sendWarpMeToTarget() {
    let p = this.protocolo.BuildWarpMeToTarget();
    p.serialize(this.pkg);
  }

  sendWarpChar(UserName, Map, X, Y) {
    let p = this.protocolo.BuildWarpChar(UserName, Map, X, Y);
    p.serialize(this.pkg);
  }

  sendSilence(UserName) {
    let p = this.protocolo.BuildSilence(UserName);
    p.serialize(this.pkg);
  }

  sendSOSShowList() {
    let p = this.protocolo.BuildSOSShowList();
    p.serialize(this.pkg);
  }

  sendSOSRemove(UserName) {
    let p = this.protocolo.BuildSOSRemove(UserName);
    p.serialize(this.pkg);
  }

  sendGoToChar(UserName) {
    let p = this.protocolo.BuildGoToChar(UserName);
    p.serialize(this.pkg);
  }

  sendInvisible() {
    let p = this.protocolo.BuildInvisible();
    p.serialize(this.pkg);
  }

  sendGMPanel() {
    let p = this.protocolo.BuildGMPanel();
    p.serialize(this.pkg);
  }

  sendRequestUserList() {
    let p = this.protocolo.BuildRequestUserList();
    p.serialize(this.pkg);
  }

  sendWorking() {
    let p = this.protocolo.BuildWorking();
    p.serialize(this.pkg);
  }

  sendHiding() {
    let p = this.protocolo.BuildHiding();
    p.serialize(this.pkg);
  }

  sendJail(UserName, Reason, JailTime) {
    let p = this.protocolo.BuildJail(UserName, Reason, JailTime);
    p.serialize(this.pkg);
  }

  sendKillNPC() {
    let p = this.protocolo.BuildKillNPC();
    p.serialize(this.pkg);
  }

  sendWarnUser(UserName, Reason) {
    let p = this.protocolo.BuildWarnUser(UserName, Reason);
    p.serialize(this.pkg);
  }

  sendEditChar(UserName, Opcion, Arg1, Arg2) {
    let p = this.protocolo.BuildEditChar(UserName, Opcion, Arg1, Arg2);
    p.serialize(this.pkg);
  }

  sendRequestCharInfo(TargetName) {
    let p = this.protocolo.BuildRequestCharInfo(TargetName);
    p.serialize(this.pkg);
  }

  sendRequestCharStats(UserName) {
    let p = this.protocolo.BuildRequestCharStats(UserName);
    p.serialize(this.pkg);
  }

  sendRequestCharGold(UserName) {
    let p = this.protocolo.BuildRequestCharGold(UserName);
    p.serialize(this.pkg);
  }

  sendRequestCharInventory(UserName) {
    let p = this.protocolo.BuildRequestCharInventory(UserName);
    p.serialize(this.pkg);
  }

  sendRequestCharBank(UserName) {
    let p = this.protocolo.BuildRequestCharBank(UserName);
    p.serialize(this.pkg);
  }

  sendRequestCharSkills(UserName) {
    let p = this.protocolo.BuildRequestCharSkills(UserName);
    p.serialize(this.pkg);
  }

  sendReviveChar(UserName) {
    let p = this.protocolo.BuildReviveChar(UserName);
    p.serialize(this.pkg);
  }

  sendOnlineGM() {
    let p = this.protocolo.BuildOnlineGM();
    p.serialize(this.pkg);
  }

  sendOnlineMap(Map) {
    let p = this.protocolo.BuildOnlineMap(Map);
    p.serialize(this.pkg);
  }

  sendForgive(UserName) {
    let p = this.protocolo.BuildForgive(UserName);
    p.serialize(this.pkg);
  }

  sendKick(UserName) {
    let p = this.protocolo.BuildKick(UserName);
    p.serialize(this.pkg);
  }

  sendExecute(UserName) {
    let p = this.protocolo.BuildExecute(UserName);
    p.serialize(this.pkg);
  }

  sendBanChar(UserName, Reason) {
    let p = this.protocolo.BuildBanChar(UserName, Reason);
    p.serialize(this.pkg);
  }

  sendUnbanChar(UserName) {
    let p = this.protocolo.BuildUnbanChar(UserName);
    p.serialize(this.pkg);
  }

  sendNPCFollow() {
    let p = this.protocolo.BuildNPCFollow();
    p.serialize(this.pkg);
  }

  sendSummonChar(UserName) {
    let p = this.protocolo.BuildSummonChar(UserName);
    p.serialize(this.pkg);
  }

  sendSpawnListRequest() {
    let p = this.protocolo.BuildSpawnListRequest();
    p.serialize(this.pkg);
  }

  sendSpawnCreature(NPC) {
    let p = this.protocolo.BuildSpawnCreature(NPC);
    p.serialize(this.pkg);
  }

  sendResetNPCInventory() {
    let p = this.protocolo.BuildResetNPCInventory();
    p.serialize(this.pkg);
  }

  sendCleanWorld() {
    let p = this.protocolo.BuildCleanWorld();
    p.serialize(this.pkg);
  }

  sendServerMessage(Message) {
    let p = this.protocolo.BuildServerMessage(Message);
    p.serialize(this.pkg);
  }

  sendNickToIP(UserName) {
    let p = this.protocolo.BuildNickToIP(UserName);
    p.serialize(this.pkg);
  }

  sendIPToNick(A, B, C, D) {
    let p = this.protocolo.BuildIPToNick(A, B, C, D);
    p.serialize(this.pkg);
  }

  sendGuildOnlineMembers(GuildName) {
    let p = this.protocolo.BuildGuildOnlineMembers(GuildName);
    p.serialize(this.pkg);
  }

  sendTeleportCreate(Map, X, Y, Radio) {
    let p = this.protocolo.BuildTeleportCreate(Map, X, Y, Radio);
    p.serialize(this.pkg);
  }

  sendTeleportDestroy() {
    let p = this.protocolo.BuildTeleportDestroy();
    p.serialize(this.pkg);
  }

  sendRainToggle() {
    let p = this.protocolo.BuildRainToggle();
    p.serialize(this.pkg);
  }

  sendSetCharDescription(Description) {
    let p = this.protocolo.BuildSetCharDescription(Description);
    p.serialize(this.pkg);
  }

  sendForceMIDIToMap(MidiID, Map) {
    let p = this.protocolo.BuildForceMIDIToMap(MidiID, Map);
    p.serialize(this.pkg);
  }

  sendForceWAVEToMap(Wave, Map, X, Y) {
    let p = this.protocolo.BuildForceWAVEToMap(Wave, Map, X, Y);
    p.serialize(this.pkg);
  }

  sendRoyalArmyMessage(Message) {
    let p = this.protocolo.BuildRoyalArmyMessage(Message);
    p.serialize(this.pkg);
  }

  sendChaosLegionMessage(Message) {
    let p = this.protocolo.BuildChaosLegionMessage(Message);
    p.serialize(this.pkg);
  }

  sendCitizenMessage(Message) {
    let p = this.protocolo.BuildCitizenMessage(Message);
    p.serialize(this.pkg);
  }

  sendCriminalMessage(Message) {
    let p = this.protocolo.BuildCriminalMessage(Message);
    p.serialize(this.pkg);
  }

  sendTalkAsNPC(Message) {
    let p = this.protocolo.BuildTalkAsNPC(Message);
    p.serialize(this.pkg);
  }

  sendDestroyAllItemsInArea() {
    let p = this.protocolo.BuildDestroyAllItemsInArea();
    p.serialize(this.pkg);
  }

  sendAcceptRoyalCouncilMember(UserName) {
    let p = this.protocolo.BuildAcceptRoyalCouncilMember(UserName);
    p.serialize(this.pkg);
  }

  sendAcceptChaosCouncilMember(UserName) {
    let p = this.protocolo.BuildAcceptChaosCouncilMember(UserName);
    p.serialize(this.pkg);
  }

  sendItemsInTheFloor() {
    let p = this.protocolo.BuildItemsInTheFloor();
    p.serialize(this.pkg);
  }

  sendMakeDumb(UserName) {
    let p = this.protocolo.BuildMakeDumb(UserName);
    p.serialize(this.pkg);
  }

  sendMakeDumbNoMore(UserName) {
    let p = this.protocolo.BuildMakeDumbNoMore(UserName);
    p.serialize(this.pkg);
  }

  sendDumpIPTables() {
    let p = this.protocolo.BuildDumpIPTables();
    p.serialize(this.pkg);
  }

  sendCouncilKick(UserName) {
    let p = this.protocolo.BuildCouncilKick(UserName);
    p.serialize(this.pkg);
  }

  sendSetTrigger(Trigger) {
    let p = this.protocolo.BuildSetTrigger(Trigger);
    p.serialize(this.pkg);
  }

  sendAskTrigger() {
    let p = this.protocolo.BuildAskTrigger();
    p.serialize(this.pkg);
  }

  sendBannedIPList() {
    let p = this.protocolo.BuildBannedIPList();
    p.serialize(this.pkg);
  }

  sendBannedIPReload() {
    let p = this.protocolo.BuildBannedIPReload();
    p.serialize(this.pkg);
  }

  sendGuildMemberList(GuildName) {
    let p = this.protocolo.BuildGuildMemberList(GuildName);
    p.serialize(this.pkg);
  }

  sendGuildBan(GuildName) {
    let p = this.protocolo.BuildGuildBan(GuildName);
    p.serialize(this.pkg);
  }

  sendBanIP(IP, Reason) {
    let p = this.protocolo.BuildBanIP(IP, Reason);
    p.serialize(this.pkg);
  }

  sendUnbanIP(IP) {
    let p = this.protocolo.BuildUnbanIP(IP);
    p.serialize(this.pkg);
  }

  sendCreateItem(Item) {
    let p = this.protocolo.BuildCreateItem(Item);
    p.serialize(this.pkg);
  }

  sendDestroyItems() {
    let p = this.protocolo.BuildDestroyItems();
    p.serialize(this.pkg);
  }

  sendChaosLegionKick(UserName, Reason) {
    let p = this.protocolo.BuildChaosLegionKick(UserName, Reason);
    p.serialize(this.pkg);
  }

  sendRoyalArmyKick(UserName, Reason) {
    let p = this.protocolo.BuildRoyalArmyKick(UserName, Reason);
    p.serialize(this.pkg);
  }

  sendForceMIDIAll(MidiID) {
    let p = this.protocolo.BuildForceMIDIAll(MidiID);
    p.serialize(this.pkg);
  }

  sendForceWAVEAll(WaveID) {
    let p = this.protocolo.BuildForceWAVEAll(WaveID);
    p.serialize(this.pkg);
  }

  sendRemovePunishment(UserName, Punishment, NewText) {
    let p = this.protocolo.BuildRemovePunishment(UserName, Punishment, NewText);
    p.serialize(this.pkg);
  }

  sendTileBlockedToggle() {
    let p = this.protocolo.BuildTileBlockedToggle();
    p.serialize(this.pkg);
  }

  sendKillNPCNoRespawn() {
    let p = this.protocolo.BuildKillNPCNoRespawn();
    p.serialize(this.pkg);
  }

  sendKillAllNearbyNPCs() {
    let p = this.protocolo.BuildKillAllNearbyNPCs();
    p.serialize(this.pkg);
  }

  sendLastIP(UserName) {
    let p = this.protocolo.BuildLastIP(UserName);
    p.serialize(this.pkg);
  }

  sendChangeMOTD() {
    let p = this.protocolo.BuildChangeMOTD();
    p.serialize(this.pkg);
  }

  sendSetMOTD(Motd) {
    let p = this.protocolo.BuildSetMOTD(Motd);
    p.serialize(this.pkg);
  }

  sendSystemMessage(Message) {
    let p = this.protocolo.BuildSystemMessage(Message);
    p.serialize(this.pkg);
  }

  sendCreateNPC(NpcIndex) {
    let p = this.protocolo.BuildCreateNPC(NpcIndex);
    p.serialize(this.pkg);
  }

  sendCreateNPCWithRespawn(NpcIndex) {
    let p = this.protocolo.BuildCreateNPCWithRespawn(NpcIndex);
    p.serialize(this.pkg);
  }

  sendImperialArmour(Index, ObjIndex) {
    let p = this.protocolo.BuildImperialArmour(Index, ObjIndex);
    p.serialize(this.pkg);
  }

  sendChaosArmour(Index, ObjIndex) {
    let p = this.protocolo.BuildChaosArmour(Index, ObjIndex);
    p.serialize(this.pkg);
  }

  sendNavigateToggle() {
    let p = this.protocolo.BuildNavigateToggle();
    p.serialize(this.pkg);
  }

  sendServerOpenToUsersToggle() {
    let p = this.protocolo.BuildServerOpenToUsersToggle();
    p.serialize(this.pkg);
  }

  sendTurnOffServer() {
    let p = this.protocolo.BuildTurnOffServer();
    p.serialize(this.pkg);
  }

  sendTurnCriminal(UserName) {
    let p = this.protocolo.BuildTurnCriminal(UserName);
    p.serialize(this.pkg);
  }

  sendResetFactions(UserName) {
    let p = this.protocolo.BuildResetFactions(UserName);
    p.serialize(this.pkg);
  }

  sendRemoveCharFromGuild(UserName) {
    let p = this.protocolo.BuildRemoveCharFromGuild(UserName);
    p.serialize(this.pkg);
  }

  sendRequestCharMail(UserName) {
    let p = this.protocolo.BuildRequestCharMail(UserName);
    p.serialize(this.pkg);
  }

  sendAlterPassword(UserName, CopyFrom) {
    let p = this.protocolo.BuildAlterPassword(UserName, CopyFrom);
    p.serialize(this.pkg);
  }

  sendAlterMail(UserName, NewMail) {
    let p = this.protocolo.BuildAlterMail(UserName, NewMail);
    p.serialize(this.pkg);
  }

  sendAlterName(UserName, NewName) {
    let p = this.protocolo.BuildAlterName(UserName, NewName);
    p.serialize(this.pkg);
  }

  sendToggleCentinelActivated() {
    let p = this.protocolo.BuildToggleCentinelActivated();
    p.serialize(this.pkg);
  }

  sendDoBackUp() {
    let p = this.protocolo.BuildDoBackUp();
    p.serialize(this.pkg);
  }

  sendShowGuildMessages(GuildName) {
    let p = this.protocolo.BuildShowGuildMessages(GuildName);
    p.serialize(this.pkg);
  }

  sendSaveMap() {
    let p = this.protocolo.BuildSaveMap();
    p.serialize(this.pkg);
  }

  sendChangeMapInfoPK(Pk) {
    let p = this.protocolo.BuildChangeMapInfoPK(Pk);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoBackup(Backup) {
    let p = this.protocolo.BuildChangeMapInfoBackup(Backup);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoRestricted(RestrictedTo) {
    let p = this.protocolo.BuildChangeMapInfoRestricted(RestrictedTo);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoNoMagic(NoMagic) {
    let p = this.protocolo.BuildChangeMapInfoNoMagic(NoMagic);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoNoInvi(NoInvi) {
    let p = this.protocolo.BuildChangeMapInfoNoInvi(NoInvi);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoNoResu(NoResu) {
    let p = this.protocolo.BuildChangeMapInfoNoResu(NoResu);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoLand(Data) {
    let p = this.protocolo.BuildChangeMapInfoLand(Data);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoZone(Data) {
    let p = this.protocolo.BuildChangeMapInfoZone(Data);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoStealNpc(RoboNpc) {
    let p = this.protocolo.BuildChangeMapInfoStealNpc(RoboNpc);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoNoOcultar(NoOcultar) {
    let p = this.protocolo.BuildChangeMapInfoNoOcultar(NoOcultar);
    p.serialize(this.pkg);
  }

  sendChangeMapInfoNoInvocar(NoInvocar) {
    let p = this.protocolo.BuildChangeMapInfoNoInvocar(NoInvocar);
    p.serialize(this.pkg);
  }

  sendSaveChars() {
    let p = this.protocolo.BuildSaveChars();
    p.serialize(this.pkg);
  }

  sendCleanSOS() {
    let p = this.protocolo.BuildCleanSOS();
    p.serialize(this.pkg);
  }

  sendShowServerForm() {
    let p = this.protocolo.BuildShowServerForm();
    p.serialize(this.pkg);
  }

  sendNight() {
    let p = this.protocolo.BuildNight();
    p.serialize(this.pkg);
  }

  sendKickAllChars() {
    let p = this.protocolo.BuildKickAllChars();
    p.serialize(this.pkg);
  }

  sendReloadNPCs() {
    let p = this.protocolo.BuildReloadNPCs();
    p.serialize(this.pkg);
  }

  sendReloadServerIni() {
    let p = this.protocolo.BuildReloadServerIni();
    p.serialize(this.pkg);
  }

  sendReloadSpells() {
    let p = this.protocolo.BuildReloadSpells();
    p.serialize(this.pkg);
  }

  sendReloadObjects() {
    let p = this.protocolo.BuildReloadObjects();
    p.serialize(this.pkg);
  }

  sendRestart() {
    let p = this.protocolo.BuildRestart();
    p.serialize(this.pkg);
  }

  sendResetAutoUpdate() {
    let p = this.protocolo.BuildResetAutoUpdate();
    p.serialize(this.pkg);
  }

  sendChatColor(R, G, B) {
    let p = this.protocolo.BuildChatColor(R, G, B);
    p.serialize(this.pkg);
  }

  sendIgnored() {
    let p = this.protocolo.BuildIgnored();
    p.serialize(this.pkg);
  }

  sendCheckSlot(UserName, Slot) {
    let p = this.protocolo.BuildCheckSlot(UserName, Slot);
    p.serialize(this.pkg);
  }

  sendSetIniVar(Seccion, Clave, Valor) {
    let p = this.protocolo.BuildSetIniVar(Seccion, Clave, Valor);
    p.serialize(this.pkg);
  }

  sendCreatePretorianClan(Map, X, Y) {
    let p = this.protocolo.BuildCreatePretorianClan(Map, X, Y);
    p.serialize(this.pkg);
  }

  sendRemovePretorianClan(Map) {
    let p = this.protocolo.BuildRemovePretorianClan(Map);
    p.serialize(this.pkg);
  }

  sendEnableDenounces() {
    let p = this.protocolo.BuildEnableDenounces();
    p.serialize(this.pkg);
  }

  sendShowDenouncesList() {
    let p = this.protocolo.BuildShowDenouncesList();
    p.serialize(this.pkg);
  }

  sendMapMessage(Message) {
    let p = this.protocolo.BuildMapMessage(Message);
    p.serialize(this.pkg);
  }

  sendSetDialog(Message) {
    let p = this.protocolo.BuildSetDialog(Message);
    p.serialize(this.pkg);
  }

  sendImpersonate() {
    let p = this.protocolo.BuildImpersonate();
    p.serialize(this.pkg);
  }

  sendImitate() {
    let p = this.protocolo.BuildImitate();
    p.serialize(this.pkg);
  }

  sendRecordAdd(UserName, Reason) {
    let p = this.protocolo.BuildRecordAdd(UserName, Reason);
    p.serialize(this.pkg);
  }

  sendRecordRemove(Index) {
    let p = this.protocolo.BuildRecordRemove(Index);
    p.serialize(this.pkg);
  }

  sendRecordAddObs(Index, Obs) {
    let p = this.protocolo.BuildRecordAddObs(Index, Obs);
    p.serialize(this.pkg);
  }

  sendRecordListRequest() {
    let p = this.protocolo.BuildRecordListRequest();
    p.serialize(this.pkg);
  }

  sendRecordDetailsRequest(Index) {
    let p = this.protocolo.BuildRecordDetailsRequest(Index);
    p.serialize(this.pkg);
  }

  sendAlterGuildName(OldGuildName, NewGuildName) {
    let p = this.protocolo.BuildAlterGuildName(OldGuildName, NewGuildName);
    p.serialize(this.pkg);
  }

  sendHigherAdminsMessage(Message) {
    let p = this.protocolo.BuildHigherAdminsMessage(Message);
    p.serialize(this.pkg);
  }
}
