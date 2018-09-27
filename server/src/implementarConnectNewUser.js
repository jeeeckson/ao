
void ConnectNewUser(int UserIndex, const std::string& Name, const std::string& Password, eRaza UserRaza,
  eGenero UserSexo, eClass UserClase, const std::string& UserEmail, eCiudad Hogar, int Head)
{
  /* '************************************************* */
  /* 'Author: Unknown */
  /* 'Last modified: 3/12/2009 */
  /* 'Conecta un nuevo Usuario */
  /* '23/01/2007 Pablo (ToxicWaste) - Agregué ResetFaccion al crear usuario */
  /* '24/01/2007 Pablo (ToxicWaste) - Agregué el nuevo mana inicial de los magos. */
  /* '12/02/2007 Pablo (ToxicWaste) - Puse + 1 de const al Elfo normal. */
  /* '20/04/2007 Pablo (ToxicWaste) - Puse -1 de fuerza al Elfo. */
  /* '09/01/2008 Pablo (ToxicWaste) - Ahora los modificadores de Raza se controlan desde Balance.dat */
  /* '11/19/2009: Pato - Modifico la maná inicial del bandido. */
  /* '11/19/2009: Pato - Asigno los valores iniciales de ExpSkills y EluSkills. */
  /* '03/12/2009: Budi - Optimización del código. */
  /* '************************************************* */
  int
  i;

  if (!AsciiValidos(Name) || vb6::LenB(Name) == 0) {
    WriteErrorMsg(UserIndex, "Nombre inválido.");
    return;
  }

  if (RegistroListaBlancaEmails) {
    std::string
    cad = vb6::LCase(vb6::Trim(UserEmail));
    if (RegistroEmailsHabilitados.find(cad) == RegistroEmailsHabilitados.end()) {
      WriteErrorMsg(UserIndex, "Servidor en Beta cerrada, registro de personajes deshabilitado. Ingrese al sitio web www.dakara.com.ar para detalles.");
      CerrarUserIndex(UserIndex);
      return;
    }
  }

  if (UserList[UserIndex].flags.UserLogged) {
    LogCheating(
      "El usuario " + UserList[UserIndex].Name + " ha intentado crear a " + Name + " desde la IP "
      + UserList[UserIndex].ip);

    /* 'Kick player ( and leave character inside :D )! */
    CloseSocketSL(UserIndex);
    CerrarUserIndexIniciar(UserIndex);

    return;
  }

  /* '¿Existe el personaje? */
  if (FileExist(GetCharPath(Name), 0) == true) {
    WriteErrorMsg(UserIndex, "Ya existe el personaje.");
    return;
  }

  /* 'Tiró los dados antes de llegar acá?? */
  if (UserList[UserIndex].Stats.UserAtributos[eAtributos_Fuerza] == 0) {
    WriteErrorMsg(UserIndex, "Debe tirar los dados antes de poder crear un personaje.");
    return;
  }

  if (!ValidarCabeza(UserRaza, UserSexo, Head)) {
    LogCheating(
      "El usuario " + Name + " ha seleccionado la cabeza " + vb6::CStr(Head) + " desde la IP "
      + UserList[UserIndex].ip);

    WriteErrorMsg(UserIndex, "Cabeza inválida, elija una cabeza seleccionable.");
    return;
  }

  UserList[UserIndex].flags.Muerto = 0;
  UserList[UserIndex].flags.Escondido = 0;

  UserList[UserIndex].Reputacion.AsesinoRep = 0;
  UserList[UserIndex].Reputacion.BandidoRep = 0;
  UserList[UserIndex].Reputacion.BurguesRep = 0;
  UserList[UserIndex].Reputacion.LadronesRep = 0;
  UserList[UserIndex].Reputacion.NobleRep = 1000;
  UserList[UserIndex].Reputacion.PlebeRep = 30;

  UserList[UserIndex].Reputacion.Promedio = 30 / 6;

  UserList[UserIndex].Name = Name;
  UserList[UserIndex].clase = UserClase;
  UserList[UserIndex].raza = UserRaza;
  UserList[UserIndex].Genero = UserSexo;
  UserList[UserIndex].email = UserEmail;
  UserList[UserIndex].Hogar = Hogar;

  /* '[Pablo (Toxic Waste) 9/01/08] */
  UserList[UserIndex].Stats.UserAtributos[eAtributos_Fuerza] =
    UserList[UserIndex].Stats.UserAtributos[eAtributos_Fuerza] + ModRaza[UserRaza].Fuerza;
  UserList[UserIndex].Stats.UserAtributos[eAtributos_Agilidad] =
    UserList[UserIndex].Stats.UserAtributos[eAtributos_Agilidad] + ModRaza[UserRaza].Agilidad;
  UserList[UserIndex].Stats.UserAtributos[eAtributos_Inteligencia] =
    UserList[UserIndex].Stats.UserAtributos[eAtributos_Inteligencia] + ModRaza[UserRaza].Inteligencia;
  UserList[UserIndex].Stats.UserAtributos[eAtributos_Carisma] =
    UserList[UserIndex].Stats.UserAtributos[eAtributos_Carisma] + ModRaza[UserRaza].Carisma;
  UserList[UserIndex].Stats.UserAtributos[eAtributos_Constitucion] =
    UserList[UserIndex].Stats.UserAtributos[eAtributos_Constitucion] + ModRaza[UserRaza].Constitucion;
  /* '[/Pablo (Toxic Waste)] */

  for (i = (1); i <= (NUMSKILLS); i++) {
    UserList[UserIndex].Stats.UserSkills[i] = 0;
    CheckEluSkill(UserIndex, i, true);
  }

  UserList[UserIndex].Stats.SkillPts = 10;

  UserList[UserIndex].Char.heading = eHeading_SOUTH;

  DarCuerpo(UserIndex);
  UserList[UserIndex].Char.Head = Head;

  UserList[UserIndex].OrigChar = UserList[UserIndex].Char;

  int
  MiInt;
  MiInt = RandomNumber(1, UserList[UserIndex].Stats.UserAtributos[eAtributos_Constitucion] / 3);

  UserList[UserIndex].Stats.MaxHp = 15 + MiInt;
  UserList[UserIndex].Stats.MinHp = 15 + MiInt;

  MiInt = RandomNumber(1, UserList[UserIndex].Stats.UserAtributos[eAtributos_Agilidad] / 6);
  if (MiInt == 1) {
    MiInt = 2;
  }

  UserList[UserIndex].Stats.MaxSta = 20 * MiInt;
  UserList[UserIndex].Stats.MinSta = 20 * MiInt;

  UserList[UserIndex].Stats.MaxAGU = 100;
  UserList[UserIndex].Stats.MinAGU = 100;

  UserList[UserIndex].Stats.MaxHam = 100;
  UserList[UserIndex].Stats.MinHam = 100;

  /* '<-----------------MANA-----------------------> */
  /* 'Cambio en mana inicial (ToxicWaste) */
  if (UserClase == eClass_Mage) {
    MiInt = UserList[UserIndex].Stats.UserAtributos[eAtributos_Inteligencia] * 3;
    UserList[UserIndex].Stats.MaxMAN = MiInt;
    UserList[UserIndex].Stats.MinMAN = MiInt;
  } else if (UserClase == eClass_Cleric || UserClase == eClass_Druid || UserClase == eClass_Bard
    || UserClase == eClass_Assasin) {
    UserList[UserIndex].Stats.MaxMAN = 50;
    UserList[UserIndex].Stats.MinMAN = 50;
    /* 'Mana Inicial del Bandido (ToxicWaste) */
  } else if (UserClase == eClass_Bandit) {
    UserList[UserIndex].Stats.MaxMAN = 50;
    UserList[UserIndex].Stats.MinMAN = 50;
  } else {
    UserList[UserIndex].Stats.MaxMAN = 0;
    UserList[UserIndex].Stats.MinMAN = 0;
  }

  if (UserClase == eClass_Mage || UserClase == eClass_Cleric || UserClase == eClass_Druid
    || UserClase == eClass_Bard || UserClase == eClass_Assasin) {
    UserList[UserIndex].Stats.UserHechizos[1] = 2;

    if (UserClase == eClass_Druid) {
      UserList[UserIndex].Stats.UserHechizos[2] = 46;
    }
  }

  UserList[UserIndex].Stats.MaxHIT = 2;
  UserList[UserIndex].Stats.MinHIT = 1;

  UserList[UserIndex].Stats.GLD = 0;

  UserList[UserIndex].Stats.Exp = 0;
  UserList[UserIndex].Stats.ELU = 300;
  UserList[UserIndex].Stats.ELV = 1;

  /* '???????????????? INVENTARIO ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿ */
  int
  Slot;
  bool
  IsPaladin;

  IsPaladin = UserClase == eClass_Paladin;

  /* 'Pociones Rojas (Newbie) */
  Slot = 1;
  UserList[UserIndex].Invent.Object[Slot].ObjIndex = 857;
  UserList[UserIndex].Invent.Object[Slot].Amount = 200;

  /* 'Pociones azules (Newbie) */
  if (UserList[UserIndex].Stats.MaxMAN > 0 || IsPaladin) {
    Slot = Slot + 1;
    UserList[UserIndex].Invent.Object[Slot].ObjIndex = 856;
    UserList[UserIndex].Invent.Object[Slot].Amount = 200;

  } else {
    /* 'Pociones amarillas (Newbie) */
    Slot = Slot + 1;
    UserList[UserIndex].Invent.Object[Slot].ObjIndex = 855;
    UserList[UserIndex].Invent.Object[Slot].Amount = 100;

    /* 'Pociones verdes (Newbie) */
    Slot = Slot + 1;
    UserList[UserIndex].Invent.Object[Slot].ObjIndex = 858;
    UserList[UserIndex].Invent.Object[Slot].Amount = 50;

  }

  /* ' Ropa (Newbie) */
  Slot = Slot + 1;
  switch (UserRaza) {
    case eRaza_Humano:
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 463;
      break;

    case eRaza_Elfo:
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 464;
      break;

    case eRaza_Drow:
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 465;
      break;

    case eRaza_Enano:
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 466;
      break;

    case eRaza_Gnomo:
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 466;
      break;

    default:
      break;
  }

  /* ' Equipo ropa */
  UserList[UserIndex].Invent.Object[Slot].Amount = 1;
  UserList[UserIndex].Invent.Object[Slot].Equipped = 1;

  UserList[UserIndex].Invent.ArmourEqpSlot = Slot;
  UserList[UserIndex].Invent.ArmourEqpObjIndex = UserList[UserIndex].Invent.Object[Slot].ObjIndex;

  /* 'Arma (Newbie) */
  Slot = Slot + 1;
  switch (UserClase) {
    case eClass_Hunter:
      /* ' Arco (Newbie) */
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 859;
      break;

    case eClass_Worker:
      /* ' Herramienta (Newbie) */
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = RandomNumber(561, 565);
      break;

    default:
      /* ' Daga (Newbie) */
      UserList[UserIndex].Invent.Object[Slot].ObjIndex = 460;
      break;
  }

  /* ' Equipo arma */
  UserList[UserIndex].Invent.Object[Slot].Amount = 1;
  UserList[UserIndex].Invent.Object[Slot].Equipped = 1;

  UserList[UserIndex].Invent.WeaponEqpObjIndex = UserList[UserIndex].Invent.Object[Slot].ObjIndex;
  UserList[UserIndex].Invent.WeaponEqpSlot = Slot;

  UserList[UserIndex].Char.WeaponAnim = GetWeaponAnim(UserIndex,
    UserList[UserIndex].Invent.WeaponEqpObjIndex);

  /* ' Municiones (Newbie) */
  if (UserClase == eClass_Hunter) {
    Slot = Slot + 1;
    UserList[UserIndex].Invent.Object[Slot].ObjIndex = 860;
    UserList[UserIndex].Invent.Object[Slot].Amount = 150;

    /* ' Equipo flechas */
    UserList[UserIndex].Invent.Object[Slot].Equipped = 1;
    UserList[UserIndex].Invent.MunicionEqpSlot = Slot;
    UserList[UserIndex].Invent.MunicionEqpObjIndex = 860;
  }

  /* ' Manzanas (Newbie) */
  Slot = Slot + 1;
  UserList[UserIndex].Invent.Object[Slot].ObjIndex = 467;
  UserList[UserIndex].Invent.Object[Slot].Amount = 100;

  /* ' Jugos (Nwbie) */
  Slot = Slot + 1;
  UserList[UserIndex].Invent.Object[Slot].ObjIndex = 468;
  UserList[UserIndex].Invent.Object[Slot].Amount = 100;

  /* ' Sin casco y escudo */
  UserList[UserIndex].Char.ShieldAnim = NingunEscudo;
  UserList[UserIndex].Char.CascoAnim = NingunCasco;

  /* ' Total Items */
  UserList[UserIndex].Invent.NroItems = Slot;

  /* # IF ConUpTime THEN */
  UserList[UserIndex].LogOnTime = vb6::Now();
  UserList[UserIndex].UpTime = 0;
  /* # END IF */

  /* 'Valores Default de facciones al Activar nuevo usuario */
  ResetFacciones(UserIndex);

  WriteSaltedPasswordUser(Name, Password);

  SaveUser(UserIndex, GetCharPath(Name));

  LogMain("Se ha creado el personaje " + Name + " desde IP=" + UserList[UserIndex].ip);

  /* 'Open User */
  ConnectUser(UserIndex, Name, Password);
}