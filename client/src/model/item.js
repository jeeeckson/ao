import Entity from './entity';

export default class Item extends Entity {
  constructor(gridX, gridY) {
    super(gridX, gridY);
    this.sprite = null;
  }
}
