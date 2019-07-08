export default (buffer, handler) => {
  let Clase = buffer.ReadByte();
  handler.handleLogged(Clase);
}