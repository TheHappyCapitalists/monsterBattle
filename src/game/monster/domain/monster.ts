import { BattleEntity } from '../../battle/domain/battle-entity';
import { HitBoxSchema } from './hitbox-schema';

export class Monster extends BattleEntity {
  constructor(maxSpeed: number, name: string, hitboxSchema: HitBoxSchema) {
    super(maxSpeed, name, hitboxSchema);
  }
}

export class MonsterBuilder {
  public maxSpeed: number = 5;
  public name: string = 'sneko';
  public hitboxSchema: HitBoxSchema = {
    size: { width: 100, height: 100 },
    Hitboxes: [{ position: { x: 0, y: 0 }, size: { width: 100, height: 100 } }],
  };
  constructor() {}

  withMaxSpeed(n: number) {
    this.maxSpeed = n;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withHitBoxSchema(hitboxSchema: HitBoxSchema) {
    this.hitboxSchema = hitboxSchema;
    return this;
  }

  build() {
    return new Monster(this.maxSpeed, this.name, this.hitboxSchema);
  }
}

export class MonsterFixtures {
  static Sneko = new MonsterBuilder()
    .withMaxSpeed(12)
    .withName('sneko')
    .build();
  static Betoblyat = new MonsterBuilder()
    .withMaxSpeed(15)
    .withName('betoblyat')
    .build();
}
