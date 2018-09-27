let fs = require('fs');
let vars = require('./vars');
let npcs = require('./npcs');
let login = require('./login');
let funct = require('./functions');

let objIndex = 0;

fs.readFile('obj.dat', 'UTF-8', (err, data) => {
  let responseArr = data.split('\n');

  vars.datObj[0] = {
    name: '',
    objType: 0,
    tipoPocion: 0,
    minModificador: 0,
    maxModificador: 0,
    grhIndex: 0,
    anim: 0,
    agarrable: 0,
    valor: 0,
    minHit: 0,
    maxHit: 0,
    minDef: 0,
    maxDef: 0,
    newbie: 0,
    proyectil: 0,
    noSeCae: 0,
    clasesPermitidas: [],
    indexAbierta: 0,
    indexCerrada: 0,
    llave: 0,
    cerrada: 0,
    spellIndex: 0,
    razaEnana: 0,
    apu: 0,
    staffDamageBonus: 0,
    minDefMag: 0,
    maxDefMag: 0
  };

  for (let line in responseArr) {
    let response = responseArr[line];

    let responseSplit = response.split('[OBJ');
    let npcNum = responseSplit[1];

    if (npcNum) {
      objIndex = npcNum.trim().split(']')[0];
      vars.datObj[objIndex] = {
        name: '',
        objType: 0,
        tipoPocion: 0,
        minModificador: 0,
        maxModificador: 0,
        grhIndex: 0,
        anim: 0,
        agarrable: 0,
        valor: 0,
        minHit: 0,
        maxHit: 0,
        minDef: 0,
        maxDef: 0,
        newbie: 0,
        proyectil: 0,
        noSeCae: 0,
        clasesPermitidas: [],
        indexAbierta: 0,
        indexCerrada: 0,
        llave: 0,
        cerrada: 0,
        spellIndex: 0,
        razaEnana: 0,
        apu: 0,
        staffDamageBonus: 0,
        minDefMag: 0,
        maxDefMag: 0
      };
    }

    responseSplit = response.split('Name=');
    let name = responseSplit[1];

    if (name) {
      vars.datObj[objIndex].name = name.trim();
    }

    responseSplit = response.split('ObjType=');
    let objType = responseSplit[1];

    if (objType) {
      vars.datObj[objIndex].objType = parseInt(objType.trim());
    }

    responseSplit = response.split('TipoPocion=');
    let tipoPocion = responseSplit[1];

    if (tipoPocion) {
      vars.datObj[objIndex].tipoPocion = parseInt(tipoPocion.trim());
    }

    responseSplit = response.split('MinModificador=');
    let minModificador = responseSplit[1];

    if (minModificador) {
      vars.datObj[objIndex].minModificador = parseInt(minModificador.trim());
    }

    responseSplit = response.split('MaxModificador=');
    let maxModificador = responseSplit[1];

    if (maxModificador) {
      vars.datObj[objIndex].maxModificador = parseInt(maxModificador.trim());
    }

    responseSplit = response.split('Proyectil=');
    let proyectil = responseSplit[1];

    if (proyectil) {
      vars.datObj[objIndex].proyectil = parseInt(proyectil.trim());
    }

    responseSplit = response.split('GrhIndex=');
    let grhIndex = responseSplit[1];

    if (grhIndex) {
      vars.datObj[objIndex].grhIndex = parseInt(grhIndex.trim());
    }

    responseSplit = response.split('Anim=');
    let anim = responseSplit[1];

    if (anim) {
      vars.datObj[objIndex].anim = parseInt(anim.trim());
    }

    responseSplit = response.split('NumRopaje=');
    let numRopaje = responseSplit[1];

    if (numRopaje) {
      vars.datObj[objIndex].anim = parseInt(numRopaje.trim());
    }

    responseSplit = response.split('Valor=');
    let valor = responseSplit[1];

    if (valor) {
      vars.datObj[objIndex].valor = parseInt(valor.trim());
    }

    responseSplit = response.split('Agarrable=');
    let agarrable = responseSplit[1];

    if (agarrable) {
      vars.datObj[objIndex].agarrable = parseInt(agarrable.trim());
    }

    responseSplit = response.split('MinHit=');
    let minHit = responseSplit[1];

    if (minHit) {
      vars.datObj[objIndex].minHit = parseInt(minHit.trim());
    }

    responseSplit = response.split('MaxHit=');
    let maxHit = responseSplit[1];

    if (maxHit) {
      vars.datObj[objIndex].maxHit = parseInt(maxHit.trim());
    }

    responseSplit = response.split('MinDef=');
    let minDef = responseSplit[1];

    if (minDef) {
      vars.datObj[objIndex].minDef = parseInt(minDef.trim());
    }

    responseSplit = response.split('MaxDef=');
    let maxDef = responseSplit[1];

    if (maxDef) {
      vars.datObj[objIndex].maxDef = parseInt(maxDef.trim());
    }

    responseSplit = response.split('Newbie=');
    let newbie = responseSplit[1];

    if (newbie) {
      vars.datObj[objIndex].newbie = parseInt(newbie.trim());
    }

    responseSplit = response.split('NoSeCae=');
    let noSeCae = responseSplit[1];

    if (noSeCae) {
      vars.datObj[objIndex].noSeCae = parseInt(noSeCae.trim());
    }

    responseSplit = response.split('TieneLlave=');
    let llave = responseSplit[1];

    if (llave) {
      vars.datObj[objIndex].llave = parseInt(llave.trim());
    }

    responseSplit = response.split('PuertaAbierta=');
    let cerrada = responseSplit[1];

    if (cerrada) {
      vars.datObj[objIndex].cerrada = parseInt(cerrada.trim());
    }

    responseSplit = response.split('IndexCerrada=');
    let indexCerrada = responseSplit[1];

    if (indexCerrada) {
      vars.datObj[objIndex].indexCerrada = parseInt(indexCerrada.trim());
    }

    responseSplit = response.split('IndexAbierta=');
    let indexAbierta = responseSplit[1];

    if (indexAbierta) {
      vars.datObj[objIndex].indexAbierta = parseInt(indexAbierta.trim());
    }

    responseSplit = response.split('HechizoIndex=');
    let spellIndex = responseSplit[1];

    if (spellIndex) {
      vars.datObj[objIndex].spellIndex = parseInt(spellIndex.trim());
    }

    responseSplit = response.split('RazaEnana=');
    let razaEnana = responseSplit[1];

    if (razaEnana) {
      vars.datObj[objIndex].razaEnana = parseInt(razaEnana.trim());
    }

    responseSplit = response.split('StaffDamageBonus=');
    let staffDamageBonus = responseSplit[1];

    if (staffDamageBonus) {
      vars.datObj[objIndex].staffDamageBonus = parseInt(staffDamageBonus.trim());
    }

    responseSplit = response.split('DefensaMagicaMin=');
    let minDefMag = responseSplit[1];

    if (minDefMag) {
      vars.datObj[objIndex].minDefMag = parseInt(minDefMag.trim());
    }

    responseSplit = response.split('DefensaMagicaMax=');
    let maxDefMag = responseSplit[1];

    if (maxDefMag) {
      vars.datObj[objIndex].maxDefMag = parseInt(maxDefMag.trim());
    }

    responseSplit = response.split('Apuñala=');
    let apu = responseSplit[1];

    if (apu) {
      vars.datObj[objIndex].apu = parseInt(apu.trim());
    }

    for (let i = 1; i <= 11; i++) {
      responseSplit = response.split('CP' + i + '=');
      let CP = responseSplit[1];

      if (CP) {
        let clase = CP.trim().toLowerCase();

        if (clase !== 'bandido') {
          vars.datObj[objIndex].clasesPermitidas.push(vars.clases[CP.trim().toLowerCase()]);
        }
      }
    }
  }

  console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Objetos cargados.');
});