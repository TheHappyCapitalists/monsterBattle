import { BasicsAngle } from '../../shared/angle';
import { BattleEntity } from './battle-entity';

export type EntityBattleIntentType = 'movement' | 'attack';

export type UserBattleIntentType = 'pause' | 'menu';
export type BattleMovementIntent = {
  type: 'movement';
  direction: number;
  intensity: number;
};
export type BattleAttack = { type: 'attack' };
export type UserBattleIntent = { type: UserBattleIntentType };
export type BattleAbilityIntent = BattleAttack;

export type EntityBattleIntent = BattleMovementIntent | BattleAbilityIntent;
export type BattleIntent = EntityBattleIntent | UserBattleIntent;

export type EntityIntents = {
  entity: BattleEntity;
  movementIntent?: BattleMovementIntent;
  abilityIntent?: BattleAbilityIntent;
};

// TODO Maybe make a builder for each intetnt type ?
export class BattleIntentBuilder {
  private type: EntityBattleIntentType = 'movement';
  private direction: number = 0;
  private intensity: number = 1;

  constructor() {}

  withType(type: EntityBattleIntentType) {
    this.type = type;
    return this;
  }

  withDirection(direction: number) {
    this.direction = direction;
    return this;
  }

  withIntensity(intensity: number) {
    this.intensity = intensity;
  }

  build(): EntityBattleIntent {
    if (this.type === 'movement') {
      return {
        type: 'movement',
        direction: this.direction,
        intensity: this.intensity,
      };
    }
    return {
      type: 'attack',
    };
  }
}

export class BattleIntentFixtures {
  static moveLeft = new BattleIntentBuilder()
    .withDirection(BasicsAngle.left)
    .build() as BattleMovementIntent;
  static moveTopLeft = new BattleIntentBuilder()
    .withDirection(BasicsAngle.topLeft)
    .build() as BattleMovementIntent;
  static moveUp = new BattleIntentBuilder()
    .withDirection(BasicsAngle.up)
    .build() as BattleMovementIntent;
  static moveBottomLeft = new BattleIntentBuilder()
    .withDirection(BasicsAngle.bottomLeft)
    .build() as BattleMovementIntent;
  static moveDown = new BattleIntentBuilder()
    .withDirection(BasicsAngle.down)
    .build() as BattleMovementIntent;
  static moveRight = new BattleIntentBuilder()
    .withDirection(BasicsAngle.right)
    .build() as BattleMovementIntent;
  static moveTopRight = new BattleIntentBuilder()
    .withDirection(BasicsAngle.topRight)
    .build() as BattleMovementIntent;
  static moveBottomRight = new BattleIntentBuilder()
    .withDirection(BasicsAngle.bottomRight)
    .build() as BattleMovementIntent;
  static attack = new BattleIntentBuilder()
    .withType('attack')
    .build() as BattleAbilityIntent;
}
