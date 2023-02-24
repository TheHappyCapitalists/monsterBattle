import { Position } from '../../shared/position';
import { BattleEntity } from '../domain/battle-entity';
import { BattleMovementIntent, EntityIntents } from '../domain/battle-intent';
import { BattleEntityPhysic } from './battle-entity-physic';

export class EntityNotFoundError extends Error {
  constructor(entity: BattleEntity) {
    super(`Entity ${entity} not found in battle reference`);
  }
}

export type BattleEntityPhysicProps = {
  entity: BattleEntity;
  position: Position;
  angle: number;
};

export class BattlePhysic {
  private entitiesReference: Map<
    BattleEntity,
    BattleEntityPhysic<BattleEntity>
  > = new Map();
  constructor(private entities: BattleEntityPhysicProps[]) {
    entities.forEach(({ entity, position, angle }) =>
      this.entitiesReference.set(
        entity,
        new BattleEntityPhysic(entity, position, angle, 0),
      ),
    );
  }

  getReference(entity: BattleEntity) {
    const found = this.entitiesReference.get(entity);
    if (!found) {
      throw new EntityNotFoundError(entity);
    }
    return found;
  }

  tick(entityIntents: EntityIntents[]) {
    // intents
    entityIntents.forEach((entityIntents) => {
      const physicEntity = this.getReference(entityIntents.entity);
      this.applyMovementIntent(physicEntity, entityIntents.movementIntent);
    });

    //natural shit
    this.entitiesReference.forEach((entity) => {
      this.entityMovement(entity);
    });
  }

  applyMovementIntent(
    entity: BattleEntityPhysic<BattleEntity>,
    movementIntent?: BattleMovementIntent,
  ) {
    entity.speed = this.calculateNextSpeed(entity, movementIntent);
    entity.angle = this.calculateNextAngle(entity, movementIntent);
    console.log('allo', entity.angle);
  }

  calculateNextAngle(
    entity: BattleEntityPhysic<BattleEntity>,
    movement?: BattleMovementIntent,
  ) {
    if (!movement) return entity.angle;

    const isTurningLeft =
      this.getDifferenceRadiant(entity.angle, movement.direction) > 0;

    if (!isTurningLeft) {
      return entity.angle - Math.PI / 16 >= 0
        ? entity.angle - Math.PI / 16
        : entity.angle - Math.PI / 16 + 2 * Math.PI;
    }
    return (entity.angle + Math.PI / 16) % (Math.PI * 2);
  }

  getDifferenceRadiant(startAngle: number, wantedAngle: number) {
    const diff = wantedAngle - startAngle;

    const mod = (a: number, n: number) => ((a % n) + n) % n;
    return mod(diff + Math.PI, 2 * Math.PI) - Math.PI;
  }

  calculateNextSpeed(
    entity: BattleEntityPhysic<BattleEntity>,
    movement?: BattleMovementIntent,
  ) {
    const interpolatedValue = movement
      ? (1 / (Math.PI / 4)) * (Math.PI / 4) -
        Math.abs(entity.angle - movement.direction)
      : 0;
    if (interpolatedValue <= 0) {
      return entity.speed - entity.speed * 0.25;
    }
    return (
      entity.speed +
      (entity.entity.maxSpeed - entity.speed) * 0.2 * interpolatedValue
    );
  }

  entityMovement(entity: BattleEntityPhysic<BattleEntity>) {
    const canMove = true;
    if (canMove) {
      entity.move();
    }
  }
}
