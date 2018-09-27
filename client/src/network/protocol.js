/* Automatically generated file */

import ServerPacketDecodeAndDispatch from './serverCallsHandler';

let ClientPacketID = {
  LoginExistingChar: 0,
  ThrowDices: 1,
  Whisper: 2,
  Talk: 3,
  Yell: 4,
  LoginNewChar: 5,
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

function LoginExistingChar(buffer) {

  this.id = ClientPacketID.LoginExistingChar /* 0 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Password = buffer.ReadUnicodeString();
  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.LoginExistingChar);
    /* PacketID: 0 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Password);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleLoginExistingChar(this);
  };
}

function ThrowDices(buffer) {
  debugger;
  this.id = ClientPacketID.ThrowDices /* 1 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ThrowDices);
    /* PacketID: 1 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleThrowDices(this);
  };
}

function LoginNewChar(buffer) {

  this.id = ClientPacketID.LoginNewChar /* 2 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Password = buffer.ReadUnicodeString();
    this.Race = buffer.ReadByte();
    this.Gender = buffer.ReadByte();
    this.Class = buffer.ReadByte();
    this.Head = buffer.ReadInteger();
    this.Mail = buffer.ReadUnicodeString();
    this.Homeland = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.LoginNewChar);
    /* PacketID: 2 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Password);
    buffer.WriteByte(Number(this.Race));
    buffer.WriteByte(Number(this.Gender));
    buffer.WriteByte(Number(this.Class));
    buffer.WriteInteger(Number(this.Head));
    buffer.WriteUnicodeString(this.Mail);
    buffer.WriteByte(Number(this.Homeland));

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleLoginNewChar(this);

  };

}

function Talk(buffer) {

  this.id = ClientPacketID.Talk /* 3 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Talk);
    /* PacketID: 3 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTalk(this);

  };

}

function Yell(buffer) {

  this.id = ClientPacketID.Yell /* 4 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Yell);
    /* PacketID: 4 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleYell(this);
  };
}

function Whisper(buffer) {

  this.id = ClientPacketID.Whisper /* 5 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.TargetName = buffer.ReadUnicodeString();
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Whisper);
    /* PacketID: 5 */
    buffer.WriteUnicodeString(this.TargetName);
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWhisper(this);

  };

}

function Walk(buffer) {

  this.id = ClientPacketID.Walk /* 6 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Heading = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Walk);
    /* PacketID: 6 */
    buffer.WriteByte(this.Heading);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWalk(this);

  };

}

function RequestPositionUpdate(buffer) {

  this.id = ClientPacketID.RequestPositionUpdate /* 7 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestPositionUpdate);
    /* PacketID: 7 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestPositionUpdate(this);

  };

}

function Attack(buffer) {

  this.id = ClientPacketID.Attack /* 8 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Attack);
    /* PacketID: 8 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAttack(this);

  };

}

function PickUp(buffer) {

  this.id = ClientPacketID.PickUp /* 9 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PickUp);
    /* PacketID: 9 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePickUp(this);

  };

}

function SafeToggle(buffer) {

  this.id = ClientPacketID.SafeToggle /* 10 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.SafeToggle);
    /* PacketID: 10 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSafeToggle(this);

  };

}

function ResuscitationSafeToggle(buffer) {

  this.id = ClientPacketID.ResuscitationSafeToggle /* 11 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ResuscitationSafeToggle);
    /* PacketID: 11 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleResuscitationSafeToggle(this);

  };

}

function RequestGuildLeaderInfo(buffer) {

  this.id = ClientPacketID.RequestGuildLeaderInfo /* 12 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestGuildLeaderInfo);
    /* PacketID: 12 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestGuildLeaderInfo(this);

  };

}

function RequestAtributes(buffer) {

  this.id = ClientPacketID.RequestAtributes /* 13 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestAtributes);
    /* PacketID: 13 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestAtributes(this);

  };

}

function RequestFame(buffer) {

  this.id = ClientPacketID.RequestFame /* 14 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestFame);
    /* PacketID: 14 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestFame(this);

  };

}

function RequestSkills(buffer) {

  this.id = ClientPacketID.RequestSkills /* 15 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestSkills);
    /* PacketID: 15 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestSkills(this);

  };

}

function RequestMiniStats(buffer) {

  this.id = ClientPacketID.RequestMiniStats /* 16 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestMiniStats);
    /* PacketID: 16 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestMiniStats(this);

  };

}

function CommerceEnd(buffer) {

  this.id = ClientPacketID.CommerceEnd /* 17 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CommerceEnd);
    /* PacketID: 17 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCommerceEnd(this);

  };

}

function UserCommerceEnd(buffer) {

  this.id = ClientPacketID.UserCommerceEnd /* 18 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UserCommerceEnd);
    /* PacketID: 18 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUserCommerceEnd(this);

  };

}

function UserCommerceConfirm(buffer) {

  this.id = ClientPacketID.UserCommerceConfirm /* 19 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UserCommerceConfirm);
    /* PacketID: 19 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUserCommerceConfirm(this);

  };

}

function CommerceChat(buffer) {

  this.id = ClientPacketID.CommerceChat /* 20 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CommerceChat);
    /* PacketID: 20 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCommerceChat(this);

  };

}

function BankEnd(buffer) {

  this.id = ClientPacketID.BankEnd /* 21 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BankEnd);
    /* PacketID: 21 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBankEnd(this);

  };

}

function UserCommerceOk(buffer) {

  this.id = ClientPacketID.UserCommerceOk /* 22 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UserCommerceOk);
    /* PacketID: 22 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUserCommerceOk(this);

  };

}

function UserCommerceReject(buffer) {

  this.id = ClientPacketID.UserCommerceReject /* 23 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UserCommerceReject);
    /* PacketID: 23 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUserCommerceReject(this);

  };

}

function Drop(buffer) {

  this.id = ClientPacketID.Drop /* 24 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();
    this.Amount = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Drop);
    /* PacketID: 24 */
    buffer.WriteByte(this.Slot);
    buffer.WriteInteger(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDrop(this);

  };

}

function CastSpell(buffer) {

  this.id = ClientPacketID.CastSpell /* 25 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Spell = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CastSpell);
    /* PacketID: 25 */
    buffer.WriteByte(this.Spell);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCastSpell(this);

  };

}

function LeftClick(buffer) {

  this.id = ClientPacketID.LeftClick /* 26 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.LeftClick);
    /* PacketID: 26 */
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleLeftClick(this);

  };

}

function DoubleClick(buffer) {

  this.id = ClientPacketID.DoubleClick /* 27 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.DoubleClick);
    /* PacketID: 27 */
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDoubleClick(this);

  };

}

function Work(buffer) {

  this.id = ClientPacketID.Work /* 28 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Skill = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Work);
    /* PacketID: 28 */
    buffer.WriteByte(this.Skill);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWork(this);

  };

}

function UseSpellMacro(buffer) {

  this.id = ClientPacketID.UseSpellMacro /* 29 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UseSpellMacro);
    /* PacketID: 29 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUseSpellMacro(this);

  };

}

function UseItem(buffer) {

  this.id = ClientPacketID.UseItem /* 30 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UseItem);
    /* PacketID: 30 */
    buffer.WriteByte(this.Slot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUseItem(this);

  };

}

function CraftBlacksmith(buffer) {

  this.id = ClientPacketID.CraftBlacksmith /* 31 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Item = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CraftBlacksmith);
    /* PacketID: 31 */
    buffer.WriteInteger(this.Item);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCraftBlacksmith(this);

  };

}

function CraftCarpenter(buffer) {

  this.id = ClientPacketID.CraftCarpenter /* 32 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Item = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CraftCarpenter);
    /* PacketID: 32 */
    buffer.WriteInteger(this.Item);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCraftCarpenter(this);

  };

}

function WorkLeftClick(buffer) {

  this.id = ClientPacketID.WorkLeftClick /* 33 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();
    this.Skill = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.WorkLeftClick);
    /* PacketID: 33 */
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);
    buffer.WriteByte(this.Skill);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWorkLeftClick(this);

  };

}

function CreateNewGuild(buffer) {

  this.id = ClientPacketID.CreateNewGuild /* 34 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Desc = buffer.ReadUnicodeString();
    this.GuildName = buffer.ReadUnicodeString();
    this.Site = buffer.ReadUnicodeString();
    this.Codex = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CreateNewGuild);
    /* PacketID: 34 */
    buffer.WriteUnicodeString(this.Desc);
    buffer.WriteUnicodeString(this.GuildName);
    buffer.WriteUnicodeString(this.Site);
    buffer.WriteUnicodeString(this.Codex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCreateNewGuild(this);

  };

}

function SpellInfo(buffer) {

  this.id = ClientPacketID.SpellInfo /* 35 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.SpellInfo);
    /* PacketID: 35 */
    buffer.WriteByte(this.Slot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSpellInfo(this);

  };

}

function EquipItem(buffer) {

  this.id = ClientPacketID.EquipItem /* 36 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.EquipItem);
    /* PacketID: 36 */
    buffer.WriteByte(this.Slot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleEquipItem(this);

  };

}

function ChangeHeading(buffer) {

  this.id = ClientPacketID.ChangeHeading /* 37 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Heading = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ChangeHeading);
    /* PacketID: 37 */
    buffer.WriteByte(this.Heading);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeHeading(this);

  };

}

function ModifySkills(buffer) {

  this.id = ClientPacketID.ModifySkills /* 38 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    let i;
    this.Skills = [];
    for (i = 0; i < 20; ++i) this.Skills[i] = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ModifySkills);
    /* PacketID: 38 */
    let i;
    for (i = 0; i < 20; ++i) buffer.WriteByte(this.Skills[i]);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleModifySkills(this);

  };

}

function Train(buffer) {

  this.id = ClientPacketID.Train /* 39 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.PetIndex = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Train);
    /* PacketID: 39 */
    buffer.WriteByte(this.PetIndex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTrain(this);

  };

}

function CommerceBuy(buffer) {

  this.id = ClientPacketID.CommerceBuy /* 40 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();
    this.Amount = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CommerceBuy);
    /* PacketID: 40 */
    buffer.WriteByte(this.Slot);
    buffer.WriteInteger(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCommerceBuy(this);

  };

}

function BankExtractItem(buffer) {

  this.id = ClientPacketID.BankExtractItem /* 41 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();
    this.Amount = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BankExtractItem);
    /* PacketID: 41 */
    buffer.WriteByte(this.Slot);
    buffer.WriteInteger(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBankExtractItem(this);

  };

}

function CommerceSell(buffer) {

  this.id = ClientPacketID.CommerceSell /* 42 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();
    this.Amount = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CommerceSell);
    /* PacketID: 42 */
    buffer.WriteByte(this.Slot);
    buffer.WriteInteger(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCommerceSell(this);

  };

}

function BankDeposit(buffer) {

  this.id = ClientPacketID.BankDeposit /* 43 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();
    this.Amount = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BankDeposit);
    /* PacketID: 43 */
    buffer.WriteByte(this.Slot);
    buffer.WriteInteger(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBankDeposit(this);

  };

}

function ForumPost(buffer) {

  this.id = ClientPacketID.ForumPost /* 44 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.MsgType = buffer.ReadByte();
    this.Title = buffer.ReadUnicodeString();
    this.Post = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ForumPost);
    /* PacketID: 44 */
    buffer.WriteByte(this.MsgType);
    buffer.WriteUnicodeString(this.Title);
    buffer.WriteUnicodeString(this.Post);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleForumPost(this);

  };

}

function MoveSpell(buffer) {

  this.id = ClientPacketID.MoveSpell /* 45 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Direction = buffer.ReadBoolean();
    this.Slot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.MoveSpell);
    /* PacketID: 45 */
    buffer.WriteBoolean(this.Direction);
    buffer.WriteByte(this.Slot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMoveSpell(this);

  };

}

function MoveBank(buffer) {

  this.id = ClientPacketID.MoveBank /* 46 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Direction = buffer.ReadBoolean();
    this.Slot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.MoveBank);
    /* PacketID: 46 */
    buffer.WriteBoolean(this.Direction);
    buffer.WriteByte(this.Slot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMoveBank(this);

  };

}

function ClanCodexUpdate(buffer) {

  this.id = ClientPacketID.ClanCodexUpdate /* 47 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Desc = buffer.ReadUnicodeString();
    this.Codex = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ClanCodexUpdate);
    /* PacketID: 47 */
    buffer.WriteUnicodeString(this.Desc);
    buffer.WriteUnicodeString(this.Codex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleClanCodexUpdate(this);

  };

}

function UserCommerceOffer(buffer) {

  this.id = ClientPacketID.UserCommerceOffer /* 48 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Slot = buffer.ReadByte();
    this.Amount = buffer.ReadLong();
    this.OfferSlot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UserCommerceOffer);
    /* PacketID: 48 */
    buffer.WriteByte(this.Slot);
    buffer.WriteLong(this.Amount);
    buffer.WriteByte(this.OfferSlot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUserCommerceOffer(this);

  };

}

