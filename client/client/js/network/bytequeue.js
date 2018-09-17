export default class ByteQueue {
  constructor(ws) {
    this.ws = ws;
    this._data = [];
  }

  WriteByte(value) {
    this._data.push(value);
  }

  // todos little endian:
  WriteInteger(value) { // 2B

    this._data.push(value & 0xff);
    this._data.push((value >> 8) & 0xff);
  }

  WriteLong(value) { // 4B
    this._data.push(value & 0xff);
    this._data.push((value >> 8) & 0xff);
    this._data.push((value >> 16) & 0xff);
    this._data.push((value >> 24) & 0xff);
  }

  WriteSingle(value) { // 4B

    let buffer = new ArrayBuffer(4);
    let floatArray = new Float32Array(buffer);
    floatArray[0] = value;
    let byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.length; i++) {
      this._data.push(byteArray[i]);
    }
  }

  WriteDouble(value) { //8B

    let buffer = new ArrayBuffer(8);
    let floatArray = new Float64Array(buffer);
    floatArray[0] = value;
    let byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.length; i++) {
      this._data.push(byteArray[i]);
    }
  }

  WriteBoolean(value) {
    if (value) {
      this._data.push(1);
    } else {
      this._data.push(0);
    }
  }

  WriteUnicodeStringFixed(string) {
    this._data = this._data.concat(
      string.split('').map(
        (chr) => {
          return chr.charCodeAt(0);
        }));
  }

  WriteUnicodeString(string) {
    this.WriteInteger(string.length);
    this.WriteUnicodeStringFixed(string);
  }

  PeekByte() {
    return this.ws.rQpeek8();
  }

  ReadByte() {
    return this.ws.rQshift8();
  }

  ReadInteger() {

    let int = this.ws.rQshift16();
    if (int & 0x8000) // ultimo bit de los 16 es 1 -> numero negativo, extiendo los demas bits
    {
      int = int | 0xFFFF0000;
    }
    return int;
  }

  ReadLong() {
    return this.ws.rQshift32();
  }

  ReadSingle() {
    let buffer = new ArrayBuffer(4);
    let byteView = new Uint8Array(buffer);
    let floatView = new Float32Array(buffer);
    byteView[0] = this.ws.rQshift8();
    byteView[1] = this.ws.rQshift8();
    byteView[2] = this.ws.rQshift8();
    byteView[3] = this.ws.rQshift8();
    return floatView[0];
  }

  ReadDouble() {
    let buffer = new ArrayBuffer(8);
    let byteView = new Uint8Array(buffer);
    let floatView = new Float64Array(buffer);
    for (let i = 0; i < 8; i++) {
      byteView[i] = this.ws.rQshift8();
    }
    return floatView[0];
  }

  ReadBoolean() {
    let value = this.ReadByte();
    return !!value;
  }

  // NOTA: cuando mandan muchos strings distintos vienen separados por 0, entonces separorlos con
  // splitNullArray de utils
  ReadUnicodeString() {
    let isoArray = this.ws.rQshiftBytes(this.ws.rQshift16());
    return String.fromCharCode.apply(null, isoArray);
  }

  length() {
    return this.ws.rQlen();
  }

  flush() {
    this.ws.send(this._data);
    this._data = [];
  }
}
