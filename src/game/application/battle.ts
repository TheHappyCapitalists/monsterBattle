import { BattleIntent } from '../domain/battle-intent';
import { BattleEntity } from '../domain/battle-entity';
import type { Monster } from '../domain/monster';
import { BattlePhysic } from './battle-physic';
import { InputsState } from '../domain/input';

export class EntityNotFoundError extends Error {
  constructor(entity: BattleEntity) {
    super(`Entity ${entity} not found in battle reference`);
  }
}

export class Battle {
  private actualAlliedMonster: Monster;
  private entitiesReference: Map<Monster, BattlePhysic<Monster>> = new Map();
  constructor(private alliedteam: Monster[], private opponent: Monster) {
    this.actualAlliedMonster = alliedteam[0];
    this.entitiesReference.set(
      this.actualAlliedMonster,
      new BattlePhysic(
        this.actualAlliedMonster,
        { x: 100, y: 100 },
        (7 / 8) * Math.PI,
        0,
      ),
    );
    this.entitiesReference.set(
      this.opponent,
      new BattlePhysic(
        this.opponent,
        { x: 1500, y: 800 },
        (3 / 4) * Math.PI,
        0,
      ),
    );
  }

  tick() {
    this.entitiesReference.forEach((entity) => entity.tick());
  }

  translateInput(input: InputsState): BattleIntent[] {
    const intents: BattleIntent[] = [];
    if (input.analogicInput.intensity > 0.5) {
      intents.push({ type: 'movement', direction: input.analogicInput.angle });
    }
    return intents;
  }

  input(monster: Monster, action: BattleIntent) {
    const entity = this.getReference(monster);
    entity.intent(action);
  }

  getBattleState() {
    const allied = this.getReference(this.actualAlliedMonster);
    const opponent = this.getReference(this.opponent);
    return {
      alliedMonster: {
        position: allied.position,
        vector: allied.angle,
      },
      opponentMonster: {
        position: opponent.position,
        vector: opponent.angle,
      },
    };
  }

  getReference(monster: Monster) {
    const found = this.entitiesReference.get(monster);
    if (!found) {
      throw new EntityNotFoundError(monster);
    }
    return found;
  }
}
