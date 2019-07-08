import Enums from "../enums";
let serverCalls = {};
/**
serverCalls[Enums.serverPacketID.handleLogged] = handleLogged;
serverCalls[Enums.serverPacketID.handleRemoveDialogs] = handleRemoveDialogs;
serverCalls[Enums.serverPacketID.handleRemoveCharDialog] = handleRemoveCharDialog;
serverCalls[Enums.serverPacketID.handleNavigateToggle] = handleNavigateToggle;
serverCalls[Enums.serverPacketID.handleDisconnect] = handleDisconnect;
serverCalls[Enums.serverPacketID.handleCommerceEnd] = handleCommerceEnd;
serverCalls[Enums.serverPacketID.handleBankEnd] = handleBankEnd;
serverCalls[Enums.serverPacketID.handleCommerceInit] = handleCommerceInit;
serverCalls[Enums.serverPacketID.ping] = ping;
serverCalls[Enums.serverPacketID.attackMele] = attackMele;
serverCalls[Enums.serverPacketID.attackRange] = attackRange;
serverCalls[Enums.serverPacketID.attackSpell] = attackSpell;
serverCalls[Enums.serverPacketID.tirarItem] = tirarItem;
serverCalls[Enums.serverPacketID.agarrarItem] = agarrarItem;
serverCalls[Enums.serverPacketID.buyItem] = buyItem;
serverCalls[Enums.serverPacketID.sellItem] = sellItem;
serverCalls[Enums.serverPacketID.changeSeguro] = changeSeguro;
 */
