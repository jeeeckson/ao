let ByteBuffer = require('bytebuffer');

function Package() {

  this.clientPacketID = {
    changeName: 1,
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
    writeUserIndexInServer: 28,
    getMyCharacter: 29,
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
    updateFuerza: 48,
    error: 49
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

  this.length = () => {
    return this.bufferRcv.length;
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
