import Game from './game';
import Intervalos from './intervalos';
import Acciones from './acciones';
import ComandosChat from './comandoschat';

export default class GameManager {
  constructor(assetManager, renderer) {
    this.renderer = renderer; // temporal, pasarselo directamente al constructor de game ?
    this.assetManaget = assetManager;
    this.game = new Game(assetManager);

    this.intervalos = new Intervalos();
    this.acciones = new Acciones(this.game, this.intervalos);
    this.comandosChat = new ComandosChat(this.game, this.acciones);
  }

  setup(client, gameUI) {
    this.game.setup(client, gameUI, this.renderer, this.assetManaget.audio);
  }

  resetGame(escala) {
    this.renderer.clean(escala);
    let ui = this.game.gameUI;
    let client = this.game.client;

    this.assetManaget.audio.reset();
    this.game.init(this.assetManaget);
    this.game.setup(client, ui, this.renderer, this.assetManaget.audio);
  }

}