export default (PacketID, pkg, handler) => {
  let buffer = pkg;

  switch (PacketID) {

    case 0: {
      let Clase = buffer.ReadByte();
      handler.handleLogged(Clase);
      break;
    }

    case 1: {
      handler.handleRemoveDialogs();
      break;
    }

    case 2: {
      let CharIndex = buffer.ReadInteger();
      handler.handleRemoveCharDialog(CharIndex);
      break;
    }

    case 3: {
      handler.handleNavigateToggle();
      break;
    }

    case 4: {
      handler.handleDisconnect();
      break;
    }
    case 5: {
      handler.handleCommerceEnd();
      break;
    }
    case 6: {
      handler.handleBankEnd();
      break;
    }
    case 7: {
      handler.handleCommerceInit();
      break;
    }

    case 8: {
      let Banco = buffer.ReadLong();
      handler.handleBankInit(Banco);
      break;
    }

    case 9: {
      let DestUserName = buffer.ReadString();
      handler.handleUserCommerceInit(DestUserName);
      break;
    }

    case 10: {
      handler.handleUserCommerceEnd();
      break;
    }

    case 11: {
      handler.handleUserOfferConfirm();
      break;
    }

    case 12: {
      let Chat = buffer.ReadString();
      let FontIndex = buffer.ReadByte();
      handler.handleCommerceChat(Chat, FontIndex);
      break;
    }

    case 13: {
      handler.handleShowBlacksmithForm();
      break;
    }

    case 14: {
      handler.handleShowCarpenterForm();
      break;
    }

    case 15: {
      let Value = buffer.ReadInteger();
      handler.handleUpdateSta(Value);
      break;
    }

    case 16: {
      let Value = buffer.ReadInteger();
      handler.handleUpdateMana(Value);
      break;
    }

    case 17: {
      let Value = buffer.ReadInteger();
      handler.handleUpdateHP(Value);
      break;
    }

    case 18: {

      let Value = buffer.ReadLong();

      handler.handleUpdateGold(Value);

      break;
    }

    case 19: {

      let Value = buffer.ReadLong();

      handler.handleUpdateBankGold(Value);

      break;
    }

    case 20: {

      let Value = buffer.ReadLong();

      handler.handleUpdateExp(Value);

      break;
    }

    case 21: {

      let Map = buffer.ReadInteger();
      let Version = buffer.ReadInteger();

      handler.handleChangeMap(Map, Version);

      break;
    }

    case 22: {

      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();

      handler.handlePosUpdate(X, Y);

      break;
    }

    case 23: {

      let Chat = buffer.ReadString();
      let CharIndex = buffer.ReadInteger();
      let R = buffer.ReadByte();
      let G = buffer.ReadByte();
      let B = buffer.ReadByte();

      handler.handleChatOverHead(Chat, CharIndex, R, G, B);

      break;
    }

    case 24: {

      let Chat = buffer.ReadString();
      let FontIndex = buffer.ReadByte();

      handler.handleConsoleMsg(Chat, FontIndex);

      break;
    }

    case 25: {

      let Chat = buffer.ReadString();

      handler.handleGuildChat(Chat);

      break;
    }

    case 26: {

      let Chat = buffer.ReadString();

      handler.handleShowMessageBox(Chat);

      break;
    }

    case 27: {

      let UserIndex = buffer.ReadInteger();

      handler.handleUserIndexInServer(UserIndex);

      break;
    }

    case 28: {

      let CharIndex = buffer.ReadInteger();

      handler.handleUserCharIndexInServer(CharIndex);

      break;
    }

    case 29: {
      let CharIndex = buffer.ReadInteger();
      let Name = buffer.ReadString();
      let Body = buffer.ReadInteger();
      let Head = buffer.ReadInteger();
      let Heading = buffer.ReadByte();
      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();
      let Weapon = buffer.ReadInteger();
      let Shield = buffer.ReadInteger();
      let Helmet = buffer.ReadInteger();
      let FX = 1;
      let FXLoops = 1;
      //let FX = buffer.ReadInteger();
      //let FXLoops = buffer.ReadInteger();
      let NickColor = buffer.ReadString();

      handler.handleCharacterCreate(CharIndex, Body, Head, Heading, X, Y, Weapon, Shield, Helmet, FX, FXLoops, Name, NickColor);

      break;
    }

    case 30: {

      let CharIndex = buffer.ReadInteger();

      handler.handleCharacterRemove(CharIndex);

      break;
    }

    case 31: {

      let CharIndex = buffer.ReadInteger();
      let NewName = buffer.ReadString();

      handler.handleCharacterChangeNick(CharIndex, NewName);

      break;
    }

    case 32: {

      let CharIndex = buffer.ReadInteger();
      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();

      handler.handleCharacterMove(CharIndex, X, Y);

      break;
    }

    case 33: {

      let Direction = buffer.ReadByte();

      handler.handleForceCharMove(Direction);

      break;
    }

    case 34: {

      let CharIndex = buffer.ReadInteger();
      let Body = buffer.ReadInteger();
      let Head = buffer.ReadInteger();
      let Heading = buffer.ReadByte();
      let Weapon = buffer.ReadInteger();
      let Shield = buffer.ReadInteger();
      let Helmet = buffer.ReadInteger();
      let FX = buffer.ReadInteger();
      let FXLoops = buffer.ReadInteger();

      handler.handleCharacterChange(CharIndex, Body, Head, Heading, Weapon, Shield, Helmet, FX, FXLoops);

      break;
    }

    case 35: {

      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();
      let GrhIndex = buffer.ReadInteger();

      handler.handleObjectCreate(X, Y, GrhIndex);

      break;
    }

    case 36: {

      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();

      handler.handleObjectDelete(X, Y);

      break;
    }

    case 37: {

      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();
      let Blocked = buffer.ReadBoolean();

      handler.handleBlockPosition(X, Y, Blocked);

      break;
    }

    case 38: {

      let MidiID = buffer.ReadInteger();
      let Loops = buffer.ReadInteger();

      handler.handlePlayMidi(MidiID, Loops);

      break;
    }

    case 39: {

      let WaveID = buffer.ReadByte();
      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();

      handler.handlePlayWave(WaveID, X, Y);

      break;
    }

    case 40: {

      let Data = buffer.ReadString();

      handler.handleGuildList(Data);

      break;
    }

    case 41: {

      let X = buffer.ReadByte();
      let Y = buffer.ReadByte();

      handler.handleAreaChanged(X, Y);

      break;
    }

    case 42: {


      handler.handlePauseToggle();

      break;
    }

    case 43: {


      handler.handleRainToggle();

      break;
    }

    case 44: {

      let CharIndex = buffer.ReadInteger();
      let FX = buffer.ReadInteger();
      let FXLoops = buffer.ReadInteger();

      handler.handleCreateFX(CharIndex, FX, FXLoops);

      break;
    }

    case 45: {

      let MaxHp = buffer.ReadInteger();
      let MinHp = buffer.ReadInteger();
      let MaxMan = buffer.ReadInteger();
      let MinMan = buffer.ReadInteger();
      let MaxSta = buffer.ReadInteger();
      let MinSta = buffer.ReadInteger();
      let Gld = buffer.ReadLong();
      let Elv = buffer.ReadByte();
      let Elu = buffer.ReadLong();
      let Exp = buffer.ReadLong();

      handler.handleUpdateUserStats(MaxHp, MinHp, MaxMan, MinMan, MaxSta, MinSta, Gld, Elv, Elu, Exp);

      break;
    }

    case 46: {

      let Skill = buffer.ReadByte();

      handler.handleWorkRequestTarget(Skill);

      break;
    }

    case 47: {

      let Slot = buffer.ReadByte();
      let ObjIndex = buffer.ReadInteger();
      let ObjName = buffer.ReadString();
      let Amount = buffer.ReadInteger();
      let Equiped = buffer.ReadBoolean();
      let GrhIndex = buffer.ReadInteger();
      let ObjType = buffer.ReadByte();
      let MaxHit = buffer.ReadInteger();
      let MinHit = buffer.ReadInteger();
      let MaxDef = buffer.ReadInteger();
      let MinDef = buffer.ReadInteger();
      let ObjSalePrice = buffer.ReadSingle();

      handler.handleChangeInventorySlot(Slot, ObjIndex, ObjName, Amount, Equiped, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, ObjSalePrice);

      break;
    }

    case 48: {

      let Slot = buffer.ReadByte();
      let ObjIndex = buffer.ReadInteger();
      let ObjName = buffer.ReadString();
      let Amount = buffer.ReadInteger();
      let GrhIndex = buffer.ReadInteger();
      let ObjType = buffer.ReadByte();
      let MaxHit = buffer.ReadInteger();
      let MinHit = buffer.ReadInteger();
      let MaxDef = buffer.ReadInteger();
      let MinDef = buffer.ReadInteger();
      let ObjSalePrice = buffer.ReadSingle();

      handler.handleChangeBankSlot(Slot, ObjIndex, ObjName, Amount, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, ObjSalePrice);

      break;
    }

    case 49: {

      let Slot = buffer.ReadByte();
      let SpellID = buffer.ReadInteger();
      let Name = buffer.ReadString();

      handler.handleChangeSpellSlot(Slot, SpellID, Name);

      break;
    }

    case 50: {

      let Fuerza = buffer.ReadByte();
      let Agilidad = buffer.ReadByte();
      let Inteligencia = buffer.ReadByte();
      let Carisma = buffer.ReadByte();
      let Constitucion = buffer.ReadByte();

      handler.handleAtributes(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion);

      break;
    }

    case 51: {

      /* Packet con count! */
      let Items = [];
      let Count = buffer.ReadInteger();
      let i;
      for (i = 0; i < Count; ++i) {
        let e = {
          Name: buffer.ReadString(),
          GrhIndex: buffer.ReadInteger(),
          LingH: buffer.ReadInteger(),
          LingP: buffer.ReadInteger(),
          LingO: buffer.ReadInteger(),
          ArmasHerreroIndex: buffer.ReadInteger(),
          ObjUpgrade: buffer.ReadInteger()

        };
        Items.push(e);
      }
      handler.handleBlacksmithWeapons(Items);

      break;
    }

    case 52: {

      /* Packet con count! */
      let Items = [];
      let Count = buffer.ReadInteger();
      let i;
      for (i = 0; i < Count; ++i) {
        let e = {
          Name: buffer.ReadString(),
          GrhIndex: buffer.ReadInteger(),
          LingH: buffer.ReadInteger(),
          LingP: buffer.ReadInteger(),
          LingO: buffer.ReadInteger(),
          ArmasHerreroIndex: buffer.ReadInteger(),
          ObjUpgrade: buffer.ReadInteger()

        };
        Items.push(e);
      }
      handler.handleBlacksmithArmors(Items);

      break;
    }

    case 53: {

      /* Packet con count! */
      let Items = [];
      let Count = buffer.ReadInteger();
      let i;
      for (i = 0; i < Count; ++i) {
        let e = {
          Name: buffer.ReadString(),
          GrhIndex: buffer.ReadInteger(),
          Madera: buffer.ReadInteger(),
          MaderaElfica: buffer.ReadInteger(),
          ObjCarpinteroIndex: buffer.ReadInteger(),
          ObjUpgrade: buffer.ReadInteger()

        };
        Items.push(e);
      }
      handler.handleCarpenterObjects(Items);

      break;
    }

    case 54: {


      handler.handleRestOK();

      break;
    }

    case 55: {

      let Message = buffer.ReadString();

      handler.handleErrorMsg(Message);

      break;
    }

    case 56: {


      handler.handleBlind();

      break;
    }

    case 57: {


      handler.handleDumb();

      break;
    }

    case 58: {

      let Texto = buffer.ReadString();
      let Grh = buffer.ReadInteger();

      handler.handleShowSignal(Texto, Grh);

      break;
    }

    case 59: {

      let Slot = buffer.ReadByte();
      let ObjName = buffer.ReadString();
      let Amount = buffer.ReadInteger();
      let Price = buffer.ReadSingle();
      let GrhIndex = buffer.ReadInteger();
      let ObjIndex = buffer.ReadInteger();
      let ObjType = buffer.ReadByte();
      let MaxHit = buffer.ReadInteger();
      let MinHit = buffer.ReadInteger();
      let MaxDef = buffer.ReadInteger();
      let MinDef = buffer.ReadInteger();

      handler.handleChangeNPCInventorySlot(Slot, ObjName, Amount, Price, GrhIndex, ObjIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef);

      break;
    }

    case 60: {

      let MaxAgu = buffer.ReadByte();
      let MinAgu = buffer.ReadByte();
      let MaxHam = buffer.ReadByte();
      let MinHam = buffer.ReadByte();

      handler.handleUpdateHungerAndThirst(MaxAgu, MinAgu, MaxHam, MinHam);

      break;
    }

    case 61: {

      let Asesino = buffer.ReadLong();
      let Bandido = buffer.ReadLong();
      let Burgues = buffer.ReadLong();
      let Ladron = buffer.ReadLong();
      let Noble = buffer.ReadLong();
      let Plebe = buffer.ReadLong();
      let Promedio = buffer.ReadLong();

      handler.handleFame(Asesino, Bandido, Burgues, Ladron, Noble, Plebe, Promedio);

      break;
    }

    case 62: {

      let CiudadanosMatados = buffer.ReadLong();
      let CriminalesMatados = buffer.ReadLong();
      let UsuariosMatados = buffer.ReadLong();
      let NpcsMuertos = buffer.ReadInteger();
      let Clase = buffer.ReadByte();
      let Pena = buffer.ReadLong();

      handler.handleMiniStats(CiudadanosMatados, CriminalesMatados, UsuariosMatados, NpcsMuertos, Clase, Pena);

      break;
    }

    case 63: {

      let SkillPoints = buffer.ReadInteger();

      handler.handleLevelUp(SkillPoints);

      break;
    }

    case 64: {

      let ForumType = buffer.ReadLong();
      let Title = buffer.ReadString();
      let Author = buffer.ReadString();
      let Message = buffer.ReadString();

      handler.handleAddForumMsg(ForumType, Title, Author, Message);

      break;
    }

    case 65: {

      let Visibilidad = buffer.ReadByte();
      let CanMakeSticky = buffer.ReadByte();

      handler.handleShowForumForm(Visibilidad, CanMakeSticky);

      break;
    }

    case 66: {

      let charIndex = buffer.ReadInteger();
      let invisible = buffer.ReadBoolean();

      handler.handleSetInvisible(charIndex, invisible);

      break;
    }

    case 67: {

      let Fuerza = buffer.ReadByte();
      let Agilidad = buffer.ReadByte();
      let Inteligencia = buffer.ReadByte();
      let Carisma = buffer.ReadByte();
      let Constitucion = buffer.ReadByte();

      handler.handleDiceRoll(Fuerza, Agilidad, Inteligencia, Carisma, Constitucion);

      break;
    }

    case 68: {


      handler.handleMeditateToggle();

      break;
    }

    case 69: {


      handler.handleBlindNoMore();

      break;
    }

    case 70: {


      handler.handleDumbNoMore();

      break;
    }

    case 71: {

      let i;
      let Skills = [];
      for (i = 0; i < 40; ++i) Skills[i] = buffer.ReadByte();

      handler.handleSendSkills(Skills);

      break;
    }

    case 72: {

      let Data = buffer.ReadString();

      handler.handleTrainerCreatureList(Data);

      break;
    }

    case 73: {

      let News = buffer.ReadString();
      let EnemiesList = buffer.ReadString();
      let AlliesList = buffer.ReadString();

      handler.handleGuildNews(News, EnemiesList, AlliesList);

      break;
    }

    case 74: {

      let Details = buffer.ReadString();

      handler.handleOfferDetails(Details);

      break;
    }

    case 75: {

      let Data = buffer.ReadString();

      handler.handleAlianceProposalsList(Data);

      break;
    }

    case 76: {

      let Data = buffer.ReadString();

      handler.handlePeaceProposalsList(Data);

      break;
    }

    case 77: {

      let CharName = buffer.ReadString();
      let Race = buffer.ReadByte();
      let Class = buffer.ReadByte();
      let Gender = buffer.ReadByte();
      let Level = buffer.ReadByte();
      let Gold = buffer.ReadLong();
      let Bank = buffer.ReadLong();
      let Reputation = buffer.ReadLong();
      let PreviousPetitions = buffer.ReadString();
      let CurrentGuild = buffer.ReadString();
      let PreviousGuilds = buffer.ReadString();
      let RoyalArmy = buffer.ReadBoolean();
      let ChaosLegion = buffer.ReadBoolean();
      let CiudadanosMatados = buffer.ReadLong();
      let CriminalesMatados = buffer.ReadLong();

      handler.handleCharacterInfo(CharName, Race, Class, Gender, Level, Gold, Bank, Reputation, PreviousPetitions, CurrentGuild, PreviousGuilds, RoyalArmy, ChaosLegion, CiudadanosMatados, CriminalesMatados);

      break;
    }

    case 78: {

      let GuildList = buffer.ReadString();
      let MemberList = buffer.ReadString();
      let GuildNews = buffer.ReadString();
      let JoinRequests = buffer.ReadString();

      handler.handleGuildLeaderInfo(GuildList, MemberList, GuildNews, JoinRequests);

      break;
    }

    case 79: {

      let GuildList = buffer.ReadString();
      let MemberList = buffer.ReadString();

      handler.handleGuildMemberInfo(GuildList, MemberList);

      break;
    }

    case 80: {

      let GuildName = buffer.ReadString();
      let Founder = buffer.ReadString();
      let FoundationDate = buffer.ReadString();
      let Leader = buffer.ReadString();
      let URL = buffer.ReadString();
      let MemberCount = buffer.ReadInteger();
      let ElectionsOpen = buffer.ReadBoolean();
      let Aligment = buffer.ReadString();
      let EnemiesCount = buffer.ReadInteger();
      let AlliesCount = buffer.ReadInteger();
      let AntifactionPoints = buffer.ReadString();
      let Codex = buffer.ReadString();
      let GuildDesc = buffer.ReadString();

      handler.handleGuildDetails(GuildName, Founder, FoundationDate, Leader, URL, MemberCount, ElectionsOpen, Aligment, EnemiesCount, AlliesCount, AntifactionPoints, Codex, GuildDesc);

      break;
    }

    case 81: {


      handler.handleShowGuildFundationForm();

      break;
    }

    case 82: {


      handler.handleParalizeOK();

      break;
    }

    case 83: {

      let Details = buffer.ReadString();

      handler.handleShowUserRequest(Details);

      break;
    }

    case 84: {


      handler.handleTradeOK();

      break;
    }

    case 85: {


      handler.handleBankOK();

      break;
    }

    case 86: {

      let OfferSlot = buffer.ReadByte();
      let ObjIndex = buffer.ReadInteger();
      let Amount = buffer.ReadLong();
      let GrhIndex = buffer.ReadInteger();
      let ObjType = buffer.ReadByte();
      let MaxHit = buffer.ReadInteger();
      let MinHit = buffer.ReadInteger();
      let MaxDef = buffer.ReadInteger();
      let MinDef = buffer.ReadInteger();
      let Price = buffer.ReadLong();
      let ObjName = buffer.ReadString();

      handler.handleChangeUserTradeSlot(OfferSlot, ObjIndex, Amount, GrhIndex, ObjType, MaxHit, MinHit, MaxDef, MinDef, Price, ObjName);

      break;
    }

    case 87: {

      let Night = buffer.ReadBoolean();

      handler.handleSendNight(Night);

      break;
    }

    case 88: {


      handler.handlePong();

      break;
    }

    case 89: {

      let CharIndex = buffer.ReadInteger();
      let NickColor = buffer.ReadByte();
      let Tag = buffer.ReadString();

      handler.handleUpdateTagAndStatus(CharIndex, NickColor, Tag);

      break;
    }

    case 90: {

      let Data = buffer.ReadString();

      handler.handleSpawnList(Data);

      break;
    }

    case 91: {

      let Data = buffer.ReadString();

      handler.handleShowSOSForm(Data);

      break;
    }

    case 92: {

      let Data = buffer.ReadString();

      handler.handleShowMOTDEditionForm(Data);

      break;
    }

    case 93: {


      handler.handleShowGMPanelForm();

      break;
    }

    case 94: {

      let Data = buffer.ReadString();

      handler.handleUserNameList(Data);

      break;
    }

    case 95: {

      let Data = buffer.ReadString();

      handler.handleShowDenounces(Data);

      break;
    }

    case 96: {

      /* Packet con count! */
      let Items = [];
      let Count = buffer.ReadByte();
      let i;
      for (i = 0; i < Count; ++i) {
        let e = {
          Usuario: buffer.ReadString()

        };
        Items.push(e);
      }
      handler.handleRecordList(Items);

      break;
    }

    case 97: {

      let Creador = buffer.ReadString();
      let Motivo = buffer.ReadString();
      let Online = buffer.ReadBoolean();
      let IP = buffer.ReadString();
      let OnlineTime = buffer.ReadString();
      let Obs = buffer.ReadString();

      handler.handleRecordDetails(Creador, Motivo, Online, IP, OnlineTime, Obs);

      break;
    }

    case 98: {


      handler.handleShowGuildAlign();

      break;
    }

    case 99: {

      let EsLider = buffer.ReadByte();
      let Data = buffer.ReadString();
      let Exp = buffer.ReadLong();

      handler.handleShowPartyForm(EsLider, Data, Exp);

      break;
    }

    case 100: {

      let Fuerza = buffer.ReadByte();
      let Agilidad = buffer.ReadByte();

      handler.handleUpdateStrenghtAndDexterity(Fuerza, Agilidad);

      break;
    }

    case 101: {

      let Fuerza = buffer.ReadByte();

      handler.handleUpdateStrenght(Fuerza);

      break;
    }

    case 102: {

      let Agilidad = buffer.ReadByte();

      handler.handleUpdateDexterity(Agilidad);

      break;
    }

    case 103: {

      let Mochila = buffer.ReadByte();

      handler.handleAddSlots(Mochila);

      break;
    }

    case 104: {


      let msgIdx = buffer.ReadByte();
      switch (msgIdx) {

        case Enums.eMessage.NPCHitUser:
          handler.handleNPCHitUser(buffer.ReadByte(), buffer.ReadInteger());
          break;

        case Enums.eMessage.UserHitNPC:
          handler.handleUserHitNPC(buffer.ReadLong());
          break;

        case Enums.eMessage.UserAttackedSwing:
          handler.handleUserAttackedSwing(buffer.ReadInteger());
          break;

        case Enums.eMessage.UserHittedByUser:
          handler.handleUserHittedByUser(buffer.ReadInteger(), buffer.ReadByte(), buffer.ReadInteger());
          break;

        case Enums.eMessage.UserHittedUser:
          handler.handleUserHittedUser(buffer.ReadInteger(), buffer.ReadByte(), buffer.ReadInteger());
          break;

        case Enums.eMessage.WorkRequestTarget:
          handler.handleWorkRequestTarget(buffer.ReadByte());
          break;

        case Enums.eMessage.HaveKilledUser:
          handler.handleHaveKilledUser(buffer.ReadInteger(), buffer.ReadLong());
          break;

        case Enums.eMessage.UserKill:
          handler.handleUserKill(buffer.ReadInteger());
          break;

        case Enums.eMessage.Home:
          handler.handleHome(buffer.ReadByte(), buffer.ReadInteger(), buffer.ReadString());
          break;

        case Enums.eMessage.DontSeeAnything:
          handler.handleDontSeeAnything();
          break;

        case Enums.eMessage.NPCSwing:

          handler.handleNPCSwing();
          break;

        case Enums.eMessage.NPCKillUser:

          handler.handleNPCKillUser();
          break;

        case Enums.eMessage.BlockedWithShieldUser:

          handler.handleBlockedWithShieldUser();
          break;

        case Enums.eMessage.BlockedWithShieldOther:

          handler.handleBlockedWithShieldOther();
          break;

        case Enums.eMessage.UserSwing:

          handler.handleUserSwing();
          break;

        case Enums.eMessage.SafeModeOn:

          handler.handleSafeModeOn();
          break;

        case Enums.eMessage.SafeModeOff:

          handler.handleSafeModeOff();
          break;

        case Enums.eMessage.ResuscitationSafeOff:

          handler.handleResuscitationSafeOff();
          break;

        case Enums.eMessage.ResuscitationSafeOn:

          handler.handleResuscitationSafeOn();
          break;

        case Enums.eMessage.NobilityLost:

          handler.handleNobilityLost();
          break;

        case Enums.eMessage.CantUseWhileMeditating:

          handler.handleCantUseWhileMeditating();
          break;

        case Enums.eMessage.EarnExp:

          handler.handleEarnExp();
          break;

        case Enums.eMessage.FinishHome:

          handler.handleFinishHome();
          break;

        case Enums.eMessage.CancelHome:

          handler.handleCancelHome();
          break;

        default:
          throw new Error('Multimessage: ' + msgIdx + ' no reconocido por el protocolo');
      }

      break;
    }

    case 105: {


      handler.handleStopWorking();

      break;
    }

    case 106: {

      let Slot = buffer.ReadByte();

      handler.handleCancelOfferItem(Slot);

      break;
    }

    default: {
      let msg = 'error decoding packet id: ' + PacketID;
      throw new Error(msg);
    }
  }
}
