import { EntityBattleIntent } from '../domain/battle-intent';
import { BattleEntity } from '../domain/battle-entity';
import { Position } from '../../shared/position';
import { BattleField } from '../domain/battle-field';

export class BattleEntityPhysic<T extends BattleEntity> {
  constructor(
    public readonly entity: T,
    public position: Position,
    public angle: number,
    public speed: number,
  ) {}

  turn(angle: number, intensity: number) {
    this.angle = angle;
    this.speed = this.entity.maxSpeed * intensity;
  }

  move() {
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
  }

  get name() {
    return this.entity.name;
  }
}