function GuildAcceptPeace(buffer) {

  this.id = ClientPacketID.GuildAcceptPeace /* 49 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildAcceptPeace);
    /* PacketID: 49 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildAcceptPeace(this);

  };

}

function GuildRejectAlliance(buffer) {

  this.id = ClientPacketID.GuildRejectAlliance /* 50 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildRejectAlliance);
    /* PacketID: 50 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildRejectAlliance(this);

  };

}

function GuildRejectPeace(buffer) {

  this.id = ClientPacketID.GuildRejectPeace /* 51 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildRejectPeace);
    /* PacketID: 51 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildRejectPeace(this);

  };

}

function GuildAcceptAlliance(buffer) {

  this.id = ClientPacketID.GuildAcceptAlliance /* 52 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildAcceptAlliance);
    /* PacketID: 52 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildAcceptAlliance(this);

  };

}

function GuildOfferPeace(buffer) {

  this.id = ClientPacketID.GuildOfferPeace /* 53 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();
    this.Proposal = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildOfferPeace);
    /* PacketID: 53 */
    buffer.WriteUnicodeString(this.Guild);
    buffer.WriteUnicodeString(this.Proposal);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildOfferPeace(this);

  };

}

function GuildOfferAlliance(buffer) {

  this.id = ClientPacketID.GuildOfferAlliance /* 54 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();
    this.Proposal = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildOfferAlliance);
    /* PacketID: 54 */
    buffer.WriteUnicodeString(this.Guild);
    buffer.WriteUnicodeString(this.Proposal);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildOfferAlliance(this);

  };

}

function GuildAllianceDetails(buffer) {

  this.id = ClientPacketID.GuildAllianceDetails /* 55 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildAllianceDetails);
    /* PacketID: 55 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildAllianceDetails(this);

  };

}

function GuildPeaceDetails(buffer) {

  this.id = ClientPacketID.GuildPeaceDetails /* 56 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildPeaceDetails);
    /* PacketID: 56 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildPeaceDetails(this);

  };

}

function GuildRequestJoinerInfo(buffer) {

  this.id = ClientPacketID.GuildRequestJoinerInfo /* 57 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.User = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildRequestJoinerInfo);
    /* PacketID: 57 */
    buffer.WriteUnicodeString(this.User);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildRequestJoinerInfo(this);

  };

}

function GuildAlliancePropList(buffer) {

  this.id = ClientPacketID.GuildAlliancePropList /* 58 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildAlliancePropList);
    /* PacketID: 58 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildAlliancePropList(this);

  };

}

function GuildPeacePropList(buffer) {

  this.id = ClientPacketID.GuildPeacePropList /* 59 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildPeacePropList);
    /* PacketID: 59 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildPeacePropList(this);

  };

}

function GuildDeclareWar(buffer) {

  this.id = ClientPacketID.GuildDeclareWar /* 60 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildDeclareWar);
    /* PacketID: 60 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildDeclareWar(this);

  };

}

function GuildNewWebsite(buffer) {

  this.id = ClientPacketID.GuildNewWebsite /* 61 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Website = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildNewWebsite);
    /* PacketID: 61 */
    buffer.WriteUnicodeString(this.Website);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildNewWebsite(this);

  };

}

function GuildAcceptNewMember(buffer) {

  this.id = ClientPacketID.GuildAcceptNewMember /* 62 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildAcceptNewMember);
    /* PacketID: 62 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildAcceptNewMember(this);

  };

}

function GuildRejectNewMember(buffer) {

  this.id = ClientPacketID.GuildRejectNewMember /* 63 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildRejectNewMember);
    /* PacketID: 63 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildRejectNewMember(this);

  };

}

function GuildKickMember(buffer) {

  this.id = ClientPacketID.GuildKickMember /* 64 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildKickMember);
    /* PacketID: 64 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildKickMember(this);

  };

}

function GuildUpdateNews(buffer) {

  this.id = ClientPacketID.GuildUpdateNews /* 65 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.News = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildUpdateNews);
    /* PacketID: 65 */
    buffer.WriteUnicodeString(this.News);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildUpdateNews(this);

  };

}

function GuildMemberInfo(buffer) {

  this.id = ClientPacketID.GuildMemberInfo /* 66 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildMemberInfo);
    /* PacketID: 66 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildMemberInfo(this);

  };

}

function GuildOpenElections(buffer) {

  this.id = ClientPacketID.GuildOpenElections /* 67 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildOpenElections);
    /* PacketID: 67 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildOpenElections(this);

  };

}

function GuildRequestMembership(buffer) {

  this.id = ClientPacketID.GuildRequestMembership /* 68 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();
    this.Application = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildRequestMembership);
    /* PacketID: 68 */
    buffer.WriteUnicodeString(this.Guild);
    buffer.WriteUnicodeString(this.Application);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildRequestMembership(this);

  };

}

function GuildRequestDetails(buffer) {

  this.id = ClientPacketID.GuildRequestDetails /* 69 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Guild = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildRequestDetails);
    /* PacketID: 69 */
    buffer.WriteUnicodeString(this.Guild);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildRequestDetails(this);

  };

}

function Online(buffer) {

  this.id = ClientPacketID.Online /* 70 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Online);
    /* PacketID: 70 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleOnline(this);

  };

}

function Quit(buffer) {

  this.id = ClientPacketID.Quit /* 71 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Quit);
    /* PacketID: 71 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleQuit(this);

  };

}

function GuildLeave(buffer) {

  this.id = ClientPacketID.GuildLeave /* 72 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildLeave);
    /* PacketID: 72 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildLeave(this);

  };

}

function RequestAccountState(buffer) {

  this.id = ClientPacketID.RequestAccountState /* 73 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestAccountState);
    /* PacketID: 73 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestAccountState(this);

  };

}

function PetStand(buffer) {

  this.id = ClientPacketID.PetStand /* 74 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PetStand);
    /* PacketID: 74 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePetStand(this);

  };

}

function PetFollow(buffer) {

  this.id = ClientPacketID.PetFollow /* 75 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PetFollow);
    /* PacketID: 75 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePetFollow(this);

  };

}

function ReleasePet(buffer) {

  this.id = ClientPacketID.ReleasePet /* 76 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ReleasePet);
    /* PacketID: 76 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReleasePet(this);

  };

}

function TrainList(buffer) {

  this.id = ClientPacketID.TrainList /* 77 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.TrainList);
    /* PacketID: 77 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTrainList(this);

  };

}

function Rest(buffer) {

  this.id = ClientPacketID.Rest /* 78 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Rest);
    /* PacketID: 78 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRest(this);

  };

}

function Meditate(buffer) {

  this.id = ClientPacketID.Meditate /* 79 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Meditate);
    /* PacketID: 79 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMeditate(this);

  };

}

function Resucitate(buffer) {

  this.id = ClientPacketID.Resucitate /* 80 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Resucitate);
    /* PacketID: 80 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleResucitate(this);

  };

}

function Heal(buffer) {

  this.id = ClientPacketID.Heal /* 81 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Heal);
    /* PacketID: 81 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleHeal(this);

  };

}

function Help(buffer) {

  this.id = ClientPacketID.Help /* 82 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Help);
    /* PacketID: 82 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleHelp(this);

  };

}

function RequestStats(buffer) {

  this.id = ClientPacketID.RequestStats /* 83 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestStats);
    /* PacketID: 83 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestStats(this);

  };

}

function CommerceStart(buffer) {

  this.id = ClientPacketID.CommerceStart /* 84 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CommerceStart);
    /* PacketID: 84 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCommerceStart(this);

  };

}

function BankStart(buffer) {

  this.id = ClientPacketID.BankStart /* 85 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BankStart);
    /* PacketID: 85 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBankStart(this);

  };

}

function Enlist(buffer) {

  this.id = ClientPacketID.Enlist /* 86 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Enlist);
    /* PacketID: 86 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleEnlist(this);

  };

}

function Information(buffer) {

  this.id = ClientPacketID.Information /* 87 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Information);
    /* PacketID: 87 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleInformation(this);

  };

}

function Reward(buffer) {

  this.id = ClientPacketID.Reward /* 88 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Reward);
    /* PacketID: 88 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReward(this);

  };

}

function RequestMOTD(buffer) {

  this.id = ClientPacketID.RequestMOTD /* 89 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestMOTD);
    /* PacketID: 89 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestMOTD(this);

  };

}

function UpTime(buffer) {

  this.id = ClientPacketID.UpTime /* 90 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.UpTime);
    /* PacketID: 90 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUpTime(this);

  };

}

function PartyLeave(buffer) {

  this.id = ClientPacketID.PartyLeave /* 91 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyLeave);
    /* PacketID: 91 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyLeave(this);

  };

}

function PartyCreate(buffer) {

  this.id = ClientPacketID.PartyCreate /* 92 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyCreate);
    /* PacketID: 92 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyCreate(this);

  };

}

function PartyJoin(buffer) {

  this.id = ClientPacketID.PartyJoin /* 93 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyJoin);
    /* PacketID: 93 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyJoin(this);

  };

}

function Inquiry(buffer) {

  this.id = ClientPacketID.Inquiry /* 94 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Inquiry);
    /* PacketID: 94 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleInquiry(this);

  };

}

function GuildMessage(buffer) {

  this.id = ClientPacketID.GuildMessage /* 95 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildMessage);
    /* PacketID: 95 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildMessage(this);

  };

}

function PartyMessage(buffer) {

  this.id = ClientPacketID.PartyMessage /* 96 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyMessage);
    /* PacketID: 96 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyMessage(this);

  };

}

function CentinelReport(buffer) {

  this.id = ClientPacketID.CentinelReport /* 97 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Code = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CentinelReport);
    /* PacketID: 97 */
    buffer.WriteInteger(this.Code);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCentinelReport(this);

  };

}

function GuildOnline(buffer) {

  this.id = ClientPacketID.GuildOnline /* 98 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildOnline);
    /* PacketID: 98 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildOnline(this);

  };

}

function PartyOnline(buffer) {

  this.id = ClientPacketID.PartyOnline /* 99 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyOnline);
    /* PacketID: 99 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyOnline(this);

  };

}

function CouncilMessage(buffer) {

  this.id = ClientPacketID.CouncilMessage /* 100 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.CouncilMessage);
    /* PacketID: 100 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCouncilMessage(this);

  };

}

function RoleMasterRequest(buffer) {

  this.id = ClientPacketID.RoleMasterRequest /* 101 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Request = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RoleMasterRequest);
    /* PacketID: 101 */
    buffer.WriteUnicodeString(this.Request);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRoleMasterRequest(this);

  };

}

function GMRequest(buffer) {

  this.id = ClientPacketID.GMRequest /* 102 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GMRequest);
    /* PacketID: 102 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGMRequest(this);

  };

}

function BugReport(buffer) {

  this.id = ClientPacketID.BugReport /* 103 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Report = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BugReport);
    /* PacketID: 103 */
    buffer.WriteUnicodeString(this.Report);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBugReport(this);

  };

}

function ChangeDescription(buffer) {

  this.id = ClientPacketID.ChangeDescription /* 104 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Description = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ChangeDescription);
    /* PacketID: 104 */
    buffer.WriteUnicodeString(this.Description);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeDescription(this);

  };

}

function GuildVote(buffer) {

  this.id = ClientPacketID.GuildVote /* 105 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Vote = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildVote);
    /* PacketID: 105 */
    buffer.WriteUnicodeString(this.Vote);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildVote(this);

  };

}

function Punishments(buffer) {

  this.id = ClientPacketID.Punishments /* 106 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Name = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Punishments);
    /* PacketID: 106 */
    buffer.WriteUnicodeString(this.Name);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePunishments(this);

  };

}

function ChangePassword(buffer) {

  this.id = ClientPacketID.ChangePassword /* 107 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.OldPass = buffer.ReadUnicodeString();
    this.NewPass = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ChangePassword);
    /* PacketID: 107 */
    buffer.WriteUnicodeString(this.OldPass);
    buffer.WriteUnicodeString(this.NewPass);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangePassword(this);

  };

}

function Gamble(buffer) {

  this.id = ClientPacketID.Gamble /* 108 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Amount = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Gamble);
    /* PacketID: 108 */
    buffer.WriteInteger(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGamble(this);

  };

}

function InquiryVote(buffer) {

  this.id = ClientPacketID.InquiryVote /* 109 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Opt = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.InquiryVote);
    /* PacketID: 109 */
    buffer.WriteByte(this.Opt);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleInquiryVote(this);

  };

}

function LeaveFaction(buffer) {

  this.id = ClientPacketID.LeaveFaction /* 110 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.LeaveFaction);
    /* PacketID: 110 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleLeaveFaction(this);

  };

}

function BankExtractGold(buffer) {

  this.id = ClientPacketID.BankExtractGold /* 111 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Amount = buffer.ReadLong();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BankExtractGold);
    /* PacketID: 111 */
    buffer.WriteLong(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBankExtractGold(this);

  };

}

