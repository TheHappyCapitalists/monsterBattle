import { BattleIntent, BattleMovement } from '../domain/battle-intent';
import { BattleEntity } from '../domain/battle-entity';
import { Position, BasicsAngle } from '../domain/position';

export class BattlePhysic<T extends BattleEntity> {
  constructor(
    private readonly entity: T,
    public position: Position,
    public angle: number,
    public speed: number,
  ) {}

  intent(battleIntent: BattleIntent) {
    if (battleIntent.type === 'movement') {
      this.move(battleIntent.direction);
    }
  }

  move(angle: number) {
    this.angle = angle;
    this.speed = this.entity.maxSpeed;
  }

  tick() {
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
  }
}
