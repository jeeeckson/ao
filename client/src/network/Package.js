import ByteBuffer from 'bytebuffer';

function Package(ws) {
  this.ws = ws;
  this.bufferRcv = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, true);
  this.bufferSnd = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, true);

  this.setData = (data) => {
    this.bufferRcv = new ByteBuffer.wrap(data, 'utf8', true);
  };

  this.getPackageID = () => {
    // packageID
    return this.ReadByte();
  };

  this.setPackageID = (packageID) => {
    this.bufferSnd = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, true);
    this.WriteByte(packageID);
  };

  this.WriteBoolean = (value) => {
    if (value) {
      this.bufferSnd.writeInt8(parseInt(1));
    } else {
      this.bufferSnd.writeInt8(parseInt(0));
    }
  };


  this.WriteByte = (numByte, signed) => {
    if (!numByte) {
      numByte = 0;
    }

    if (signed) {
      this.bufferSnd.writeInt8(parseInt(numByte));
    } else {
      this.bufferSnd.writeUint8(parseInt(numByte));
    }
  };

  this.WriteShort = (numShort, signed) => {
    if (!numShort) {
      numShort = 0;
    }

    if (signed) {
      this.bufferSnd.writeInt16(parseInt(numShort));
    } else {
      this.bufferSnd.writeUint16(parseInt(numShort));
    }
  };

  this.WriteInteger = (numInt, signed) => {
    if (!numInt) {
      numInt = 0;
    }

    if (signed) {
      this.bufferSnd.writeInt32(parseInt(numInt));
    } else {
      this.bufferSnd.writeUint32(parseInt(numInt));
    }
  };

  this.WriteFloat = (numFloat) => {
    if (!numFloat) {
      numFloat = 0;
    }

    this.bufferSnd.writeFloat(parseInt(numFloat));
  };

  this.WriteDouble = (numDouble) => {
    if (!numDouble) {
      numDouble = 0;
    }

    this.bufferSnd.writeDouble(parseInt(numDouble));
  };

  this.WriteString = (dataString) => {
    if (!dataString) {
      dataString = '';
    }

    this.WriteShort(ByteBuffer.calculateUTF8Chars(dataString));

    this.bufferSnd.writeString(dataString);
  };

  this.ReadBoolean = () => {
    let value = this.ReadByte();
    return !!value;
  };

  this.ReadByte = (signed = false) => {
    let dByte = 0;
    if (signed) {
      dByte = this.bufferRcv.readInt8();
    } else {
      dByte = this.bufferRcv.readUint8();
    }
    return dByte;
  };

  this.ReadShort = (signed) => {
    let dShort = 0;

    if (signed) {
      dShort = this.bufferRcv.readInt16();
    } else {
      dShort = this.bufferRcv.readUint16();
    }

    return dShort;
  };

  this.ReadInteger = (signed) => {
    let dInt = 0;
    if (signed) {
      dInt = this.bufferRcv.readInt32();
    } else {
      dInt = this.bufferRcv.readUint32();
    }

    return dInt;
  };

  this.ReadFloat = () => {
    return this.bufferRcv.readFloat();
  };

  this.ReadDouble = () => {
    return this.bufferRcv.readDouble();
  };

  this.ReadLong = () => {
    return this.bufferRcv.readLong();
  };

  this.ReadString = () => {
    let lengthStr = this.ReadShort();

    let str = this.bufferRcv.readString(lengthStr, ByteBuffer.METRICS_CHARS);
    return str;
  };

  this.flush = (from = '') => {
    //console.log("Envia desde el cliente: " + from)
    console.log("flush")
    this.bufferSnd.flip();
    this.ws.emit('message', this.bufferSnd.toBuffer());

  };
}

export default Package;
 