function BankDepositGold(buffer) {

  this.id = ClientPacketID.BankDepositGold /* 112 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Amount = buffer.ReadLong();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.BankDepositGold);
    /* PacketID: 112 */
    buffer.WriteLong(this.Amount);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBankDepositGold(this);

  };

}

function Denounce(buffer) {

  this.id = ClientPacketID.Denounce /* 113 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Text = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Denounce);
    /* PacketID: 113 */
    buffer.WriteUnicodeString(this.Text);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDenounce(this);

  };

}

function GuildFundate(buffer) {

  this.id = ClientPacketID.GuildFundate /* 114 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildFundate);
    /* PacketID: 114 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildFundate(this);

  };

}

function GuildFundation(buffer) {

  this.id = ClientPacketID.GuildFundation /* 115 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.ClanType = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.GuildFundation);
    /* PacketID: 115 */
    buffer.WriteByte(this.ClanType);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildFundation(this);

  };

}

function PartyKick(buffer) {

  this.id = ClientPacketID.PartyKick /* 116 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyKick);
    /* PacketID: 116 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyKick(this);

  };

}

function PartySetLeader(buffer) {

  this.id = ClientPacketID.PartySetLeader /* 117 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartySetLeader);
    /* PacketID: 117 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartySetLeader(this);

  };

}

function PartyAcceptMember(buffer) {

  this.id = ClientPacketID.PartyAcceptMember /* 118 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.PartyAcceptMember);
    /* PacketID: 118 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePartyAcceptMember(this);

  };

}

function Ping(buffer) {

  this.id = ClientPacketID.Ping /* 119 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Ping);
    /* PacketID: 119 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handlePing(this);

  };

}

function RequestPartyForm(buffer) {

  this.id = ClientPacketID.RequestPartyForm /* 120 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.RequestPartyForm);
    /* PacketID: 120 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestPartyForm(this);

  };

}

function ItemUpgrade(buffer) {

  this.id = ClientPacketID.ItemUpgrade /* 121 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.ItemIndex = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ItemUpgrade);
    /* PacketID: 121 */
    buffer.WriteInteger(this.ItemIndex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleItemUpgrade(this);

  };

}

function GMCommands(buffer) {

  this.id = ClientPacketID.GMCommands /* 122 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {

  };

  this.dispatch = function (d) {
    d.handleGMCommands(this);

  };
}

function InitCrafting(buffer) {

  this.id = ClientPacketID.InitCrafting /* 123 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.TotalItems = buffer.ReadLong();
    this.ItemsPorCiclo = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.InitCrafting);
    /* PacketID: 123 */
    buffer.WriteLong(this.TotalItems);
    buffer.WriteInteger(this.ItemsPorCiclo);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleInitCrafting(this);

  };

}

function Home(buffer) {

  this.id = ClientPacketID.Home /* 124 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Home);
    /* PacketID: 124 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleHome(this);

  };

}

function ShowGuildNews(buffer) {

  this.id = ClientPacketID.ShowGuildNews /* 125 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ShowGuildNews);
    /* PacketID: 125 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleShowGuildNews(this);

  };

}

function ShareNpc(buffer) {

  this.id = ClientPacketID.ShareNpc /* 126 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.ShareNpc);
    /* PacketID: 126 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleShareNpc(this);

  };

}

function StopSharingNpc(buffer) {

  this.id = ClientPacketID.StopSharingNpc /* 127 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.StopSharingNpc);
    /* PacketID: 127 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleStopSharingNpc(this);

  };

}

function Consultation(buffer) {

  this.id = ClientPacketID.Consultation /* 128 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.Consultation);
    /* PacketID: 128 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleConsultation(this);

  };

}

function MoveItem(buffer) {

  this.id = ClientPacketID.MoveItem /* 129 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.OldSlot = buffer.ReadByte();
    this.NewSlot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID.MoveItem);
    /* PacketID: 129 */
    buffer.WriteByte(this.OldSlot);
    buffer.WriteByte(this.NewSlot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMoveItem(this);

  };

}

let ClientGMPacketID = {
  GMMessage: 1,
  ShowName: 2,
  OnlineRoyalArmy: 3,
  OnlineChaosLegion: 4,
  GoNearby: 5,
  Comment: 6,
  ServerTime: 7,
  Where: 8,
  CreaturesInMap: 9,
  WarpMeToTarget: 10,
  WarpChar: 11,
  Silence: 12,
  SOSShowList: 13,
  SOSRemove: 14,
  GoToChar: 15,
  Invisible: 16,
  GMPanel: 17,
  RequestUserList: 18,
  Working: 19,
  Hiding: 20,
  Jail: 21,
  KillNPC: 22,
  WarnUser: 23,
  EditChar: 24,
  RequestCharInfo: 25,
  RequestCharStats: 26,
  RequestCharGold: 27,
  RequestCharInventory: 28,
  RequestCharBank: 29,
  RequestCharSkills: 30,
  ReviveChar: 31,
  OnlineGM: 32,
  OnlineMap: 33,
  Forgive: 34,
  Kick: 35,
  Execute: 36,
  BanChar: 37,
  UnbanChar: 38,
  NPCFollow: 39,
  SummonChar: 40,
  SpawnListRequest: 41,
  SpawnCreature: 42,
  ResetNPCInventory: 43,
  CleanWorld: 44,
  ServerMessage: 45,
  NickToIP: 46,
  IPToNick: 47,
  GuildOnlineMembers: 48,
  TeleportCreate: 49,
  TeleportDestroy: 50,
  RainToggle: 51,
  SetCharDescription: 52,
  ForceMIDIToMap: 53,
  ForceWAVEToMap: 54,
  RoyalArmyMessage: 55,
  ChaosLegionMessage: 56,
  CitizenMessage: 57,
  CriminalMessage: 58,
  TalkAsNPC: 59,
  DestroyAllItemsInArea: 60,
  AcceptRoyalCouncilMember: 61,
  AcceptChaosCouncilMember: 62,
  ItemsInTheFloor: 63,
  MakeDumb: 64,
  MakeDumbNoMore: 65,
  DumpIPTables: 66,
  CouncilKick: 67,
  SetTrigger: 68,
  AskTrigger: 69,
  BannedIPList: 70,
  BannedIPReload: 71,
  GuildMemberList: 72,
  GuildBan: 73,
  BanIP: 74,
  UnbanIP: 75,
  CreateItem: 76,
  DestroyItems: 77,
  ChaosLegionKick: 78,
  RoyalArmyKick: 79,
  ForceMIDIAll: 80,
  ForceWAVEAll: 81,
  RemovePunishment: 82,
  TileBlockedToggle: 83,
  KillNPCNoRespawn: 84,
  KillAllNearbyNPCs: 85,
  LastIP: 86,
  ChangeMOTD: 87,
  SetMOTD: 88,
  SystemMessage: 89,
  CreateNPC: 90,
  CreateNPCWithRespawn: 91,
  ImperialArmour: 92,
  ChaosArmour: 93,
  NavigateToggle: 94,
  ServerOpenToUsersToggle: 95,
  TurnOffServer: 96,
  TurnCriminal: 97,
  ResetFactions: 98,
  RemoveCharFromGuild: 99,
  RequestCharMail: 100,
  AlterPassword: 101,
  AlterMail: 102,
  AlterName: 103,
  ToggleCentinelActivated: 104,
  DoBackUp: 105,
  ShowGuildMessages: 106,
  SaveMap: 107,
  ChangeMapInfoPK: 108,
  ChangeMapInfoBackup: 109,
  ChangeMapInfoRestricted: 110,
  ChangeMapInfoNoMagic: 111,
  ChangeMapInfoNoInvi: 112,
  ChangeMapInfoNoResu: 113,
  ChangeMapInfoLand: 114,
  ChangeMapInfoZone: 115,
  ChangeMapInfoStealNpc: 116,
  ChangeMapInfoNoOcultar: 117,
  ChangeMapInfoNoInvocar: 118,
  SaveChars: 119,
  CleanSOS: 120,
  ShowServerForm: 121,
  Night: 122,
  KickAllChars: 123,
  ReloadNPCs: 124,
  ReloadServerIni: 125,
  ReloadSpells: 126,
  ReloadObjects: 127,
  Restart: 128,
  ResetAutoUpdate: 129,
  ChatColor: 130,
  Ignored: 131,
  CheckSlot: 132,
  SetIniVar: 133,
  CreatePretorianClan: 134,
  RemovePretorianClan: 135,
  EnableDenounces: 136,
  ShowDenouncesList: 137,
  MapMessage: 138,
  SetDialog: 139,
  Impersonate: 140,
  Imitate: 141,
  RecordAdd: 142,
  RecordRemove: 143,
  RecordAddObs: 144,
  RecordListRequest: 145,
  RecordDetailsRequest: 146,
  AlterGuildName: 147,
  HigherAdminsMessage: 148,
  ClientGMPacketID_PACKET_COUNT: 149
};

function GMMessage(buffer) {

  this.id = ClientGMPacketID.GMMessage /* 1 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Chat = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GMMessage);
    /* PacketID: 1 */
    buffer.WriteUnicodeString(this.Chat);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGMMessage(this);
  };
}


function ShowName(buffer) {

  this.id = ClientGMPacketID.ShowName /* 2 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ShowName);
    /* PacketID: 2 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleShowName(this);
  };
}


function OnlineRoyalArmy(buffer) {

  this.id = ClientGMPacketID.OnlineRoyalArmy /* 3 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.OnlineRoyalArmy);
    /* PacketID: 3 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleOnlineRoyalArmy(this);
  };
}


function OnlineChaosLegion(buffer) {

  this.id = ClientGMPacketID.OnlineChaosLegion /* 4 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.OnlineChaosLegion);
    /* PacketID: 4 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleOnlineChaosLegion(this);
  };
}


function GoNearby(buffer) {

  this.id = ClientGMPacketID.GoNearby /* 5 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GoNearby);
    /* PacketID: 5 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGoNearby(this);
  };
}


function Comment(buffer) {

  this.id = ClientGMPacketID.Comment /* 6 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Data = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Comment);
    /* PacketID: 6 */
    buffer.WriteUnicodeString(this.Data);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleComment(this);
  };
}


function ServerTime(buffer) {

  this.id = ClientGMPacketID.ServerTime /* 7 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ServerTime);
    /* PacketID: 7 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleServerTime(this);
  };
}


function Where(buffer) {

  this.id = ClientGMPacketID.Where /* 8 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Where);
    /* PacketID: 8 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWhere(this);
  };
}


function CreaturesInMap(buffer) {

  this.id = ClientGMPacketID.CreaturesInMap /* 9 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Map = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CreaturesInMap);
    /* PacketID: 9 */
    buffer.WriteInteger(this.Map);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCreaturesInMap(this);
  };
}


function WarpMeToTarget(buffer) {

  this.id = ClientGMPacketID.WarpMeToTarget /* 10 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(122);
    buffer.WriteByte(ClientGMPacketID.WarpMeToTarget);
    /* PacketID: 10 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWarpMeToTarget(this);
  };
}


function WarpChar(buffer) {

  this.id = ClientGMPacketID.WarpChar /* 11 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Map = buffer.ReadInteger();
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(122);
    buffer.WriteByte(ClientGMPacketID.WarpChar);
    /* PacketID: 11 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteInteger(this.Map);
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWarpChar(this);
  };
}


function Silence(buffer) {

  this.id = ClientGMPacketID.Silence /* 12 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Silence);
    /* PacketID: 12 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSilence(this);
  };
}


function SOSShowList(buffer) {

  this.id = ClientGMPacketID.SOSShowList /* 13 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SOSShowList);
    /* PacketID: 13 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSOSShowList(this);
  };
}


function SOSRemove(buffer) {

  this.id = ClientGMPacketID.SOSRemove /* 14 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SOSRemove);
    /* PacketID: 14 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSOSRemove(this);
  };
}


function GoToChar(buffer) {

  this.id = ClientGMPacketID.GoToChar /* 15 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GoToChar);
    /* PacketID: 15 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGoToChar(this);
  };
}


function Invisible(buffer) {

  this.id = ClientGMPacketID.Invisible /* 16 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Invisible);
    /* PacketID: 16 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleInvisible(this);
  };
}


function GMPanel(buffer) {

  this.id = ClientGMPacketID.GMPanel /* 17 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GMPanel);
    /* PacketID: 17 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGMPanel(this);
  };
}


function RequestUserList(buffer) {

  this.id = ClientGMPacketID.RequestUserList /* 18 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestUserList);
    /* PacketID: 18 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestUserList(this);
  };
}


function Working(buffer) {

  this.id = ClientGMPacketID.Working /* 19 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Working);
    /* PacketID: 19 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWorking(this);
  };
}


function Hiding(buffer) {

  this.id = ClientGMPacketID.Hiding /* 20 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Hiding);
    /* PacketID: 20 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleHiding(this);
  };
}


function Jail(buffer) {

  this.id = ClientGMPacketID.Jail /* 21 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();
    this.JailTime = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Jail);
    /* PacketID: 21 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);
    buffer.WriteByte(this.JailTime);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleJail(this);
  };
}


function KillNPC(buffer) {

  this.id = ClientGMPacketID.KillNPC /* 22 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.KillNPC);
    /* PacketID: 22 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleKillNPC(this);
  };
}


function WarnUser(buffer) {

  this.id = ClientGMPacketID.WarnUser /* 23 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.WarnUser);
    /* PacketID: 23 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleWarnUser(this);
  };
}


function EditChar(buffer) {

  this.id = ClientGMPacketID.EditChar /* 24 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Opcion = buffer.ReadByte();
    this.Arg1 = buffer.ReadUnicodeString();
    this.Arg2 = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.EditChar);
    /* PacketID: 24 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteByte(this.Opcion);
    buffer.WriteUnicodeString(this.Arg1);
    buffer.WriteUnicodeString(this.Arg2);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleEditChar(this);
  };
}


function RequestCharInfo(buffer) {

  this.id = ClientGMPacketID.RequestCharInfo /* 25 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.TargetName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharInfo);
    /* PacketID: 25 */
    buffer.WriteUnicodeString(this.TargetName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharInfo(this);
  };
}


