import type { Monster } from './monster';

export class Player {
  constructor(private monsters: Monster[]) {}

  getMonsters() {
    return this.monsters;
  }
}
