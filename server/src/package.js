let ByteBuffer = require('bytebuffer');

function Package() {
  this.newClientPacketID = {
    LoginExistingChar: 0,
    ThrowDices: 1,
    LoginNewChar: 2,
    Talk: 3,
    Yell: 4,
    Whisper: 5,
    Walk: 6,
    RequestPositionUpdate: 7,
    Attack: 8,
    PickUp: 9,
    SafeToggle: 10,
    ResuscitationSafeToggle: 11,
    RequestGuildLeaderInfo: 12,
    RequestAtributes: 13,
    RequestFame: 14,
    RequestSkills: 15,
    RequestMiniStats: 16,
    CommerceEnd: 17,
    UserCommerceEnd: 18,
    UserCommerceConfirm: 19,
    CommerceChat: 20,
    BankEnd: 21,
    UserCommerceOk: 22,
    UserCommerceReject: 23,
    Drop: 24,
    CastSpell: 25,
    LeftClick: 26,
    DoubleClick: 27,
    Work: 28,
    UseSpellMacro: 29,
    UseItem: 30,
    CraftBlacksmith: 31,
    CraftCarpenter: 32,
    WorkLeftClick: 33,
    CreateNewGuild: 34,
    SpellInfo: 35,
    EquipItem: 36,
    ChangeHeading: 37,
    ModifySkills: 38,
    Train: 39,
    CommerceBuy: 40,
    BankExtractItem: 41,
    CommerceSell: 42,
    BankDeposit: 43,
    ForumPost: 44,
    MoveSpell: 45,
    MoveBank: 46,
    ClanCodexUpdate: 47,
    UserCommerceOffer: 48,
    GuildAcceptPeace: 49,
    GuildRejectAlliance: 50,
    GuildRejectPeace: 51,
    GuildAcceptAlliance: 52,
    GuildOfferPeace: 53,
    GuildOfferAlliance: 54,
    GuildAllianceDetails: 55,
    GuildPeaceDetails: 56,
    GuildRequestJoinerInfo: 57,
    GuildAlliancePropList: 58,
    GuildPeacePropList: 59,
    GuildDeclareWar: 60,
    GuildNewWebsite: 61,
    GuildAcceptNewMember: 62,
    GuildRejectNewMember: 63,
    GuildKickMember: 64,
    GuildUpdateNews: 65,
    GuildMemberInfo: 66,
    GuildOpenElections: 67,
    GuildRequestMembership: 68,
    GuildRequestDetails: 69,
    Online: 70,
    Quit: 71,
    GuildLeave: 72,
    RequestAccountState: 73,
    PetStand: 74,
    PetFollow: 75,
    ReleasePet: 76,
    TrainList: 77,
    Rest: 78,
    Meditate: 79,
    Resucitate: 80,
    Heal: 81,
    Help: 82,
    RequestStats: 83,
    CommerceStart: 84,
    BankStart: 85,
    Enlist: 86,
    Information: 87,
    Reward: 88,
    RequestMOTD: 89,
    UpTime: 90,
    PartyLeave: 91,
    PartyCreate: 92,
    PartyJoin: 93,
    Inquiry: 94,
    GuildMessage: 95,
    PartyMessage: 96,
    CentinelReport: 97,
    GuildOnline: 98,
    PartyOnline: 99,
    CouncilMessage: 100,
    RoleMasterRequest: 101,
    GMRequest: 102,
    BugReport: 103,
    ChangeDescription: 104,
    GuildVote: 105,
    Punishments: 106,
    ChangePassword: 107,
    Gamble: 108,
    InquiryVote: 109,
    LeaveFaction: 110,
    BankExtractGold: 111,
    BankDepositGold: 112,
    Denounce: 113,
    GuildFundate: 114,
    GuildFundation: 115,
    PartyKick: 116,
    PartySetLeader: 117,
    PartyAcceptMember: 118,
    Ping: 119,
    RequestPartyForm: 120,
    ItemUpgrade: 121,
    GMCommands: 122,
    InitCrafting: 123,
    Home: 124,
    ShowGuildNews: 125,
    ShareNpc: 126,
    StopSharingNpc: 127,
    Consultation: 128,
    MoveItem: 129,
    ClientPacketID_PACKET_COUNT: 130
  };
  this.clientPacketID = {
    getMyCharacter: 1,
    getCharacter: 2,
    talk: 3,
    deleteCharacter: 4,
    changeHeading: 5,
    walk: 6,
    changeRopa: 7,
    console: 8,
    pong: 9,
    animFX: 10,
    inmo: 11,
    updateHP: 12,
    updateMaxHP: 13,
    updateMana: 14,
    telepMe: 15,
    actOnline: 19,
    consoleOnline: 20,
    walkServer: 21,
    actExp: 22,
    actMyLevel: 23,
    actGold: 24,
    actColorName: 25,
    changeHelmet: 26,
    changeWeapon: 27,
    error: 28,
    changeName: 29,
    getNpc: 30,
    changeShield: 31,
    putBodyAndHeadDead: 32,
    revivirUsuario: 33,
    quitarUserInvItem: 34,
    renderItem: 35,
    deleteItem: 36,
    agregarUserInvItem: 37,
    changeArrow: 38,
    blockMap: 39,
    changeObjIndex: 40,
    openTrade: 41,
    aprenderSpell: 42,
    closeForce: 43,
    nameMap: 44,
    changeBody: 45,
    navegando: 46,
    updateAgilidad: 47,
    updateFuerza: 48
  };

  this.serverPacketID = {
    changeHeading: 1,
    click: 2,
    useItem: 3,
    equiparItem: 4,
    createCharacter: 5,
    connectCharacter: 6,
    talk: 7,
    ping: 8,
    attackMele: 9,
    attackRange: 10,
    attackSpell: 11,
    tirarItem: 12,
    agarrarItem: 13,
    buyItem: 14,
    sellItem: 15,
    changeSeguro: 17,
    position: 18
  };

  this.bufferRcv = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, true);
  this.bufferSnd = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, true);

  this.setData = (data) => {

    this.bufferRcv = new ByteBuffer.wrap(data, 'utf8', true);
  };

  this.getPackageID = () => {
    // packageID
    return this.getByte();
  };

  this.setPackageID = (packageID) => {
    this.bufferSnd = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, true);
    this.writeByte(packageID);
  };

  this.writeByte = (numByte, signed) => {
    if (!numByte) {
      numByte = 0;
    }

    if (signed) {
      this.bufferSnd.writeInt8(parseInt(numByte));
    } else {
      this.bufferSnd.writeUint8(parseInt(numByte));
    }
  };

  this.writeShort = (numShort, signed) => {
    if (!numShort) {
      numShort = 0;
    }

    if (signed) {
      this.bufferSnd.writeInt16(parseInt(numShort));
    } else {
      this.bufferSnd.writeUint16(parseInt(numShort));
    }
  };

  this.writeInt = (numInt, signed) => {
    if (!numInt) {
      numInt = 0;
    }

    if (signed) {
      this.bufferSnd.writeInt32(parseInt(numInt));
    } else {
      this.bufferSnd.writeUint32(parseInt(numInt));
    }
  };

  this.writeFloat = (numFloat) => {
    if (!numFloat) {
      numFloat = 0;
    }

    this.bufferSnd.writeFloat(parseInt(numFloat));
  };

  this.writeDouble = (numDouble) => {
    if (!numDouble) {
      numDouble = 0;
    }

    this.bufferSnd.writeDouble(parseInt(numDouble));
  };

  this.writeString = (dataString) => {
    if (!dataString) {
      dataString = '';
    }

    this.writeShort(ByteBuffer.calculateUTF8Chars(dataString));

    this.bufferSnd.writeString(dataString);
  };

  this.getByte = (signed = false) => {
    let dByte = 0;
    if (signed) {
      dByte = this.bufferRcv.readInt8();
    } else {
      dByte = this.bufferRcv.readUint8();
    }

    return dByte;
  };

  this.getShort = (signed) => {
    let dShort = 0;

    if (signed) {
      dShort = this.bufferRcv.readInt16();
    } else {
      dShort = this.bufferRcv.readUint16();
    }

    return dShort;
  };

  this.getInt = (signed) => {
    let dInt = 0;

    if (signed) {
      dInt = this.bufferRcv.readInt32();
    } else {
      dInt = this.bufferRcv.readUint32();
    }

    return dInt;
  };

  this.getFloat = () => {
    return this.bufferRcv.readFloat();
  };

  this.getDouble = () => {
    return this.bufferRcv.readDouble();
  };

  this.getString = () => {
    let lengthStr = this.getShort();

    return this.bufferRcv.readString(lengthStr, ByteBuffer.METRICS_CHARS);
  };

  this.dataSend = () => {
    this.bufferSnd.flip();
    return this.bufferSnd.toBuffer();
  };
}

module.exports = new Package();