function RequestCharStats(buffer) {

  this.id = ClientGMPacketID.RequestCharStats /* 26 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharStats);
    /* PacketID: 26 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharStats(this);
  };
}


function RequestCharGold(buffer) {

  this.id = ClientGMPacketID.RequestCharGold /* 27 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharGold);
    /* PacketID: 27 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharGold(this);
  };
}


function RequestCharInventory(buffer) {

  this.id = ClientGMPacketID.RequestCharInventory /* 28 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharInventory);
    /* PacketID: 28 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharInventory(this);
  };
}


function RequestCharBank(buffer) {

  this.id = ClientGMPacketID.RequestCharBank /* 29 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharBank);
    /* PacketID: 29 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharBank(this);
  };
}


function RequestCharSkills(buffer) {

  this.id = ClientGMPacketID.RequestCharSkills /* 30 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharSkills);
    /* PacketID: 30 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharSkills(this);
  };
}


function ReviveChar(buffer) {

  this.id = ClientGMPacketID.ReviveChar /* 31 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ReviveChar);
    /* PacketID: 31 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReviveChar(this);
  };
}


function OnlineGM(buffer) {

  this.id = ClientGMPacketID.OnlineGM /* 32 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.OnlineGM);
    /* PacketID: 32 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleOnlineGM(this);
  };
}


function OnlineMap(buffer) {

  this.id = ClientGMPacketID.OnlineMap /* 33 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Map = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.OnlineMap);
    /* PacketID: 33 */
    buffer.WriteInteger(this.Map);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleOnlineMap(this);
  };
}


function Forgive(buffer) {

  this.id = ClientGMPacketID.Forgive /* 34 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Forgive);
    /* PacketID: 34 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleForgive(this);
  };
}


function Kick(buffer) {

  this.id = ClientGMPacketID.Kick /* 35 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Kick);
    /* PacketID: 35 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleKick(this);
  };
}


function Execute(buffer) {

  this.id = ClientGMPacketID.Execute /* 36 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Execute);
    /* PacketID: 36 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleExecute(this);
  };
}


function BanChar(buffer) {

  this.id = ClientGMPacketID.BanChar /* 37 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.BanChar);
    /* PacketID: 37 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBanChar(this);
  };
}


function UnbanChar(buffer) {

  this.id = ClientGMPacketID.UnbanChar /* 38 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.UnbanChar);
    /* PacketID: 38 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUnbanChar(this);
  };
}


function NPCFollow(buffer) {

  this.id = ClientGMPacketID.NPCFollow /* 39 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.NPCFollow);
    /* PacketID: 39 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleNPCFollow(this);
  };
}


function SummonChar(buffer) {

  this.id = ClientGMPacketID.SummonChar /* 40 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SummonChar);
    /* PacketID: 40 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSummonChar(this);
  };
}


function SpawnListRequest(buffer) {

  this.id = ClientGMPacketID.SpawnListRequest /* 41 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SpawnListRequest);
    /* PacketID: 41 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSpawnListRequest(this);
  };
}


function SpawnCreature(buffer) {

  this.id = ClientGMPacketID.SpawnCreature /* 42 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NPC = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SpawnCreature);
    /* PacketID: 42 */
    buffer.WriteInteger(this.NPC);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSpawnCreature(this);
  };
}


function ResetNPCInventory(buffer) {

  this.id = ClientGMPacketID.ResetNPCInventory /* 43 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ResetNPCInventory);
    /* PacketID: 43 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleResetNPCInventory(this);
  };
}


function CleanWorld(buffer) {

  this.id = ClientGMPacketID.CleanWorld /* 44 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CleanWorld);
    /* PacketID: 44 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCleanWorld(this);
  };
}


function ServerMessage(buffer) {

  this.id = ClientGMPacketID.ServerMessage /* 45 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ServerMessage);
    /* PacketID: 45 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleServerMessage(this);
  };
}


function NickToIP(buffer) {

  this.id = ClientGMPacketID.NickToIP /* 46 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.NickToIP);
    /* PacketID: 46 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleNickToIP(this);
  };
}


function IPToNick(buffer) {

  this.id = ClientGMPacketID.IPToNick /* 47 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.A = buffer.ReadByte();
    this.B = buffer.ReadByte();
    this.C = buffer.ReadByte();
    this.D = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.IPToNick);
    /* PacketID: 47 */
    buffer.WriteByte(this.A);
    buffer.WriteByte(this.B);
    buffer.WriteByte(this.C);
    buffer.WriteByte(this.D);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleIPToNick(this);
  };
}


function GuildOnlineMembers(buffer) {

  this.id = ClientGMPacketID.GuildOnlineMembers /* 48 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.GuildName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GuildOnlineMembers);
    /* PacketID: 48 */
    buffer.WriteUnicodeString(this.GuildName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildOnlineMembers(this);
  };
}


function TeleportCreate(buffer) {

  this.id = ClientGMPacketID.TeleportCreate /* 49 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Map = buffer.ReadInteger();
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();
    this.Radio = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.TeleportCreate);
    /* PacketID: 49 */
    buffer.WriteInteger(this.Map);
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);
    buffer.WriteByte(this.Radio);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTeleportCreate(this);
  };
}


function TeleportDestroy(buffer) {

  this.id = ClientGMPacketID.TeleportDestroy /* 50 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.TeleportDestroy);
    /* PacketID: 50 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTeleportDestroy(this);
  };
}


function RainToggle(buffer) {

  this.id = ClientGMPacketID.RainToggle /* 51 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RainToggle);
    /* PacketID: 51 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRainToggle(this);
  };
}


function SetCharDescription(buffer) {

  this.id = ClientGMPacketID.SetCharDescription /* 52 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Description = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SetCharDescription);
    /* PacketID: 52 */
    buffer.WriteUnicodeString(this.Description);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSetCharDescription(this);
  };
}


function ForceMIDIToMap(buffer) {

  this.id = ClientGMPacketID.ForceMIDIToMap /* 53 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.MidiID = buffer.ReadByte();
    this.Map = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ForceMIDIToMap);
    /* PacketID: 53 */
    buffer.WriteByte(this.MidiID);
    buffer.WriteInteger(this.Map);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleForceMIDIToMap(this);
  };
}


function ForceWAVEToMap(buffer) {

  this.id = ClientGMPacketID.ForceWAVEToMap /* 54 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Wave = buffer.ReadByte();
    this.Map = buffer.ReadInteger();
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ForceWAVEToMap);
    /* PacketID: 54 */
    buffer.WriteByte(this.Wave);
    buffer.WriteInteger(this.Map);
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleForceWAVEToMap(this);
  };
}


function RoyalArmyMessage(buffer) {

  this.id = ClientGMPacketID.RoyalArmyMessage /* 55 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RoyalArmyMessage);
    /* PacketID: 55 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRoyalArmyMessage(this);
  };
}


function ChaosLegionMessage(buffer) {

  this.id = ClientGMPacketID.ChaosLegionMessage /* 56 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChaosLegionMessage);
    /* PacketID: 56 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChaosLegionMessage(this);
  };
}


function CitizenMessage(buffer) {

  this.id = ClientGMPacketID.CitizenMessage /* 57 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CitizenMessage);
    /* PacketID: 57 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCitizenMessage(this);
  };
}


function CriminalMessage(buffer) {

  this.id = ClientGMPacketID.CriminalMessage /* 58 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CriminalMessage);
    /* PacketID: 58 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCriminalMessage(this);
  };
}


function TalkAsNPC(buffer) {

  this.id = ClientGMPacketID.TalkAsNPC /* 59 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.TalkAsNPC);
    /* PacketID: 59 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTalkAsNPC(this);
  };
}


function DestroyAllItemsInArea(buffer) {

  this.id = ClientGMPacketID.DestroyAllItemsInArea /* 60 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.DestroyAllItemsInArea);
    /* PacketID: 60 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDestroyAllItemsInArea(this);
  };
}


function AcceptRoyalCouncilMember(buffer) {

  this.id = ClientGMPacketID.AcceptRoyalCouncilMember /* 61 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AcceptRoyalCouncilMember);
    /* PacketID: 61 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAcceptRoyalCouncilMember(this);
  };
}


function AcceptChaosCouncilMember(buffer) {

  this.id = ClientGMPacketID.AcceptChaosCouncilMember /* 62 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AcceptChaosCouncilMember);
    /* PacketID: 62 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAcceptChaosCouncilMember(this);
  };
}


function ItemsInTheFloor(buffer) {

  this.id = ClientGMPacketID.ItemsInTheFloor /* 63 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ItemsInTheFloor);
    /* PacketID: 63 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleItemsInTheFloor(this);
  };
}


function MakeDumb(buffer) {

  this.id = ClientGMPacketID.MakeDumb /* 64 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.MakeDumb);
    /* PacketID: 64 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMakeDumb(this);
  };
}


function MakeDumbNoMore(buffer) {

  this.id = ClientGMPacketID.MakeDumbNoMore /* 65 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.MakeDumbNoMore);
    /* PacketID: 65 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMakeDumbNoMore(this);
  };
}


function DumpIPTables(buffer) {

  this.id = ClientGMPacketID.DumpIPTables /* 66 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.DumpIPTables);
    /* PacketID: 66 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDumpIPTables(this);
  };
}


function CouncilKick(buffer) {

  this.id = ClientGMPacketID.CouncilKick /* 67 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CouncilKick);
    /* PacketID: 67 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCouncilKick(this);
  };
}


function SetTrigger(buffer) {

  this.id = ClientGMPacketID.SetTrigger /* 68 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Trigger = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SetTrigger);
    /* PacketID: 68 */
    buffer.WriteByte(this.Trigger);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSetTrigger(this);
  };
}


function AskTrigger(buffer) {

  this.id = ClientGMPacketID.AskTrigger /* 69 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AskTrigger);
    /* PacketID: 69 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAskTrigger(this);
  };
}


function BannedIPList(buffer) {

  this.id = ClientGMPacketID.BannedIPList /* 70 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.BannedIPList);
    /* PacketID: 70 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBannedIPList(this);
  };
}


function BannedIPReload(buffer) {

  this.id = ClientGMPacketID.BannedIPReload /* 71 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.BannedIPReload);
    /* PacketID: 71 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBannedIPReload(this);
  };
}


function GuildMemberList(buffer) {

  this.id = ClientGMPacketID.GuildMemberList /* 72 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.GuildName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GuildMemberList);
    /* PacketID: 72 */
    buffer.WriteUnicodeString(this.GuildName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildMemberList(this);
  };
}


function GuildBan(buffer) {

  this.id = ClientGMPacketID.GuildBan /* 73 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.GuildName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.GuildBan);
    /* PacketID: 73 */
    buffer.WriteUnicodeString(this.GuildName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleGuildBan(this);
  };
}


function BanIP(buffer) {

  this.id = ClientGMPacketID.BanIP /* 74 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.IP = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.BanIP);
    /* PacketID: 74 */
    buffer.WriteUnicodeString(this.IP);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleBanIP(this);
  };
}


function UnbanIP(buffer) {

  this.id = ClientGMPacketID.UnbanIP /* 75 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.IP = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.UnbanIP);
    /* PacketID: 75 */
    buffer.WriteUnicodeString(this.IP);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleUnbanIP(this);
  };
}


function CreateItem(buffer) {

  this.id = ClientGMPacketID.CreateItem /* 76 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Item = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CreateItem);
    /* PacketID: 76 */
    buffer.WriteInteger(this.Item);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCreateItem(this);
  };
}


