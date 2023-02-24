import type { Monster } from '../../monster/domain/monster';

export class Player {
  constructor(private monsters: Monster[]) {}

  getMonsters() {
    return this.monsters;
  }
}
