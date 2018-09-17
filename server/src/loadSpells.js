let fs = require('fs');
let vars = require('./vars');
let npcs = require('./npcs');
let login = require('./login');
let funct = require('./functions');

let spellIndex = 0;

fs.readFile('hechizos.dat', 'UTF-8', (err, data) => {
  let responseArr = data.split('\n');

  vars.datSpell[0] = {
    name: '',
    desc: '',
    type: 0,
    wav: 0,
    fxGrh: 0,
    minSkill: 0,
    manaRequired: 0,
    target: 0,
    paraliza: 0,
    inmoviliza: 0,
    removerParalisis: 0,
    invisibilidad: 0,
    revivir: 0,
    minHp: 0,
    maxHp: 0,
    palabrasMagicas: '',
    subeHp: 0,
    subeAg: 0,
    minAg: 0,
    maxAg: 0,
    subeFz: 0,
    minFz: 0,
    maxFz: 0,
    staffAffected: 0
  };

  for (let line in responseArr) {
    let response = responseArr[line];

    let responseSplit = response.split('[HECHIZO');
    let spellNum = responseSplit[1];

    if (spellNum) {
      spellIndex = spellNum.trim().split(']')[0];
      vars.datSpell[spellIndex] = {
        name: '',
        desc: '',
        type: 0,
        wav: 0,
        fxGrh: 0,
        minSkill: 0,
        manaRequired: 0,
        target: 0,
        paraliza: 0,
        inmoviliza: 0,
        removerParalisis: 0,
        invisibilidad: 0,
        revivir: 0,
        minHp: 0,
        maxHp: 0,
        palabrasMagicas: '',
        subeHp: 0,
        subeAg: 0,
        minAg: 0,
        maxAg: 0,
        subeFz: 0,
        minFz: 0,
        maxFz: 0,
        staffAffected: 0
      };
    }

    responseSplit = response.split('Nombre=');
    let name = responseSplit[1];

    if (name) {
      vars.datSpell[spellIndex].name = name.trim();
    }

    responseSplit = response.split('Desc=');
    let desc = responseSplit[1];

    if (desc) {
      vars.datSpell[spellIndex].desc = desc.trim();
    }

    responseSplit = response.split('Tipo=');
    let type = responseSplit[1];

    if (type) {
      vars.datSpell[spellIndex].type = parseInt(type.trim());
    }

    responseSplit = response.split('WAV=');
    let wav = responseSplit[1];

    if (wav) {
      vars.datSpell[spellIndex].wav = parseInt(wav.trim());
    }

    responseSplit = response.split('FXgrh=');
    let fxGrh = responseSplit[1];

    if (fxGrh) {
      vars.datSpell[spellIndex].fxGrh = parseInt(fxGrh.trim());
    }

    responseSplit = response.split('MinSkill=');
    let minSkill = responseSplit[1];

    if (minSkill) {
      vars.datSpell[spellIndex].minSkill = parseInt(minSkill.trim());
    }

    responseSplit = response.split('ManaRequerido=');
    let manaRequired = responseSplit[1];

    if (manaRequired) {
      vars.datSpell[spellIndex].manaRequired = parseInt(manaRequired.trim());
    }

    responseSplit = response.split('Target=');
    let target = responseSplit[1];

    if (target) {
      vars.datSpell[spellIndex].target = parseInt(target.trim());
    }

    responseSplit = response.split('Paraliza=');
    let paraliza = responseSplit[1];

    if (paraliza) {
      vars.datSpell[spellIndex].paraliza = parseInt(paraliza.trim());
    }

    responseSplit = response.split('Inmoviliza=');
    let inmoviliza = responseSplit[1];

    if (inmoviliza) {
      vars.datSpell[spellIndex].inmoviliza = parseInt(inmoviliza.trim());
    }

    responseSplit = response.split('RemoverParalisis=');
    let removerParalisis = responseSplit[1];

    if (removerParalisis) {
      vars.datSpell[spellIndex].removerParalisis = parseInt(removerParalisis.trim());
    }

    responseSplit = response.split('Invisibilidad=');
    let invisibilidad = responseSplit[1];

    if (invisibilidad) {
      vars.datSpell[spellIndex].invisibilidad = parseInt(invisibilidad.trim());
    }

    responseSplit = response.split('Revivir=');
    let revivir = responseSplit[1];

    if (revivir) {
      vars.datSpell[spellIndex].revivir = parseInt(revivir.trim());
    }

    responseSplit = response.split('MinHP=');
    let minHp = responseSplit[1];

    if (minHp) {
      vars.datSpell[spellIndex].minHp = parseInt(minHp.trim());
    }

    responseSplit = response.split('MaxHP=');
    let maxHp = responseSplit[1];

    if (maxHp) {
      vars.datSpell[spellIndex].maxHp = parseInt(maxHp.trim());
    }

    responseSplit = response.split('SubeHP=');
    let subeHp = responseSplit[1];

    if (subeHp) {
      vars.datSpell[spellIndex].subeHp = parseInt(subeHp.trim());
    }

    responseSplit = response.split('SubeAG=');
    let subeAg = responseSplit[1];

    if (subeAg) {
      vars.datSpell[spellIndex].subeAg = parseInt(subeAg.trim());
    }

    esponseSplit = response.split('MinAG=');
    let minAg = responseSplit[1];

    if (minAg) {
      vars.datSpell[spellIndex].minAg = parseInt(minAg.trim());
    }

    responseSplit = response.split('MaxAG=');
    let maxAg = responseSplit[1];

    if (maxAg) {
      vars.datSpell[spellIndex].maxAg = parseInt(maxAg.trim());
    }

    responseSplit = response.split('SubeFU=');
    let subeFz = responseSplit[1];

    if (subeFz) {
      vars.datSpell[spellIndex].subeFz = parseInt(subeFz.trim());
    }

    esponseSplit = response.split('MinFU=');
    let minFz = responseSplit[1];

    if (minFz) {
      vars.datSpell[spellIndex].minFz = parseInt(minFz.trim());
    }

    responseSplit = response.split('MaxFU=');
    let maxFz = responseSplit[1];

    if (maxFz) {
      vars.datSpell[spellIndex].maxFz = parseInt(maxFz.trim());
    }

    responseSplit = response.split('StaffAffected=');
    let staffAffected = responseSplit[1];

    if (staffAffected) {
      vars.datSpell[spellIndex].staffAffected = parseInt(staffAffected.trim());
    }

    responseSplit = response.split('PalabrasMagicas=');
    let palabrasMagicas = responseSplit[1];

    if (palabrasMagicas) {
      vars.datSpell[spellIndex].palabrasMagicas = palabrasMagicas.trim();
    }
  }

  console.log('[INFO | ' + funct.dateFormat(new Date(), '%d-%m-%Y %H:%M:%S') + '] Hechizos cargados.');
});