function DestroyItems(buffer) {

  this.id = ClientGMPacketID.DestroyItems /* 77 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.DestroyItems);
    /* PacketID: 77 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDestroyItems(this);
  };
}


function ChaosLegionKick(buffer) {

  this.id = ClientGMPacketID.ChaosLegionKick /* 78 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChaosLegionKick);
    /* PacketID: 78 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChaosLegionKick(this);
  };
}


function RoyalArmyKick(buffer) {

  this.id = ClientGMPacketID.RoyalArmyKick /* 79 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RoyalArmyKick);
    /* PacketID: 79 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRoyalArmyKick(this);
  };
}


function ForceMIDIAll(buffer) {

  this.id = ClientGMPacketID.ForceMIDIAll /* 80 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.MidiID = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ForceMIDIAll);
    /* PacketID: 80 */
    buffer.WriteByte(this.MidiID);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleForceMIDIAll(this);
  };
}


function ForceWAVEAll(buffer) {

  this.id = ClientGMPacketID.ForceWAVEAll /* 81 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.WaveID = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ForceWAVEAll);
    /* PacketID: 81 */
    buffer.WriteByte(this.WaveID);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleForceWAVEAll(this);
  };
}


function RemovePunishment(buffer) {

  this.id = ClientGMPacketID.RemovePunishment /* 82 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Punishment = buffer.ReadByte();
    this.NewText = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RemovePunishment);
    /* PacketID: 82 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteByte(this.Punishment);
    buffer.WriteUnicodeString(this.NewText);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRemovePunishment(this);
  };
}


function TileBlockedToggle(buffer) {

  this.id = ClientGMPacketID.TileBlockedToggle /* 83 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.TileBlockedToggle);
    /* PacketID: 83 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTileBlockedToggle(this);
  };
}


function KillNPCNoRespawn(buffer) {

  this.id = ClientGMPacketID.KillNPCNoRespawn /* 84 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.KillNPCNoRespawn);
    /* PacketID: 84 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleKillNPCNoRespawn(this);
  };
}


function KillAllNearbyNPCs(buffer) {

  this.id = ClientGMPacketID.KillAllNearbyNPCs /* 85 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.KillAllNearbyNPCs);
    /* PacketID: 85 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleKillAllNearbyNPCs(this);
  };
}


function LastIP(buffer) {

  this.id = ClientGMPacketID.LastIP /* 86 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.LastIP);
    /* PacketID: 86 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleLastIP(this);
  };
}


function ChangeMOTD(buffer) {

  this.id = ClientGMPacketID.ChangeMOTD /* 87 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMOTD);
    /* PacketID: 87 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMOTD(this);
  };
}


function SetMOTD(buffer) {

  this.id = ClientGMPacketID.SetMOTD /* 88 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Motd = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SetMOTD);
    /* PacketID: 88 */
    buffer.WriteUnicodeString(this.Motd);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSetMOTD(this);
  };
}


function SystemMessage(buffer) {

  this.id = ClientGMPacketID.SystemMessage /* 89 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SystemMessage);
    /* PacketID: 89 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSystemMessage(this);
  };
}


function CreateNPC(buffer) {

  this.id = ClientGMPacketID.CreateNPC /* 90 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NpcIndex = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CreateNPC);
    /* PacketID: 90 */
    buffer.WriteInteger(this.NpcIndex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCreateNPC(this);
  };
}


function CreateNPCWithRespawn(buffer) {

  this.id = ClientGMPacketID.CreateNPCWithRespawn /* 91 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NpcIndex = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CreateNPCWithRespawn);
    /* PacketID: 91 */
    buffer.WriteInteger(this.NpcIndex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCreateNPCWithRespawn(this);
  };
}


function ImperialArmour(buffer) {

  this.id = ClientGMPacketID.ImperialArmour /* 92 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Index = buffer.ReadByte();
    this.ObjIndex = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ImperialArmour);
    /* PacketID: 92 */
    buffer.WriteByte(this.Index);
    buffer.WriteInteger(this.ObjIndex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleImperialArmour(this);
  };
}


function ChaosArmour(buffer) {

  this.id = ClientGMPacketID.ChaosArmour /* 93 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Index = buffer.ReadByte();
    this.ObjIndex = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChaosArmour);
    /* PacketID: 93 */
    buffer.WriteByte(this.Index);
    buffer.WriteInteger(this.ObjIndex);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChaosArmour(this);
  };
}


function NavigateToggle(buffer) {

  this.id = ClientGMPacketID.NavigateToggle /* 94 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.NavigateToggle);
    /* PacketID: 94 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleNavigateToggle(this);
  };
}


function ServerOpenToUsersToggle(buffer) {

  this.id = ClientGMPacketID.ServerOpenToUsersToggle /* 95 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ServerOpenToUsersToggle);
    /* PacketID: 95 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleServerOpenToUsersToggle(this);
  };
}


function TurnOffServer(buffer) {

  this.id = ClientGMPacketID.TurnOffServer /* 96 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.TurnOffServer);
    /* PacketID: 96 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTurnOffServer(this);
  };
}


function TurnCriminal(buffer) {

  this.id = ClientGMPacketID.TurnCriminal /* 97 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.TurnCriminal);
    /* PacketID: 97 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleTurnCriminal(this);
  };
}


function ResetFactions(buffer) {

  this.id = ClientGMPacketID.ResetFactions /* 98 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ResetFactions);
    /* PacketID: 98 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleResetFactions(this);
  };
}


function RemoveCharFromGuild(buffer) {

  this.id = ClientGMPacketID.RemoveCharFromGuild /* 99 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RemoveCharFromGuild);
    /* PacketID: 99 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRemoveCharFromGuild(this);
  };
}


function RequestCharMail(buffer) {

  this.id = ClientGMPacketID.RequestCharMail /* 100 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RequestCharMail);
    /* PacketID: 100 */
    buffer.WriteUnicodeString(this.UserName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRequestCharMail(this);
  };
}


function AlterPassword(buffer) {

  this.id = ClientGMPacketID.AlterPassword /* 101 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.CopyFrom = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AlterPassword);
    /* PacketID: 101 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.CopyFrom);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAlterPassword(this);
  };
}


function AlterMail(buffer) {

  this.id = ClientGMPacketID.AlterMail /* 102 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.NewMail = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AlterMail);
    /* PacketID: 102 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.NewMail);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAlterMail(this);
  };
}


function AlterName(buffer) {

  this.id = ClientGMPacketID.AlterName /* 103 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.NewName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AlterName);
    /* PacketID: 103 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.NewName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAlterName(this);
  };
}


function ToggleCentinelActivated(buffer) {

  this.id = ClientGMPacketID.ToggleCentinelActivated /* 104 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ToggleCentinelActivated);
    /* PacketID: 104 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleToggleCentinelActivated(this);
  };
}


function DoBackUp(buffer) {

  this.id = ClientGMPacketID.DoBackUp /* 105 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.DoBackUp);
    /* PacketID: 105 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleDoBackUp(this);
  };
}


function ShowGuildMessages(buffer) {

  this.id = ClientGMPacketID.ShowGuildMessages /* 106 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.GuildName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ShowGuildMessages);
    /* PacketID: 106 */
    buffer.WriteUnicodeString(this.GuildName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleShowGuildMessages(this);
  };
}


function SaveMap(buffer) {

  this.id = ClientGMPacketID.SaveMap /* 107 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SaveMap);
    /* PacketID: 107 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSaveMap(this);
  };
}


function ChangeMapInfoPK(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoPK /* 108 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Pk = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoPK);
    /* PacketID: 108 */
    buffer.WriteBoolean(this.Pk);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoPK(this);
  };
}


function ChangeMapInfoBackup(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoBackup /* 109 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Backup = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoBackup);
    /* PacketID: 109 */
    buffer.WriteBoolean(this.Backup);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoBackup(this);
  };
}


function ChangeMapInfoRestricted(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoRestricted /* 110 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.RestrictedTo = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoRestricted);
    /* PacketID: 110 */
    buffer.WriteUnicodeString(this.RestrictedTo);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoRestricted(this);
  };
}


function ChangeMapInfoNoMagic(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoNoMagic /* 111 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NoMagic = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoNoMagic);
    /* PacketID: 111 */
    buffer.WriteBoolean(this.NoMagic);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoNoMagic(this);
  };
}


function ChangeMapInfoNoInvi(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoNoInvi /* 112 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NoInvi = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoNoInvi);
    /* PacketID: 112 */
    buffer.WriteBoolean(this.NoInvi);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoNoInvi(this);
  };
}


function ChangeMapInfoNoResu(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoNoResu /* 113 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NoResu = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoNoResu);
    /* PacketID: 113 */
    buffer.WriteBoolean(this.NoResu);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoNoResu(this);
  };
}


function ChangeMapInfoLand(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoLand /* 114 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Data = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoLand);
    /* PacketID: 114 */
    buffer.WriteUnicodeString(this.Data);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoLand(this);
  };
}


function ChangeMapInfoZone(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoZone /* 115 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Data = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoZone);
    /* PacketID: 115 */
    buffer.WriteUnicodeString(this.Data);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoZone(this);
  };
}


function ChangeMapInfoStealNpc(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoStealNpc /* 116 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.RoboNpc = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoStealNpc);
    /* PacketID: 116 */
    buffer.WriteBoolean(this.RoboNpc);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoStealNpc(this);
  };
}


function ChangeMapInfoNoOcultar(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoNoOcultar /* 117 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NoOcultar = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoNoOcultar);
    /* PacketID: 117 */
    buffer.WriteBoolean(this.NoOcultar);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoNoOcultar(this);
  };
}


function ChangeMapInfoNoInvocar(buffer) {

  this.id = ClientGMPacketID.ChangeMapInfoNoInvocar /* 118 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.NoInvocar = buffer.ReadBoolean();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChangeMapInfoNoInvocar);
    /* PacketID: 118 */
    buffer.WriteBoolean(this.NoInvocar);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChangeMapInfoNoInvocar(this);
  };
}


function SaveChars(buffer) {

  this.id = ClientGMPacketID.SaveChars /* 119 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SaveChars);
    /* PacketID: 119 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSaveChars(this);
  };
}


function CleanSOS(buffer) {

  this.id = ClientGMPacketID.CleanSOS /* 120 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CleanSOS);
    /* PacketID: 120 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCleanSOS(this);
  };
}


function ShowServerForm(buffer) {

  this.id = ClientGMPacketID.ShowServerForm /* 121 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ShowServerForm);
    /* PacketID: 121 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleShowServerForm(this);
  };
}


function Night(buffer) {

  this.id = ClientGMPacketID.Night /* 122 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Night);
    /* PacketID: 122 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleNight(this);
  };
}


function KickAllChars(buffer) {

  this.id = ClientGMPacketID.KickAllChars /* 123 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.KickAllChars);
    /* PacketID: 123 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleKickAllChars(this);
  };
}


function ReloadNPCs(buffer) {

  this.id = ClientGMPacketID.ReloadNPCs /* 124 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ReloadNPCs);
    /* PacketID: 124 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReloadNPCs(this);
  };
}


function ReloadServerIni(buffer) {

  this.id = ClientGMPacketID.ReloadServerIni /* 125 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ReloadServerIni);
    /* PacketID: 125 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReloadServerIni(this);
  };
}


function ReloadSpells(buffer) {

  this.id = ClientGMPacketID.ReloadSpells /* 126 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ReloadSpells);
    /* PacketID: 126 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReloadSpells(this);
  };
}


function ReloadObjects(buffer) {

  this.id = ClientGMPacketID.ReloadObjects /* 127 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ReloadObjects);
    /* PacketID: 127 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleReloadObjects(this);
  };
}


function Restart(buffer) {

  this.id = ClientGMPacketID.Restart /* 128 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Restart);
    /* PacketID: 128 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRestart(this);
  };
}


function ResetAutoUpdate(buffer) {

  this.id = ClientGMPacketID.ResetAutoUpdate /* 129 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ResetAutoUpdate);
    /* PacketID: 129 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleResetAutoUpdate(this);
  };
}


function ChatColor(buffer) {

  this.id = ClientGMPacketID.ChatColor /* 130 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.R = buffer.ReadByte();
    this.G = buffer.ReadByte();
    this.B = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ChatColor);
    /* PacketID: 130 */
    buffer.WriteByte(this.R);
    buffer.WriteByte(this.G);
    buffer.WriteByte(this.B);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleChatColor(this);
  };
}


function Ignored(buffer) {

  this.id = ClientGMPacketID.Ignored /* 131 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Ignored);
    /* PacketID: 131 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleIgnored(this);
  };
}


function CheckSlot(buffer) {

  this.id = ClientGMPacketID.CheckSlot /* 132 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Slot = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CheckSlot);
    /* PacketID: 132 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteByte(this.Slot);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCheckSlot(this);
  };
}


function SetIniVar(buffer) {

  this.id = ClientGMPacketID.SetIniVar /* 133 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Seccion = buffer.ReadUnicodeString();
    this.Clave = buffer.ReadUnicodeString();
    this.Valor = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SetIniVar);
    /* PacketID: 133 */
    buffer.WriteUnicodeString(this.Seccion);
    buffer.WriteUnicodeString(this.Clave);
    buffer.WriteUnicodeString(this.Valor);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSetIniVar(this);
  };
}


