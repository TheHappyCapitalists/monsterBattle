import { BattleEntity } from './battle-entity';

export class Monster extends BattleEntity {
  constructor(maxSpeed: number) {
    super(maxSpeed);
  }
}

export class MonsterBuilder {
  public maxSpeed: number = 5;
  constructor() {}

  withMaxSpeed(n: number) {
    this.maxSpeed = n;
    return this;
  }

  build() {
    return new Monster(this.maxSpeed);
  }
}

export class MonsterFixtures {
  static Sneko = new MonsterBuilder().withMaxSpeed(7).build();
  static Betoblyat = new MonsterBuilder().withMaxSpeed(5).build();
}
