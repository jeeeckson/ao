/**
 * Created by horacio on 7/7/16.
 */
import SearchInputFilter from '../../utils/searchinputfilter';

export default class MiembrosClan {
  constructor(game, showMensajeCb) {
    this.game = game;

    this.showMensajeCb = showMensajeCb;

    this.$inputSearchMember = $('#clanesMiembrosTabInputNombre');
    this.$miembrosNameList = $('#clanesMembersList');
    this.$botonNoticias = $('#clanesMiembrosBotonNoticias');
    this.$botonDetalles = $('#clanesMiembrosBotonDetalles');
    this.$botonHechar = $('#clanesMiembrosBotonHechar');

    this.initCallbacks();
  }

  setNombresMiembros(nombresMiembros) {
    this.$miembrosNameList.empty();
    for (let nombre of nombresMiembros) {
      let $nuevoMiembro = $('<option>').text(nombre);
      this.$miembrosNameList.append($nuevoMiembro);
    }
  }

  _getMiembroSeleccionado() {
    return this.$miembrosNameList.find('option:selected').text();
  }

  initCallbacks() {
    let self = this;

    SearchInputFilter.makeInputFilterElement(this.$inputSearchMember, this.$miembrosNameList, 'option');

    this.$botonNoticias.click(() => {
      self.game.client.sendShowGuildNews();
    });

    this.$botonDetalles.click(() => {
      let pj = self._getMiembroSeleccionado();
      if (pj) {
        self.game.client.sendGuildMemberInfo(pj);
      } else {
        self.showMensajeCb('Debes seleccionar un personaje');
      }
    });
    this.$botonHechar.click(() => {
      let pj = self._getMiembroSeleccionado();
      if (pj) {
        self.game.client.sendGuildKickMember(pj);
        self.game.client.sendRequestGuildLeaderInfo();
      } else {
        self.showMensajeCb('Debes seleccionar un personaje');
      }
    });
  }
}