function CreatePretorianClan(buffer) {

  this.id = ClientGMPacketID.CreatePretorianClan /* 134 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Map = buffer.ReadInteger();
    this.X = buffer.ReadByte();
    this.Y = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.CreatePretorianClan);
    /* PacketID: 134 */
    buffer.WriteInteger(this.Map);
    buffer.WriteByte(this.X);
    buffer.WriteByte(this.Y);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleCreatePretorianClan(this);
  };
}


function RemovePretorianClan(buffer) {

  this.id = ClientGMPacketID.RemovePretorianClan /* 135 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Map = buffer.ReadInteger();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RemovePretorianClan);
    /* PacketID: 135 */
    buffer.WriteInteger(this.Map);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRemovePretorianClan(this);
  };
}


function EnableDenounces(buffer) {

  this.id = ClientGMPacketID.EnableDenounces /* 136 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.EnableDenounces);
    /* PacketID: 136 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleEnableDenounces(this);
  };
}


function ShowDenouncesList(buffer) {

  this.id = ClientGMPacketID.ShowDenouncesList /* 137 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.ShowDenouncesList);
    /* PacketID: 137 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleShowDenouncesList(this);
  };
}


function MapMessage(buffer) {

  this.id = ClientGMPacketID.MapMessage /* 138 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.MapMessage);
    /* PacketID: 138 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleMapMessage(this);
  };
}


function SetDialog(buffer) {

  this.id = ClientGMPacketID.SetDialog /* 139 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.SetDialog);
    /* PacketID: 139 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleSetDialog(this);
  };
}


function Impersonate(buffer) {

  this.id = ClientGMPacketID.Impersonate /* 140 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Impersonate);
    /* PacketID: 140 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleImpersonate(this);
  };
}


function Imitate(buffer) {

  this.id = ClientGMPacketID.Imitate /* 141 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.Imitate);
    /* PacketID: 141 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleImitate(this);
  };
}


function RecordAdd(buffer) {

  this.id = ClientGMPacketID.RecordAdd /* 142 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.UserName = buffer.ReadUnicodeString();
    this.Reason = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RecordAdd);
    /* PacketID: 142 */
    buffer.WriteUnicodeString(this.UserName);
    buffer.WriteUnicodeString(this.Reason);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRecordAdd(this);
  };
}


function RecordRemove(buffer) {

  this.id = ClientGMPacketID.RecordRemove /* 143 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Index = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RecordRemove);
    /* PacketID: 143 */
    buffer.WriteByte(this.Index);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRecordRemove(this);
  };
}


function RecordAddObs(buffer) {

  this.id = ClientGMPacketID.RecordAddObs /* 144 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Index = buffer.ReadByte();
    this.Obs = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RecordAddObs);
    /* PacketID: 144 */
    buffer.WriteByte(this.Index);
    buffer.WriteUnicodeString(this.Obs);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRecordAddObs(this);
  };
}


function RecordListRequest(buffer) {

  this.id = ClientGMPacketID.RecordListRequest /* 145 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RecordListRequest);
    /* PacketID: 145 */

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRecordListRequest(this);
  };
}


function RecordDetailsRequest(buffer) {

  this.id = ClientGMPacketID.RecordDetailsRequest /* 146 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Index = buffer.ReadByte();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.RecordDetailsRequest);
    /* PacketID: 146 */
    buffer.WriteByte(this.Index);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleRecordDetailsRequest(this);
  };
}


function AlterGuildName(buffer) {

  this.id = ClientGMPacketID.AlterGuildName /* 147 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.OldGuildName = buffer.ReadUnicodeString();
    this.NewGuildName = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.AlterGuildName);
    /* PacketID: 147 */
    buffer.WriteUnicodeString(this.OldGuildName);
    buffer.WriteUnicodeString(this.NewGuildName);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleAlterGuildName(this);
  };
}


function HigherAdminsMessage(buffer) {

  this.id = ClientGMPacketID.HigherAdminsMessage /* 148 */;
  if (buffer) {
    buffer.ReadByte();
    /* PacketID */
    this.Message = buffer.ReadUnicodeString();

  }
  this.serialize = function (buffer) {
    buffer.WriteByte(ClientPacketID_GMCommands);
    buffer.WriteByte(ClientGMPacketID.HigherAdminsMessage);
    /* PacketID: 148 */
    buffer.WriteUnicodeString(this.Message);

    buffer.flush();
  };

  this.dispatch = function (d) {
    d.handleHigherAdminsMessage(this);
  };
}


export default class Protocolo {

  constructor(pkg) {
    this.pkg = pkg;
  }

  BuildLoginExistingChar(UserName, Password) {
    let e = new LoginExistingChar();
    e.UserName = UserName;
    e.Password = Password;
    return e;
  }


  BuildThrowDices() {
    return new ThrowDices();
  }


  BuildLoginNewChar(UserName, Password, Race, Gender, Class, Head, Mail, Homeland) {
    let e = new LoginNewChar();
    e.UserName = UserName;
    e.Password = Password;
    e.Race = Number(Race);
    e.Gender = Number(Gender);
    e.Class = Number(Class);
    e.Head = Number(Head);
    e.Mail = Mail;
    e.Homeland = Number(Homeland);
    return e;
  }


  BuildTalk(Chat) {
    let e = new Talk();
    e.Chat = Chat;
    return e;
  }


  BuildYell(Chat) {
    let e = new Yell();
    e.Chat = Chat;
    return e;
  }


  BuildWhisper(TargetName, Chat) {
    let e = new Whisper();
    e.TargetName = TargetName;
    e.Chat = Chat;
    return e;
  }


  BuildWalk(Heading) {
    let e = new Walk();
    e.Heading = Heading;
    return e;
  }


  BuildRequestPositionUpdate() {
    let e = new RequestPositionUpdate();

    return e;
  }


  BuildAttack() {
    let e = new Attack();

    return e;
  }


  BuildPickUp() {
    let e = new PickUp();

    return e;
  }


  BuildSafeToggle() {
    let e = new SafeToggle();

    return e;
  }


  BuildResuscitationSafeToggle() {
    let e = new ResuscitationSafeToggle();

    return e;
  }


  BuildRequestGuildLeaderInfo() {
    let e = new RequestGuildLeaderInfo();

    return e;
  }


  BuildRequestAtributes() {
    let e = new RequestAtributes();

    return e;
  }


  BuildRequestFame() {
    let e = new RequestFame();

    return e;
  }


  BuildRequestSkills() {
    let e = new RequestSkills();

    return e;
  }


  BuildRequestMiniStats() {
    let e = new RequestMiniStats();

    return e;
  }


  BuildCommerceEnd() {
    let e = new CommerceEnd();

    return e;
  }


  BuildUserCommerceEnd() {
    let e = new UserCommerceEnd();

    return e;
  }


  BuildUserCommerceConfirm() {
    let e = new UserCommerceConfirm();

    return e;
  }


  BuildCommerceChat(Chat) {
    let e = new CommerceChat();
    e.Chat = Chat;
    return e;
  }


  BuildBankEnd() {
    let e = new BankEnd();

    return e;
  }


  BuildUserCommerceOk() {
    let e = new UserCommerceOk();

    return e;
  }


  BuildUserCommerceReject() {
    let e = new UserCommerceReject();

    return e;
  }


  BuildDrop(Slot, Amount) {
    let e = new Drop();
    e.Slot = Slot;
    e.Amount = Amount;
    return e;
  }


  BuildCastSpell(Spell) {
    let e = new CastSpell();
    e.Spell = Spell;
    return e;
  }


  BuildLeftClick(X, Y) {
    let e = new LeftClick();
    e.X = X;
    e.Y = Y;
    return e;
  }


  BuildDoubleClick(X, Y) {
    let e = new DoubleClick();
    e.X = X;
    e.Y = Y;
    return e;
  }


  BuildWork(Skill) {
    let e = new Work();
    e.Skill = Skill;
    return e;
  }


  BuildUseSpellMacro() {
    let e = new UseSpellMacro();

    return e;
  }


  BuildUseItem(Slot) {
    let e = new UseItem();
    e.Slot = Slot;
    return e;
  }


  BuildCraftBlacksmith(Item) {
    let e = new CraftBlacksmith();
    e.Item = Item;
    return e;
  }


  BuildCraftCarpenter(Item) {
    let e = new CraftCarpenter();
    e.Item = Item;
    return e;
  }


  BuildWorkLeftClick(X, Y, Skill) {
    let e = new WorkLeftClick();
    e.X = X;
    e.Y = Y;
    e.Skill = Skill;
    return e;
  }


  BuildCreateNewGuild(Desc, GuildName, Site, Codex) {
    let e = new CreateNewGuild();
    e.Desc = Desc;
    e.GuildName = GuildName;
    e.Site = Site;
    e.Codex = Codex;
    return e;
  }


  BuildSpellInfo(Slot) {
    let e = new SpellInfo();
    e.Slot = Slot;
    return e;
  }


  BuildEquipItem(Slot) {
    let e = new EquipItem();
    e.Slot = Slot;
    return e;
  }


  BuildChangeHeading(Heading) {
    let e = new ChangeHeading();
    e.Heading = Heading;
    return e;
  }


  BuildModifySkills(Skills) {
    let e = new ModifySkills();
    e.Skills = Skills;
    return e;
  }


  BuildTrain(PetIndex) {
    let e = new Train();
    e.PetIndex = PetIndex;
    return e;
  }


  BuildCommerceBuy(Slot, Amount) {
    let e = new CommerceBuy();
    e.Slot = Slot;
    e.Amount = Amount;
    return e;
  }


  BuildBankExtractItem(Slot, Amount) {
    let e = new BankExtractItem();
    e.Slot = Slot;
    e.Amount = Amount;
    return e;
  }


  BuildCommerceSell(Slot, Amount) {
    let e = new CommerceSell();
    e.Slot = Slot;
    e.Amount = Amount;
    return e;
  }


  BuildBankDeposit(Slot, Amount) {
    let e = new BankDeposit();
    e.Slot = Slot;
    e.Amount = Amount;
    return e;
  }


  BuildForumPost(MsgType, Title, Post) {
    let e = new ForumPost();
    e.MsgType = MsgType;
    e.Title = Title;
    e.Post = Post;
    return e;
  }


  BuildMoveSpell(Direction, Slot) {
    let e = new MoveSpell();
    e.Direction = Direction;
    e.Slot = Slot;
    return e;
  }


  BuildMoveBank(Direction, Slot) {
    let e = new MoveBank();
    e.Direction = Direction;
    e.Slot = Slot;
    return e;
  }


  BuildClanCodexUpdate(Desc, Codex) {
    let e = new ClanCodexUpdate();
    e.Desc = Desc;
    e.Codex = Codex;
    return e;
  }


  BuildUserCommerceOffer(Slot, Amount, OfferSlot) {
    let e = new UserCommerceOffer();
    e.Slot = Slot;
    e.Amount = Amount;
    e.OfferSlot = OfferSlot;
    return e;
  }


  BuildGuildAcceptPeace(Guild) {
    let e = new GuildAcceptPeace();
    e.Guild = Guild;
    return e;
  }


  BuildGuildRejectAlliance(Guild) {
    let e = new GuildRejectAlliance();
    e.Guild = Guild;
    return e;
  }


  BuildGuildRejectPeace(Guild) {
    let e = new GuildRejectPeace();
    e.Guild = Guild;
    return e;
  }


  BuildGuildAcceptAlliance(Guild) {
    let e = new GuildAcceptAlliance();
    e.Guild = Guild;
    return e;
  }


  BuildGuildOfferPeace(Guild, Proposal) {
    let e = new GuildOfferPeace();
    e.Guild = Guild;
    e.Proposal = Proposal;
    return e;
  }


  BuildGuildOfferAlliance(Guild, Proposal) {
    let e = new GuildOfferAlliance();
    e.Guild = Guild;
    e.Proposal = Proposal;
    return e;
  }


  BuildGuildAllianceDetails(Guild) {
    let e = new GuildAllianceDetails();
    e.Guild = Guild;
    return e;
  }


  BuildGuildPeaceDetails(Guild) {
    let e = new GuildPeaceDetails();
    e.Guild = Guild;
    return e;
  }


  BuildGuildRequestJoinerInfo(User) {
    let e = new GuildRequestJoinerInfo();
    e.User = User;
    return e;
  }


  BuildGuildAlliancePropList() {
    let e = new GuildAlliancePropList();

    return e;
  }


  BuildGuildPeacePropList() {
    let e = new GuildPeacePropList();

    return e;
  }


