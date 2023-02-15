import { BattleEntity } from '../domain/battle-entity';
import { Position } from '../domain/position';

export class Physic<T extends BattleEntity> {
  constructor(entity: T, position: Position, vector: number, speed: number) {}
}
