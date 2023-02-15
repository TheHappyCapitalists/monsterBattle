import { BattleEntity } from './battle-entity';
import type { Position } from './position';

export class Monster extends BattleEntity {
  constructor(maxSpeed: number) {
    super(maxSpeed);
  }
}