  BuildGuildDeclareWar(Guild) {
    let e = new GuildDeclareWar();
    e.Guild = Guild;
    return e;
  }


  BuildGuildNewWebsite(Website) {
    let e = new GuildNewWebsite();
    e.Website = Website;
    return e;
  }


  BuildGuildAcceptNewMember(UserName) {
    let e = new GuildAcceptNewMember();
    e.UserName = UserName;
    return e;
  }


  BuildGuildRejectNewMember(UserName, Reason) {
    let e = new GuildRejectNewMember();
    e.UserName = UserName;
    e.Reason = Reason;
    return e;
  }


  BuildGuildKickMember(UserName) {
    let e = new GuildKickMember();
    e.UserName = UserName;
    return e;
  }


  BuildGuildUpdateNews(News) {
    let e = new GuildUpdateNews();
    e.News = News;
    return e;
  }


  BuildGuildMemberInfo(UserName) {
    let e = new GuildMemberInfo();
    e.UserName = UserName;
    return e;
  }


  BuildGuildOpenElections() {
    let e = new GuildOpenElections();

    return e;
  }


  BuildGuildRequestMembership(Guild, Application) {
    let e = new GuildRequestMembership();
    e.Guild = Guild;
    e.Application = Application;
    return e;
  }


  BuildGuildRequestDetails(Guild) {
    let e = new GuildRequestDetails();
    e.Guild = Guild;
    return e;
  }


  BuildOnline() {
    let e = new Online();

    return e;
  }


  BuildQuit() {
    let e = new Quit();

    return e;
  }


  BuildGuildLeave() {
    let e = new GuildLeave();

    return e;
  }


  BuildRequestAccountState() {
    let e = new RequestAccountState();

    return e;
  }


  BuildPetStand() {
    let e = new PetStand();

    return e;
  }


  BuildPetFollow() {
    let e = new PetFollow();

    return e;
  }


  BuildReleasePet() {
    let e = new ReleasePet();

    return e;
  }


  BuildTrainList() {
    let e = new TrainList();

    return e;
  }


  BuildRest() {
    let e = new Rest();

    return e;
  }


  BuildMeditate() {
    let e = new Meditate();

    return e;
  }


  BuildResucitate() {
    let e = new Resucitate();

    return e;
  }


  BuildHeal() {
    let e = new Heal();

    return e;
  }


  BuildHelp() {
    let e = new Help();

    return e;
  }


  BuildRequestStats() {
    let e = new RequestStats();

    return e;
  }


  BuildCommerceStart() {
    let e = new CommerceStart();

    return e;
  }


  BuildBankStart() {
    let e = new BankStart();

    return e;
  }


  BuildEnlist() {
    let e = new Enlist();

    return e;
  }


  BuildInformation() {
    let e = new Information();

    return e;
  }


  BuildReward() {
    let e = new Reward();

    return e;
  }


  BuildRequestMOTD() {
    let e = new RequestMOTD();

    return e;
  }


  BuildUpTime() {
    let e = new UpTime();

    return e;
  }


  BuildPartyLeave() {
    let e = new PartyLeave();

    return e;
  }


  BuildPartyCreate() {
    let e = new PartyCreate();

    return e;
  }


  BuildPartyJoin() {
    let e = new PartyJoin();

    return e;
  }


  BuildInquiry() {
    let e = new Inquiry();

    return e;
  }


  BuildGuildMessage(Chat) {
    let e = new GuildMessage();
    e.Chat = Chat;
    return e;
  }


  BuildPartyMessage(Chat) {
    let e = new PartyMessage();
    e.Chat = Chat;
    return e;
  }


  BuildCentinelReport(Code) {
    let e = new CentinelReport();
    e.Code = Code;
    return e;
  }


  BuildGuildOnline() {
    let e = new GuildOnline();

    return e;
  }


  BuildPartyOnline() {
    let e = new PartyOnline();

    return e;
  }


  BuildCouncilMessage(Chat) {
    let e = new CouncilMessage();
    e.Chat = Chat;
    return e;
  }


  BuildRoleMasterRequest(Request) {
    let e = new RoleMasterRequest();
    e.Request = Request;
    return e;
  }


  BuildGMRequest() {
    let e = new GMRequest();

    return e;
  }


  BuildBugReport(Report) {
    let e = new BugReport();
    e.Report = Report;
    return e;
  }


  BuildChangeDescription(Description) {
    let e = new ChangeDescription();
    e.Description = Description;
    return e;
  }


  BuildGuildVote(Vote) {
    let e = new GuildVote();
    e.Vote = Vote;
    return e;
  }


  BuildPunishments(Name) {
    let e = new Punishments();
    e.Name = Name;
    return e;
  }


  BuildChangePassword(OldPass, NewPass) {
    let e = new ChangePassword();
    e.OldPass = OldPass;
    e.NewPass = NewPass;
    return e;
  }


  BuildGamble(Amount) {
    let e = new Gamble();
    e.Amount = Amount;
    return e;
  }


  BuildInquiryVote(Opt) {
    let e = new InquiryVote();
    e.Opt = Opt;
    return e;
  }


  BuildLeaveFaction() {
    let e = new LeaveFaction();

    return e;
  }


  BuildBankExtractGold(Amount) {
    let e = new BankExtractGold();
    e.Amount = Amount;
    return e;
  }


  BuildBankDepositGold(Amount) {
    let e = new BankDepositGold();
    e.Amount = Amount;
    return e;
  }


  BuildDenounce(Text) {
    let e = new Denounce();
    e.Text = Text;
    return e;
  }


  BuildGuildFundate() {
    let e = new GuildFundate();

    return e;
  }


  BuildGuildFundation(ClanType) {
    let e = new GuildFundation();
    e.ClanType = ClanType;
    return e;
  }


  BuildPartyKick(UserName) {
    let e = new PartyKick();
    e.UserName = UserName;
    return e;
  }


  BuildPartySetLeader(UserName) {
    let e = new PartySetLeader();
    e.UserName = UserName;
    return e;
  }


  BuildPartyAcceptMember(UserName) {
    let e = new PartyAcceptMember();
    e.UserName = UserName;
    return e;
  }


  BuildPing() {
    let e = new Ping();

    return e;
  }


  BuildRequestPartyForm() {
    let e = new RequestPartyForm();

    return e;
  }


  BuildItemUpgrade(ItemIndex) {
    let e = new ItemUpgrade();
    e.ItemIndex = ItemIndex;
    return e;
  }


  BuildGMCommands() {
    let e = new GMCommands();

    return e;
  }


  BuildInitCrafting(TotalItems, ItemsPorCiclo) {
    let e = new InitCrafting();
    e.TotalItems = TotalItems;
    e.ItemsPorCiclo = ItemsPorCiclo;
    return e;
  }


  BuildHome() {
    let e = new Home();

    return e;
  }


  BuildShowGuildNews() {
    let e = new ShowGuildNews();

    return e;
  }


  BuildShareNpc() {
    let e = new ShareNpc();

    return e;
  }


  BuildStopSharingNpc() {
    let e = new StopSharingNpc();

    return e;
  }


  BuildConsultation() {
    let e = new Consultation();

    return e;
  }


  BuildMoveItem(OldSlot, NewSlot) {
    let e = new MoveItem();
    e.OldSlot = OldSlot;
    e.NewSlot = NewSlot;
    return e;
  }


  BuildGMMessage(Chat) {
    let e = new GMMessage();
    e.Chat = Chat;
    return e;
  }


  BuildShowName() {
    let e = new ShowName();

    return e;
  }


  BuildOnlineRoyalArmy() {
    let e = new OnlineRoyalArmy();

    return e;
  }


  BuildOnlineChaosLegion() {
    let e = new OnlineChaosLegion();

    return e;
  }


  BuildGoNearby(UserName) {
    let e = new GoNearby();
    e.UserName = UserName;
    return e;
  }


  BuildComment(Data) {
    let e = new Comment();
    e.Data = Data;
    return e;
  }


  BuildServerTime() {
    let e = new ServerTime();

    return e;
  }


  BuildWhere(UserName) {
    let e = new Where();
    e.UserName = UserName;
    return e;
  }


  BuildCreaturesInMap(Map) {
    let e = new CreaturesInMap();
    e.Map = Map;
    return e;
  }


  BuildWarpMeToTarget() {
    let e = new WarpMeToTarget();

    return e;
  }


  BuildWarpChar(UserName, Map, X, Y) {
    let e = new WarpChar();
    e.UserName = UserName;
    e.Map = Map;
    e.X = X;
    e.Y = Y;
    return e;
  }


  BuildSilence(UserName) {
    let e = new Silence();
    e.UserName = UserName;
    return e;
  }


  BuildSOSShowList() {
    let e = new SOSShowList();

    return e;
  }


  BuildSOSRemove(UserName) {
    let e = new SOSRemove();
    e.UserName = UserName;
    return e;
  }


  BuildGoToChar(UserName) {
    let e = new GoToChar();
    e.UserName = UserName;
    return e;
  }


  BuildInvisible() {
    let e = new Invisible();

    return e;
  }


  BuildGMPanel() {
    let e = new GMPanel();

    return e;
  }


  BuildRequestUserList() {
    let e = new RequestUserList();

    return e;
  }


  BuildWorking() {
    let e = new Working();

    return e;
  }


  BuildHiding() {
    let e = new Hiding();

    return e;
  }


  BuildJail(UserName, Reason, JailTime) {
    let e = new Jail();
    e.UserName = UserName;
    e.Reason = Reason;
    e.JailTime = JailTime;
    return e;
  }


  BuildKillNPC() {
    let e = new KillNPC();

    return e;
  }


  BuildWarnUser(UserName, Reason) {
    let e = new WarnUser();
    e.UserName = UserName;
    e.Reason = Reason;
    return e;
  }


  BuildEditChar(UserName, Opcion, Arg1, Arg2) {
    let e = new EditChar();
    e.UserName = UserName;
    e.Opcion = Opcion;
    e.Arg1 = Arg1;
    e.Arg2 = Arg2;
    return e;
  }


  BuildRequestCharInfo(TargetName) {
    let e = new RequestCharInfo();
    e.TargetName = TargetName;
    return e;
  }


  BuildRequestCharStats(UserName) {
    let e = new RequestCharStats();
    e.UserName = UserName;
    return e;
  }


  BuildRequestCharGold(UserName) {
    let e = new RequestCharGold();
    e.UserName = UserName;
    return e;
  }


  BuildRequestCharInventory(UserName) {
    let e = new RequestCharInventory();
    e.UserName = UserName;
    return e;
  }


  BuildRequestCharBank(UserName) {
    let e = new RequestCharBank();
    e.UserName = UserName;
    return e;
  }


  BuildRequestCharSkills(UserName) {
    let e = new RequestCharSkills();
    e.UserName = UserName;
    return e;
  }


  BuildReviveChar(UserName) {
    let e = new ReviveChar();
    e.UserName = UserName;
    return e;
  }


  BuildOnlineGM() {
    let e = new OnlineGM();

    return e;
  }


  BuildOnlineMap(Map) {
    let e = new OnlineMap();
    e.Map = Map;
    return e;
  }


  BuildForgive(UserName) {
    let e = new Forgive();
    e.UserName = UserName;
    return e;
  }


  BuildKick(UserName) {
    let e = new Kick();
    e.UserName = UserName;
    return e;
  }


  BuildExecute(UserName) {
    let e = new Execute();
    e.UserName = UserName;
    return e;
  }


  BuildBanChar(UserName, Reason) {
    let e = new BanChar();
    e.UserName = UserName;
    e.Reason = Reason;
    return e;
  }


  BuildUnbanChar(UserName) {
    let e = new UnbanChar();
    e.UserName = UserName;
    return e;
  }


  BuildNPCFollow() {
    let e = new NPCFollow();

    return e;
  }


  BuildSummonChar(UserName) {
    let e = new SummonChar();
    e.UserName = UserName;
    return e;
  }


  BuildSpawnListRequest() {
    let e = new SpawnListRequest();

    return e;
  }


  BuildSpawnCreature(NPC) {
    let e = new SpawnCreature();
    e.NPC = NPC;
    return e;
  }


  BuildResetNPCInventory() {
    let e = new ResetNPCInventory();

    return e;
  }


  BuildCleanWorld() {
    let e = new CleanWorld();

    return e;
  }


  BuildServerMessage(Message) {
    let e = new ServerMessage();
    e.Message = Message;
    return e;
  }


  BuildNickToIP(UserName) {
    let e = new NickToIP();
    e.UserName = UserName;
    return e;
  }


  BuildIPToNick(A, B, C, D) {
    let e = new IPToNick();
    e.A = A;
    e.B = B;
    e.C = C;
    e.D = D;
    return e;
  }


  BuildGuildOnlineMembers(GuildName) {
    let e = new GuildOnlineMembers();
    e.GuildName = GuildName;
    return e;
  }


  BuildTeleportCreate(Map, X, Y, Radio) {
    let e = new TeleportCreate();
    e.Map = Map;
    e.X = X;
    e.Y = Y;
    e.Radio = Radio;
    return e;
  }


