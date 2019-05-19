/**
 * Created by horacio on 5/11/16.
 */

let FONT_FAMILY = 'Myriad Pro, Arial';

export default {
  NickColorIndex: {
    1: 'CRIMINAL',
    2: 'CIUDADANO',
  },

  NickColor: {
    CRIMINAL: '#123211',
    CIUDADANO: '#923211'
  },

  Index: {
    0: 'TALK',
    1: 'FIGHT',
    2: 'WARNING',
    3: 'INFO',
    4: 'INFOBOLD',
    5: 'EJECUCION',
    6: 'PARTY',
    7: 'VENENO',
    8: 'GUILD',
    9: 'SERVER',
    10: 'GUILDMSG',
    11: 'CONSEJO',
    12: 'CONSEJOCAOS',
    13: 'CONSEJOVesA',
    14: 'CONSEJOCAOSVesA',
    15: 'CENTINELA',
    16: 'GMMSG',
    17: 'GM',
    18: 'CITIZEN',
    19: 'CONSE',
    20: 'DIOS'
  },

  CONSOLA_BASE_FONT: {
    fontFamily: FONT_FAMILY,
    fontSize: '10',
    stroke: 'black',
    strokeThickness: 2,
  },

  NOMBRE_BASE_FONT: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: '11',
    stroke: 'black',
    strokeThickness: 0.2,
    align: 'center',
    dropShadow: true,
    dropShadowDistance: 0,
    dropShadowBlur: 1
  },

  TALK_BASE_FONT: {
    fontFamily: FONT_FAMILY,
    /*fontWeight: 'bold',*/
    fontSize: '10',
    stroke: 'black',
    strokeThickness: 2,
    align: 'center',
    fill: 'rgb(130, 130, 130)'
  },

  HOVERING_BASE_FONT: {
    fontFamily: FONT_FAMILY,
    fontWeight: '900',
    fontSize: '12',
    stroke: 'black',
    strokeThickness: 1,
  },

  INDICADOR_MAPA: {
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    fontSize: '7',
    stroke: 'black',
    strokeThickness: 0.2,
    fill: 'rgb(130, 130, 130)',
  },

  CLAN_CHAT: {
    fill: 'rgb(130, 130, 130)'
  },

  NOTIFICATION: {
    fill: 'rgb(130, 130, 130)'
  },

  FIGHT: {
    fill: 'rgb(130, 130, 130)',
    bold: 1
  },
  WARNING: {
    fill: 'white',
    bold: 1,
    italic: 1
  },

  INFO: {
    fill: 'rgb(130, 130, 130)'
  },

  INFOBOLD: {
    fill: 'rgb(130, 130, 130)',
    bold: 1
  },

  SKILLINFO: {
    fill: 'rgb(130, 130, 130)',
  },

  EJECUCION: {
    fill: 'rgb(130, 130, 130)',
    bold: 1
  },

  PARTY: {
    fill: 'rgb(255, 180, 250)'
  },

  VENENO: {
    fill: 'rgb(130, 130, 130)',
  },

  GUILD: {
    fill: 'rgb(255, 255, 255)',
    bold: 1
  },

  SERVER: {
    fill: 'rgb(0, 185, 0)'
  },

  GUILDMSG: {
    fill: 'rgb(228, 199, 27)'
  },

  CONSEJO: {
    fill: 'rgb(130, 130, 255)',
    bold: 1
  },

  CONSEJOCAOS: {
    fill: 'rgb(255, 60, 0)',
    bold: 1
  },

  CONSEJOVesA: {
    fill: 'rgb(0, 200, 255)',
    bold: 1
  },

  CONSEJOCAOSVesA: {
    fill: 'rgb(255, 50, 0)',
    bold: 1
  },

  CENTINELA: {
    fill: 'rgb(130, 130, 130)',
    bold: 1
  },

  GMMSG: {
    fill: 'rgb(255, 255, 255)',
    italic: 1
  },

  GM: {
    fill: 'rgb(30, 255, 30)',
    bold: 1
  },

  CITIZEN: {
    fill: 'rgb(130, 130, 130)',
    bold: 1
  },

  CONSE: {
    fill: 'rgb(30, 150, 30)',
    bold: 1
  },

  DIOS: {
    fill: 'rgb(250, 250, 150)',
    bold: 1
  },

  CANVAS_DANIO_RECIBIDO: {
    fill: 'rgb(255, 50, 50)',
    stroke: 'rgb(255, 180, 180)'
  },
  CANVAS_DANIO_REALIZADO: {
    fill: 'white',
    stroke: '#696969'
  },
  CANVAS_CURAR: {
    fill: 'rgb(80, 255, 80)',
    stroke: 'rgb(50, 120, 50)'
  },
  CANVAS_EXP: {
    fill: 'rgb(80, 80, 255)',
    stroke: 'rgb(50, 50, 255)'
  },
};