  BuildTeleportDestroy() {
    let e = new TeleportDestroy();

    return e;
  }


  BuildRainToggle() {
    let e = new RainToggle();

    return e;
  }


  BuildSetCharDescription(Description) {
    let e = new SetCharDescription();
    e.Description = Description;
    return e;
  }


  BuildForceMIDIToMap(MidiID, Map) {
    let e = new ForceMIDIToMap();
    e.MidiID = MidiID;
    e.Map = Map;
    return e;
  }


  BuildForceWAVEToMap(Wave, Map, X, Y) {
    let e = new ForceWAVEToMap();
    e.Wave = Wave;
    e.Map = Map;
    e.X = X;
    e.Y = Y;
    return e;
  }


  BuildRoyalArmyMessage(Message) {
    let e = new RoyalArmyMessage();
    e.Message = Message;
    return e;
  }


  BuildChaosLegionMessage(Message) {
    let e = new ChaosLegionMessage();
    e.Message = Message;
    return e;
  }


  BuildCitizenMessage(Message) {
    let e = new CitizenMessage();
    e.Message = Message;
    return e;
  }


  BuildCriminalMessage(Message) {
    let e = new CriminalMessage();
    e.Message = Message;
    return e;
  }


  BuildTalkAsNPC(Message) {
    let e = new TalkAsNPC();
    e.Message = Message;
    return e;
  }


  BuildDestroyAllItemsInArea() {
    let e = new DestroyAllItemsInArea();

    return e;
  }


  BuildAcceptRoyalCouncilMember(UserName) {
    let e = new AcceptRoyalCouncilMember();
    e.UserName = UserName;
    return e;
  }


  BuildAcceptChaosCouncilMember(UserName) {
    let e = new AcceptChaosCouncilMember();
    e.UserName = UserName;
    return e;
  }


  BuildItemsInTheFloor() {
    let e = new ItemsInTheFloor();

    return e;
  }


  BuildMakeDumb(UserName) {
    let e = new MakeDumb();
    e.UserName = UserName;
    return e;
  }


  BuildMakeDumbNoMore(UserName) {
    let e = new MakeDumbNoMore();
    e.UserName = UserName;
    return e;
  }


  BuildDumpIPTables() {
    let e = new DumpIPTables();

    return e;
  }


  BuildCouncilKick(UserName) {
    let e = new CouncilKick();
    e.UserName = UserName;
    return e;
  }


  BuildSetTrigger(Trigger) {
    let e = new SetTrigger();
    e.Trigger = Trigger;
    return e;
  }


  BuildAskTrigger() {
    let e = new AskTrigger();

    return e;
  }


  BuildBannedIPList() {
    let e = new BannedIPList();

    return e;
  }


  BuildBannedIPReload() {
    let e = new BannedIPReload();

    return e;
  }


  BuildGuildMemberList(GuildName) {
    let e = new GuildMemberList();
    e.GuildName = GuildName;
    return e;
  }


  BuildGuildBan(GuildName) {
    let e = new GuildBan();
    e.GuildName = GuildName;
    return e;
  }


  BuildBanIP(IP, Reason) {
    let e = new BanIP();
    e.IP = IP;
    e.Reason = Reason;
    return e;
  }


  BuildUnbanIP(IP) {
    let e = new UnbanIP();
    e.IP = IP;
    return e;
  }


  BuildCreateItem(Item) {
    let e = new CreateItem();
    e.Item = Item;
    return e;
  }


  BuildDestroyItems() {
    let e = new DestroyItems();

    return e;
  }


  BuildChaosLegionKick(UserName, Reason) {
    let e = new ChaosLegionKick();
    e.UserName = UserName;
    e.Reason = Reason;
    return e;
  }


  BuildRoyalArmyKick(UserName, Reason) {
    let e = new RoyalArmyKick();
    e.UserName = UserName;
    e.Reason = Reason;
    return e;
  }


  BuildForceMIDIAll(MidiID) {
    let e = new ForceMIDIAll();
    e.MidiID = MidiID;
    return e;
  }


  BuildForceWAVEAll(WaveID) {
    let e = new ForceWAVEAll();
    e.WaveID = WaveID;
    return e;
  }


  BuildRemovePunishment(UserName, Punishment, NewText) {
    let e = new RemovePunishment();
    e.UserName = UserName;
    e.Punishment = Punishment;
    e.NewText = NewText;
    return e;
  }


  BuildTileBlockedToggle() {
    let e = new TileBlockedToggle();

    return e;
  }


  BuildKillNPCNoRespawn() {
    let e = new KillNPCNoRespawn();

    return e;
  }


  BuildKillAllNearbyNPCs() {
    let e = new KillAllNearbyNPCs();

    return e;
  }


  BuildLastIP(UserName) {
    let e = new LastIP();
    e.UserName = UserName;
    return e;
  }


  BuildChangeMOTD() {
    let e = new ChangeMOTD();

    return e;
  }


  BuildSetMOTD(Motd) {
    let e = new SetMOTD();
    e.Motd = Motd;
    return e;
  }


  BuildSystemMessage(Message) {
    let e = new SystemMessage();
    e.Message = Message;
    return e;
  }


  BuildCreateNPC(NpcIndex) {
    let e = new CreateNPC();
    e.NpcIndex = NpcIndex;
    return e;
  }


  BuildCreateNPCWithRespawn(NpcIndex) {
    let e = new CreateNPCWithRespawn();
    e.NpcIndex = NpcIndex;
    return e;
  }


  BuildImperialArmour(Index, ObjIndex) {
    let e = new ImperialArmour();
    e.Index = Index;
    e.ObjIndex = ObjIndex;
    return e;
  }


  BuildChaosArmour(Index, ObjIndex) {
    let e = new ChaosArmour();
    e.Index = Index;
    e.ObjIndex = ObjIndex;
    return e;
  }


  BuildNavigateToggle() {
    let e = new NavigateToggle();

    return e;
  }


  BuildServerOpenToUsersToggle() {
    let e = new ServerOpenToUsersToggle();

    return e;
  }


  BuildTurnOffServer() {
    let e = new TurnOffServer();

    return e;
  }


  BuildTurnCriminal(UserName) {
    let e = new TurnCriminal();
    e.UserName = UserName;
    return e;
  }


  BuildResetFactions(UserName) {
    let e = new ResetFactions();
    e.UserName = UserName;
    return e;
  }


  BuildRemoveCharFromGuild(UserName) {
    let e = new RemoveCharFromGuild();
    e.UserName = UserName;
    return e;
  }


  BuildRequestCharMail(UserName) {
    let e = new RequestCharMail();
    e.UserName = UserName;
    return e;
  }


  BuildAlterPassword(UserName, CopyFrom) {
    let e = new AlterPassword();
    e.UserName = UserName;
    e.CopyFrom = CopyFrom;
    return e;
  }


  BuildAlterMail(UserName, NewMail) {
    let e = new AlterMail();
    e.UserName = UserName;
    e.NewMail = NewMail;
    return e;
  }


  BuildAlterName(UserName, NewName) {
    let e = new AlterName();
    e.UserName = UserName;
    e.NewName = NewName;
    return e;
  }


  BuildToggleCentinelActivated() {
    let e = new ToggleCentinelActivated();

    return e;
  }


  BuildDoBackUp() {
    let e = new DoBackUp();

    return e;
  }


  BuildShowGuildMessages(GuildName) {
    let e = new ShowGuildMessages();
    e.GuildName = GuildName;
    return e;
  }


  BuildSaveMap() {
    let e = new SaveMap();

    return e;
  }


  BuildChangeMapInfoPK(Pk) {
    let e = new ChangeMapInfoPK();
    e.Pk = Pk;
    return e;
  }


  BuildChangeMapInfoBackup(Backup) {
    let e = new ChangeMapInfoBackup();
    e.Backup = Backup;
    return e;
  }


  BuildChangeMapInfoRestricted(RestrictedTo) {
    let e = new ChangeMapInfoRestricted();
    e.RestrictedTo = RestrictedTo;
    return e;
  }


  BuildChangeMapInfoNoMagic(NoMagic) {
    let e = new ChangeMapInfoNoMagic();
    e.NoMagic = NoMagic;
    return e;
  }


  BuildChangeMapInfoNoInvi(NoInvi) {
    let e = new ChangeMapInfoNoInvi();
    e.NoInvi = NoInvi;
    return e;
  }


  BuildChangeMapInfoNoResu(NoResu) {
    let e = new ChangeMapInfoNoResu();
    e.NoResu = NoResu;
    return e;
  }


  BuildChangeMapInfoLand(Data) {
    let e = new ChangeMapInfoLand();
    e.Data = Data;
    return e;
  }


  BuildChangeMapInfoZone(Data) {
    let e = new ChangeMapInfoZone();
    e.Data = Data;
    return e;
  }


  BuildChangeMapInfoStealNpc(RoboNpc) {
    let e = new ChangeMapInfoStealNpc();
    e.RoboNpc = RoboNpc;
    return e;
  }


  BuildChangeMapInfoNoOcultar(NoOcultar) {
    let e = new ChangeMapInfoNoOcultar();
    e.NoOcultar = NoOcultar;
    return e;
  }


  BuildChangeMapInfoNoInvocar(NoInvocar) {
    let e = new ChangeMapInfoNoInvocar();
    e.NoInvocar = NoInvocar;
    return e;
  }


  BuildSaveChars() {
    let e = new SaveChars();

    return e;
  }


  BuildCleanSOS() {
    let e = new CleanSOS();

    return e;
  }


  BuildShowServerForm() {
    let e = new ShowServerForm();

    return e;
  }


  BuildNight() {
    let e = new Night();

    return e;
  }


  BuildKickAllChars() {
    let e = new KickAllChars();

    return e;
  }


  BuildReloadNPCs() {
    let e = new ReloadNPCs();

    return e;
  }


  BuildReloadServerIni() {
    let e = new ReloadServerIni();

    return e;
  }


  BuildReloadSpells() {
    let e = new ReloadSpells();

    return e;
  }


  BuildReloadObjects() {
    let e = new ReloadObjects();

    return e;
  }


  BuildRestart() {
    let e = new Restart();

    return e;
  }


  BuildResetAutoUpdate() {
    let e = new ResetAutoUpdate();

    return e;
  }


  BuildChatColor(R, G, B) {
    let e = new ChatColor();
    e.R = R;
    e.G = G;
    e.B = B;
    return e;
  }


  BuildIgnored() {
    let e = new Ignored();

    return e;
  }


  BuildCheckSlot(UserName, Slot) {
    let e = new CheckSlot();
    e.UserName = UserName;
    e.Slot = Slot;
    return e;
  }


  BuildSetIniVar(Seccion, Clave, Valor) {
    let e = new SetIniVar();
    e.Seccion = Seccion;
    e.Clave = Clave;
    e.Valor = Valor;
    return e;
  }


  BuildCreatePretorianClan(Map, X, Y) {
    let e = new CreatePretorianClan();
    e.Map = Map;
    e.X = X;
    e.Y = Y;
    return e;
  }


  BuildRemovePretorianClan(Map) {
    let e = new RemovePretorianClan();
    e.Map = Map;
    return e;
  }


  BuildEnableDenounces() {
    let e = new EnableDenounces();

    return e;
  }


  BuildShowDenouncesList() {
    let e = new ShowDenouncesList();

    return e;
  }


  BuildMapMessage(Message) {
    let e = new MapMessage();
    e.Message = Message;
    return e;
  }


  BuildSetDialog(Message) {
    let e = new SetDialog();
    e.Message = Message;
    return e;
  }


  BuildImpersonate() {
    let e = new Impersonate();

    return e;
  }


  BuildImitate() {
    let e = new Imitate();

    return e;
  }


  BuildRecordAdd(UserName, Reason) {
    let e = new RecordAdd();
    e.UserName = UserName;
    e.Reason = Reason;
    return e;
  }


  BuildRecordRemove(Index) {
    let e = new RecordRemove();
    e.Index = Index;
    return e;
  }


  BuildRecordAddObs(Index, Obs) {
    let e = new RecordAddObs();
    e.Index = Index;
    e.Obs = Obs;
    return e;
  }


  BuildRecordListRequest() {
    let e = new RecordListRequest();

    return e;
  }


  BuildRecordDetailsRequest(Index) {
    let e = new RecordDetailsRequest();
    e.Index = Index;
    return e;
  }


  BuildAlterGuildName(OldGuildName, NewGuildName) {
    let e = new AlterGuildName();
    e.OldGuildName = OldGuildName;
    e.NewGuildName = NewGuildName;
    return e;
  }


  BuildHigherAdminsMessage(Message) {
    let e = new HigherAdminsMessage();
    e.Message = Message;
    return e;
  }


  ServerPacketDecodeAndDispatch(buffer, pkg, handler) {
    ServerPacketDecodeAndDispatch(buffer, pkg, handler);
  }

}
